"use client";

import * as React from "react";

import { Check } from "lucide-react";
import { useGetAllUsers } from "~/api/client/customer/useGetUsers";
import type { CustomerFormCreateProps } from "~/schemas/customer/customer";
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
import { Checkbox } from "~/components/ui/checkbox";

export const CustomerSupportSelector: React.FC<CustomerFormCreateProps> = ({
  form,
}) => {
  const { data: allUser, isLoading } = useGetAllUsers();

  const [search, setSearch] = React.useState("");
  const [openMain, setOpenMain] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);
  const supports = form.watch("supports")?.filter((s) => s.userId) || [];
  const mainId = supports.find((s) => s.isMain)?.userId || "";
  const secondaryIds = supports.filter((s) => !s.isMain).map((s) => s.userId);

  const filtered = allUser?.filter((item: any) =>
    item.userName?.toLowerCase().includes(search.toLowerCase())
  );
  const getUserInfo = (users?: any[], id?: string) => {
    if (!users || !id) return null;
    const u = users.find((x) => x.id === id);
    if (!u) return null;
    const profile = u.profile;
    return {
      user: u,
      fullName: `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim(),
      avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${
        u.userName || ""
      }`,
      email: u.email || "",
      department: u.mainDepartment || "",
    };
  };

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name={"supports"}
        render={({ field }) => {
          const main = field.value?.find((s: any) => s.isMain);
          const mainInfo =
            main && allUser ? getUserInfo(allUser, main.userId) : null;

          return (
            <FormItem>
              <FormLabel>ผู้รับผิดชอบหลัก</FormLabel>
              <div className="flex flex-row w-full gap-2 items-center flex-wrap">
                {mainInfo && (
                  <div className="flex items-center gap-2 border px-2 py-1.5 rounded-2xl">
                    <GlobalImage
                      src={mainInfo.avatar}
                      alt={mainInfo.user?.userName || ""}
                      className="w-7 h-7 rounded-2xl"
                    />
                    <div className="flex flex-col text-sm">
                      <span>ชื่อ : {mainInfo.fullName || "-"}</span>
                      <span>อีเมล : {mainInfo.email || "-"}</span>
                      <span>ตำแหน่ง : {mainInfo.department || "-"}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newSupports = secondaryIds.map((id) => ({
                          userId: id,
                        }));
                        form.setValue(
                          "supports",
                          newSupports.length ? newSupports : []
                        );
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
                        ? "กำลังโหลดรายชื่อผู้รับผิดชอบหลัก"
                        : mainInfo
                          ? "เปลี่ยนผู้รับผิดชอบหลัก"
                          : "เลือกผู้รับผิดชอบหลัก +"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-90 max-w-full p-2 flex ml-2">
                    <Command>
                      <CommandInput
                        placeholder="ค้นหาชื่อผู้รับผิดชอบ"
                        value={search}
                        onValueChange={setSearch}
                      />
                      <CommandList className=" overflow-auto scrollbar-hide">
                        {isLoading ? (
                          <div className="p-5 text-gray-400 text-sm">
                            กำลังโหลด...
                          </div>
                        ) : filtered && filtered.length > 0 ? (
                          filtered.map((item: any) => {
                            const info = getUserInfo(allUser, item.id);
                            if (!info) return null;
                            return (
                              <CommandItem
                                key={item.id}
                                onSelect={() => {
                                  form.setValue("supports", [
                                    { userId: item.id, isMain: true },
                                    ...secondaryIds.map((id) => ({
                                      userId: id,
                                    })),
                                  ]);
                                  setOpenMain(false);
                                }}
                                className="flex items-center gap-2 py-1.5"
                              >
                                <GlobalImage
                                  src={info.avatar}
                                  alt={info.user?.userName || ""}
                                  className="w-5 h-5 rounded-2xl"
                                />
                                <div className="flex flex-col text-sm">
                                  <span>ชื่อ : {info.fullName || "-"}</span>
                                  <span>อีเมล : {info.email || "-"}</span>
                                  <span>
                                    ตำแหน่ง : {info.department || "-"}
                                  </span>
                                </div>
                              </CommandItem>
                            );
                          })
                        ) : (
                          <div className="p-5 text-gray-400 text-sm">
                            ไม่มีข้อมูลผู้รับผิดชอบ
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

      {/* ผู้รับผิดชอบรอง */}
      <FormItem>
        <FormLabel>ผู้รับผิดชอบรอง</FormLabel>
        <div className="flex flex-wrap gap-2">
          {secondaryIds.map((id) => {
            const info = getUserInfo(allUser, id!);
            if (!info) return null;
            return (
              <div
                key={id}
                className="flex items-center gap-2 border px-2 py-1.5 rounded-2xl"
              >
                <GlobalImage
                  src={info.avatar}
                  alt={info.fullName}
                  className="w-7 h-7 rounded-2xl"
                />
                <div className="flex flex-col text-sm ">
                  <span>ชื่อ : {info.fullName || "-"}</span>
                  <span>อีเมล : {info.email || "-"}</span>
                  <span>ตำแหน่ง : {info.department || "-"}</span>
                </div>
                <button
                  onClick={() => {
                    const newSecondary = secondaryIds.filter((v) => v !== id);
                    const newSupports = [
                      ...(mainId ? [{ userId: mainId, isMain: true }] : []),
                      ...newSecondary.map((sid) => ({ userId: sid })),
                    ];
                    form.setValue(
                      "supports",
                      newSupports.length ? newSupports : []
                    );
                  }}
                  className="ml-1 text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            );
          })}

          <Popover open={openSub} onOpenChange={setOpenSub}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="px-4 py-2 rounded-2xl"
                disabled={isLoading}
              >
                {isLoading
                  ? "กำลังโหลดผู้รับผิดชอบรอง"
                  : "เพิ่มผู้รับผิดชอบรอง +"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-90 max-w-full p-2 flex ml-2 ">
              <Command>
                <CommandInput
                  placeholder="ค้นหาผู้รับผิดชอบรอง"
                  value={search}
                  onValueChange={setSearch}
                />
                <CommandList>
                  {!allUser || isLoading ? (
                    <div className="p-5 text-gray-400 text-sm">
                      กำลังโหลดผู้รับผิดชอบรอง
                    </div>
                  ) : filtered && filtered.length > 0 ? (
                    filtered
                      .filter((item: any) => item.id !== mainId)
                      .map((item: any) => {
                        const checked = secondaryIds.includes(item.id);
                        const info = getUserInfo(allUser, item.id);
                        if (!info) return null;
                        return (
                          <CommandItem
                            key={item.id}
                            onSelect={() => {
                              const newSecondary = checked
                                ? secondaryIds.filter((v) => v !== item.id)
                                : [...secondaryIds, item.id];
                              form.setValue("supports", [
                                ...(mainId
                                  ? [{ userId: mainId, isMain: true }]
                                  : []),
                                ...newSecondary.map((sid) => ({ userId: sid })),
                              ]);
                            }}
                            className="flex items-center gap-2 py-1.5"
                          >
                            <Checkbox checked={checked} className="mr-2" />
                            <GlobalImage
                              src={info.avatar}
                              alt={info.fullName}
                              className="w-7 h-7 rounded-2xl"
                            />
                            <div className="flex flex-col text-sm">
                              <span>ชื่อ : {info.fullName || "-"}</span>
                              <span>อีเมล : {info.email || "-"}</span>
                              <span>ตำแหน่ง : {info.department || "-"}</span>
                            </div>
                            {checked && <Check className="ml-auto h-4 w-4" />}
                          </CommandItem>
                        );
                      })
                  ) : (
                    <div className="p-5 text-gray-400 text-sm">
                      ไม่มีข้อมูลผู้รับผิดชอบ
                    </div>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </FormItem>
    </div>
  );
};
