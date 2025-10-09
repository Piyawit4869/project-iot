// "use client";

// import React from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { TabControl } from "~/components/shared/tab-control";// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   ProductCreateDTO,
//   ProductsFormSchema,
//   Product,
// } from "@/schemas/products/product";
// import { Card } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   useGetProducts,
//   useUpdateProducts,
//   useDeleteProducts,
// } from "@/actions/products/client/useGetProducts";
// import GlobalButton from "@/components/shared/global-button";
// import { DatePicker } from "@/components/shared/date-picker";
// import ImageUpload from "@/components/shared/image-upload";
// import { RequiredLabel } from "@/components/shared/required-label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { getRequiredPaths } from "@/utils/getRequiredPathsFromZod";

// export const EditProducts = () => {
//   const router = useRouter();
//   const params = useParams<{ id: string }>();
//   const { data } = useGetProducts(params.id);
//   const form = useForm<ProductCreateDTO>({
//     resolver: zodResolver(ProductsFormSchema),
//     values: {
//       name: data?.res?.name ?? "",
//       status: data?.res?.status ?? "",
//       quantity: data?.res?.quantity ?? "",
//       brand: data?.res?.brand ?? "",
//       sku: data?.res?.sku ?? "",
//       type: data?.res?.type ?? "",
//       price: data?.res?.price ?? "",
//       imageUrl: data?.res?.imageUrl ?? "",
//       detail: data?.res?.detail ?? "",
//       description: data?.res?.description ?? "",
//       manufacturedDate: data?.res?.manufacturedDate ?? "",
//       expireDate: data?.res?.expireDate ?? "",
//       weight: data?.res?.weight ?? "",
//       country: data?.res?.country ?? "",
//       subRegion: data?.res?.subRegion ?? "",
//       vintage: data?.res?.vintage ?? "",
//       colour: data?.res?.colour ?? "",
//       alcohol: data?.res?.alcohol ?? "",
//       bottleSize: data?.res?.bottleSize ?? "",
//       reference: data?.res?.reference ?? "",
//       width: data?.res?.width ?? "",
//       height: data?.res?.height ?? "",
//     },
//   });

//   const checkFields = new Set(getRequiredPaths(ProductsFormSchema));

//   const { isSubmitting } = form.formState;
//   const { mutate } = useUpdateProducts(params.id);
//   const onSubmit = (values: Product) => {
//     mutate(values, {
//       onSuccess: () => {},
//       onError: () => {},
//     });
//   };

//   const { mutate: DeleteProducts } = useDeleteProducts();
//   const handleDelete = (id: string) => {
//     DeleteProducts(id, {
//       onSuccess: () => {
//         router.push("/organization/products");
//       },
//       onError: () => {},
//     });
//   };

//   return (
//     <div className="hidden flex-1 flex-col space-y-3 p-8 md:flex">
//       <TabControl
//         title="แก้ไขผลิตภัณฑ์"
//         backpath="/organization/products"
//         buttons={[
//           <GlobalButton
//             label="บันทึก"
//             key={"create button"}
//             type="submit"
//             loading={isSubmitting}
//             form="products"
//           />,
//           <GlobalButton
//             label="ลบ"
//             key={"create button"}
//             onClick={() => handleDelete(params.id)}
//           />,
//         ]}
//       />
//       <Form {...form}>
//         <form id="products" onSubmit={form.handleSubmit(onSubmit)}>
//           <div className="flex gap-8 mt-4 w-full ">
//             <div className="flex flex-3 flex-col gap-6">
//               <Card className="p-6">
//                 <h1>ข้อมูลผลิตภัณฑ์</h1>
//                 <div className="flex gap-4 mt-4">
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem className="flex-2">
//                         <FormLabel>ชื่อ</FormLabel>
//                         <FormControl className="w-full">
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="brand"
//                     render={({ field }) => (
//                       <FormItem className="flex-1">
//                         <FormLabel>แบรนด์</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <FormField
//                   control={form.control}
//                   name="detail"
//                   render={({ field }) => (
//                     <FormItem className="mt-4">
//                       <FormLabel>รายละเอียด</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem className="mt-4">
//                       <FormLabel>อธิบาย</FormLabel>
//                       <FormControl>
//                         <Textarea {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </Card>

