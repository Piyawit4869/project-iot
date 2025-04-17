"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import GlobalButton from "@/components/shared/global-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabcontrol } from "@/components/shared/topsection";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/shared/date-picker";
import { RequiredInput } from "@/components/shared/required-input";
import { getRequiredPaths } from "@/utils/getRequiredPathsFromZod";

import {
  CreateOrganizationFormValues,
  createOrgSchema,
} from "@/schemas/super-organization/organization";
import { useCreateOrganization } from "@/actions/super-organization/client/useGetOrganizations";
import { RequiredLabel } from "@/components/shared/required-label";

export const CreateOrganization = () => {
  const form = useForm<CreateOrganizationFormValues>({
    resolver: zodResolver(createOrgSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const { isSubmitting } = form.formState;
  const { mutate } = useCreateOrganization();

  const requiredFieldPaths = new Set(getRequiredPaths(createOrgSchema));
  function onSubmit(values: CreateOrganizationFormValues) {
    console.log("🔥 Form submitted", values);
    mutate(values, {
      onSuccess: (data) => {
        console.log("✅ Created successfully:", data);
      },
      onError: (err) => {
        console.error("❌ Failed to create:", err);
      },
    });
  }

  return (
    <div className="flex flex-col space-y-4 p-8 md:flex">
      <Tabcontrol
        title="Create Organization"
        backpath="/super-admin/organization"
        buttons={[
          <GlobalButton
            label="Create"
            key={"create button"}
            type="submit"
            loading={isSubmitting}
            form="organizations"
          />,
        ]}
      />
      <Form {...form}>
        <form id="organizations" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-8 mt-4 w-full">
            <div className="flex flex-2 flex-col">
              <Card className="space-y-4 p-8 ">
                <h2 className="text-xl font-bold underline">
                  Organization Information
                </h2>
                <div className="grid grid-cols-2 gap-8 mt-2 flex justify-center">
                  <FormField
                    control={form.control}
                    name="organization.active"
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
                    name="organization.registerVat"
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
                    name="organization.status"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="organization.status"
                          label={"Status"}
                          requiredFields={requiredFieldPaths}
                        />
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "newly_registered",
                                "active",
                                "loyal_customer",
                                "at_risk",
                                "churned",
                              ].map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
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
                    name="organization.fromType"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="organization.fromType"
                          label={"FromType"}
                          requiredFields={requiredFieldPaths}
                        />
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {["ordinary_person", "juristic_person"].map(
                                (item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="organization.taxId"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredInput
                        control={form.control}
                        label="Tax ID"
                        requiredFields={requiredFieldPaths}
                        {...field}
                      />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="organization.type"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="organization.type"
                          label={"Organization Type"}
                          requiredFields={requiredFieldPaths}
                        />
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "taxpayer",
                                "ordinary_partnership",
                                "shop",
                                "body_of_person",
                                "company_limited",
                                "public_company_limited",
                                "limited_partnership",
                                "foundation",
                                "association",
                                "joint_venture",
                                "others",
                              ].map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
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
                    name="organization.openingDate"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="organization.openingDate"
                          label={"OpeningDate"}
                          requiredFields={requiredFieldPaths}
                        />
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
                    name="organization.nameTh"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Name (TH)"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.nameEn"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Name (EN)"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.descriptionsTh"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Description (TH)"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organization.descriptionsEn"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Description (EN)"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Website Url"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.domainName"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Domain Name"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.logoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Logo Url"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                </div>

                <h2 className="text-xl font-bold underline">
                  Contact Information
                </h2>
                <div className="grid grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="organization.contactName"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Name"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Email"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="organization.contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Phone"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="organization.contactLine"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Line"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.contactFacebook"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Facebook"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.contactWhatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Whatsapp"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.contactWebsite"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Website"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.contactNote"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Note"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
              <Card className=" space-y-4 mt-4 p-8">
                <h2 className="text-xl font-bold underline">Address Info</h2>
                <div className="grid grid-cols-2 gap-8 mt-2">
                  <FormField
                    control={form.control}
                    name="organization.address.active"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="organization.address.active"
                          label={"Active"}
                          requiredFields={requiredFieldPaths}
                        />
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
                    name="organization.address.isMain"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="organization.address.isMain"
                          label={"IsMain"}
                          requiredFields={requiredFieldPaths}
                        />
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
                </div>
                <div className="grid grid-cols-2 gap-8 mt-2">
                  <FormField
                    control={form.control}
                    name="organization.address.language"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Language"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organization.address.name"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Name Address"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.building"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Building"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.roomNo"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Room No."
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.floorNo"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Floor No."
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.village"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Village Name"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.villageNo"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Village No."
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.houseNo"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="House No."
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.alley"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Alley"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.road"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Road"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.nation"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Nation"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.subDistrict"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Sub District"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.city"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="City"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.province"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Province"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Postal Code"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.address.note"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Note"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            </div>
            <div className="flex flex-1 flex-col">
              <Card className=" space-y-4 p-8">
                <h2 className="text-xl font-bold underline">User Profile</h2>
                <div className="grid grid-cols-2 gap-8 mt-2 flex justify-center">
                  <FormField
                    control={form.control}
                    name="organization.user.active"
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
                    name="organization.user.profile.isMobile"
                    render={({ field }) => (
                      <FormItem className="flex">
                        <FormLabel className="px-2">isMobile</FormLabel>
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
                    name="organization.user.email"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Email"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.user.password"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Password"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.user.userName"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Username"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.user.status"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="organization.user.status"
                          label={"Status"}
                          requiredFields={requiredFieldPaths}
                        />
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                {
                                  label: "New Resgiter",
                                  value: "newly_registered",
                                },
                                { label: "Active", value: "active" },
                                {
                                  label: "Loyal customer",
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
                    name="organization.user.profile.prefix"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="organization.user.profile.prefix"
                          label={"Prefix"}
                          requiredFields={requiredFieldPaths}
                        />
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                { label: "Mr", value: "mr" },
                                { label: "Ms", value: "ms" },
                                { label: "Mrs", value: "mrs" },
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
                    name="organization.user.profile.firstName"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="FirstName"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.user.profile.lastName"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="LastName"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.user.profile.birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="organization.user.profile.birthDate"
                          label={"BirthDate"}
                          requiredFields={requiredFieldPaths}
                        />
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
                    name="organization.user.profile.photoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Photo Url"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.user.profile.deviceToken"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Device Token"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="organization.user.profile.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem>
                          <RequiredInput
                            control={form.control}
                            label="Phone"
                            requiredFields={requiredFieldPaths}
                            {...field}
                          />
                        </FormItem>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
              <Card className=" space-y-4 mt-4 p-8">
                <h2 className="text-xl font-bold underline">Setting</h2>
                <FormField
                  control={form.control}
                  name="organization.setting.active"
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
                  name="organization.setting.theme"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel
                        fieldPath="organization.setting.theme"
                        label={"Theme"}
                        requiredFields={requiredFieldPaths}
                      />
                      <FormControl>
                        <Input placeholder="Enter Theme" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="organization.setting.textDisplay"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel
                        fieldPath="organization.setting.textDisplay"
                        label={"TextDisplay"}
                        requiredFields={requiredFieldPaths}
                      />
                      <FormControl>
                        <Input placeholder="Enter textDisplay" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="organization.setting.domainName"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel
                        fieldPath="organization.setting.domainName"
                        label={"Domain Name"}
                        requiredFields={requiredFieldPaths}
                      />
                      <FormControl>
                        <Input placeholder="Enter domainName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="organization.setting.defaultLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel
                        fieldPath="organization.setting.defaultLanguage"
                        label={"Default Language"}
                        requiredFields={requiredFieldPaths}
                      />
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Language" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              { label: "Thai", value: "th" },
                              { label: "English", value: "en" },
                              { label: "Japan", value: "jp" },
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
              </Card>
            </div>
          </div>
          <div className="flex gap-8 mt-4 w-full">
            <div className="flex flex-2 flex-col">
              <Card className="space-y-4 p-8 ">
                <h2 className="text-xl font-bold underline">
                  Branch Information
                </h2>
                <div className="grid grid-cols-2 gap-8 mt-2 flex justify-center">
                  <FormField
                    control={form.control}
                    name="branch.active"
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
                    name="branch.registerVat"
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
                    name="branch.isMain"
                    render={({ field }) => (
                      <FormItem className="flex">
                        <FormLabel className="px-2">isMain</FormLabel>
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
                </div>
                <div className="grid grid-cols-2 gap-8 mt-2 flex justify-center">
                  <FormField
                    control={form.control}
                    name="branch.status"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="branch.status"
                          label={"Status"}
                          requiredFields={requiredFieldPaths}
                        />
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "newly_registered",
                                "active",
                                "loyal_customer",
                                "at_risk",
                                "churned",
                              ].map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
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
                    name="branch.fromType"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="branch.fromType"
                          label={"FromType"}
                          requiredFields={requiredFieldPaths}
                        />
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {["ordinary_person", "juristic_person"].map(
                                (item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="branch.taxId"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredInput
                        control={form.control}
                        label="Tax ID"
                        requiredFields={requiredFieldPaths}
                        {...field}
                      />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="branch.type"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="branch.type"
                          label={"Branch Type"}
                          requiredFields={requiredFieldPaths}
                        />
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "taxpayer",
                                "ordinary_partnership",
                                "shop",
                                "body_of_person",
                                "company_limited",
                                "public_company_limited",
                                "limited_partnership",
                                "foundation",
                                "association",
                                "joint_venture",
                                "others",
                              ].map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
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
                    name="branch.openingDate"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="branch.openingDate"
                          label={"OpeningDate"}
                          requiredFields={requiredFieldPaths}
                        />
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
                    name="branch.nameTh"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Name (TH)"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.nameEn"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Name (EN)"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.descriptionsTh"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Description (TH)"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="branch.descriptionsEn"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Description (EN)"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="WebsiteUrl"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.logoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="logoUrl"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                </div>

                <h2 className="text-xl font-bold underline">
                  Contact Information
                </h2>
                <div className="grid grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="branch.contactName"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Name"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Email"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="branch.contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Phone"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="branch.contactLine"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Line"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.contactFacebook"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Facebook"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.contactWhatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Whatsapp"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.contactWebsite"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Website"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.contactNote"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Contact Note"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
              <Card className=" space-y-4 mt-4 p-8">
                <h2 className="text-xl font-bold underline">Address Info</h2>
                <div className="grid grid-cols-2 gap-8 mt-2">
                  <FormField
                    control={form.control}
                    name="branch.address.active"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="branch.address.active"
                          label={"Active"}
                          requiredFields={requiredFieldPaths}
                        />
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
                    name="branch.address.isMain"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="branch.address.isMain"
                          label={"Ismain"}
                          requiredFields={requiredFieldPaths}
                        />
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
                </div>
                <div className="grid grid-cols-2 gap-8 mt-2">
                  <FormField
                    control={form.control}
                    name="branch.address.language"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Language"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="branch.address.name"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Name Address"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.building"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Building"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.roomNo"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Room No."
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.floorNo"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Floor No."
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.village"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Village Name"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.villageNo"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Village No."
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.houseNo"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="House No."
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.alley"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Alley"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.road"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Road"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.nation"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Nation"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.subDistrict"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Sub District"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.city"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="City"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.province"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Province"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Postal Code"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.address.note"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Note"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            </div>
            <div className="flex flex-1 flex-col">
              <Card className=" space-y-4 p-8">
                <h2 className="text-xl font-bold underline">User Profile</h2>
                <div className="grid grid-cols-2 gap-8 mt-2 flex justify-center">
                  <FormField
                    control={form.control}
                    name="branch.user.active"
                    render={({ field }) => (
                      <FormItem className="flex">
                        <RequiredLabel
                          fieldPath="branch.user.active"
                          label={"Active"}
                          requiredFields={requiredFieldPaths}
                        />
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
                    name="branch.user.profile.isMobile"
                    render={({ field }) => (
                      <FormItem className="flex">
                        <FormLabel className="px-2">isMobile</FormLabel>
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
                    name="branch.user.email"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Email"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.user.password"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Password"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.user.userName"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Username"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.user.status"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="branch.user.status"
                          label={"Status"}
                          requiredFields={requiredFieldPaths}
                        />
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                {
                                  label: "New Resgiter",
                                  value: "newly_registered",
                                },
                                { label: "Active", value: "active" },
                                {
                                  label: "Loyal customer",
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
                    name="branch.user.profile.prefix"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="branch.user.profile.prefix"
                          label={"Prefix"}
                          requiredFields={requiredFieldPaths}
                        />
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                { label: "Mr", value: "mr" },
                                { label: "Ms", value: "ms" },
                                { label: "Mrs", value: "mrs" },
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
                    name="branch.user.profile.firstName"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="FirstName"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.user.profile.lastName"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="LastName"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.user.profile.birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredLabel
                          fieldPath="branch.user.profile.birthDate"
                          label={"BirthDate"}
                          requiredFields={requiredFieldPaths}
                        />
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
                    name="branch.user.profile.photoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Photo Url"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.user.profile.deviceToken"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Device Token"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                        v
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="branch.user.profile.phone"
                    render={({ field }) => (
                      <FormItem>
                        <RequiredInput
                          control={form.control}
                          label="Photo Url"
                          requiredFields={requiredFieldPaths}
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
              <Card className=" space-y-4 mt-4 p-8">
                <h2 className="text-xl font-bold underline">Setting</h2>
                <FormField
                  control={form.control}
                  name="branch.setting.active"
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
                  name="branch.setting.theme"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel
                        fieldPath="branch.setting.theme"
                        label={"Theme"}
                        requiredFields={requiredFieldPaths}
                      />
                      <FormControl>
                        <Input placeholder="Enter Theme" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branch.setting.textDisplay"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel
                        fieldPath="branch.setting.textDisplay"
                        label={"TextDisplay"}
                        requiredFields={requiredFieldPaths}
                      />
                      <FormControl>
                        <Input placeholder="Enter textDisplay" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branch.setting.domainName"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel
                        fieldPath="branch.setting.domainName"
                        label={"Domain Name"}
                        requiredFields={requiredFieldPaths}
                      />
                      <FormControl>
                        <Input placeholder="Enter domainName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="branch.setting.defaultLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <RequiredLabel
                        fieldPath="branch.setting.defaultLanguage"
                        label={"Default Language"}
                        requiredFields={requiredFieldPaths}
                      />
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Language" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              { label: "Thai", value: "th" },
                              { label: "English", value: "en" },
                              { label: "Japan", value: "jp" },
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
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
