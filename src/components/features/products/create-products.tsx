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
import { CreateFormSchema, CreateFormValues } from "@/schemas/products/create";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import GlobalButton from "@/components/shared/global-button";
import { fetchCreateProducts } from "@/actions/products/server/products";

export const CreateProducts = () => {
  const form = useForm<CreateFormValues>({
    resolver: zodResolver(CreateFormSchema),
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: CreateFormValues) => {
    await fetchCreateProducts(
      values.name,
      values.description,
      values.quantity,
      values.price,
      values.discount,
      values.total
    );
  };

  return (
    <div className="hidden flex-1 flex-col space-y-3 p-8 md:flex">
      <div>
        <Control
          title="Create Products"
          backpath="/organization/products"
          buttons={[
            <Button key={"create button"} type="submit">
              Save
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
                name="price"
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
              <GlobalButton label="Save" type="submit" loading={isSubmitting} />
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
