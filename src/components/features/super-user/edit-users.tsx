"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import GlobalButton from "@/components/shared/global-button";
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
import { UsersFormSchema, UsersFormValues } from "@/schemas/users/users";
import {
  useUpdateUsers,
  useDeleteUsers,
  useGetUsers,
} from "@/actions/user/client/useGetUsers";
import { DatePicker } from "@/components/shared/date-picker";

export const EditUsers = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data } = useGetUsers(params.id);

  const form = useForm<UsersFormValues>({
    resolver: zodResolver(UsersFormSchema),
  });

  const { isSubmitting } = form.formState;
  const { mutate } = useUpdateUsers(params.id);
  const onSubmit = (values: UsersFormValues) => {
    mutate(values, {
      onSuccess: (data) => {
        console.log("✅ Created successfully:", data);
      },
      onError: (err) => {
        console.error("❌ Failed to create:", err);
      },
    });
  };

  const { mutate: DeleteProducts } = useDeleteUsers();
  const handleDelete = (id: string) => {
    DeleteProducts(id, {
      onSuccess: () => {
        router.push("/organization/user");
      },
      onError: (err) => {
        console.error("Can not dekete", err);
      },
    });
  };

  React.useEffect(() => {
    if (data && data.res && data.res.data) {
      form.reset({
        status: data.res.data.status ?? "",
        email: data.res.data.email ?? "",
        userName: data.res.data.userName ?? "",
        password: data.res.data.password ?? "",
        roleId: data.res.data.roleId ?? "",
        employeeRoleId: data.res.data.employeeRoleId ?? "",
        profile: {
          prefix: data.res.data.profile.prefix ?? "",
          firstName: data.res.data.profile.firstName ?? "",
          lastName: data.res.data.profile.lastName ?? "",
          firstNameTh: data.res.data.profile.firstNameTh ?? "",
          lastNameTh: data.res.data.profile.lastNameTh ?? "",
          birthDate: data.res.data.profile.birthDate ?? "",
          phone: data.res.data.profile.phone ?? "",
        },
      });
    }
  }, [data, form]);

  return (
    <div className="hidden flex-1 flex-col gap-4 space-y-3 p-8 md:flex">
      <Tabcontrol
        title="Edit Users"
        backpath="/organization/user"
        buttons={[
          <GlobalButton
            label="Save"
            key={"create button"}
            type="submit"
            loading={isSubmitting}
            form="users"
          />,
          <GlobalButton
            label="Delete"
            key={"delete button"}
            onClick={() => handleDelete(params.id)}
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
                  <FormLabel>birthDate</FormLabel>
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
      {/* <Card className="w-1/4">
          <div className="flex-row space-y-6 max-w-sm p-8">
            <h1>Product Image</h1>
          </div>
        </Card> */}
    </div>
  );
};
