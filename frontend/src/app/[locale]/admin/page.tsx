import LanguageSelector from "@/components/common/LanguageSelector";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Admin");
  return (
    //dashboar del superadmin
    //esta vista se va a mostrar si tenes permiso de superadmin
    <main>
      Hola
      <LanguageSelector />
    </main>
  );
}
