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
import { DatePicker } from "@/components/shared/date-picker";
import ImageUpload from "@/components/shared/upload";

export const EditProducts = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data } = useGetProducts(params.id);

  const form = useForm<ProductsFormValues>({
    resolver: zodResolver(ProductsFormSchema),
    defaultValues: {
      name: "",
      quantity: 0,
      brand: "",
      sku: "",
      type: "",
      price: 0,
      imageUrl: "",
      detail: "",
      description: "",
      manufacturedDate: undefined,
      expireDate: undefined,
      weight: 0,
      country: "",
      subRegion: "",
      vintage: "",
      colour: "",
      alcohol: 0,
      bottleSize: 0,
      reference: "",
      width: 0,
      height: 0,
    },
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
    if (data?.res?.Projects) {
      const manufacturedDate = data.res.Projects.manufacturedDate
        ? new Date(data.res.Projects.manufacturedDate)
        : undefined;

      const expireDate = data.res.Projects.expireDate
        ? new Date(data.res.Projects.expireDate)
        : undefined;

      form.reset({
        name: data.res.Projects.name ?? "",
        quantity: data?.res?.Projects?.quantity,
        brand: data?.res?.Projects?.brand,
        sku: data?.res?.Projects?.sku,
        type: data?.res?.Projects?.type,
        price: data?.res?.Projects?.price,
        imageUrl: data?.res?.Projects?.imageUrl,
        detail: data?.res?.Projects?.detail,
        description: data?.res?.Projects?.description,
        manufacturedDate: manufacturedDate,
        expireDate: expireDate,
        weight: data?.res?.Projects?.weight ?? 0,
        country: data?.res?.Projects?.country,
        subRegion: data?.res?.Projects?.subRegion,
        vintage: data?.res?.Projects?.vintage,
        colour: data?.res?.Projects?.colour,
        alcohol: data?.res?.Projects?.alcohol,
        bottleSize: data?.res?.Projects?.bottleSize,
        reference: data?.res?.Projects?.reference,
        width: data?.res?.Projects?.width,
        height: data?.res?.Projects?.height,
      });
    }
  }, [data, form]);

  return (
    <div className="hidden flex-1 flex-col space-y-3 p-8 md:flex">
      <Control
        title="Edit Products"
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
      <Form {...form}>
        <form id="products" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-8 mt-4 w-full ">
            <div className="flex flex-3 flex-col gap-6">
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
                  <div className="flex gap-4 w-full">
                    <FormField
                      control={form.control}
                      name="manufacturedDate"
                      render={({ field }) => (
                        <FormItem className="flex-1 w-full">
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
                        <FormItem className="flex-1 w-full">
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
                <h1>Products Price</h1>
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
                        <ImageUpload
                          value={field.value}
                          onChange={field.onChange}
                        />
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
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
