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
  onDelete?: () => void;
}

export interface ExamProps {
  title?: string;
  description?: string;
  name?: string;
  imageUrl?: string;
  onDelete?: () => void;
}

export interface TemplateProps {
  name?: string;
  thumbnailUrl?: string;
}

export const TemplateSchema = z.object({
  name: z.string(),
  thumbnailUrl: z.string(),
});

export type BaseRow = {
  id: number | string;
};

export type TemplateValues = z.infer<typeof TemplateSchema>;

export interface ContentProps {
  title?: string;
  description?: string;
  name?: string;
  imageUrl?: string;
  onDelete?: () => void;
}

export interface VideoProps {
  title?: string;
  name?: string;
  description?: string;
  videoUrl?: string;
  onDelete?: () => void;
}

export const VideoSchema = z.object({
  name: z.string(),
  description: z.string(),
  videoUrl: z.string(),
});

export type VideoValues = z.infer<typeof VideoSchema>;

export interface ImageProps {
  title?: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  onDelete?: () => void;
}

export const ImageSchema = z.object({
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
});

export type ImageValues = z.infer<typeof ImageSchema>;

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

export const ExamSchema = z.object({
  title: z.string(),
  description: z.string(),
  name: z.string(),
  active: z.boolean(),
  imageUrl: z.string(),
});

export type ExamValues = z.infer<typeof ExamSchema>;

export interface ExamFormCreateProps {
  // title?: string;
  form: UseFormReturn<ExamValues>;

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
