import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { preparePrivateCmsImage } from "./cmsPrivateMediaS3";

type Config = { bucket: string; region: string };

export type PrivateImageRecord = {
  url: string;
  fileKey: string;
  filename: string;
  mimeType: string;
  fileSizeBytes: number;
  width: number;
  height: number;
  altText: string | null;
};

type Dependencies = {
  put: (command: PutObjectCommand) => Promise<void>;
  remove: (key: string) => Promise<void>;
  insert: (record: PrivateImageRecord) => Promise<number>;
};

export async function sendPrivateCmsPut(
  region: string,
  command: PutObjectCommand
): Promise<void> {
  const client = new S3Client({ region });
  try {
    await client.send(command);
  } finally {
    client.destroy();
  }
}

export async function removePrivateCmsObject(
  region: string,
  bucket: string,
  key: string
): Promise<void> {
  const client = new S3Client({ region });
  try {
    await client.send(new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    }));
  } finally {
    client.destroy();
  }
}

export async function uploadPrivateCmsImage(
  input: {
    fileName: string;
    fileBase64: string;
    mimeType: string;
    altText?: string;
  },
  config: Config,
  deps: Dependencies
) {
  const encoded = input.fileBase64;

  if (
    !encoded ||
    encoded.length > 12_000_000 ||
    !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(encoded)
  ) {
    throw new Error("Invalid image encoding");
  }

  const filename = input.fileName
    .replace(/\\/g, "/")
    .split("/")
    .pop()
    ?.replace(/[\x00-\x1f]/g, "")
    .slice(0, 200) || "cms-image";

  const prepared = await preparePrivateCmsImage(
    Buffer.from(encoded, "base64"),
    input.mimeType,
    config.bucket
  );

  if (prepared.fileSizeBytes > 10 * 1024 * 1024) {
    throw new Error("Processed image exceeds storage limit");
  }

  const name = prepared.key.split("/").pop()!;
  const url = `/api/cms-private-media/${name}`;

  const record: PrivateImageRecord = {
    url,
    fileKey: prepared.key,
    filename,
    mimeType: prepared.mimeType,
    fileSizeBytes: prepared.fileSizeBytes,
    width: prepared.width,
    height: prepared.height,
    altText: input.altText?.trim() || null,
  };

  await deps.put(prepared.command);

  let id: number;

  try {
    id = await deps.insert(record);
    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new Error("Invalid Media Library record ID");
    }
  } catch {
    try {
      await deps.remove(prepared.key);
    } catch {
      throw new Error(
        "Media Library save failed and private object cleanup failed"
      );
    }
    throw new Error("Media Library save failed; private object removed");
  }

  return {
    id,
    url,
    fileKey: prepared.key,
    width: prepared.width,
    height: prepared.height,
    mimeType: prepared.mimeType,
    filename,
  };
}
