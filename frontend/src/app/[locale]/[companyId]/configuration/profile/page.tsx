import UsersServices from "@/services/user/UsersServices";
import ProfileForm from "@/components/configuration/profile/ProfileForm";

export default async function Page({
  params: { locale , companyId},
}: {
  params: {
    locale: string;
    companyId: string;
  };
}) {
    const { userId } = await UsersServices.userSession();



  return (
    <main>
      <ProfileForm locale={locale} companyId={companyId} />
    </main>
  );
}
