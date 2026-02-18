import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SubscribePage } from "@/components/dashboard/SubscribePage";

export default async function Subscribe() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return <SubscribePage />;
}
