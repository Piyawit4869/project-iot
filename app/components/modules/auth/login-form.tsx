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
import LogoImage from "/assets/images/rome.png";
import LogoUtotechImage from "/assets/images/logo.webp";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
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
      <div className="hidden lg:block relative w-3/4 h-screen">
        <img
          src={BgLogin}
          alt="Login Image"
          className="w-full h-full object-cover"
        />
        <div>
          <div className="absolute inset-0 flex items-center flex-col text-white bg-black/30">
            {/* <div className="absolute top-[10%] flex flex-col items-center">
              <p className="text-4xl font-bold mb-2">ROME</p>
              <p className="text-lg max-w-xl text-center">
                ปลดล็อกพลังแห่งระบบอัตโนมัติและเพิ่มประสิทธิภาพการทำงาน
                จัดการการเข้างาน บันทึกข้อมูล และจัดการ Work flow
                ของคุณได้อย่างง่ายดาย
              </p>
            </div> */}

            {/* <div className="absolute flex bottom-[10%] items-center flex-col text-white bg-black/30"> */}
            <div className="absolute bottom-5 left-5 flex flex-col items-center">
              <p className="text-md font-bold mb-2">
                © 2025 Copyrights All Rights Reserved powered by Utotech
                Co.,Ltd.
              </p>
            </div>

            <div className="absolute bottom-3 right-5 flex flex-col items-center">
              <a
                href="https://utotech.co.th/home"
                target="_blank"
                className="text-lg font-bold mb-2"
              >
                {/* https://utotech.co.th */}
                <img
                  src={LogoUtotechImage}
                  alt="logo"
                  width={60}
                  height={60}
                  className="w-full h-[60px] object-cover"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center px-6 py-12 lg:w-1/4">
        <div className="mb-8 flex flex-col items-center space-y-2 py-10 pt-6">
          <img
            src={LogoImage}
            alt="logo"
            width={120}
            height={120}
            className="w-full h-[200px] object-contain"
          />
          {/* <h1 className="text-2xl font-bold text-foreground">ROME</h1> */}

          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold mb-2">ROME</p>
            <p className="text-sm text-gray-500 max-w-xl text-center">
              ปลดล็อกพลังแห่งระบบอัตโนมัติและเพิ่มประสิทธิภาพการทำงาน
              จัดการการเข้างาน บันทึกข้อมูล และจัดการ Work flow
              ของคุณได้อย่างง่ายดาย
            </p>
          </div>
        </div>

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

            <div className="mt-1 flex flex-row justify-end  gap-2 text-gray-500">
              <Link to="/forgot-password" key="hover:underline">
                ลืมรหัสผ่าน
              </Link>
            </div>

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

        <div className="mt-10 flex flex-row gap-2">
          <a href="" className="hover:underline">
            นโยบายเว็บไซต์
          </a>
          |
          <a href="" className="hover:underline">
            นโยบายการรักษาความมั่นคงปลอดภัย
          </a>
        </div>
      </div>
    </div>
  );
}
