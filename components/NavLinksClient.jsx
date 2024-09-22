"use client";

import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";

const NavLinksClient = () => {
  const pathname = usePathname();
  return <NavLinks currentPath={pathname} />;
};

export default NavLinksClient;
