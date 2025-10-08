import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldValues, Path } from "react-hook-form";
import { ReactNode } from "react";
import { cn } from "@/libs/utils";
import ImageUpload from "./image-upload";
import * as Icons from "lucide-react";

type FieldType =
  | "input"
  | "textarea"
  | "switch"
  | "select"
  | "date"
  | "image"
  | "password";

interface GlobalFormFieldProps<
  T extends FieldValues,
  Name extends Path<T> = Path<T>,
> {
  control: Control<T>;
  name: Name;
  label: string;
  checkFields: Set<string>;
  placeholder?: string;
  type: FieldType;
  selectOptions?: { label: string; value: string }[];
  className?: string;
  onChange?: (value: T[Name]) => void;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  showPassword?: boolean;
  loading?: boolean;
}

const Spinner = () => (
  <div className="ml-2 w-4 h-4 border-2 border-t-transparent border-gray-400 rounded-full animate-spin" />
);

const InputWrapper = ({
  children,
  loading,
}: {
  children: ReactNode;
  loading: boolean;
}) => (
  <div className="relative w-full">
    {children}
    {loading && (
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    )}
  </div>
);

export const GlobalFormField = <T extends FieldValues, Name extends Path<T>>({
  control,
  name,
  label,
  checkFields,
  placeholder,
  type,
  selectOptions = [],
  className,
  onChange,
  setShowPassword,
  showPassword = false,
  loading = false,
}: GlobalFormFieldProps<T, Name>) => {
  const isRequired = checkFields.has(name as string);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleStringChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          field.onChange(e);
          onChange?.(e.target.value as T[Name]);
        };

        return (
          <FormItem>
            <FormLabel className={cn(className)}>
              {isRequired && <span className="text-red-500">*</span>}
              {label}
            </FormLabel>
            <FormControl>
              {type === "image" ? (
                <ImageUpload
                  value={field.value}
                  onChange={(v) => {
                    field.onChange(v);
                    onChange?.(v as T[Name]);
                  }}
                />
              ) : (
                <InputWrapper loading={loading}>
                  {type === "textarea" ? (
                    <Textarea
                      {...field}
                      placeholder={placeholder}
                      onChange={handleStringChange}
                    />
                  ) : type === "switch" ? (
                    <Switch
                      checked={Boolean(field.value)}
                      onCheckedChange={(v) => {
                        field.onChange(v);
                        onChange?.(v as T[Name]);
                      }}
                    />
                  ) : type === "select" ? (
                    <Select
                      value={field.value}
                      onValueChange={(v) => {
                        field.onChange(v as T[Name]);
                        onChange?.(v as T[Name]);
                      }}
                    >
                      <SelectTrigger type="button" className="w-full">
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {selectOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : type === "password" ? (
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        placeholder="กรอกรหัสผ่าน"
                      />
                      <div
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword?.((prev) => !prev)}
                      >
                        {showPassword ? <Icons.Eye /> : <Icons.EyeOff />}
                      </div>
                    </div>
                  ) : (
                    <Input
                      {...field}
                      type="text"
                      placeholder={placeholder}
                      onChange={handleStringChange}
                    />
                  )}
                </InputWrapper>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
