"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";

const LanguageSelector = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  useEffect(() => {
    const pathLang = window.location.pathname.split("/")[1];
    if (pathLang && pathLang !== selectedLanguage) {
      setSelectedLanguage(pathLang);
    }
  }, [selectedLanguage]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    const currentPath = window.location.pathname.replace(
      /^\/[a-z]{2}/,
      `/${lang}`
    );
    router.push(currentPath);
  };

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[130px] bg-transparent focus:outline-none focus:ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Español</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
