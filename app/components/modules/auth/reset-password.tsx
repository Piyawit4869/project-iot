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
import { useActionData, useNavigate, useNavigation, useSubmit } from "react-router";
import { loginFormSchema, type LoginFormValues } from "~/schemas/login";
import { GlobalModal } from "~/components/shared/modal/modal";
import { useModalStore } from "~/components/shared/modal/modal-controller";


export default function ResetPassword() {
  const form = useForm<any>({
    defaultValues: {
      // user: "",
      // password: "",
    },
  });
  const { isSubmitting, errors } = form.formState;
  const isProcessing = isSubmitting;
  const [showPassword, setShowPassword] = React.useState(false);
  const onSubmit = async (values: LoginFormValues) => {
    console.log("forgot password values:", values);
    // const payload = {
    //   user: values.user,
    //   password: values.password,
    // };

    // submit(payload, { method: "POST" });
  };
    const navigate = useNavigate();

  function confirmPassword() {
    GlobalModal.info({
      title: "ยืนยันการเปลี่ยนรหัสผ่าน",
      description:
        "คุณแน่ใจหรือไม่ว่าต้องการเปลี่ยนรหัสผ่านนี้?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      
        onConfirm: () => {
          navigate("/");
        },
  });
}
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
            </div> 

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
      <div className="w-full flex flex-col items-center justify-top px-6 py-12 lg:w-1/4">
        <div className="w-full flex flex-col items-start justify-top">
          <a
            href="/verify-otp"
            className="flex items-start gap-2 text-gray-700 hover:text-black"
          >
            <Icons.ArrowLeft className="w-5 h-5" />
          </a>
        </div>
        <div className="mb-4 flex flex-col items-center space-y-2 py-1 pt-1">
          <img
            src={LogoImage}
            alt="logo"
            width={120}
            height={120}
            className="w-full h-[200px] object-contain"
          />
          {/* <h1 className="text-2xl font-bold text-foreground">ROME</h1> */}

          <div className="flex flex-col items-center ">
            <p className="text-2xl font-bold mb-2">ROME</p>
            <p className="text-2xl font-bold mb-2">ตั้งรหัสผ่านใหม่</p>
          </div>
        </div>
        
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 w-full max-w-sm"
            >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รหัสผ่านใหม่</FormLabel>
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


            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        placeholder="ยืนยันรหัสผ่านใหม่"
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
                
                <GlobalButton
                    type="submit"
                    onClick={confirmPassword}
                    label={
                        <span className="flex items-center justify-center gap-2">
                            ยืนยันการเปลี่ยนรหัสผ่าน
                        </span>
                    }
                />
            </form>
            </Form>

        
      </div>
    </div>
  );
}