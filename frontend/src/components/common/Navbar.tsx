"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { logout } from "@/services/auth/AuthServices";
import { IoMdClose, IoIosMenu } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { GrConfigure } from "react-icons/gr";

const baseURL = process.env.NEXT_PUBLIC_CLIENT_BASE_URL;

const navigationLinks = (locale: string, companyId: string, isAdmin: boolean) => {
  const links = [
    { href: `${baseURL}/${locale}/${companyId}/dashboard`, name: "Control" },
    { href: `${baseURL}/${locale}/${companyId}/sales`, name: "Ventas" },
    { href: `${baseURL}/${locale}/${companyId}/stock`, name: "Inventario" },
  ];

  if (isAdmin) {
    links.push({ href: `${baseURL}/${locale}/admin`, name: "Admin" });
  }

  return links;
};

const configLinks = (locale: string, companyId: string) => [
  { href: `${baseURL}/${locale}/${companyId}/configuration/profile`, name: "Tu Perfil" },
  { href: `${baseURL}/${locale}/${companyId}/configuration/settings`, name: "Configuración" },
];

const classMenuLinks = "block px-3 py-2 text-base font-medium";
const activeClassMenuLinks =
  "block px-3 py-2 text-base font-medium text-muted bg-gradient-primary-secondary rounded text-primary-foreground";

const MenuLinks = ({
  links,
  activeLink,
  onClick,
}: {
  links: { href: string; name: string }[];
  activeLink: string;
  onClick?: () => void;
}) => (
  <>
    {links.map((link) => {
      const linkPath = new URL(link.href).pathname;

      return (
        <Link
          key={link.href}
          href={link.href}
          className={
            activeLink === linkPath ? activeClassMenuLinks : classMenuLinks
          }
          aria-current={activeLink === linkPath ? "page" : undefined}
          onClick={onClick}
        >
          {link.name}
        </Link>
      );
    })}
  </>
);

const Navigation = ({
  params,
  isAdmin,
}: {
  params: { locale: string; companyId: string };
  isAdmin: boolean;
}) => {
  const router = useRouter();
  const activeLink = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success === true) {
        router.push(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/`);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const links = navigationLinks(params.locale, params.companyId, isAdmin);
  const profileLinks = configLinks(params.locale, params.companyId);

  return (
    <nav className="w-full h-16 grid items-center">
      <div className="relative flex items-center justify-between">
        {/* Menú Móvil */}
        <div className="absolute flex items-center justify-between md:hidden z-50">
          <button
            type="button"
            className="relative inline-flex items-center justify-center rounded-md p-2 text-foreground bg-card hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-foreground"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <IoMdClose
              className={`block size-5 ${isOpen ? "block" : "hidden"}`}
            />

            <IoIosMenu
              className={`block size-5 text-white ${isOpen ? "hidden" : "block"}`}
            />
          </button>
        </div>

        {/* Menú de Navegación Principal */}
        <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <div className="hidden md:block">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <div className="md:flex md:items-center gap-2 md:gap-4">
                {links.map((link) => {
                  const linkPath = new URL(link.href).pathname;
                  const isActive = activeLink === linkPath;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`${
                        isActive
                          ? "block bg-gradient-primary-secondary rounded text-primary-foreground"
                          : "block"
                      } hover:bg-gradient-primary-secondary hover:rounded py-1 px-3`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Menú de Perfil y Notificaciones */}
        <div className="absolute inset-y-0 right-0 items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden md:flex ">
          {/* Notificaciones */}
          <button
            type="button"
            className="relative rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <GrConfigure
              className={` size-5 ${isProfileOpen ? "hidden" : "block"}`}
            />
          </button>

          {/* Menú de Perfil */}
          <div
            className={`absolute top-0 right-0 p-4 z-40 min-w-60 rounded-md bg-white shadow-lg focus:outline-none ${
              isProfileOpen ? "block" : "hidden"
            }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
          >
            <div className="relative top-0">
              <div className="flex items-center justify-between">
                <h2 className="block py-4 text-sm text-gray-700">
                  Configuración
                </h2>
                <button
                  type="button"
                  className="relative rounded-full p-1 text-background"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <IoMdClose
                    className={`size-5 z-50 ${
                      !isProfileOpen ? "hidden" : "block"
                    }`}
                  />
                </button>
              </div>

              <hr />
              {profileLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block my-4 text-sm text-gray-700"
                  role="menuitem"
                  id="user-menu-item-0"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <>
                  <hr />
                  <Link
                    href={`${baseURL}/${params.locale}/admin`}
                    className="block my-4 text-sm text-gray-700"
                    role="menuitem"
                  >
                    Admin
                  </Link>
                  <hr />
                </>
              )}

              <button
                onClick={() => handleLogout()}
                className="block my-4 text-sm text-gray-700"
                role="menuitem"
                id="user-menu-item-2"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } absolute top-0 left-0 bg-card w-full h-screen z-40 items-center justify-start flex`}
        id="mobile-menu"
      >
        <div className="flex flex-col gap-3 w-full container">
          <MenuLinks
            links={links}
            activeLink={activeLink}
            onClick={() => setIsOpen(false)}
          />
          <MenuLinks
            links={profileLinks}
            activeLink={activeLink}
            onClick={() => setIsOpen(false)}
          />
          <button
            onClick={() => handleLogout()}
            className={`${classMenuLinks} text-start`}
            role="menuitem"
            id="user-menu-item-logout"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
