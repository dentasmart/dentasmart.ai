export const EMAIL_UNSUBSCRIBE_REASON =
  "User requested from dentasmart.ai unsubscribe page";

const EMAIL_UNSUBSCRIBE_API_BASE =
  "https://live-backend.dentasmart.ai/email/unsubscribe";

export type EmailUnsubscribeResult = "success" | "invalid" | "error";

export function decodeEmailUnsubscribeRouteToken(routeToken: string): string {
  try {
    return decodeURIComponent(routeToken);
  } catch {
    return routeToken;
  }
}

export function buildEmailUnsubscribeUrl(token: string): string {
  return `${EMAIL_UNSUBSCRIBE_API_BASE}/${encodeURIComponent(token)}/`;
}

export function shouldAutomaticallySubmit(
  lastSubmittedToken: string | null,
  token: string,
): boolean {
  return token.length > 0 && lastSubmittedToken !== token;
}

export async function submitEmailUnsubscribe(
  token: string,
  fetchImpl: typeof fetch = fetch,
): Promise<EmailUnsubscribeResult> {
  try {
    const response = await fetchImpl(buildEmailUnsubscribeUrl(token), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ reason: EMAIL_UNSUBSCRIBE_REASON }).toString(),
    });

    if (response.status >= 200 && response.status < 300) return "success";
    if (response.status === 404) return "invalid";
    return "error";
  } catch {
    return "error";
  }
}
