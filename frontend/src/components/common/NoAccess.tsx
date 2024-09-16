import Link from "next/link";
import { Button } from "../ui/button";

const NoAccess = ({ locale }: { locale: string }) => {
  return (
    <div className="flex flex-col w-full h-96 justify-center bg-background text-center">
      <h2 className="text-2xl font-bold mb-4">
        No tienes acceso a esta página.
      </h2>
      <p className="text-gray-600 mb-8">
        Por favor, inicia sesión para continuar.
      </p>
      <div>
        <Button variant="gradient" type="button">
          <Link
            href={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/auth/login`}
          >
            Iniciar sesión
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NoAccess;
