import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Save } from "lucide-react";
import * as React from "react";
import { useForm, type Resolver, type UseFormReturn } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import { useGetAllDepartments } from "~/api/client/user";
import GlobalButton from "~/components/shared/global-button";
import { GlobalFormField } from "~/components/shared/global-formField";
import ImageUpload from "~/components/shared/image-upload";
import { GlobalModal } from "~/components/shared/modal/modal";
import { RequiredLabel } from "~/components/shared/required-design";
import { useNavigate } from "react-router";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  OnboardSchema,
  type OnboardValues,
} from "~/schemas/on-boarding/onboard";
import CreateCouse from "../create-course";
import { string } from "zod";

type Props = {
  openTemplate: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateTempletDialog({ openTemplate, setOpen }: Props) {
  const navigate = useNavigate();
  const { data } = useGetAllDepartments(true);
  console.log({ data });
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
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <RequiredLabel>แผนก</RequiredLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={(v) => field.onChange(v)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="เลือกแผนก" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              {data?.map((item: any) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div></div>
                  <div className="flex pt-7 ml-20 w-30">
                    <Link to="/on-boarding/content-create">
                      <GlobalButton
                        label={
                          <>
                            <Save /> สร้าง
                          </>
                        }
                        key="create-button"
                        type="submit"
                        // loading={isSubmitting}
                        // form="users"
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
        </DialogContent>
      </Dialog>
    </>
  );
}
