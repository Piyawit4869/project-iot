import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Save, X } from "lucide-react";
import * as React from "react";
import { useForm, type Resolver, type UseFormReturn } from "react-hook-form";
import { Link } from "react-router";
import { useGetAllDepartments } from "~/api/client/user";
import GlobalButton from "~/components/shared/global-button";
import { RequiredLabel } from "~/components/shared/required-design";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  OnboardSchema,
  type OnboardValues,
} from "~/schemas/on-boarding/onboard";
import { string } from "zod";
import { TemplateCard } from "./template-card";
import Template1 from "/assets/images/Template1.png";
import Template2 from "/assets/images/Template2.png";
import Template3 from "/assets/images/Template3.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Checkbox } from "~/components/ui/checkbox";
import { GlobalImage } from "~/components/shared/global-image";

type Props = {
  openTemplate: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateTempletDialog({ openTemplate, setOpen }: Props) {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllDepartments(true);
  const formOnboard = useForm<OnboardValues>({
    resolver: zodResolver(OnboardSchema) as Resolver<OnboardValues>,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      department: "",
      templete: "",
    },
  });
  const [selected, setSelected] = useState("template1");
  const [openSub, setOpenSub] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const userDepartments = Array.isArray(data) ? data : [];
  const filtered = userDepartments.filter((item: any) => {
    const a = item.name?.toLowerCase().includes(search.toLowerCase());

    return a;
  });
  type OptionItem = { id: string; name: string; active?: boolean };

  const templates = [
    {
      value: "template1",
      title: "ฝ่ายบุคคล (HR)",
      image: Template1,
    },
    {
      value: "template2",
      title: "ฝ่ายการผลิต (PDD)",
      image: Template2,
    },
    {
      value: "template3",
      title: "ฝ่ายขาย (Sale)",
      image: Template3,
    },
  ];

  const onCreate = (values: OnboardValues) => string;
  return (
    <>
      <Dialog open={openTemplate} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-4xl w-full max-h-[96vh] overflow-auto rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              สร้างเทมเพลต
            </DialogTitle>
            <DialogDescription>สร้างตัวเลือกเทมเพลตใหม่</DialogDescription>
          </DialogHeader>
          <div className="flex justify-between">
            <Form {...formOnboard}>
              <form id="Onboard" onSubmit={formOnboard.handleSubmit(onCreate)}>
                <div className="grid grid-cols-4 gap-3">
                  <FormField
                    control={formOnboard.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <RequiredLabel>ตั้งชื่อหัวข้อ</RequiredLabel>
                        <FormControl>
                          <Input
                            value={field.value}
                            placeholder="ใส่ชื่อหัวข้อของคุณ"
                            onChange={(e) => field.onChange(e)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formOnboard.control}
                    name="department"
                    render={({ field }) => {
                      const selected = Array.isArray(field.value)
                        ? (field.value as {
                            id: string;
                            name: string;
                            active: boolean;
                          }[])
                        : [];

                      const toRef = (item: OptionItem) => ({
                        id: item.id,
                        name: item.name,
                        active: item.active ?? true,
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
                        (userDepartments ?? []).find((d) => d.id === id);

                      return (
                        <FormItem>
                          <RequiredLabel required>แผนก</RequiredLabel>
                          <div className="flex flex-wrap gap-2">
                            {selected.map((ref) => {
                              const dep = findDep(ref.id);
                              const depId = ref.id;
                              const depName = dep?.name ?? ref.name ?? "-";
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
                                  className="px-4 py-2 w-full"
                                  disabled={!!selected.length}
                                >
                                  เลือกแผนก
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
                                        const checked = selectedIds.has(
                                          item.id
                                        );
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
                                      }
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

                  <div></div>
                  <div className="flex pt-7 ml-20 w-30">
                    <Link to="create">
                      <GlobalButton
                        className="ml-5"
                        label={
                          <>
                            <Save /> สร้าง
                          </>
                        }
                        key="create-button"
                        type="submit"
                        // loading={isSubmitting}
                        // form="users"w
                      />
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>
          <DialogTitle className="text-2xl font-bold">เลือกเทมเพลต</DialogTitle>
          <DialogDescription>
            คุณสามารถเลือกตัวเลือกเทมเพลตที่มี
          </DialogDescription>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {templates.map((item) => (
              <TemplateCard
                key={item.value}
                value={item.value}
                title={item.title}
                image={item.image}
                selected={selected}
                onSelect={setSelected}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
