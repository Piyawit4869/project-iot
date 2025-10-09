import React from "react";

import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export const noteSchema = z.object({
  note: z.string().min(1, { message: "กรุณากรอกโน้ต" }),
});

export type NoteSchema = z.infer<typeof noteSchema>;

interface FormNoteModalProps {
  values: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: string) => void;
}

export const FormNoteModal = ({
  open,
  onClose,
  onSubmit,
}: FormNoteModalProps) => {
  const [getDataNote, setGetDataNote] = React.useState("");
  const submitHandler = () => {
    onSubmit(getDataNote);

    onClose();
  };

  const handleFormCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center gap-2">
          <DialogTitle>เพิ่มโน้ต</DialogTitle>
        </DialogHeader>

        <textarea
          className="flex-1 w-full resize-none overflow-auto p-2 border rounded-md outline-none"
          placeholder="สามารถใส่รายละเอียดในโน้ตได้ โดยจะไม่ถูกแสดงต่ออีกฝ่าย"
          rows={9}
          onChange={(e) => setGetDataNote(e.target.value)}
        />
        <DialogFooter className="flex justify-center gap-4 mt-6">
          <Button
            type="button"
            onClick={handleFormCancel}
            className="w-[222px] bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
          >
            ยกเลิก
          </Button>
          <Button type="button" onClick={submitHandler} className="w-[222px]">
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
