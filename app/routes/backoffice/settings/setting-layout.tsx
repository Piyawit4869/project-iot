import {
  BotMessageSquare,
  Building,
  Building2,
  FileDown,
  FileUp,
} from "lucide-react";
import React from "react";
import { Tabcontrol } from "~/components/shared/topsection";
import GlobalButton from "~/components/shared/global-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Link, Outlet, useLocation } from "react-router";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const pathname = location.pathname;

  const segments = pathname.split("/"); // ['utotech','setting-organization','branch']
  const [activeTab, setActiveTab] = React.useState("manageorganization");

  const leaf = React.useMemo(() => {
    if (segments.length === 0) return null;
    const i = segments.lastIndexOf("setting-organization");
    return i >= 0
      ? segments[i + 1] ?? null
      : segments[segments.length - 1] ?? null;
  }, [segments]);

  React.useEffect(() => {
    setActiveTab(leaf ?? "manageorganization");
  }, [leaf]);

  return (
    <React.Fragment>
      <div className="flex flex-col w-full space-y-8 px-8 pt-8">
        <Tabcontrol
          title="การตั้งค่า"
          buttons={[
            <GlobalButton
              label={
                <React.Fragment>
                  <FileDown /> นำเข้าข้อมูล
                </React.Fragment>
              }
              disabled
              key={"import-button"}
              className="bg-blue-300 text-black hover:bg-blue-500 hover:text-white"
            />,
            <GlobalButton
              label={
                <>
                  <FileUp /> นำออกข้อมูล
                </>
              }
              disabled
              key={"export-button"}
              className="bg-yellow-300 text-black hover:bg-yellow-500 hover:text-white"
            />,
          ]}
        />
        <Tabs
          value={activeTab}
          // onValueChange={(val) => {
          //   setActiveTab(val);

          //   if (val === "manageorganization") {
          //     redirect("/[organization]/setting-organization");
          //   } else {
          //     redirect(`/[organization]/setting-organization/${val}`);
          //   }
          // }}
          className="w-full"
        >
          <TabsList>
            <Link to="/organization/setting-organization">
              <TabsTrigger value="manageorganization">
                องค์กร
                <Building className="w-4 h-4 mr-2" />
              </TabsTrigger>
            </Link>
            <Link to="/organization/setting-organization/branch">
              <TabsTrigger value="branch">
                สาขา
                <Building2 className="w-4 h-4 mr-2" />
              </TabsTrigger>
            </Link>
            <Link to="/organization/setting-organization/third-party">
              <TabsTrigger value="third-party">
                การเชื่อมต่อภายนอก
                <BotMessageSquare className="w-4 h-4 mr-2" />
              </TabsTrigger>
            </Link>

            {/* <Link href="/organization/setting-organization/permission">
              <TabsTrigger value="permission">
                การจัดการบทบาท
                <SlidersVertical className="w-4 h-4 mr-2" />
              </TabsTrigger>
            </Link> */}

            {/* <TabsTrigger value="index">
            แพ็คเกจและการชำระเงิน
            <Wallet className="w-4 h-4 mr-2" />
          </TabsTrigger> */}
          </TabsList>

          <TabsContent value="manageorganization">
            <Outlet />
          </TabsContent>

          <TabsContent value="branch">
            <Outlet />
          </TabsContent>

          <TabsContent value="third-party">
            <Outlet />
          </TabsContent>

          <TabsContent value="permission">
            <Outlet />
          </TabsContent>

          {/* <TabsContent value="index"></TabsContent> */}
        </Tabs>
      </div>
    </React.Fragment>
  );
}
