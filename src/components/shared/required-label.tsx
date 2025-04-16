import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SmartLabel } from "./smart-label";
import { Control } from "react-hook-form";

interface LabeledInputProps {
  control: Control<any>;
  name: string;
  label: string;
  requiredFields: Set<string>;
  placeholder?: string;
}

export const LabeledInput = ({
  control,
  name,
  label,
  requiredFields,
  placeholder,
}: LabeledInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <SmartLabel
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
