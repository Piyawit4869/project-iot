import ImageUpload from "./image-upload";
import * as Icons from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "~/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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
  Name extends Path<T> = Path<T>
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
  disable?: boolean;
}

const Spinner = () => (
  <div className="ml-2 w-4 h-4 border-2 border-t-transparent border-gray-400 rounded-full animate-spin" />
);

const InputWrapper = ({
  children,
  loading,
}: {
  children: React.ReactNode;
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
  disable = false,
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
                  disabled={disable}
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
                      disabled={disable}
                      placeholder={placeholder}
                      onChange={handleStringChange}
                    />
                  ) : type === "switch" ? (
                    <Switch
                      checked={Boolean(field.value)}
                      disabled={disable}
                      onCheckedChange={(v) => {
                        field.onChange(v);
                        onChange?.(v as T[Name]);
                      }}
                    />
                  ) : type === "select" ? (
                    <Select
                      disabled={disable}
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
                        disabled={disable}
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
                      disabled={disable}
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
