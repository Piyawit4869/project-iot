"use client";

import React from "react";
import { Control } from "@/components/shared/topsection";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProductsFormSchema,
  ProductsFormValues,
} from "@/schemas/products/product";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import GlobalButton from "@/components/shared/global-button";
import { useCreateProducts } from "@/actions/products/client/useGetProducts";

export const CreateProducts = () => {
  const form = useForm<ProductsFormValues>({
    resolver: zodResolver(ProductsFormSchema),
  });

  const { isSubmitting } = form.formState;
  const { mutate } = useCreateProducts();

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

  return (
    <div className="hidden flex-1 flex-col space-y-3 p-8 md:flex">
      <div>
        <Control
          title="Create Products"
          backpath="/organization/products"
          buttons={[
            <Button key={"create button"} type="submit">
              Create
            </Button>,
            <Button key={"cancel button"}>Cancel</Button>,
          ]}
        />
      </div>
      <div className="flex gap-8 p-4">
        <Card className="w-full">
          <Form {...form}>
            <form
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
              <GlobalButton
                label="Create"
                type="submit"
                loading={isSubmitting}
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
