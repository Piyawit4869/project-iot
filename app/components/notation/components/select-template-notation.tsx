import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigRight, Check, MoveRight, Save, X } from "lucide-react";
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
  NotationSchema,
  type NotationValues,
} from "~/schemas/notation/notation";
import { string } from "zod";
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
import { TemplateCard } from "~/components/modules/on-boarding/components/Management/template-card";

type Props = {
  openTemplate: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SelectTempletNotation({
  openTemplate,
  setOpen,
}: Props) {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllDepartments(true);
  const formNotation = useForm<NotationValues>({
    resolver: zodResolver(NotationSchema) as Resolver<NotationValues>,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      type: "",
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
      value: "quotation",
      title: "ใบเสนอราคา",
      image: Template1,
    },
    {
      value: "invoice",
      title: "ใบแจ้งหนี้",
      image: Template2,
    },
    {
      value: "receipt",
      title: "ใบเสร็จรับเงิน",
      image: Template3,
    },
  ];

  const onCreate = (values: NotationValues) => string;
  return (
    <>
      <Dialog open={openTemplate} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-4xl w-full max-h-[96vh] overflow-auto rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              เลือกเอกสาร
            </DialogTitle>
            <DialogDescription>
              เลือกประเภทเอกสารที่ต้องการสร้าง
            </DialogDescription>
          </DialogHeader>
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
          <div className="flex justify-end">
            <Link to="single">
              <GlobalButton
                label={
                  <>
                    เริ่มสร้าง
                    <MoveRight />
                  </>
                }
                key="create-button"
                type="submit"
                // loading={isSubmitting}
                // form="users"w
              />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
