"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { HeadSidebarLoading } from "./components/head-sidebar-loading";

import RomeLogo from "public/assets/images/rome.png";
import { Link } from "react-router";

interface HeaderType {
  org: {
    organization: {
      logoUrl: string;
      nameEn: string;
    };
  };
  isLoading?: boolean;
}

export function HeadSidebar({ org, isLoading }: HeaderType) {
  const { state } = useSidebar();
  const organization = org?.organization;
  const logoUrl = organization?.logoUrl;
  const nameEn = organization?.nameEn;

  const isError = !isLoading && (!organization || !logoUrl || !nameEn);

  const renderLogoSection = () => {
    if (isLoading) {
      return <HeadSidebarLoading />;
    }

    if (isError) {
      return (
        <div className="flex items-center">
          <img
            src={RomeLogo}
            alt="ROME"
            width={40}
            height={40}
            // unoptimized
            className="rounded-lg"
          />
          <span className="font-semibold ml-3 text-base">ROME</span>
        </div>
      );
    }

    return (
      <div className="flex items-center">
        <img
          // loader={({ src }) => src}
          src={logoUrl}
          alt="logo"
          width={40}
          height={40}
          // unoptimized
          className="rounded-lg"
        />
        {state === "expanded" && (
          <span className="font-semibold ml-3 text-base">{nameEn}</span>
        )}
      </div>
    );
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link to="/utotech">{renderLogoSection()}</Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
