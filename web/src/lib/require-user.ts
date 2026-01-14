import { auth } from "@/auth";
import { headers } from "next/headers";

export async function requireUserId() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data || !data.user) {
    return null;
  }

  return data.user.id;
}
