import { redirect } from "next/navigation";
import LoginClient from "./LoginForm";
import { cookies } from "next/headers";
import ChatComponent from "@/components/openai/chat";
import Logo from "@/components/common/Logo";

export default async function Page({
  params,
}: {
  params: { locale?: string };
}) {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get("session")?.value;
  const locale = params.locale;

  if (cookieValue) {
    const parsedCookie = JSON.parse(cookieValue);
    const companyId = parsedCookie.dataUser?.companyId;

    if (companyId) {
      redirect(
        `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${
          locale || "default"
        }/${companyId}/`
      );
    }
  }

  return (
    <div className="grid md:grid-cols-2 h-screen justify-center items-center gap-4">
      <div className="flex place-content-center">
        <Logo />
      </div>
      <div className="flex place-content-center">
        <LoginClient locale={locale || "default"} />
      </div>
      <ChatComponent />
    </div>
  );
}
