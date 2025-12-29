import { Check, X } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { DatePicker } from "~/components/shared/date-picker";
import { GlobalFormField } from "~/components/shared/global-form";
import { GlobalImage } from "~/components/shared/global-image";
import ImageUpload from "~/components/shared/image-upload";
import { RequiredLabel } from "~/components/shared/required-design";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { UsersFormSchema, type UsersFormValues } from "~/schemas/users/user";
import { getRequiredPaths } from "~/utils/form-adapter";
import { OrganizationSelector } from "./formSelectOrganization";
import { formToJSON } from "axios";
import { fetchUserPagination } from "~/api/server/user";

export interface UserFormProfileProps {
  form: UseFormReturn<UsersFormValues>;
  data?: Partial<UsersFormValues>;
  roles?: any;
  loading?: boolean;
  isEdit?: boolean;
}

export const UserProfileCreate: React.FC<UserFormProfileProps> = ({
  form,
  roles,
  loading = false,
}) => {
  const checkFields = new Set(getRequiredPaths(UsersFormSchema as any));
  const [debouncedStatusSearch] = useState<string>("");
  const [openSub, setOpenSub] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const allRoles = Array.isArray(roles) ? roles : [];

  const filtered = allRoles.filter((item: any) => {
    const a = item.name?.toLowerCase().includes(search.toLowerCase());

    return a;
  });

  const pw = form.watch("password");
  const cf = form.watch("confirmPassword");

  useEffect(() => {
    if ((!pw && !cf) || pw === cf) {
      form.clearErrors("confirmPassword");
      return;
    }
    form.setError("confirmPassword", {
      type: "validate",
    });
  }, [pw, cf, form]);

  const statusOptions = [
    { label: "ใช้งานอยู่", value: "active" },
    { label: "ทดลองงาน", value: "probation" },
    { label: "ลาหยุดชั่วคราว", value: "on_leave" },
    { label: "ลาออกแล้ว", value: "resigned" },
    { label: "เลิกจ้าง", value: "terminated" },
  ] as const;

  const filteredStatusOptions = statusOptions.filter((o) =>
    o.label.toLowerCase().includes(debouncedStatusSearch.toLowerCase())
  );
  const handleBlur = async () => {
    const email = form.getValues("email");
    try {
      const res = await fetchUserPagination({
        page: 1,
        limit: 1,
        status: "",
        email,
      });
      const hasDuplicate = Array.isArray(res?.items) && res.items.length > 0;
      if (hasDuplicate) {
        form.setError("email", {
          type: "manual",
          message: "อีเมลนี้ถูกใช้งานแล้ว",
        });
      } else {
        form.clearErrors("email");
      }
    } catch {}
  };

  type OptionItem = { id: string; name: string; active?: boolean }; // ของ list ที่ใช้เลือก

  return (
    <Card>
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

              <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>อีเมล</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="กรอกอีเมล"
                          {...field}
                          value={field.value ?? undefined}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <GlobalFormField
                  control={form.control}
                  name="userName"
                  label="User Name"
                  type="input"
                  checkFields={checkFields}
                  placeholder="กรอกชื่อพนักงาน"
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel required>รหัสผ่าน</RequiredLabel>
                      <FormControl>
                        <Input
                          type="input"
                          placeholder="กรอกรหัสผ่าน"
                          aria-invalid={!!form.formState.errors.confirmPassword}
                          className={
                            (pw || cf) && pw !== cf ? "border-destructive" : ""
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel required>ยืนยันรหัสผ่าน</RequiredLabel>
                      <FormControl>
                        <Input
                          type="input"
                          placeholder="กรอกรหัสผ่านยืนยัน"
                          aria-invalid={!!form.formState.errors.confirmPassword}
                          className={
                            (pw || cf) && pw !== cf ? "border-destructive" : ""
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      {(pw || cf) && pw !== cf ? (
                        <p className="text-sm text-destructive mt-1"></p>
                      ) : null}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="min-auto">
                      <FormLabel>สถานะ</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="เลือกสถานะองค์กร" />
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

                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-0">สถานะ</FormLabel>
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
              </div>

              <div className="md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="organizationRoleId"
                  render={({ field }) => {
                    // const selected = Array.isArray(field.value)
                    //   ? (field.value as {
                    //       id: string;
                    //       name: string;
                    //       active: boolean;
                    //     }[])
                    //   : [];

                    // const toRef = (item: OptionItem) => ({
                    //   id: item.id,
                    //   name: item.name,
                    //   active: item.active ?? true,
                    // });

                    // const selectedIds = new Set(selected.map((s) => s.id));

                    // const toggle = (item: OptionItem) => {
                    //   const exists = selectedIds.has(item.id);
                    //   const next = exists
                    //     ? selected.filter((s) => s.id !== item.id)
                    //     : [...selected, toRef(item)];
                    //   field.onChange(next);
                    //   field.onBlur?.();
                    // };

                    // const removeId = (id: string) => {
                    //   const next = selected.filter((s) => s.id !== id);
                    //   field.onChange(next);
                    //   field.onBlur?.();
                    // };

                    const selectedId = field.value as string | null;
                    const selectedRole = (allRoles ?? []).find(
                      (r) => r.id === selectedId
                    );

                    return (
                      <FormItem>
                        <RequiredLabel required>ตำแหน่ง</RequiredLabel>

                        <div className="flex flex-wrap gap-2">
                          {/* แสดง role ที่มีอยู่แล้ว */}
                          {selectedRole && (
                            <div className="flex items-center gap-2 px-2 py-1.5 rounded-full border">
                              <GlobalImage
                                src={`https://api.dicebear.com/9.x/initials/svg?seed=${selectedRole.name}`}
                                alt={selectedRole.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-sm">
                                {selectedRole.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  field.onChange(null);
                                  field.onBlur?.();
                                }}
                                className="ml-1 text-muted-foreground hover:text-red-500"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                          {!selectedRole && (
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
                                  disabled={!!field.value}
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
                                    {(filtered ?? []).map(
                                      (item: OptionItem) => {
                                        const checked = field.value === item.id;

                                        return (
                                          <CommandItem
                                            key={item.id}
                                            onSelect={() => {
                                              field.onChange(item.id);
                                              setOpenSub(false);
                                            }}
                                          >
                                            <Checkbox
                                              checked={checked}
                                              className="mr-2"
                                            />
                                            {item.name}
                                            {checked && (
                                              <Check className="ml-auto h-4 w-4" />
                                            )}
                                          </CommandItem>
                                        );
                                      }
                                    )}
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          )}
                        </div>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <OrganizationSelector form={form} />
              </div>

              <h1 className="font-bold">ข้อมูลส่วนตัว</h1>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* <GlobalFormField
                  control={form.control}
                  name="profile.prefix"
                  label="คำนำหน้า"
                  type="select"
                  placeholder="mr"
                  // checkFields={checkFields}
                  selectOptions={[
                    { label: "นาย", value: "mr" },
                    { label: "นาง", value: "mrs" },
                    { label: "นางสาว", value: "ms" },
                  ]}
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
                  name="profile.firstName"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel required>ชื่อ (อังกฤษ)</RequiredLabel>
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
                      <RequiredLabel required>นามสกุล (อังกฤษ)</RequiredLabel>
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
                {/* <GlobalFormField
                  control={form.control}
                  name="profile.gender"
                  label="เพศ"
                  type="select"
                  placeholder="ชาย / หญิง"
                  // checkFields={checkFields}
                  selectOptions={[
                    { label: "ชาย", value: "male" },
                    { label: "หญิง", value: "female" },
                    { label: "ไม่ระบุ", value: "not_specified" },
                  ]}
                /> */}
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
                <FormField
                  control={form.control}
                  name="profile.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เบอร์โทรศัพท์</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="กรอกเบอร์โทร"
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
                  name="profile.taxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เลขประจำตัวผู้เสียภาษี</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="กรอกเลขประจำตัวผู้เสียภาษี"
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
                          value={field.value ?? undefined}
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
                          value={field.value ?? undefined}
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
                          value={field.value ?? undefined}
                          onChange={(val) => field.onChange(val ?? undefined)}
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
                          value={field.value ?? undefined}
                          onChange={(val) => field.onChange(val ?? undefined)}
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
    </Card>
  );
};
