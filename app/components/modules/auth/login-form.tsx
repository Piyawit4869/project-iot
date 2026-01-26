import * as Icons from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";

import React from "react";
import GlobalButton from "~/components/shared/global-button";
import BgLogin from "/assets/images/bg-login.png";
import LogoImage from "/assets/images/rome.svg";
import LogoUtotechImage from "/assets/images/logo.webp";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { loginFormSchema, type LoginFormValues } from "~/schemas/login";
import WebSitePolicyDialog from "~/components/modules/auth/web-policy";
import { useState } from "react";
import SavePolicyDialog from "~/components/modules/auth/save-policy";

export default function LoginForm() {
  const { state } = useNavigation();

  const action = useActionData();

  const submit = useSubmit();

  const [showPassword, setShowPassword] = React.useState(false);
  const [openWeb, setWebPoOpen] = React.useState<boolean>(false);
  const [openSave, setSavePoOpen] = React.useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const { isSubmitting, errors } = form.formState;
  const isProcessing = isSubmitting;

  const onSubmit = async (values: LoginFormValues) => {
    const payload = {
      user: values.user,
      password: values.password,
    };

    submit(payload, { method: "POST" });
  };
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full flex flex-col items-center justify-center px-6 py-12">
        <div className="mb-8 flex flex-col items-center space-y-2 py-10 pt-6"></div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-sm"
          >
            <div className="flex justify-center">
              <h2 className="text-xl font-semibold text-foreground">
                เข้าสู่ระบบ
              </h2>
            </div>

            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Icons.Mail className="w-5 h-5" />
                    ชื่อผู้ใช้งาน / อีเมล
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="กรอกชื่อผู้ใช้งาน/อีเมล" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Icons.UnlockIcon className="w-5 h-5" />
                    รหัสผ่าน
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        placeholder="กรอกรหัสผ่าน"
                      />
                      <div
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <Icons.Eye /> : <Icons.EyeOff />}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span className="w-full flex justify-center text-red-600">
              {action?.error}
            </span>
            <GlobalButton
              label={
                <span className="flex items-center justify-center gap-2 -translate-x-1">
                  <Icons.LogIn className="w-5 h-5" />
                  เข้าสู่ระบบ
                </span>
              }
              type="submit"
              loading={
                isProcessing || state === "submitting" || state === "loading"
              }
            />

            {errors?.root?.serverError?.type === "401" && (
              <p className="text-red-600 text-center">
                ชื่อผู้ใช้งาน / อีเมล หรือ รหัสผ่านไม่ถูกต้อง
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
