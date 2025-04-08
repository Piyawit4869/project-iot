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

export const CreateProducts = () => {
  const form = useForm<CreateFormValues>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div>
        <Control
          title="Create Products"
          backpath="/organization/products"
          buttons={[
            <Button key={"create button"}>Save</Button>,
            <Button key={"cancel button"}>Cancel</Button>,
          ]}
        />
      </div>
      <div>
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            className="flex-row space-y-6 max-w-sm p-8"
          >
            <h1>Sign In</h1>
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username/Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <GlobalButton label="Login" type="submit" loading={isSubmitting} /> */}
          </form>
        </Form>
      </div>
    </div>
  );
};
