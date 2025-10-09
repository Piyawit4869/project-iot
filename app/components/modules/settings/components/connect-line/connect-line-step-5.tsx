"use client";

import { Check, User2, ShieldCheck } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Section } from "./connect-line-step-5-section";

export const ConnectLineStep5 = () => {
  return (
    <div className="flex w-full flex-col space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500">
            <Check className="h-8 w-8 text-white" />
          </div>
          <p className="mt-3 text-lg font-semibold text-gray-800">
            เชื่อมต่อสำเร็จ
          </p>
        </div>

        <div className="px-6">
          <div className="rounded-xl border border-gray-200">
            <div className="flex items-center gap-4 p-5">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <User2 className="h-6 w-6 text-gray-500" />
                </div>
                <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-white" />
                </div>
              </div>

              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อช่องทาง</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234567890"
                        className="bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-6 px-6 pb-8">
          <Section title="เริ่มใช้งาน LINE OA ผ่าน Rome Chat ได้เลย">
            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
              <li>ทดลองพิมพ์จาก LINE OA และสนทนาผ่าน Rome Chat</li>
              <li>ถ้ามีการตอบกลับอัตโนมัติ ต้องวางลำดับ, รีบูท</li>
              <li>
                ดาวน์โหลดแอปพลิเคชันใน App Store และ Play Store
                เพื่อใช้งานผ่านโทรศัพท์มือถือ
              </li>
            </ul>
          </Section>

          <Section title="แจ้งปัญหาการใช้งาน">
            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
              <li>
                ติดต่อทีม Rome Chat ผ่าน LINE OA: @Romechat วันจันทร์ - วันศุกร์
                เวลา 10:00 - 18:00
              </li>
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
};
