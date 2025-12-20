"use client";

import * as React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { GlobalImage } from "~/components/shared/global-image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import type { UserFormProfileProps } from "./formInformationCreate";
import { useGetUserBranches, useSearchUserOrgs } from "~/api/client/user";
import { useRouteLoaderData } from "react-router";
import { cn } from "~/lib/utils";

export const OrganizationSelector: React.FC<UserFormProfileProps> = ({
  form,
  isEdit = false,
}) => {
  const { user } = useRouteLoaderData("root");
  const organizationGroup = Boolean(user?.organizationGroup?.id);
  const organizationId = user?.organization?.id;
  const { data: organizations, isLoading } = useSearchUserOrgs(
    organizationGroup,
    ""
  );
  const { data: branchs } = useGetUserBranches(organizationId, "");

  const [search, setSearch] = React.useState("");
  const [openMain, setOpenMain] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);

  // const filtered = organizations.filter((item: any) => {
  //   const a = item.name?.toLowerCase().includes(search.toLowerCase());

  //   return a;
  // });

  // const supports = form.watch("supports")?.filter((s) => s.userId) || [];
  // const mainId = supports.find((s) => s.isMain)?.userId || "";
  // const secondaryIds = supports.filter((s) => !s.isMain).map((s) => s.userId);

  // const filtered = organizations?.filter((item: any) =>
  //   item.userName?.toLowerCase().includes(search.toLowerCase())
  // );
  // const getOrganizationInfo = (users?: any[], id?: string) => {
  //   if (!users || !id) return null;
  //   const u = users.find((x) => x.id === id);
  //   if (!u) return null;
  //   const profile = u.profile;
  //   return {
  //     user: u,
  //     fullName: `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim(),
  //     avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${
  //       u.userName || ""
  //     }`,
  //     email: u.email || "",
  //     department: u.mainDepartment || "",
  //   };
  // };

  return (
    <div
      className={cn(
        "grid gap-4",
        isEdit ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
      )}
    >
      <FormField
        control={form.control}
        name={"organizationId"}
        render={({ field }) => {
          // const main = field.value?.find((s: any) => s.isMain);
          // const mainInfo =
          //   main && allUser ? getUserInfo(allUser, main.userId) : null;
          const selectorganization =
            organizations?.find((o: any) => o.id === field.value) ?? null;

          return (
            <FormItem>
              <FormLabel>องค์กร</FormLabel>
              <div className="flex flex-row w-full gap-2 items-center flex-wrap">
                {selectorganization && (
                  <div className="flex items-center gap-2 border px-2 py-1.5 rounded-2xl">
                    <GlobalImage
                      src={selectorganization?.logoUrl}
                      alt={selectorganization?.nameEn || ""}
                      className="w-7 h-7 rounded-2xl"
                    />
                    <div className="flex flex-col text-sm">
                      <span>
                        ชื่อองค์กร : {selectorganization.nameEn || "-"}
                      </span>
                      <span>
                        โดเมน : {selectorganization.domainName || "-"}
                      </span>
                      <span>
                        อีเมลติดต่อ : {selectorganization.contactEmail || "-"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        field.onChange("");
                        field.onBlur?.();
                      }}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                )}

                <Popover open={openMain} onOpenChange={setOpenMain}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="px-4 py-2 rounded-2xl"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "กำลังโหลดรายชื่อองค์กร..."
                        : selectorganization
                          ? "เปลี่ยนองค์กร"
                          : "เลือกองค์กร +"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-90 max-w-full p-2 flex ml-2">
                    <Command>
                      <CommandInput
                        placeholder="ค้นหาชื่อองค์กร"
                        value={search}
                        onValueChange={setSearch}
                      />
                      <CommandList className=" overflow-auto scrollbar-hide">
                        {isLoading ? (
                          <div className="p-5 text-gray-400 text-sm">
                            กำลังโหลด...
                          </div>
                        ) : organizations && organizations.length > 0 ? (
                          organizations.map((item: any) => {
                            return (
                              <CommandItem
                                key={item.id}
                                onSelect={() => {
                                  field.onChange(item.id);
                                  form.setValue(
                                    "organizationId",
                                    String(item.id),
                                    {
                                      shouldDirty: true,
                                      shouldTouch: true,
                                      shouldValidate: true,
                                    }
                                  );
                                  setOpenMain(false);
                                }}
                                className="flex items-center gap-2 py-1.5"
                              >
                                <GlobalImage
                                  src={item?.logoUrl}
                                  alt={item?.nameEn || ""}
                                  className="w-5 h-5 rounded-2xl"
                                />
                                <div className="flex flex-col text-sm">
                                  <span>ชื่อองค์กร : {item.nameEn || "-"}</span>
                                  <span>โดเมน : {item.domainName || "-"}</span>
                                  <span>
                                    อีเมลติดต่อ :{item.contactEmail || "-"}
                                  </span>
                                </div>
                              </CommandItem>
                            );
                          })
                        ) : (
                          <div className="p-5 text-gray-400 text-sm">
                            ไม่มีข้อมูลองค์กร
                          </div>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name={"branchId"}
        render={({ field }) => {
          // const main = field.value?.find((s: any) => s.isMain);
          // const mainInfo =
          //   main && allUser ? getUserInfo(allUser, main.userId) : null;
          const formatBranch = Array.isArray(branchs?.branches)
            ? branchs?.branches
            : [];

          const selectBranch =
            formatBranch?.find((o: any) => o.id === field.value) ?? null;

          return (
            <FormItem>
              <FormLabel>สาขา</FormLabel>
              <div className="flex flex-row w-full gap-2 items-center flex-wrap">
                {selectBranch && (
                  <div className="flex items-center gap-2 border px-2 py-1.5 rounded-2xl">
                    <GlobalImage
                      src={selectBranch?.logoUrl}
                      alt={selectBranch?.nameEn || ""}
                      className="w-7 h-7 rounded-2xl"
                    />
                    <div className="flex flex-col text-sm">
                      <span>ชื่อองค์กร : {selectBranch.nameEn || "-"}</span>
                      <span>
                        อีเมลติดต่อ : {selectBranch.contactEmail || "-"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        field.onChange("");
                        field.onBlur?.();
                      }}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                )}

                <Popover open={openSub} onOpenChange={setOpenSub}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="px-4 py-2 rounded-2xl"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "กำลังโหลดรายชื่อสาขา..."
                        : selectBranch
                          ? "เปลี่ยนสาขา"
                          : "เลือกสาขา +"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-90 max-w-full p-2 flex ml-2">
                    <Command>
                      <CommandInput
                        placeholder="ค้นหาชื่อสาขา"
                        value={search}
                        onValueChange={setSearch}
                      />
                      <CommandList className=" overflow-auto scrollbar-hide">
                        {isLoading ? (
                          <div className="p-5 text-gray-400 text-sm">
                            กำลังโหลด...
                          </div>
                        ) : formatBranch && formatBranch.length > 0 ? (
                          formatBranch.map((item: any) => {
                            return (
                              <CommandItem
                                key={item.id}
                                onSelect={() => {
                                  field.onChange(item.id);
                                  form.setValue("branchId", String(item.id), {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                    shouldValidate: true,
                                  });
                                  setOpenSub(false);
                                }}
                                className="flex items-center gap-2 py-1.5"
                              >
                                <GlobalImage
                                  src={item?.logoUrl}
                                  alt={item?.nameEn || ""}
                                  className="w-5 h-5 rounded-2xl"
                                />
                                <div className="flex flex-col text-sm">
                                  <span>ชื่อองค์กร : {item.nameEn || "-"}</span>
                                  <span>
                                    อีเมลติดต่อ :{item.contactEmail || "-"}
                                  </span>
                                </div>
                              </CommandItem>
                            );
                          })
                        ) : (
                          <div className="p-5 text-gray-400 text-sm">
                            ไม่มีข้อมูลสาขา
                          </div>
                        )}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
};
