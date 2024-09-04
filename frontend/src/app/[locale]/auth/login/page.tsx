import LoginForm from "./LoginForm";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <div className="flex h-screen justify-center items-center">
      <LoginForm locale={locale}/>
    </div>
  );
}
