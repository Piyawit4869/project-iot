// import React from "react";

// import { Form, FormControl, FormField, FormItem } from "../ui/form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import GlobalButton from "./global-button";

// import { useParams } from "react-router";
// import { Input } from "../ui/input";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "../ui/accordion";
// import { PasswordFormSchema, type PasswordFormValues } from "~/routes/backoffice/users/user-schema/password-user";

// interface ChangePasswordProps {
//   title: string;
// }

// const ChangePassword: React.FC<ChangePasswordProps> = ({ title }) => {
//   const params = useParams<{ id: string }>();

//   const form = useForm<PasswordFormValues>({
//     resolver: zodResolver(PasswordFormSchema),
//     defaultValues: {
//       password: "",
//       newPassword: "",
//     },
//   });

//   const { isSubmitting } = form.formState;
//   const { mutate } = useChangePassword(params.id);
//   const onSubmit = (values: PasswordFormValues) => {
//     mutate(values, {
//       onSuccess: () => {},
//       onError: () => {},
//     });
//   };

//   return (
//     <Form {...form}>
//       <form id="password" onSubmit={form.handleSubmit(onSubmit)}>
//         <div className="space-y-4">
//           <Accordion type="single" collapsible>
//             <AccordionItem value="item-1">
//               <AccordionTrigger>{title}</AccordionTrigger>
//               <AccordionContent>
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem className="mt-4">
//                       <FormControl>
//                         <Input placeholder="รหัสผ่านเดิม" {...field} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="newPassword"
//                   render={({ field }) => (
//                     <FormItem className="mt-4">
//                       <FormControl>
//                         <Input placeholder="รหัสผ่านใหม่" {...field} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <GlobalButton
//                   className="mt-4"
//                   label="เปลี่ยนรหัสผ่าน"
//                   type="submit"
//                   form="password"
//                   loading={isSubmitting}
//                 />
//               </AccordionContent>
//             </AccordionItem>
//           </Accordion>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default ChangePassword;
