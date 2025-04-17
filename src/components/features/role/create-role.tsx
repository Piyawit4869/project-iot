"use client";

import React from "react";
import GlobalButton from "@/components/shared/global-button";
import { RoleFormSchema, RoleFormValues } from "@/schemas/role/role";
import { Tabcontrol } from "@/components/shared/topsection";
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
import { Card } from "@/components/ui/card";
import { useCreateRole } from "@/actions/role/client/useGetRole";
import { Switch } from "@/components/ui/switch";

export const CreateRole = () => {
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(RoleFormSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "",
    },
  });

  const { isSubmitting } = form.formState;
  const { mutate } = useCreateRole();

  const onSubmit = (values: RoleFormValues) => {
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
    <div className="flex flex-col space-y-3 p-8">
      <Tabcontrol
        title="Create Role"
        backpath="/organization/user/role"
        buttons={[
          <GlobalButton
            label="Create"
            key={"create button"}
            type="submit"
            loading={isSubmitting}
            form="role"
          />,
        ]}
      />
      <Form {...form}>
        <form id="role" onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="p-6 mt-4">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Switch {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Name Role</FormLabel>
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
};
