// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
//   FormControl,
// } from "@/components/ui/form";
// import { Input, Switch } from "@/components/ui";
// import { UseFormReturn } from "react-hook-form";
// import { UsersFormValues } from "@/schemas/users/users";
// import { RequiredLabel } from "@/components/shared/required-design";

// type Props = {
//   open: boolean;
//   title: string;
//   onClose: () => void;
//   onSubmit: () => void;
//   form: UseFormReturn<UsersFormValues>;
//   indexPath: number;
// };

// export const UserSkillModal: React.FC<Props> = ({
//   open,
//   title,
//   onClose,
//   onSubmit,
//   form,
//   indexPath,
// }) => {
//   const index = `profile.skills.${indexPath}` as const;

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="w-[95vw] sm:w-[90vw] sm:max-w-xl md:w-[80vw] md:max-w-3xl lg:w-[70vw] lg:max-w-5xl max-h-[85vh] overflow-y-auto dark:bg-popover">
//         <DialogHeader className="flex items-center justify-center gap-2">
//           <DialogTitle>{title}</DialogTitle>
//         </DialogHeader>

//         <Form {...form}>
//           <form
//             id="skill-form"
//             onSubmit={async (e) => {
//               e.preventDefault();
//               const ok = await form.trigger(`profile.skills.${indexPath}`, {
//                 shouldFocus: true,
//               });
//               if (!ok) return;
//               onSubmit();
//             }}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <FormField
//                 control={form.control}
//                 name={`${index}.name`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <RequiredLabel required>ชื่อทักษะ</RequiredLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         placeholder="เช่น React, SQL, Copywriting"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name={`${index}.level`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <RequiredLabel required>ระดับความชำนาญ</RequiredLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         placeholder="เช่น Beginner, Intermediate, Advanced"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name={`${index}.yearsOfExperience`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>ประสบการณ์ (ปี)</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         value={field.value ?? ""}
//                         onChange={(e) =>
//                           field.onChange(
//                             e.target.value === ""
//                               ? undefined
//                               : Number(e.target.value)
//                           )
//                         }
//                         min="0"
//                         max="60"
//                         step="0.5"
//                         placeholder="เช่น 3"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name={`${index}.isPrimary`}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>เป็นทักษะหลักหรือไม่</FormLabel>
//                     <FormControl>
//                       <Switch
//                         className="mt-2"
//                         checked={!!field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name={`${index}.description`}
//                 render={({ field }) => (
//                   <FormItem className="md:col-span-2">
//                     <FormLabel>รายละเอียดเพิ่มเติม</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         placeholder="หมายเหตุ หรือรายละเอียดอื่นๆ"
//                         value={field.value ?? undefined}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </form>
//         </Form>

//         <DialogFooter className="flex justify-center gap-4 mt-6">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={onClose}
//             className="w-[222px]"
//           >
//             ยกเลิก
//           </Button>
//           <Button type="submit" form="skill-form" className="w-[222px]">
//             บันทึก
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };
