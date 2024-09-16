import React from "react";
import SideebarHeader from "./SideebarHeader";
import NavLinks from "./NavLinks";
import MemberProfile from "./MemberProfile";

const Sidebar = () => {
  return (
    <div className="px-4 w-8- min-h-full bg-base-300  py-12 grid grid-rows-[auto,1fr,auto]">
      <SideebarHeader />
      <NavLinks />
      <MemberProfile />
    </div>
  );
};

export default Sidebar;
