"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface OtpInputProps {
  name: string;
  label?: string;
  required?: boolean;
  length?: number; // ⬅️ Custom input length
}

export const OtpInput: React.FC<OtpInputProps> = ({
  name,
  label = "OTP",
  required = false,
  length = 6, // default to 6 digits if not specified
}) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{
        required,
        minLength: length,
        maxLength: length,
      }}
      render={({ field }) => {
        const handleChange = (index: number, value: string) => {
          const raw = field.value?.padEnd(length, " ") || " ".repeat(length);
          const updated = raw
            .split("")
            .map((char: string, i: number) =>
              i === index ? value.slice(-1) : char
            )
            .join("")
            .replace(/ /g, "");
          setValue(name, updated);
        };

        const handleKeyDown = (
          e: React.KeyboardEvent<HTMLInputElement>,
          index: number
        ) => {
          const target = e.target as HTMLInputElement;
          if (e.key === "Backspace" && !target.value && index > 0) {
            const prev = document.getElementById(`${name}-${index - 1}`);
            prev?.focus();
          }
        };

        return (
          <FormItem>
            <FormLabel>
              {label}
              {required && <span className="text-red-500"> *</span>}
            </FormLabel>
            <FormControl>
              <div className="flex gap-1">
                {Array.from({ length }).map((_, i) => (
                  <Input
                    key={i}
                    id={`${name}-${i}`}
                    maxLength={1}
                    className="w-8 text-center p-[4px]"
                    value={field.value?.[i] || ""}
                    onChange={(e) => {
                      handleChange(i, e.target.value);
                      if (e.target.value && i < length - 1) {
                        const next = document.getElementById(
                          `${name}-${i + 1}`
                        );
                        next?.focus();
                      }
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                  />
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
