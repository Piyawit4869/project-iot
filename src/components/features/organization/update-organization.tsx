"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Control } from "@/components/shared/topsection";
import GlobalButton from "@/components/shared/global-button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  up_OrganizationFormValues,
  up_organizationSchema,
} from "@/schemas/super-organization/organization";
import {
  useGetOrganization,
  useUpdateOrganization,
} from "@/actions/super-organization/client/useGetOrganizations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/shared/date-picker";

export const UpdateOrganization = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data } = useGetOrganization(params.id);
  const form = useForm<up_OrganizationFormValues>({
    resolver: zodResolver(up_organizationSchema),
    mode: "onSubmit",
  });

  const { isSubmitting } = form.formState;
  const { mutate } = useUpdateOrganization(params.id);

  function onSubmit(values: up_OrganizationFormValues) {
    console.log("🔥 Form submitted", values);
    mutate(values, {
      onSuccess: (data) => {
        console.log("✅ Created successfully:", data);
        router.push("/super-admin/organization/");
      },
      onError: (err) => {
        console.error("❌ Failed to create:", err);
      },
    });
  }

  React.useEffect(() => {
    if (data) {
      const openingDate = data.openingDate
        ? new Date(data.openingDate)
        : undefined;

      form.reset({
        active: data.active || "",
        status: data.status || "",
        fromType: data.fromType || "",
        taxId: data.taxId || "",
        type: data.type || "",
        code: data.code || "",
        openingDate: openingDate,
        nameTh: data.nameTh || "",
        nameEn: data.nameEn || "",
        descriptionsTh: data.descriptionsTh || "",
        descriptionsEn: data.descriptionsEn || "",
        websiteUrl: data.websiteUrl || "",
        registerVat: data.registerVat || "",
        contactName: data.contactName || "",
        contactEmail: data.contactEmail || "",
        contactPhone: data.contactPhone || "",
        contactLine: data.contactLine || "",
        contactFacebook: data.contactFacebook || "",
        contactWhatsapp: data.contactWhatsapp || "",
        contactWebsite: data.contactWebsite || "",
        contactNote: data.contactNote || "",
        logoUrl: data.logoUrl || "",
      });
    }
  }, [data, form]);

  console.log(data);

  return (
    <div className="hidden flex-1 flex-col space-y-3 p-8 md:flex">
      <div>
        <Control
          title="Update Organization"
          backpath="/super-admin/organization"
          buttons={[
            <GlobalButton
              label="Edit"
              key={"update button"}
              type="submit"
              loading={isSubmitting}
              form="organizations"
            />,
          ]}
        />
      </div>
      <div className="flex gap-8">
        <Card className="w-full">
          <Form {...form}>
            <form
              id="organizations"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-row space-y-6 max-w-2xl p-8"
            >
              <h2 className="text-2xl font-bold underline">
                Organization Info
              </h2>

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex">
                    <FormLabel className="px-2">Active</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            {
                              label: "New Registered",
                              value: "newly_registered",
                            },
                            { label: "Active", value: "active" },
                            {
                              label: "Loyal Customer",
                              value: "loyal_customer",
                            },
                            { label: "Risk", value: "at_risk" },
                            { label: "Churned", value: "churned" },
                          ].map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fromType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            {
                              label: "Ordinary Person",
                              value: "ordinary_person",
                            },
                            {
                              label: "Juristic Person",
                              value: "juristic_person",
                            },
                          ].map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Id</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Tax Id" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            {
                              label: "Ordinary Person",
                              value: "taxpayer",
                            },
                            {
                              label: "Juristic Person",
                              value: "ordinary_partnership",
                            },
                            {
                              label: "Shop",
                              value: "shop",
                            },
                            {
                              label: "Body of Person",
                              value: "body_of_person",
                            },
                            {
                              label: "Company limited",
                              value: "company_limited",
                            },
                            {
                              label: "Public Company limited",
                              value: "public_company_limited",
                            },
                            {
                              label: "Limited Partnership",
                              value: "limited_partnership",
                            },
                            {
                              label: "Foundation",
                              value: "foundation",
                            },
                            {
                              label: "Association",
                              value: "association",
                            },
                            {
                              label: "joint_venture",
                              value: "joint_venture",
                            },
                            {
                              label: "others",
                              value: "others",
                            },
                          ].map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Code Organization{" "}
                      <span className="text-blue-500">(TH)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter Name Organization"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="openingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OpeningDate</FormLabel>
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
                name="nameTh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name Organization{" "}
                      <span className="text-blue-500">(TH)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter Name Organization"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nameEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name Organization
                      <span className="text-blue-500">(EN)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter Name Organization"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descriptionsTh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description <span className="text-blue-500">(TH)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descriptionsEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description <span className="text-blue-500">(EN)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WebsiteUrl</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter WebsiteUrl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registerVat"
                render={({ field }) => (
                  <FormItem className="flex">
                    <FormLabel className="px-2">Register VAT</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ContactName</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter ContactName"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ContactEmail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter ContactEmail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> ContactPhone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter ContactPhone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactLine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ContactLine</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter ContactLine"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactFacebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ContactFacebook</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter ContactFacebook"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactWhatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ContactWhatsapp</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter ContactWhatsapp"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ContactWebsite</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter ContactWebsite"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactNote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ContactNote</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter ContactNote"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>logoUrl</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter LogoUrl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};
