"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrgSchema } from "@/schemas/super-organization/organization";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormData = z.infer<typeof createOrgSchema>;

export function CreateOrganization() {
  const form = useForm<FormData>({
    resolver: zodResolver(createOrgSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <h2 className="text-2xl font-bold underline">Organization Info</h2>

        <FormField
          control={form.control}
          name="organization.active"
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
          name="organization.registerVat"
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
          name="organization.logoUrl"
          render={({}) => (
            <FormItem>
              <FormLabel>Organization Logo</FormLabel>
              <FormControl>
                <img
                  src={
                    "https://storage.googleapis.com/utotech-storage/download-2a2a55a7ff974009a7b736db38384d68719223.png"
                  }
                  alt="Logo"
                  className="w-32 h-32 object-cover rounded"
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
                Name Organization <span className="text-blue-500">(TH)</span>
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
                Name Organization <span className="text-blue-500">(EN)</span>
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
                <Input placeholder="Please Enter Description" {...field} />
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
                <Input placeholder="Please Enter Description" {...field} />
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
        <FormField
          control={form.control}
          name="organization.status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder="Please Enter Status" {...field} />
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
                <Input placeholder="Please Enter From Type" {...field} />
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
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="Please Enter Type" {...field} />
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
          name="organization.contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ContactName</FormLabel>
              <FormControl>
                <Input placeholder="Please Enter ContactName" {...field} />
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
                <Input placeholder="Please Enter ContactEmail" {...field} />
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
                <Input placeholder="Please Enter ContactPhone" {...field} />
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
                <Input placeholder="Please Enter ContactLine" {...field} />
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
                <Input placeholder="Please Enter ContactFacebook" {...field} />
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
                <Input placeholder="Please Enter ContactWhatsapp" {...field} />
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
                <Input placeholder="Please Enter ContactWebsite" {...field} />
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
                <Input placeholder="Please Enter ContactNote" {...field} />
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
                <Input placeholder="Please Enter Name Address" {...field} />
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
                <Input placeholder="Please Enter SubDistrict" {...field} />
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
                <Input placeholder="Please Enter Status" {...field} />
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
          name="organization.logoUrl"
          render={({}) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <img
                  src={
                    "https://storage.googleapis.com/utotech-storage/download-2a2a55a7ff974009a7b736db38384d68719223.png"
                  }
                  alt="Logo"
                  className="w-32 h-32 object-cover rounded"
                />
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
              <FormLabel>BirthDate</FormLabel>
              <FormControl>
                <Input placeholder="Please Enter BirthDate" {...field} />
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
                <Input placeholder="Please Enter DeviceToken" {...field} />
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

        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </Form>
  );
}
