import { headers } from "next/headers";
import Sidebar from "@/components/Sidebar";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const email = headersList.get("cf-access-authenticated-user-email") || "admin";

  return (
    <div className="flex min-h-screen">
      <Sidebar email={email} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
