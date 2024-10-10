import { redirect } from "next/navigation";
import LoginClient from "./LoginForm";
import { cookies } from "next/headers";
import ChatComponent from "@/components/openai/chat";

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
    <div className="flexh-screen justify-center items-center">
      <LoginClient locale={locale || "default"} />
      <ChatComponent/>
    </div>
  );
}
