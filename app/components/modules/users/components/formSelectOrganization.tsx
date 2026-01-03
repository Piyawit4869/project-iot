"use client";

import * as React from "react";
import { cn } from "~/lib/utils";
import { useRouteLoaderData } from "react-router";
import { useGetUserBranches, useSearchUserOrgs } from "~/api/client/user";
import type { UserFormProfileProps } from "./formInformationCreate";
import { GlobalImage } from "~/components/shared/global-image";
import { Button } from "~/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Label } from "~/components/ui/label";

export const OrganizationSelector: React.FC<UserFormProfileProps> = ({
  form,
  isEdit = false,
}) => {
  const { user } = useRouteLoaderData("root");
  const organization = user?.organization;
  const organizationId = user?.organization?.id;
  const organizationGroupId = user?.organization?.organizationGroupId;

  const { data: organizations, isLoading } = useSearchUserOrgs("");
  const organizationsId = form.watch("organizationId") || organizationId;
  const { data: branchs } = useGetUserBranches(organizationsId, "");

  const [search, setSearch] = React.useState("");
  const [openMain, setOpenMain] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);

  const arrayOrganization = Array.isArray(organizations?.organizations)
    ? organizations?.organizations
    : [];
  const arrayBranch = Array.isArray(branchs?.branches) ? branchs?.branches : [];
  const selectedOrganizationId = form.watch("organizationId");
  const canSelectBranch = !!selectedOrganizationId;

  return (
    <div
      className={cn(
        "grid gap-4",
        isEdit ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
      )}
    >
      {!organizationGroupId ? (
        <div>
          <Label className="mb-2">องค์กร</Label>
          <div className="flex items-center gap-2 border px-2 py-1.5 rounded-2xl">
            <GlobalImage
              src={organization?.logoUrl}
              alt={organization?.nameTh || ""}
              className="w-7 h-7 rounded-2xl"
            />
            <div className="flex flex-col text-sm">
              <span>ชื่อองค์กร : {organization.nameTh || "-"}</span>
            </div>
          </div>
        </div>
      ) : (
        <FormField
          control={form.control}
          name={"organizationId"}
          render={({ field }) => {
            const selectorganization =
              arrayOrganization?.find((o: any) => o.id === field.value) ?? null;

            return (
              <FormItem>
                <FormLabel>องค์กร</FormLabel>
                <div className="flex flex-row w-full gap-2 items-center flex-wrap">
                  {selectorganization && (
                    <div className="flex items-center gap-2 border px-2 py-1.5 rounded-2xl">
                      <GlobalImage
                        src={selectorganization?.logoUrl}
                        alt={selectorganization?.nameTh || ""}
                        className="w-7 h-7 rounded-2xl"
                      />
                      <div className="flex flex-col text-sm">
                        <span>
                          ชื่อองค์กร : {selectorganization.nameTh || "-"}
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
                          ) : arrayOrganization &&
                            arrayOrganization.length > 0 ? (
                            arrayOrganization.map((item: any) => {
                              return (
                                <CommandItem
                                  key={item.id}
                                  value={item.id}
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
                                    alt={item?.nameTh || ""}
                                    className="w-5 h-5 rounded-2xl"
                                  />
                                  <div className="flex flex-col text-sm">
                                    <span>
                                      ชื่อองค์กร : {item.nameTh || "-"}
                                    </span>
                                    <span>
                                      โดเมน : {item.domainName || "-"}
                                    </span>
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
      )}

      <FormField
        control={form.control}
        name={"branchId"}
        render={({ field }) => {
          const selectBranch =
            arrayBranch?.find((o: any) => o.id === field.value) ?? null;

          return (
            <FormItem>
              <FormLabel>สาขา</FormLabel>
              <div className="flex flex-row w-full gap-2 items-center flex-wrap">
                {selectBranch && (
                  <div className="flex items-center gap-2 border px-2 py-1.5 rounded-2xl">
                    <GlobalImage
                      src={selectBranch?.logoUrl}
                      alt={selectBranch?.nameTh || ""}
                      className="w-7 h-7 rounded-2xl"
                    />
                    <div className="flex flex-col text-sm">
                      <span>ชื่อสาขา : {selectBranch.nameTh || "-"}</span>
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
                      disabled={!canSelectBranch || isLoading}
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
                        ) : arrayBranch && arrayBranch.length > 0 ? (
                          arrayBranch.map((item: any) => {
                            return (
                              <CommandItem
                                key={item.id}
                                value={item.id}
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
                                  alt={item?.nameTh || ""}
                                  className="w-5 h-5 rounded-2xl"
                                />
                                <div className="flex flex-col text-sm">
                                  <span>ชื่อสาขา : {item.nameTh || "-"}</span>
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
