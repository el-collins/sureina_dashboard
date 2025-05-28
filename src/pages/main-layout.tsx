import { appAssets } from "../assets/whatiscap";
// import { AppAvatar } from "../components/ui/avatar";
import { useResponsive } from "../hooks";
import { cn } from "../lib/utils";
import React, { useMemo, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMenuOutline } from "react-icons/io5";
import { TbHomeFilled } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineAnalytics } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";


interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const navItems = [
    { path: "/dashboard", name: "Dashboard", icon: <TbHomeFilled /> },
    { path: "/analytics-page", name: "Analytics", icon: <MdOutlineAnalytics /> },
    { path: "/ads-spend-dashboard", name: "Ads Spend Dashboard", icon: <IoAnalytics /> },
  ];

  const { deviceType, Responsive } = useResponsive();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [isMobile, isSmallMedium, isTablet] = useMemo(() => {
    return [
      deviceType === Responsive.MOBILE,
      window.innerWidth >= 768 && window.innerWidth < 1024,
      deviceType === Responsive.TABLET,
    ];
  }, [deviceType, Responsive]);

  return (
    <div className="relative flex min-h-screen bg-white">
      <div
        className={`fixed top-0 z-30 h-full bg-[#f1f1f1] transition-all duration-300 ease-in-out
           ${
             isMobile
               ? sidebarOpen
                 ? "left-0 w-64 shadow-lg border-r border-gray-200"
                 : "-left-full w-0"
               : isSmallMedium
               ? sidebarOpen
                 ? "left-0 w-64"
                 : "left-0 w-16"
               : "left-0 w-64"
           }
        `}
      >
        <div className="relative flex flex-col h-full">
          {/* Logo */}
          <div className="absolute left-0 right-0 flex justify-start top-8 md:top-12">
            <div className="px-6">
              <img
                src={
                  !sidebarOpen && isTablet
                    ? appAssets.icons.capLogo2
                    : appAssets.icons.whatiscapLogo
                }
                alt="logo"
                className={`cursor-pointer transition-opacity duration-300 w-32 ${
                  isMobile && !sidebarOpen
                    ? "opacity-0 w-0"
                    : "opacity-100 w-10"
                }`}
                onClick={() => navigate("/dashboard")}
              />
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 mt-28">
            {navItems.map((item) => (
              <NavLink
                onClick={() => sidebarOpen && toggleSidebar()}
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center  px-6 py-3 transition-colors ${
                    isActive
                      ? "text-primary font-medium bg-gray-300 rounded-xl"
                      : "text-[#9D9EA2] hover:text-[#9D9EA2]"
                  }`
                }
              >
                <span className="mr-1.5 text-[22px]">{item.icon}</span>
                {/* Links will be hidden when sidebar is in w-16 mode */}
                <span
                  className={`${
                    (isMobile || isSmallMedium) && !sidebarOpen
                      ? "hidden"
                      : "block"
                  }`}
                >
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>

        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={cn(
          "relative flex flex-col flex-1 transition-all  duration-300 ease-in-out",
          isMobile ? "ml-0" : isSmallMedium ? "ml-16" : "ml-64"
        )}
      >
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          {/* bg-[#E5E7EB] */}
          <div className="h-full bg-white">{children}</div>
        </main>
      </div>
    </div>
  );
};

export const Header = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const navigate = useNavigate();
  return (
    <header className="bg-white md:bg-transparent p-4">
      <div
        className={cn(
          "hidden md:flex justify-between items-center mt-4",
          sidebarOpen && "hidden"
        )}
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-black text-gray-800 sm:text-2xl lg:text-3xl tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">{children}</div>
      </div>
      <div className="flex md:hidden justify-between items-center">
        <img
          src={appAssets.icons.whatiscapLogo}
          alt="logo"
          className={`cursor-pointer transition-opacity duration-300 w-32`}
          onClick={() => navigate("/dashboard")}
        />
        <div
          className="text-3xl cursor-pointer md:text-4xl text-dark lg:hidden"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </div>
      </div>
    </header>
  );
};

export const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-2 md:p-4 w-full">{children}</div>;
};
