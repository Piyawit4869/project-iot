"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
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
import { UsersFormSchema, UsersFormValues } from "@/schemas/users/users";
import {
  useUpdateUsers,
  useDeleteUsers,
  useGetUsers,
} from "@/actions/user/client/useGetUsers";
import { DatePicker } from "@/components/shared/date-picker";
import ImageUpload from "@/components/shared/upload";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const EditUsers = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data } = useGetUsers(params.id);

  const form = useForm<UsersFormValues>({
    resolver: zodResolver(UsersFormSchema),
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      active: undefined,
      roleId: "",
      employeeRoleId: "",
      profile: {
        prefix: "",
        firstName: "",
        lastName: "",
        firstNameTh: "",
        lastNameTh: "",
        birthDate: undefined,
        photoUrl: "",
        phone: "",
      },
    },
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
      const birthDate = data.res.data.profile.birthDate
        ? new Date(data.res.data.profile.birthDate)
        : undefined;

      form.reset({
        status: data.res.data.status ?? "",
        email: data.res.data.email ?? "",
        userName: data.res.data.userName ?? "",
        active: data.res.data.active ?? "",
        roleId: data.res.data.roleId ?? "",
        employeeRoleId: data.res.data.employeeRoleId ?? "",
        profile: {
          prefix: data.res.data.profile.prefix ?? "",
          firstName: data.res.data.profile.firstName ?? "",
          lastName: data.res.data.profile.lastName ?? "",
          firstNameTh: data.res.data.profile.firstNameTh ?? "",
          lastNameTh: data.res.data.profile.lastNameTh ?? "",
          birthDate: birthDate,
          photoUrl: data.res.data.profile.photoUrl ?? "",
          phone: data.res.data.profile.phone ?? "",
        },
      });
    }
  }, [data, form]);

  return (
    <div className="hidden flex-1 flex-col space-y-3 p-8 md:flex">
      <div>
        <Control
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
      </div>
      <Form {...form}>
        <form id="users" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-8 mt-4 w-full">
            <div className="flex flex-3 flex-col gap-6">
              <Card className="p-6">
                <h1>Users Information</h1>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem className="mt-4">
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
                    name="profile.prefix"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Prefix</FormLabel>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {prefix.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profile.firstName"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>First Name</FormLabel>
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
                      <FormItem className="mt-4">
                        <FormLabel>Last Name</FormLabel>
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
                      <FormItem className="mt-4">
                        <FormLabel>First Name(Th)</FormLabel>
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
                      <FormItem className="mt-4">
                        <FormLabel>Last Name(Th)</FormLabel>
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
                      <FormItem className="mt-4">
                        <FormLabel>Birth Date</FormLabel>
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
              </Card>
              <Card className="p-6">
                <h1>Contact</h1>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mt-4">
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
                    name="profile.phone"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Phone</FormLabel>
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
                <h1>Role</h1>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="roleId"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Role</FormLabel>
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
                      <FormItem className="mt-4">
                        <FormLabel>Employee Role</FormLabel>
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
                <h1>User Image</h1>
                <FormField
                  control={form.control}
                  name="profile.photoUrl"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Image</FormLabel>
                      <FormControl>
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
                <h1>Active</h1>
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex mt-4">
                      <FormLabel>Active</FormLabel>
                      <FormControl className="ml-4">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
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

const prefix = [{ value: "Mr." }, { value: "Mrs." }, { value: "Ms." }];