//               <Card className="p-6">
//                 <h1>รายละเอียดผลิตภัณฑ์</h1>
//                 <div className="grid grid-cols-2 gap-4 mt-4">
//                   <FormField
//                     control={form.control}
//                     name="bottleSize"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>ขนาดขวด</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="weight"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>น้ำหนัก</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="width"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>ความกว้าง</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="height"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>ความสูง</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </Card>

//               <Card className="p-6">
//                 <h1>ประเทศของผลิตภัณฑ์</h1>
//                 <div className="grid grid-cols-2 gap-4 mt-4">
//                   <FormField
//                     control={form.control}
//                     name="country"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>ประเทศ</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="subRegion"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>ภูมิภาค</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="vintage"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>วินเทจ</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <div className="flex gap-4 w-full">
//                     <FormField
//                       control={form.control}
//                       name="manufacturedDate"
//                       render={({ field }) => (
//                         <FormItem className="flex-1 w-full">
//                           <FormLabel>วันที่ผลิต</FormLabel>
//                           <FormControl>
//                             <DatePicker
//                               value={field.value}
//                               onChange={field.onChange}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="expireDate"
//                       render={({ field }) => (
//                         <FormItem className="flex-1 w-full">
//                           <FormLabel>วันหมดอายุ</FormLabel>
//                           <FormControl>
//                             <DatePicker
//                               value={field.value}
//                               onChange={field.onChange}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div>
//                 <FormField
//                   control={form.control}
//                   name="reference"
//                   render={({ field }) => (
//                     <FormItem className="mt-4">
//                       <FormLabel>อ้างอิง</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </Card>

//               <Card className="p-6">
//                 <h1>ราคาผลิตภัณฑ์</h1>
//                 <FormField
//                   control={form.control}
//                   name="price"
//                   render={({ field }) => (
//                     <FormItem className="mt-4">
//                       <FormLabel>ราคา</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <div className="grid grid-cols-2 gap-4 mt-4">
//                   <FormField
//                     control={form.control}
//                     name="sku"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>รหัสผลิตภัณฑ์</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="quantity"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>จำนวน</FormLabel>
//                         <FormControl>
//                           <Input {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </Card>
//             </div>
//             <div className="flex flex-1 flex-col gap-4">
//               <Card className="w-full p-3">
//                 <FormField
//                   control={form.control}
//                   name="status"
//                   render={({ field }) => (
//                     <FormItem className="mt-4">
//                       <RequiredLabel
//                         fieldPath="status"
//                         label={"สถานะผลิคภัณฑ์"}
//                         requiredFields={checkFields}
//                       />
//                       <Select
//                         {...field}
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger className="w-full">
//                             <SelectValue placeholder="เลือกสถานะผลิคภัณฑ์" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {stusta.map((item) => (
//                             <SelectItem key={item.value} value={item.value}>
//                               {item.value}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </Card>
//               <Card className="w-full p-6">
//                 <h1>ภาพสินค้า</h1>
//                 <FormField
//                   control={form.control}
//                   name="imageUrl"
//                   render={({ field }) => (
//                     <FormItem className="mt-4">
//                       <FormLabel>ภาพสินค้า</FormLabel>
//                       <FormControl className="w-full">
//                         <ImageUpload
//                           value={field.value}
//                           onChange={field.onChange}
//                           width={180}
//                           height={180}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </Card>
//               <Card className="w-full p-6">
//                 <h1>หมวดหมู่</h1>
//                 <FormField
//                   control={form.control}
//                   name="type"
//                   render={({ field }) => (
//                     <FormItem className="mt-4">
//                       <FormLabel>ประเภท</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="colour"
//                   render={({ field }) => (
//                     <FormItem className="mt-4">
//                       <FormLabel>สี</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="alcohol"
//                   render={({ field }) => (
//                     <FormItem className="mt-4">
//                       <FormLabel>แอลกอฮอล์</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </Card>
//             </div>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// const stusta = [{ value: "Active" }];
