"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  CreateFormValues,
  createOrgSchema,
} from "@/schemas/super-organization/organization";
import { useCreateOrganization } from "@/actions/super-organization/client/useGetOrganizations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/shared/global-date";

export const CreateOrganization = () => {
  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createOrgSchema),
    mode: "onSubmit",
  });
  console.log("errors:", form.formState.errors);

  const { isSubmitting } = form.formState;
  const { mutate } = useCreateOrganization();

  function onSubmit(values: CreateFormValues) {
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
    <div className="hidden flex-1 flex-col space-y-3 p-8 md:flex">
      <div>
        <Control
          title="Create Organization"
          backpath="/superadmin/organization"
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
                name="organization.status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
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
                    <FormLabel>From Type</FormLabel>
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
              <FormField
                control={form.control}
                name="organization.taxId"
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
                name="organization.type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Type</FormLabel>
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
                    <FormLabel>OpeningDate</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onChange={field.onChange}
                        placeholder="Select your OpeningDate date"
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
                name="organization.nameEn"
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
                name="organization.descriptionsTh"
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
                name="organization.descriptionsEn"
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
                name="organization.websiteUrl"
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
                name="organization.contactName"
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
                name="organization.contactEmail"
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
                name="organization.contactPhone"
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
                name="organization.contactLine"
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
                name="organization.contactFacebook"
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
                name="organization.contactWhatsapp"
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
                name="organization.contactWebsite"
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
                name="organization.contactNote"
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
                name="organization.logoUrl"
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
              <FormField
                control={form.control}
                name="organization.domainName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DomainName</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter DomainName" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h2 className="text-2xl font-bold underline">Address Info</h2>

              <FormField
                control={form.control}
                name="organization.address.active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active</FormLabel>
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
                name="organization.address.language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>language</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter language" {...field} />
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
                    <FormLabel>isMain</FormLabel>
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
                name="organization.address.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter Name Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.building"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Building</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Building" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.roomNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>roomNo</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Room No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.floorNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>floorNo</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter floor No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.village"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Village</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Village" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.villageNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>villageNo</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter village No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.houseNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House No</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter House No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.alley"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alley</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Alley" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.road"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Road</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Road" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.nation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nation</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Nation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.subDistrict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SubDistrict</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter SubDistrict"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Province" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PostalCode</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter PostalCode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.address.note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Room Note" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h2 className="text-2xl font-bold underline">User Profile</h2>

              <FormField
                control={form.control}
                name="organization.user.active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active</FormLabel>
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
                name="organization.user.status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
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
                name="organization.user.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.user.password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.user.userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter UserName" {...field} />
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
                    <FormLabel>Prefix</FormLabel>
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
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Firstname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.user.profile.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Lastname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.user.profile.birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onChange={field.onChange}
                        placeholder="Select your birth date"
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
                    <FormLabel>Profile Url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter Profile Url"
                        {...field}
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
                name="organization.user.profile.deviceToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DeviceToken</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter DeviceToken"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization.user.profile.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h2 className="text-2xl font-bold underline">Setting</h2>
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
                    <FormLabel>Theme</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Theme" {...field} />
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
                    <FormLabel>textDisplay</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter textDisplay"
                        {...field}
                      />
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
                    <FormLabel>domainName</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter domainName" {...field} />
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
                    <FormLabel>Default Language</FormLabel>
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

              <h2 className="text-2xl font-bold underline">Branch Info</h2>

              <FormField
                control={form.control}
                name="branch.active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active</FormLabel>
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
                  <FormItem>
                    <FormLabel>isMain</FormLabel>
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
                name="branch.status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
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
                    <FormLabel>From Type</FormLabel>
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
              <FormField
                control={form.control}
                name="branch.taxId"
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
                name="branch.type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch Type</FormLabel>
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
                    <FormLabel>OpeningDate</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onChange={field.onChange}
                        placeholder="Select your OpeningDate date"
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
                    <FormLabel>
                      Name branch <span className="text-blue-500">(TH)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter Name branch"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.nameEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name branch <span className="text-blue-500">(EN)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter Name branch"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="branch.descriptionsTh"
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
                name="branch.descriptionsEn"
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
                name="branch.websiteUrl"
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
                name="branch.registerVat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Register VAT</FormLabel>
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
                name="branch.contactName"
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
                name="branch.contactEmail"
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
                name="branch.contactPhone"
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
                name="branch.contactLine"
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
                name="branch.contactFacebook"
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
                name="branch.contactWhatsapp"
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
                name="branch.contactWebsite"
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
                name="branch.contactNote"
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
                name="branch.logoUrl"
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

              <h2 className="text-2xl font-bold underline">Address Info</h2>

              <FormField
                control={form.control}
                name="branch.address.active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active</FormLabel>
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
                name="branch.address.language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>language</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter language" {...field} />
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
                    <FormLabel>isMain</FormLabel>
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
                name="branch.address.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter Name Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.building"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Building</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Building" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.roomNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>roomNo</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Room No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.floorNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>floorNo</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter floor No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.village"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Village</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Village" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.villageNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>villageNo</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter village No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.houseNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House No</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter House No" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.alley"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alley</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Alley" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.road"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Road</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Road" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.nation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nation</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Nation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.subDistrict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SubDistrict</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter SubDistrict"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Province" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PostalCode</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter PostalCode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.address.note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Room Note" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h2 className="text-2xl font-bold underline">User Profile</h2>

              <FormField
                control={form.control}
                name="branch.user.active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active</FormLabel>
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
                name="branch.user.status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
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
                name="branch.user.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.user.password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.user.userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter UserName" {...field} />
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
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Firstname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.user.profile.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Lastname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.user.profile.birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value}
                        onChange={field.onChange}
                        placeholder="Select your birth date"
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
                    <FormLabel>Profile Url</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter Profile Url"
                        {...field}
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
                name="branch.user.profile.deviceToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DeviceToken</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter DeviceToken"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch.user.profile.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h2 className="text-2xl font-bold underline">Setting</h2>
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
                    <FormLabel>Theme</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter Theme" {...field} />
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
                    <FormLabel>textDisplay</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please Enter textDisplay"
                        {...field}
                      />
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
                    <FormLabel>domainName</FormLabel>
                    <FormControl>
                      <Input placeholder="Please Enter domainName" {...field} />
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
                    <FormLabel>Default Language</FormLabel>
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
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};
