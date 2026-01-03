import { GlobalImage } from "~/components/shared/global-image";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import { StarRating } from "~/components/shared/StarRating";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { FormField, FormItem, FormMessage } from "~/components/ui/form";
import type { CustomerFormCreateProps } from "~/schemas/customer/customer";

import { GlobalTagsBadge } from "~/components/shared/global-tags";
import React from "react";
import { GlobalFormField } from "~/components/shared/global-formField";
import { RequiredLabel } from "~/components/shared/required-design";
import { TagsSelectorModal } from "~/components/shared/tags-selector-modal";

import { useWatch } from "react-hook-form";
import { EditActionButtons } from "../edit-action-buttons";
import { useNavigate } from "react-router";

import {
  useCreateCustomerSupoort,
  useDeleteCustomerSupport,
} from "~/api/client/customer/useGetCustomerSupport";
import { useGetSearchUsers } from "~/api/client/user";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
import type { CustomerSupportFormValues } from "~/schemas/customer/support/support";
import type { Participant } from "~/types/customers/participant";
import { ParticipantsSection } from "../participants-section";
import { formatPhoneNumber } from "~/components/shared/global-format";
import { useDebounce } from "~/hooks/use-debounce";

export const ContactCustomer: React.FC<CustomerFormCreateProps> = ({
  customer,
  form,
  loading = false,
  onClick,
  mode = "view",
  onEditForm,
  onCancel,
  fetchCustomer,
}) => {
  const contact = useWatch({ name: "contacts.0" });
  const mainSupport = customer?.supports?.find((s: any) => s.isMain);
  const secondarySupports = customer?.supports?.filter((s: any) => !s.isMain);
  const isEdit = mode === "view" ? false : true;
  const phoneContactState = form.watch("contacts.0.phone");
  const nameContactState = form.watch("contacts.0.name");

  const [search, setSearch] = React.useState<string>("");
  const debouncedSearch = useDebounce(search);

  const {
    data: allUser,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useGetSearchUsers(debouncedSearch);

  const { mutate: createCustomerSupport, isPending: isCreatingSupport } =
    useCreateCustomerSupoort(customer?.chatRoomDetail?.chatRoomId ?? "");

  const { mutate: DeleteCustomerSupport } = useDeleteCustomerSupport(
    customer?.chatRoomDetail?.chatRoomId ?? ""
  );

  const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false);
  const [isPopoverMainParticipantsOpen, setIsPopoverMainParticipantsOpen] =
    React.useState<boolean>(false);

  const navigate = useNavigate();

  const participants = customer?.chatRoomDetail?.participants ?? [];

  const mainParticipant = React.useMemo<Participant | undefined>(() => {
    return participants.find((p: Participant) => p.isMain);
  }, [participants]);

  const normalParticipants = React.useMemo<Participant[]>(() => {
    return participants.filter((p: Participant) => !p.isMain);
  }, [participants]);

  const supportedUserIds = React.useMemo<Set<string>>(() => {
    return new Set(
      participants && participants.length > 0
        ? participants.map((support: any) => support.userId)
        : []
    );
  }, [participants]);

  // const filteredUser = React.useMemo(() => {
  //   if (!users || users.length === 0) return [];

  //   const key = search.toLowerCase();
  //   return (
  //     (users &&
  //       users.filter(
  //         (item: any) =>
  //           item && item.userName && item.userName.toLowerCase().includes(key)
  //       )) ||
  //     []
  //   );
  // }, [users, search]);

  //disable btn
  let isAnyFilled = false;
  if (phoneContactState && !nameContactState) {
    isAnyFilled = true;
  }
  if (!phoneContactState && nameContactState) {
    isAnyFilled = true;
  }

  React.useEffect(() => {
    if (!contact) return;

    const { name, phone, position, email, department } = contact;
    const hasOther = position || email || department;
    form.clearErrors(["contacts.0.name", "contacts.0.phone"]);

    // have name no phone
    if (name && !phone && !hasOther) {
      form.setError("contacts.0.phone", {
        type: "manual",
        message: "กรุณากรอกเบอร์โทร",
      });
      return;
    }

    // have phone no name
    if (phone && !name && !hasOther) {
      form.setError("contacts.0.name", {
        type: "manual",
        message: "กรุณากรอกชื่อผู้ติดต่อ",
      });
      return;
    }

    //other field but no enter name and phone
    if (hasOther && (!name || !phone)) {
      if (!name) {
        form.setError("contacts.0.name", {
          type: "manual",
          message: "กรุณากรอกชื่อผู้ติดต่อ",
        });
      }
      if (!phone) {
        form.setError("contacts.0.phone", {
          type: "manual",
          message: "กรุณากรอกเบอร์โทร",
        });
      }
    }
  }, [contact, form]);

  const handleDeleteParticipants = (id: string) => {
    GlobalModal.delete({
      title: "ลบผู้รับผิดชอบ",
      description: "คุณต้องการลบผู้รับผิดชอบ ใช่หรือไม่ ?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังลบผู้รับผิดชอบ...");

        DeleteCustomerSupport(
          {
            userId: id,
            customerId: customer.id,
          },
          {
            onSuccess: () => {
              toast.success("ลบผู้รับผิดชอบเรียบร้อยแล้ว!", {
                id: toastId,
              });
              fetchCustomer && fetchCustomer();
            },
            onError: () => {
              toast.error(
                "ไม่สามารถลบผู้รับผิดชอบ กรุณาลองใหม่อีกครั้งภายหลัง",
                {
                  id: toastId,
                }
              );
              fetchCustomer && fetchCustomer();
            },
          }
        );
      },
    });
  };

  const handleAddParticipants = (values: CustomerSupportFormValues) => {
    GlobalModal.info({
      title: "เพิ่มผู้รับผิดชอบ",
      description: "คุณต้องการเพิ่มผู้รับผิดชอบ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังเพิ่มผู้รับผิดชอบ...");
        createCustomerSupport(values, {
          onSuccess: () => {
            toast.success("เพิ่มผู้รับผิดชอบเรียบร้อยแล้ว!", {
              id: toastId,
            });
            fetchCustomer && fetchCustomer();
          },
          onError: () => {
            toast.error(
              "ไม่สามารถเพิ่มผู้รับผิดชอบ เนื่องจากมีผู้ใช้นี้อยู่แล้ว",
              { id: toastId }
            );
            fetchCustomer && fetchCustomer();
          },
        });
      },
    });
  };

  const handleUserButtonClick = (selectedUserId: string, isMain: boolean) => {
    handleAddParticipants({
      userId: selectedUserId,
      isMain: isMain,
      customerId: customer.id,
    });
  };

  return (
    <Card className="py-4">
      <CardHeader className=" gap-0">
        <div className="flex gap-2">
          <div className="flex  flex-col">
            <CardTitle className="text-base font-bold mt-2 mb-1 gap-2">
              <span className="mr-3">สถานะลูกค้า</span>
            </CardTitle>
            <GlobalStatusBadge value={customer?.active} />
            <CardTitle className="text-base font-bold mt-3">
              ชื่อผู้ติดต่อ
            </CardTitle>
          </div>

          <EditActionButtons
            isEdit={isEdit}
            isAnyFilled={isAnyFilled}
            onSave={onClick}
            form={form}
            onEdit={() => {
              onEditForm?.("contact_detail");
            }}
            onCancel={() => {
              onCancel?.("contact_detail");
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-5">
          <GlobalFormField
            control={form.control}
            name="contacts.0.name"
            label=""
            type="input"
            view={isEdit ? "edit" : "view"}
            placeholder="กรอกชื่อผู้ติดต่อ เช่น หญิงฟ้า สุขสมบรูณ์"
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <RequiredLabel>ความสำคัญ</RequiredLabel>
                {isEdit ? (
                  <StarRating
                    rating={field.value}
                    onRate={(val) => field.onChange(val)}
                  />
                ) : (
                  <div className="flex flex-col w-full ">
                    <StarRating
                      rating={field.value}
                      interactive={false}
                      size={20}
                    />
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <span className="text-base font-bold leading-none  ">แท็กลูกค้า</span>

          <div className="flex flex-wrap text-muted-foreground gap-2">
            {isEdit ? (
              <TagsSelectorModal form={form} />
            ) : customer && customer.tags && customer.tags.length > 0 ? (
              customer.tags.map(
                (tag: any, index: number) =>
                  tag.name !== "" && (
                    <GlobalTagsBadge key={index} value={tag.name ?? "new"} />
                  )
              )
            ) : (
              "ลูกค้าคนนี้ยังไม่มีแท๊ก"
            )}
          </div>
        </div>
        <div className="grid grid-cols-1  2xl:grid-cols-2 mt-5 gap-7">
          <GlobalFormField
            control={form.control}
            name="contacts.0.email"
            label="อีเมลผู้ติดต่อ"
            type="input"
            view={isEdit ? "edit" : "view"}
            placeholder="กรอกอีเมลผู้ติดต่อ เช่น contact@gmail.com"
          />
          <GlobalFormField
            control={form.control}
            name="contacts.0.phone"
            label="เบอร์โทรศัพท์ผู้ติดต่อ (ตัวเลขเท่านั้น)"
            type="number-box"
            view={isEdit ? "edit" : "view"}
            formatter={formatPhoneNumber}
            placeholder="กรอกเบอร์โทรศัพท์ผู้ติดต่อ เช่น 0612345678"
          />

          <GlobalFormField
            control={form.control}
            name="contacts.0.position"
            label="แผนกผู้ติดต่อ"
            type="input"
            view={isEdit ? "edit" : "view"}
            placeholder="กรอกแผนกของผู้ติดต่อ เช่น ฝ่ายการตลาด"
          />

          <GlobalFormField
            control={form.control}
            name="contacts.0.department"
            label="ตำแหน่งผู้ติดต่อ"
            type="input"
            view={isEdit ? "edit" : "view"}
            placeholder="กรอกตำแหน่งของผู้ติดต่อ เช่น ที่ปรึกษาด้านการตลาด"
          />
        </div>

        {customer &&
        customer.chatRoomDetail &&
        (customer.chatRoomDetail.chatRoomId === null ||
          customer.chatRoomDetail.chatRoomId === undefined) ? (
          <div className="flex items-center justify-center py-6">
            <span className="text-sm text-muted-foreground">
              ลูกค้าคนนี้ยังไม่มีการโต้ตอบภายในแชท
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <ParticipantsSection
              title="ผู้รับผิดชอบหลัก"
              isMain
              isEdit={isEdit}
              mainParticipant={mainParticipant}
              participants={[]}
              onDelete={handleDeleteParticipants}
              onAdd={handleUserButtonClick}
              navigate={navigate}
              isPopoverOpen={isPopoverMainParticipantsOpen}
              setIsPopoverOpen={setIsPopoverMainParticipantsOpen}
              search={search}
              setSearch={setSearch}
              filteredUser={allUser}
              supportedUserIds={supportedUserIds}
              isLoading={isUserLoading}
              isFetching={isUserFetching}
              isCreatingSupport={isCreatingSupport}
            />

            <ParticipantsSection
              title="ผู้รับผิดชอบรอง"
              isEdit={isEdit}
              participants={normalParticipants}
              onDelete={handleDeleteParticipants}
              onAdd={handleUserButtonClick}
              navigate={navigate}
              isPopoverOpen={isPopoverOpen}
              setIsPopoverOpen={setIsPopoverOpen}
              search={search}
              setSearch={setSearch}
              filteredUser={allUser}
              supportedUserIds={supportedUserIds}
              isLoading={isUserLoading}
              isFetching={isUserFetching}
              isCreatingSupport={isCreatingSupport}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
