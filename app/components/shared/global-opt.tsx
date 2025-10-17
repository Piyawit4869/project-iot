import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpInputProps {
  value?: string;
  onChange?: (value: string) => void;
  groups?: number[];
}

export const OtpInput = ({
  value = "",
  onChange,
  groups = [3, 3, 4],
}: OtpInputProps) => {
  const totalLength = groups.reduce((sum, num) => sum + num, 0);
  const sanitizedValue = value.replace(/\D/g, "").slice(0, totalLength);

  const handleChange = (val: string) => {
    const numericOnly = val.replace(/\D/g, "");
    onChange?.(numericOnly.slice(0, totalLength));
  };

  let currentIndex = 0;

  return (
    <InputOTP
      value={sanitizedValue}
      onChange={handleChange}
      maxLength={totalLength}
    >
      {groups.map((count, i) => {
        const group = (
          <InputOTPGroup key={i}>
            {Array.from({ length: count }).map((_, idx) => (
              <InputOTPSlot key={idx} index={currentIndex + idx} />
            ))}
          </InputOTPGroup>
        );
        const separator = i < groups.length - 1;
        currentIndex += count;
        return (
          <React.Fragment key={`group-${i}`}>
            {group}
            {separator}
          </React.Fragment>
        );
      })}
    </InputOTP>
  );
};
