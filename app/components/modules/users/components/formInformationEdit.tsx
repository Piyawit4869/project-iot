import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import React, { useState } from "react";
import ImageUpload from "~/components/shared/image-upload";

import { GlobalFormField } from "~/components/shared/global-form";

import { DatePicker } from "~/components/shared/date-picker";
import { RequiredLabel } from "~/components/shared/required-design";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { GlobalImage } from "~/components/shared/global-image";
import { Check, X } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { UsersFormSchema, type UsersFormValues } from "~/schemas/users/user";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { getRequiredPaths } from "~/utils/form-adapter";
import { nationalityMap, religionMap } from "~/initData/user-initData";
import ChangePassword from "~/components/shared/change-password";
import { OrganizationSelector } from "./formSelectOrganization";
import { RadioCardGroup } from "~/components/shared/global-radio-card";
import { gender, prefix } from "~/initData/customer-initData";
import { InputNumberBox } from "~/components/shared/input-number-box";

type OptionItem = { id: string; name: string; active?: boolean };

export interface UserFormProfileProps {
  form: UseFormReturn<UsersFormValues>;
  data?: Partial<UsersFormValues>;
  loading?: boolean;
  roles: any;
}

export const UserProfileEdit: React.FC<UserFormProfileProps> = ({
  form,
  roles,
  loading = false,
}) => {
  const checkFields = new Set(getRequiredPaths(UsersFormSchema as any));
  const [debouncedStatusSearch] = useState<string>("");
  const [search, setSearch] = React.useState("");
  const [openSub, setOpenSub] = React.useState(false);

  const userRoles = Array.isArray(roles) ? roles : [];

  const filtered = userRoles.filter((item: any) => {
    const a = item.name?.toLowerCase().includes(search.toLowerCase());

    return a;
  });

  const statusOptions = [
    { label: "พนักงานงานใหม่", value: "new_user" },
    { label: "ใช้งานอยู่", value: "active" },
    { label: "พนักงานที่ไม่ใช้งานมานาน", value: "inactive" },
    { label: "พนักงานที่ถูกระงับการใช้งาน", value: "suspended" },
    { label: "พนักงานที่ลบบัญชีออกจากระบบ", value: "deleted" },
  ] as const;

  const filteredStatusOptions = statusOptions.filter((o) =>
    o.label.toLowerCase().includes(debouncedStatusSearch.toLowerCase())
  );
  return (
    <>
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="text-base font-bold">ข้อมูลพนักงาน</CardTitle>
        </div>
      </CardHeader>

      {loading ? (
        <CardContent className="space-y-4 ">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          <div className=" w-full">
            <div className="lg:col-span-2 flex flex-col gap-3">
              <FormField
                control={form.control}
                name="profile.imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รูปพนักงาน</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="object-contain"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-0">การใช้งาน เปิด/ปิด</FormLabel>
                    <FormControl>
                      <Switch
                        className="mt-3"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* <GlobalFormField
                  control={form.control}
                  name="userName"
                  label="ชื่อพนักงาน"
                  type="input"
                  checkFields={checkFields}
                  placeholder="กรอกชื่อพนักงาน"
                /> */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="min-auto">
                      <FormLabel>สถานะพนักงาน</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="เลือกสถานะ" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredStatusOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <GlobalFormField
                  control={form.control}
                  name="userName"
                  label="ชื่อพนักงาน"
                  type="input"
                  checkFields={checkFields}
                  placeholder="กรกอรชื่อพนักงาน"
                />
                <div className="col-span-2">
                  <GlobalFormField
                    control={form.control}
                    name="email"
                    label="อีเมล"
                    type="input"
                    checkFields={checkFields}
                    placeholder="กรอกอีเมล"
                  />
                </div>
                <div className="col-span-2">
                  <ChangePassword title="เปลี่ยนรหัสผ่าน" />
                </div>
              </div>
              <div className="md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="rolesId"
                  render={({ field }) => {
                    const selected = Array.isArray(field.value)
                      ? (field.value as {
                          id: string;
                          name: string;
                          active: boolean;
                          department: any;
                        }[])
                      : [];

                    const toRef = (item: any) => ({
                      id: item.id,
                      name: item.name,
                      active: item.active ?? true,
                      department: item,
                    });

                    const selectedIds = new Set(selected.map((s) => s.id));

                    const toggle = (item: OptionItem) => {
                      const exists = selectedIds.has(item.id);
                      const next = exists
                        ? selected.filter((s) => s.id !== item.id)
                        : [...selected, toRef(item)];
                      field.onChange(next);
                      field.onBlur?.();
                    };

                    const removeId = (id: string) => {
                      const next = selected.filter((s) => s.id !== id);
                      field.onChange(next);
                      field.onBlur?.();
                    };

                    const findDep = (id?: string) =>
                      (userRoles ?? []).find((d) => d.id === id);

                    return (
                      <FormItem>
                        <RequiredLabel required>ตำแหน่ง</RequiredLabel>
                        <div className="flex flex-wrap gap-2">
                          {selected.map((s) => {
                            const dep = findDep(s.id);
                            const depId = s.id;
                            const depName =
                              dep?.department?.name ??
                              s.department?.name ??
                              "-";
                            return (
                              <div
                                key={depId}
                                className="flex items-center gap-2 border-1 px-2 py-1.5 rounded-full"
                              >
                                <GlobalImage
                                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${depName}`}
                                  alt={depName}
                                  className="w-6 h-6 rounded-full"
                                />
                                <span>{depName}</span>
                                <button
                                  type="button"
                                  onClick={() => removeId(depId)}
                                  className="ml-1 text-gray-500 hover:text-red-500"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            );
                          })}

                          <Popover
                            open={openSub}
                            onOpenChange={(v) => {
                              setOpenSub(v);
                              if (!v) field.onBlur?.();
                            }}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                type="button"
                                variant="outline"
                                className="px-4 py-2 rounded-full"
                                disabled={!!selected.length}
                              >
                                เพิ่มตำแหน่ง +
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                              <Command>
                                <CommandInput
                                  placeholder="ค้นหา..."
                                  value={search}
                                  onValueChange={setSearch}
                                />
                                <CommandEmpty>ไม่มีข้อมูล</CommandEmpty>
                                <CommandList>
                                  {(filtered ?? []).map((item: OptionItem) => {
                                    const checked = selectedIds.has(item.id);
                                    return (
                                      <CommandItem
                                        key={item.id}
                                        onSelect={() => {
                                          toggle(item);
                                          setOpenSub(false);
                                        }}
                                      >
                                        <Checkbox
                                          checked={checked}
                                          onCheckedChange={() => {
                                            toggle(item);
                                            setOpenSub(false);
                                          }}
                                          className="mr-2"
                                        />
                                        {item.name}
                                        {checked && (
                                          <Check className="ml-auto h-4 w-4" />
                                        )}
                                      </CommandItem>
                                    );
                                  })}
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
              <div>
                <OrganizationSelector form={form} roles={roles} isEdit={true} />
              </div>

              <h1 className="font-bold">ข้อมูลส่วนตัว</h1>
              <div className=" grid grid-cols-1 md:grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="profile.prefix"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel>คำนำหน้า</RequiredLabel>

                      <RadioCardGroup
                        options={prefix}
                        value={field.value || ""}
                        onChange={field.onChange}
                        columns={3}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="profile.firstName"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel required>ชื่อ</RequiredLabel>
                      <FormControl>
                        <Input placeholder="กรอกชื่อ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profile.lastName"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel required>นามสกุล</RequiredLabel>
                      <FormControl>
                        <Input placeholder="กรอกนามสกุล" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profile.firstNameTh"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชื่อ (ไทย)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="กรอกชื่อ"
                          {...field}
                          value={field.value ?? undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profile.lastNameTh"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>นามสกุล (ไทย)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="กรอกนามสกุล"
                          {...field}
                          value={field.value ?? undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="profile.firstNameTh"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชื่อ (ไทย)</FormLabel>
                      <FormControl>
                        <Input placeholder="กรอกชื่อ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profile.lastNameTh"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>นามสกุล (ไทย)</FormLabel>
                      <FormControl>
                        <Input placeholder="กรอกนามสกุล" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="profile.nickName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชื่อเล่น</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="กรอกชื่อเล่น"
                          {...field}
                          value={field.value ?? undefined}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profile.birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>วันเกิด</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value ?? undefined}
                          onChange={(val) => field.onChange(val ?? undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-1 gap-5 mt-4">
                <FormField
                  control={form.control}
                  name="profile.gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เพศ</FormLabel>
                      <FormControl>
                        <RadioCardGroup
                          options={gender}
                          value={field.value || ""}
                          onChange={field.onChange}
                          columns={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <GlobalFormField
                  control={form.control}
                  name="profile.gender"
                  label="เพศ"
                  type="select"
                  placeholder="ชาย / หญิง"
                  checkFields={checkFields}
                  selectOptions={[
                    { label: "ชาย", value: "male" },
                    { label: "หญิง", value: "female" },
                    { label: "ไม่ระบุ", value: "not_specified" },
                  ]}
                /> */}
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-1 gap-5 mt-4">
                <FormField
                  control={form.control}
                  name="profile.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เบอร์โทรศัพท์</FormLabel>
                      <FormControl>
                        <InputNumberBox
                          value={field.value || ""}
                          onChange={field.onChange}
                          groups={[3, 3, 4]}
                          format="-"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <FormField
                  control={form.control}
                  name="profile.age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>อายุ</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="กรอกอายุ"
                          {...field}
                          value={field.value ?? undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profile.nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>สัญชาติ</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="กรอกสัญชาติ"
                          {...field}
                          value={
                            nationalityMap[
                              field.value as keyof typeof nationalityMap
                            ] ??
                            field.value ??
                            ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profile.religion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ศาสนา</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="กรอกศาสนา"
                          {...field}
                          value={
                            religionMap[
                              field.value as keyof typeof religionMap
                            ] ??
                            field.value ??
                            ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profile.weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>น้ำหนัก</FormLabel>
                      <FormControl>
                        <Input placeholder="กรอกน้ำหนัก" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profile.height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ส่วนสูง</FormLabel>
                      <FormControl>
                        <Input placeholder="กรอกส่วนสูง" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profile.startWorkDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>วันที่เริ่มงาน</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profile.endWorkDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>วันที่สิ้นสุดงาน</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <FormField
                  control={form.control}
                  name="profile.taxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เลขประจำตัวผู้เสียภาษี</FormLabel>
                      <FormControl>
                        <InputNumberBox
                          value={field.value || ""}
                          onChange={field.onChange}
                          groups={[1, 4, 5, 2, 1]}
                          format="-"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </>
  );
};
