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
import PageNotFound from "public/assets/images/background.jpg";
import LogoImage from "public/assets/images/rome.png";
import { useActionData, useNavigation, useSubmit } from "react-router";
import { loginFormSchema, type LoginFormValues } from "~/schemas/login";

export default function LoginForm() {
  const { state } = useNavigation();

  const action = useActionData();

  const submit = useSubmit();

  const [showPassword, setShowPassword] = React.useState(false);

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
      <div className="hidden lg:block relative w-1/2 h-screen">
        <img
          src={PageNotFound}
          alt="Login Image"
          // fill
          className="w-full h-full object-cover"
          // priority
        />
        <div className="absolute inset-0 flex items-center justify-center px-10 text-white bg-black/30 ">
          <div>
            <p className="text-4xl font-bold mb-4">Rome</p>
            <p className="text-lg max-w-lg">
              ปลดล็อกพลังแห่งระบบอัตโนมัติและเพิ่มประสิทธิภาพการทำงาน
              จัดการการเข้างาน บันทึกข้อมูล และจัดการ Work flow
              ของคุณได้อย่างง่ายดาย
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20 sm:mt-30 md:mt-40 mb-4 sm:mb-6 w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
        <div className="lg:hidden mb-8 flex flex-col items-center space-y-2 py-10 pt-6">
          <img
            src={LogoImage}
            alt="logo"
            width={0}
            height={0}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
          <h1 className="text-2xl font-bold text-foreground">ROME</h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-sm"
          >
            <div className="flex justify-center">
              <h2 className="text-lg font-semibold text-foreground">
                เข้าสู่ระบบ
              </h2>
            </div>

            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อผู้ใช้งาน / อีเมล</FormLabel>
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
                  <FormLabel>รหัสผ่าน</FormLabel>
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
              label="เข้าสู่ระบบ"
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
