import type { Controller } from "@ant-design/plots/es/core/annotation";
import React from "react";
import type {
  ControllerProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import z from "zod";

export interface StatusCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  valueColor?: string;
}

export interface NavCardProps {
  title: string;
  icon: React.ReactNode;
  valueColor?: string;
}

export interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export interface TopicContentProps {
  title?: string;
  description?: string;
  thumbnailUrl?: string;
}

export interface TestProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export const OnboardSchema = z.object({
  title: z.string(),
  department: z.string(),
  templete: z.string(),
});

export type OnboardValues = z.infer<typeof OnboardSchema>;

export interface OnboardFormCreateProps {
  // title?: string;
  form: UseFormReturn<OnboardValues>;

  // onClick?: (values: any) => void;
}

export const ContentSchema = z.object({
  title: z.string(),
  name: z.string(),
  department: z.string(),
  description: z.string(),
  thumbnailUrl: z.string(),
});

export type ContentValues = z.infer<typeof ContentSchema>;

export interface ContentFormCreateProps {
  // title?: string;
  form: UseFormReturn<ContentValues>;

  // onClick?: (values: any) => void;
}

export const TestSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
});

export type TestValues = z.infer<typeof TestSchema>;

export interface TestFormCreateProps {
  // title?: string;
  form: UseFormReturn<TestValues>;

  // onClick?: (values: any) => void;
}

export type UseOnboardProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  shouldUnregister?: boolean;
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  disabled?: boolean;
};
