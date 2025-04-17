import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RequiredLabel } from "./required-label";
import { Control, FieldValues } from "react-hook-form";

interface RequiredInputProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  name: keyof T & string;
  label: string;
  requiredFields: Set<string>;
  placeholder?: string;
}

export const RequiredInput = ({
  control,
  name,
  label,
  requiredFields,
  placeholder,
}: RequiredInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <RequiredLabel
            fieldPath={name}
            label={label}
            requiredFields={requiredFields}
          />
          <FormControl>
            <Input placeholder={placeholder || `Enter ${label}`} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
