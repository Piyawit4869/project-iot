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

export default function VerifyOtp() {
  const form = useForm<any>({
    defaultValues: {
      // user: "",
      // password: "",
    },
  });
  const { isSubmitting, errors } = form.formState;
  const isProcessing = isSubmitting;
  const navigate = useNavigate();

  const onSubmit = async (values: LoginFormValues) => {
    console.log("forgot password values:", values);
    // const payload = {
    //   user: values.user,
    //   password: values.password,
    // };

    // submit(payload, { method: "POST" });
  };
  function handleSendOTP() {
    GlobalModal.info({
      title: "ระบบจะส่งรหัสยืนยัน (OTP) ไปยังเบอร์/อีเมลนี้ \nคุณต้องการดำเนินการต่อหรือไม่?",
      description:
        "ให้ผู้ใช้ตรวจสอบว่ากรอกข้อมูลติดต่อถูกต้องก่อนระบบส่ง OTP จริง",
      confirmText: "ส่งรหัส",
      cancelText: "ยกเลิก",
      
      onConfirm: async () => {
        console.log("Sending OTP...");
        await new Promise((r) => setTimeout(r, 1000));
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
      <div className="w-full flex flex-col items-center justify-top px-6 py-12 lg:w-1/4">
        <div className="w-full flex flex-col items-start justify-top">
          <a
            href="/forgot-password"
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
            <p className="text-2xl font-bold mb-2">ยืนยันตัวตนของคุณ</p>
            <p className="text-sm  max-w-xl text-center">
              เราได้ส่งรหัส 6 หลักไปที่ xxx-xxx-1234
            </p>
          </div>
        </div>
        
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 w-full max-w-sm"
            >

                <FormField
                control={form.control}
                name="emailOrPhone"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                          <div className="flex justify-center gap-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                              <input
                                key={index}
                                maxLength={1}
                                className="
                                  w-12 h-12 
                                  border border-gray-300 
                                  rounded-lg 
                                  text-center 
                                  text-lg font-semibold 
                                  text-gray-800
                                  focus:outline-none
                                  focus:border-purple-500
                                  caret-purple-500
                                "
                              />
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                
                <p className="text-center text-gray-600">
                Countdown Timer: “เหลือเวลา{" "}
                <span className="font-bold">04:59</span>”
                </p>
                <GlobalButton
                type="submit"
                onClick={() => navigate("/reset-password")}

                label={
                    <span className="flex items-center justify-center gap-2">
                    <Icons.Check className="w-5 h-5" />
                        ยืนยัน
                    </span>
                }
                />
                <button
                type="button"
                className="w-full text-end text-sm text-gray-500 underline"
                >
                ส่งรหัสอีกครั้ง
                </button>
            </form>
            </Form>

        
      </div>
    </div>
  );
}