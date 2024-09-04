import LanguageSelector from "@/components/common/LanguageSelector";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Admin");

  return (
    // Dashboard del superadmin
    // Esta vista se va a mostrar si tienes permiso de superadmin
    <main>
      <h1>{t('title')}</h1>
      <LanguageSelector />
    </main>
  );
}

