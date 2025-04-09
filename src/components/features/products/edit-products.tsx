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
  useGetProducts,
  useUpdateProducts,
  useDeleteProducts,
} from "@/actions/products/client/useGetProducts";
import GlobalButton from "@/components/shared/global-button";

export const EditProducts = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data } = useGetProducts(params.id);

  const form = useForm<ProductsFormValues>({
    resolver: zodResolver(ProductsFormSchema),
  });

  const { isSubmitting } = form.formState;
  const { mutate } = useUpdateProducts(params.id);
  const onSubmit = (values: ProductsFormValues) => {
    mutate(values, {
      onSuccess: (data) => {
        console.log("✅ Created successfully:", data);
      },
      onError: (err) => {
        console.error("❌ Failed to create:", err);
      },
    });
  };

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

  React.useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data?.data?.name,
        description: data?.data?.description,
        quantity: data?.data?.quantity,
        unitPrice: data?.data?.unitPrice,
        discount: data?.data?.discount,
        total: data?.data?.total,
      });
    }
  }, [data, form]);

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
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-row space-y-6 max-w-sm p-8"
            >
              <h1>Products Information</h1>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name Product</FormLabel>
                    <FormControl className="w-full">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl className="w-full">
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
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
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>total</FormLabel>
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
