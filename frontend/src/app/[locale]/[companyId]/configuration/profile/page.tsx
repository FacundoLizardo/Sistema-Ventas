import UsersServices from "@/services/users/UsersServices";
import ProfileForm from "@/components/configuration/profile/ProfileForm";

export default async function Page({
  params: { locale, companyId },
}: {
  params: {
    locale: string;
    companyId: string;
  };
}) {
  const { userId } = await UsersServices.userSession();

  const { user } = await UsersServices.get(userId);

  return (
    <main>
      <ProfileForm locale={locale} companyId={companyId} user={user} />
    </main>
  );
}
