"use client";

import React from "react";
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { useCreateUsers } from "@/actions/super-user/client/useGetUsers";
import {
  UsersFormSchema,
  super_UsersFormValues,
} from "@/schemas/super-users/users";
import { DatePicker } from "@/components/shared/date-picker";

export const CreateUsers = () => {
  const form = useForm<super_UsersFormValues>({
    resolver: zodResolver(UsersFormSchema),
  });

  const { isSubmitting } = form.formState;
  const { mutate } = useCreateUsers();

  const onSubmit = (values: super_UsersFormValues) => {
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
      roleId: "f5f37db6-9fb5-4fc9-a405-40348813ef52",
      employeeRoleId: "b44b90c8-0514-481d-93a6-369fbda0513e",
    });
  }, [form]);

  return (
    <div className="hidden flex-1 flex-col gap-4 space-y-3 p-8 md:flex">
      <Control
        title="Create Users"
        backpath="/super-admin/user"
        buttons={[
          <GlobalButton
            label="Create"
            key={"create button"}
            type="submit"
            loading={isSubmitting}
            form="users"
          />,
        ]}
      />
      <Card className="w-full flex gap-8 p-4">
        <Form {...form}>
          <form
            id="users"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-row space-y-6 max-w-sm p-8"
          >
            <h1>Users Information</h1>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl className="w-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>roleId</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employeeRoleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>employeeRoleId</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.prefix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>prefix</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>firstName</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>lastName</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.firstNameTh"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>firstNameTh</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.lastNameTh"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>lastNameTh</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BirthDate</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profile.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone</FormLabel>
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
    </div>
  );
};
