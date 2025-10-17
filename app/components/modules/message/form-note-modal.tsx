import React from "react";
import { Button } from "~/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
} from "~/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";

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
  values,
  open,
  onClose,
  onSubmit,
}: FormNoteModalProps) => {
  const form = useForm<NoteSchema>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      note: values || "",
    },
  });

  const submitHandler = (data: NoteSchema) => {
    onSubmit(data.note);
    form.reset();
    onClose();
  };

  const handleFormCancel = () => {
    form.reset();
    onClose();
  };

  React.useEffect(() => {
    form.reset({ note: values || "" });
  }, [values, form]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center gap-2">
          <DialogTitle>เพิ่มโน้ต</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="note"
            onSubmit={form.handleSubmit(submitHandler)}
            className="flex flex-col"
          >
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      className="flex-1 w-full resize-none overflow-auto p-2 border rounded-md outline-none"
                      placeholder="สามารถใส่รายละเอียดในโน้ตได้ โดยจะไม่ถูกแสดงต่ออีกฝ่าย"
                      rows={9}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-center gap-4 mt-6">
              <Button
                type="button"
                onClick={handleFormCancel}
                className="w-[222px] bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              >
                ยกเลิก
              </Button>
              <Button type="submit" className="w-[222px] dark:bg-ring">
                บันทึก
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
