import { describe, expect, it, vi } from "vitest";
import sharp from "sharp";
import { uploadPrivateCmsImage } from "./cmsPrivateMediaUpload";

const config = {
  bucket: "private-cms-test",
  region: "us-east-1",
};

async function validInput() {
  const image = await sharp({
    create: {
      width: 5,
      height: 5,
      channels: 3,
      background: "#ffffff",
    },
  }).png().toBuffer();

  return {
    fileName: "test.png",
    fileBase64: image.toString("base64"),
    mimeType: "image/png",
    altText: "  Sample tooth image  ",
  };
}

function mocks() {
  return {
    put: vi.fn(async () => {}),
    remove: vi.fn(async () => {}),
    insert: vi.fn(async () => 42),
  };
}

describe("Private CMS image upload pipeline", () => {
  it("creates a private URL and Media Library record", async () => {
    const deps = mocks();
    const result = await uploadPrivateCmsImage(
      await validInput(), config, deps
    );

    expect(result.id).toBe(42);
    expect(result.url).toMatch(
      /^\/api\/cms-private-media\/[a-f0-9-]+\.webp$/
    );
    expect(deps.put).toHaveBeenCalledOnce();
    expect(deps.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        url: result.url,
        fileKey: result.fileKey,
        altText: "Sample tooth image",
        mimeType: "image/webp",
      })
    );
    expect(deps.remove).not.toHaveBeenCalled();
  });

  it("rejects invalid image encoding before uploading", async () => {
    const deps = mocks();
    await expect(uploadPrivateCmsImage({
      fileName: "bad.png",
      fileBase64: "not valid base64!",
      mimeType: "image/png",
    }, config, deps)).rejects.toThrow("Invalid image encoding");

    expect(deps.put).not.toHaveBeenCalled();
    expect(deps.insert).not.toHaveBeenCalled();
  });

  it("does not save metadata when storage upload fails", async () => {
    const deps = mocks();
    deps.put.mockRejectedValueOnce(new Error("Storage unavailable"));

    await expect(
      uploadPrivateCmsImage(await validInput(), config, deps)
    ).rejects.toThrow("Storage unavailable");

    expect(deps.insert).not.toHaveBeenCalled();
  });

  it("removes the object when Media Library insertion fails", async () => {
    const deps = mocks();
    deps.insert.mockRejectedValueOnce(new Error("Database unavailable"));

    await expect(
      uploadPrivateCmsImage(await validInput(), config, deps)
    ).rejects.toThrow("private object removed");

    expect(deps.put).toHaveBeenCalledOnce();
    expect(deps.remove).toHaveBeenCalledOnce();
  });

  it("reports a cleanup failure rather than hiding it", async () => {
    const deps = mocks();
    deps.insert.mockRejectedValueOnce(new Error("Database unavailable"));
    deps.remove.mockRejectedValueOnce(new Error("Cleanup unavailable"));

    await expect(
      uploadPrivateCmsImage(await validInput(), config, deps)
    ).rejects.toThrow("cleanup failed");
  });
});
