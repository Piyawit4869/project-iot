import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import React from "react";
import { FormNoteModal } from "./form-note-modal";

import { toast } from "sonner";
import dayjs from "dayjs";
import { GlobalModal } from "~/components/shared/modal/modal";
import {
  useCreateCustomerNote,
  useDeleteCustomerNote,
  useUpdateCustomerNote,
} from "~/api/client/customer/useCustomer";
import { DateISOToDisplayDate } from "~/utils/date-format";
import GlobalButton from "~/components/shared/global-button";
import { GetNoteFormAI } from "./modal-get-noteAi";

interface TNote {
  id: string;
  note: string;
  user_id: string;
  user_name: string;
  created_at: string;
  createdAt: string;
  updated_at: string;
}

interface NoteListProps {
  customer: any;
  refetchCustomer: () => void;
}

export const NoteLists: React.FC<NoteListProps> = (props) => {
  const { customer, refetchCustomer } = props;

  const { mutate: createCustomerNote } = useCreateCustomerNote(customer?.id);
  const { mutate: updateCustomerNote } = useUpdateCustomerNote(customer?.id);
  const { mutate: deleteCustomerNote } = useDeleteCustomerNote(customer?.id);

  const [open, setOpen] = React.useState<boolean>(false);
  const [OpenAiNote, setOpenAiNote] = React.useState<boolean>(false);
  const [noteContent, setNoteContent] = React.useState<string>("");
  const [selectedNoteId, setSelectedNoteId] = React.useState<string | null>(
    null
  );

  const sortedNotes =
    customer?.note && customer?.note?.length > 0
      ? customer.note.sort((a: TNote, b: TNote) => {
          return dayjs(b.created_at).isBefore(dayjs(a.created_at)) ? -1 : 1;
        })
      : [];

  const handleOnCloseModal = () => {
    setOpen(false);
    setSelectedNoteId(null);
  };

  const handleOnOpenModal = (note?: TNote) => {
    if (note) {
      setNoteContent(note.note);
      setSelectedNoteId(note.id);
    } else {
      setNoteContent("");
    }
    setOpen(true);
  };

  const handleSubmitFormModal = (value: string) => {
    // GlobalModal.info({
    //   title: selectedNoteId ? "แก้ไขโน้ต" : "สร้างโน้ตใหม่",
    //   description: "คุณต้องการทำรายการ ใช่หรือไม่?",
    //   confirmText: "ยืนยัน",
    //   cancelText: "ยกเลิก",
    //   onConfirm: () => {
    const toastId = toast.loading("กำลังบันทึกโน้ต...");
    if (selectedNoteId) {
      updateCustomerNote(
        { id: selectedNoteId, note: value },
        {
          onSuccess: () => {
            toast.success("แก้ไขโน้ตเรียบร้อยแล้ว!", {
              id: toastId,
            });
            refetchCustomer();
          },
          onError: () => {
            toast.error("แก้ไขโน้ตไม่สำเร็จ กรุณาลองใหม่อีกครั้งภายหลัง", {
              id: toastId,
            });
          },
        }
      );
    } else {
      createCustomerNote(
        { note: value },
        {
          onSuccess: () => {
            toast.success("สร้างโน้ตใหม่เรียบร้อยแล้ว", {
              id: toastId,
            });
            refetchCustomer();
          },
          onError: () => {
            toast.error("แก้ไขโน้ตไม่สำเร็จ กรุณาลองใหม่อีกครั้งภายหลัง", {
              id: toastId,
            });
          },
        }
      );
    }
    handleOnCloseModal();
    // },
    // });
  };

  const handleDeleteNote = (id: string) => {
    GlobalModal.warning({
      title: "ลบโน้ต",
      description: "คุณต้องการทำรายการ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังลบโน้ต...");
        deleteCustomerNote(
          { id },
          {
            onSuccess: () => {
              toast.success("ลบโน้ตที่เลือกเรียบร้อยแล้ว", {
                id: toastId,
              });
              refetchCustomer();
            },
            onError: () => {
              toast.error(
                "ลบโน้ตที่เลือกไม่สำเร็จ กรุณาลองใหม่อีกครั้งภายหลัง",
                {
                  id: toastId,
                }
              );
            },
          }
        );
        handleOnCloseModal();
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold">โน้ต</h2>

        <div className="flex items-center gap-2">
          <PlusIcon
            onClick={() => handleOnOpenModal()}
            className="cursor-pointer"
          />
          <div className="w-20">
            <GlobalButton
              label="สรุปโน้ต"
              variant="outline"
              className="w-full"
              onClick={() => setOpenAiNote(true)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-4 max-h-[calc(100vh-420px)] overflow-auto">
        {sortedNotes && sortedNotes.length ? (
          sortedNotes.map((note: TNote) => (
            <div
              key={note.id}
              className="border rounded-lg p-3 bg-background shadow-sm space-y-2"
            >
              <p className="whitespace-pre-line break-words text-popover-foreground">
                {note.note}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  {DateISOToDisplayDate(note.created_at || note.createdAt)}{" "}
                  {note.user_name}
                </span>
                <div className="flex gap-2">
                  <PencilIcon
                    className="w-4 h-4 cursor-pointer hover:text-blue-500"
                    onClick={() => handleOnOpenModal(note)}
                  />
                  <TrashIcon
                    className="w-4 h-4 cursor-pointer hover:text-red-500"
                    onClick={() => handleDeleteNote(note.id)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="mt-5 text-center text-sm text-neutral-400">
            กดปุ่ม + เพื่อเพิ่มโน๊ต หรือ จดบันทึกข้อมูลสำหรับลูกค้าท่านนี้
          </div>
        )}
      </div>

      <FormNoteModal
        values={noteContent ? noteContent : ""}
        open={open}
        onClose={handleOnCloseModal}
        onSubmit={handleSubmitFormModal}
      />
      <GetNoteFormAI open={OpenAiNote} setOpen={setOpenAiNote} />
    </div>
  );
};
