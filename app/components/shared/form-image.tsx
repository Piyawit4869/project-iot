"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import ImageUpload from "./image-upload";
import MultiImageUpload from "./multi-upload-img";

type FormImageUploadProps = {
  name: string;
  label?: string;
  multiple?: boolean;
};

export function FormImageUpload({
  name,
  label,
  multiple = false,
}: FormImageUploadProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className="text-md">{label}</FormLabel>}
          <FormControl>
            {multiple ? (
              <MultiImageUpload
                value={field.value || []}
                onChange={field.onChange}
              />
            ) : (
              <ImageUpload
                value={field.value || ""}
                onChange={field.onChange}
                width={150}
                height={150}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
