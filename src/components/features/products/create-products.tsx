"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import GlobalButton from "@/components/shared/global-button";
import { Control } from "@/components/shared/topsection";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ProductsFormSchema,
  ProductsFormValues,
} from "@/schemas/products/product";
import { useCreateProducts } from "@/actions/products/client/useGetProducts";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "@/components/shared/date-picker";

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

  React.useEffect(() => {
    form.reset({
      status: "active",
    });
  }, [form]);

  console.log("form values", form.getValues());

  return (
    <div className="hidden flex-1 flex-col space-y-3 p-8 md:flex">
      <div>
        <Control
          title="Create Products"
          backpath="/organization/products"
          buttons={[
            <GlobalButton
              label="Create"
              key={"create button"}
              type="submit"
              loading={isSubmitting}
              form="products"
            />,
          ]}
        />
      </div>
      <Form {...form}>
        <form id="products" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-8 mt-4 w-full ">
            <div className="flex flex-2 flex-col gap-6">
              <Card className="p-6">
                <h1>Products Information</h1>
                <div className="flex gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-2">
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
                    name="brand"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>brand</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="detail"
                  render={({ field }) => (
                    <FormItem className="mt-4">
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
                    <FormItem className="mt-4">
                      <FormLabel>description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>

              <Card className="p-6">
                <h1>Product Detail</h1>
                <div className="grid grid-cols-2 gap-4 mt-4">
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
                </div>
              </Card>

              <Card className="p-6">
                <h1>Prtoduct Country</h1>
                <div className="grid grid-cols-2 gap-4 mt-4">
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
                    name="manufacturedDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>manufacturedDate</FormLabel>
                        <FormControl>
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
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
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>reference</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>

              <Card className="p-6">
                <h1>Products Status</h1>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>price</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <Card className="w-full p-6">
                <h1>Products Image</h1>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Products Image</FormLabel>
                      <FormControl className="w-full">
                        <Input type="file" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
              <Card className="w-full p-6">
                <h1>Category</h1>
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="mt-4">
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
                  name="colour"
                  render={({ field }) => (
                    <FormItem className="mt-4">
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
                    <FormItem className="mt-4">
                      <FormLabel>alcohol</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
              <Card className="w-full p-6">
                <h1>Status</h1>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="flex mt-4">
                      <FormLabel>Status</FormLabel>
                      <FormControl className="ml-4">
                        <Switch {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
