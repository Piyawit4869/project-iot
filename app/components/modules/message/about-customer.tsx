"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";

import { useForm } from "react-hook-form";
import { CircleEllipsis } from "lucide-react";
import { TagsSelectorModal } from "~/components/shared/tags-selector-modal";

import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useChatRoom } from "~/providers/chat/useChatRoom";
import type {
  CustomerUpdateChatDetails,
  CustomerUpdateChatDetailsAndTags,
  CustomerUpdateTags,
} from "~/schemas/customer/customer";
import { useUpdateCustomerChatDetailsAndTags } from "~/api/client/customer/useCustomer";
import { StarRating } from "~/components/shared/StarRating";
import { customerStatus, customerType } from "~/initData/customer-initData";
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
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

type FormValues = {
  lineName: string;
  customerName: string;
  status: string;
  customerType: string;
  tags: { name: string; active: boolean }[];
  remark: string;
  rating: number;
};

type ChecklistDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  customer: any;
  setAddCustomerDetail?: any;
};

export const AboutCustomer: React.FC<ChecklistDialogProps> = (props) => {
  const { open, onOpenChange, customer, setAddCustomerDetail } = props;

  const { mutate: upDateCustomerChatDetailsAndTags } =
    useUpdateCustomerChatDetailsAndTags(customer?.id ?? "");

  const { refetchCustomer } = useChatRoom();

  const navigate = useNavigate();

  const form = useForm<FormValues>({
    defaultValues: {
      customerName: "",
      customerType: "ordinary_person",
      status: "newly_registered",
      tags: [],
      remark: "",
      rating: 0,
      lineName: "",
    },
  });

  const submitHandler = (data: any) => {
    const detailsBody: CustomerUpdateChatDetails = {
      customerName: data.customerName ?? "",
      status: data.status ?? "",
      remark: data.remark ?? "",
      rating: data.rating ?? 0,
      customerType: data.customerType ?? "",
      lineName: data.lineName ?? "",
    };

    const tagsBody: CustomerUpdateTags = {
      tags: data.tags ?? [],
    };

    const combineBody: CustomerUpdateChatDetailsAndTags = {
      chatDetails: detailsBody,
      tags: tagsBody,
    };

    const toastIdChatDetails: string | number = toast.loading(
      "กำลังบันทึกข้อมูลของลูกค้าเบื้องต้น และ แท็ก..."
    );

    upDateCustomerChatDetailsAndTags(combineBody, {
      onSuccess: () => {
        toast.success("แก้ไขรายละเอียด และ รายการแท็กเรียบร้อยแล้ว!", {
          id: toastIdChatDetails,
        });

        setAddCustomerDetail?.(false);
        refetchCustomer();
      },
      onError: () => {
        toast.error(
          "แก้ไขรายละเอียด และ รายการแท็กไม่ไม่สำเร็จ กรุณาลองใหม่อีกครั้งภายหลัง",
          {
            id: toastIdChatDetails,
          }
        );
      },
    });
  };

  React.useEffect(() => {
    if (!open) return;

    const tagsMap =
      customer?.tags?.map((tag: any) => {
        return {
          name: tag.name,
          active: tag.active,
        };
      }) ?? [];

    form.reset({
      customerName: customer?.profile?.name ?? "",
      status: customer?.status ?? "",
      tags: tagsMap,
      remark: customer?.remark ?? "",
      rating: customer?.priority ?? 0,
      customerType: customer?.customerType ?? "",
      lineName: customer?.profile?.lineName ?? "",
    });
  }, [open, form, customer]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg w-full max-h-[110vh] overflow-auto p-6 rounded-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="mb-2">ข้อมูลลูกค้าเบื้องต้น</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="sort-customer-update"
            className="space-y-5"
            onSubmit={form.handleSubmit(submitHandler)}
          >
            <FormItem>
              <FormLabel>ชื่อไลน์ของลูกค้า</FormLabel>
              <div className="mt-1">
                <span>{customer?.profile?.lineName ?? ""}</span>
              </div>
            </FormItem>
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อลูกค้า</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="กรุณากรอกชื่อลูกค้า"
                      maxLength={20}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ความสำคัญ */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>ความสำคัญ</FormLabel>
                  <div className="flex items-center gap-1 mt-1">
                    <StarRating rating={value} onRate={onChange} size={40} />
                  </div>
                </FormItem>
              )}
            />
            {/* สถานะลูกค้า */}
            <FormField
              control={form.control}
              name="customerType"
              rules={{ required: "กรุณาเลือกประเภทลูกค้า" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    สถานะลูกค้า <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={(v) => field.onChange(v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="เลือกประเภทของลูกค้า" />
                      </SelectTrigger>
                      <SelectContent>
                        {customerType.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
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
              name="status"
              rules={{ required: "กรุณาเลือกสถานะลูกค้า" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    สถานะลูกค้า <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={(v) => field.onChange(v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="เลือกสถานะของลูกค้า" />
                      </SelectTrigger>
                      <SelectContent>
                        {customerStatus.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* บันทึกเพิ่มเติม */}
            <FormField
              control={form.control}
              name="remark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>บันทึกเพิ่มเติม</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ระบุเพิ่มเติม..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                size={"sm"}
                className="w-[140px] py-5 bg-white border border-[#E4E4E7] text-black hover:bg-white"
                type="button"
                onClick={() => {
                  navigate(`/customer/${customer.id}`);
                }}
              >
                <CircleEllipsis className="mr-1" />
                ดูข้อมูลเพิ่มเติม
              </Button>
              <Button size={"sm"} className="w-[140px] py-5" type="submit">
                ยืนยัน
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
