"use client";
import { useState } from "react";
import Link from "next/link";
import { logout } from "@/services/auth/AuthServices";
import { IoMdClose, IoIosMenu } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_CLIENT_BASE_URL;

const navigationLinks = (locale: string, companyId: string) => [
  { href: `${baseURL}/${locale}/${companyId}/sales`, name: "Ventas" },
  { href: `${baseURL}/${locale}/${companyId}/stock`, name: "Control" },
  {
    href: `${baseURL}/${locale}/${companyId}/dashboard`,
    name: "Administración",
  },
  { href: `${baseURL}/${locale}/admin`, name: "Admin" },
];

const configLinks = (locale: string, companyId: string) => [
  { href: `${baseURL}/${locale}/${companyId}/profile`, name: "Tu Perfil" },
  { href: `${baseURL}/${locale}/${companyId}/settings`, name: "Configuración" },
];

const classMenuLinks = "block px-3 py-2 text-base font-medium text-muted";
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
}: {
  params: { locale: string; companyId: string };
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

  const links = navigationLinks(params.locale, params.companyId);
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
              className={`block h-6 w-6 ${isOpen ? "block" : "hidden"}`}
            />

            <IoIosMenu
              className={`block h-6 w-6 ${isOpen ? "hidden" : "block"}`}
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
        <div className="absolute inset-y-0 right-0 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 hidden md:flex ">
          {/* Notificaciones */}
          <button
            type="button"
            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">View notifications</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>

          {/* Menú de Perfil */}
          <div className="relative ml-3">
            <div>
              <button
                type="button"
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
              </button>
            </div>

            <div
              className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                isProfileOpen ? "block" : "hidden"
              }`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              {/* aca van los link de configuracion */}
              <button
                onClick={() => handleLogout()}
                className="block px-4 py-2 text-sm text-gray-700"
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
        className={`sm:hidden ${
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
