"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Control } from "@/components/shared/topsection";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ProductsFormSchema,
  ProductsFormValues,
} from "@/schemas/products/product";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  // useGetProducts,
  // useUpdateProducts,
  useDeleteProducts,
} from "@/actions/products/client/useGetProducts";
import GlobalButton from "@/components/shared/global-button";

export const EditProducts = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  // const { data } = useGetProducts(params.id);

  const form = useForm<ProductsFormValues>({
    resolver: zodResolver(ProductsFormSchema),
  });

  const { isSubmitting } = form.formState;
  // const { mutate } = useUpdateProducts(params.id);
  // const onSubmit = (values: ProductsFormValues) => {
  //   mutate(values, {
  //     onSuccess: (data) => {
  //       console.log("✅ Created successfully:", data);
  //     },
  //     onError: (err) => {
  //       console.error("❌ Failed to create:", err);
  //     },
  //   });
  // };

  const { mutate: DeleteProducts } = useDeleteProducts();
  const handleDelete = (id: string) => {
    DeleteProducts(id, {
      onSuccess: () => {
        router.push("/organization/products");
      },
      onError: (err) => {
        console.error("Can not dekete", err);
      },
    });
  };

  // React.useEffect(() => {
  //   if (data?.data) {
  //     form.reset({
  //       name: data?.data?.name,
  //       description: data?.data?.description,
  //       quantity: data?.data?.quantity,
  //       unitPrice: data?.data?.unitPrice,
  //       discount: data?.data?.discount,
  //       total: data?.data?.total,
  //     });
  //   }
  // }, [data, form]);

  return (
    <div className="hidden flex-1 flex-col space-y-3 p-8 md:flex">
      <div>
        <Control
          title="Create Products"
          backpath="/organization/products"
          buttons={[
            <GlobalButton
              label="Save"
              key={"create button"}
              type="submit"
              loading={isSubmitting}
              form="products"
            />,
            <GlobalButton
              label="Delete"
              key={"create button"}
              onClick={() => handleDelete(params.id)}
            />,
          ]}
        />
      </div>
      <div className="flex gap-8 p-4">
        <Card className="w-full">
          <Form {...form}>
            <form
              id="products"
              // onSubmit={form.handleSubmit(onSubmit)}
              className="flex-row space-y-6 max-w-sm p-8"
            >
              <h1>Products Information</h1>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Image</FormLabel>
                    <FormControl className="w-full">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl className="w-full">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>quantity</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>brand</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>status</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>sku</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>type</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>detail</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="manufacturedDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>manufacturedDate</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expireDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>expireDate</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>weight</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subRegion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>subRegion</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vintage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>vintage</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>colour</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alcohol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>alcohol</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bottleSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>bottleSize</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>reference</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>width</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </Card>
        {/* <Card className="w-1/4">
          <div className="flex-row space-y-6 max-w-sm p-8">
            <h1>Product Image</h1>
          </div>
        </Card> */}
      </div>
    </div>
  );
};
