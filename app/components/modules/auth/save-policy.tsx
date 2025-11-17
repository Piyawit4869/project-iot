import * as React from "react";

import SectionWithImage from "~/components/modules/auth/SectionWithImage";
import LogoImage from "/assets/images/rome.svg";
import PolicyImage1 from "/assets/images/pana.png";
import PolicyImage2 from "/assets/images/Illustration.png";
import PolicyImage3 from "/assets/images/Art.png";
import PolicyImage4 from "/assets/images/rafiki.png";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { SidePanel } from "~/utils/enum";

type Props = {
  openSave: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SavePolicyDialog({ openSave, setOpen }: Props) {
  return (
    <Dialog open={openSave} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-4xl w-full max-h-[96vh] overflow-auto rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์ (Security Policy)
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center pt-2 pb-6">
          <img
            src={LogoImage}
            alt="logo"
            className="w-[80px] h-[80px] object-contain"
          />
        </div>

        <div className="space-y-20 px-2">

          <SectionWithImage
            title="1. วัตถุประสงค์"
            content={`นโยบายนี้จัดทำขึ้นเพื่อกำหนดแนวทางและมาตรการในการรักษาความมั่นคงปลอดภัยของเว็บไซต์และระบบสารสนเทศของหน่วยงาน เพื่อให้การให้บริการข้อมูลแก่ประชาชนเป็นไปอย่างมั่นคง ปลอดภัย และเชื่อถือได้ รวมถึงป้องกันไม่ให้เกิดการเข้าถึง การทำลาย หรือการใช้ข้อมูลโดยมิชอบด้วยกฎหมาย\nทั้งนี้ เพื่อให้เป็นไปตามแนวทางของหน่วยงานภาครัฐ และสอดคล้องกับหลักเกณฑ์ด้านความมั่นคงปลอดภัยไซเบอร์ของประเทศไทย`}
            image={PolicyImage1}
            position= {SidePanel.LEFT}
          />

          <SectionWithImage
            title="2. มาตรการด้านความมั่นคงปลอดภัย"
            content={`หน่วยงานได้ดำเนินมาตรการด้านเทคนิคและการบริหารจัดการเพื่อคุ้มครองเว็บไซต์และข้อมูล โดยครอบคลุมในประเด็นหลัก ดังนี้

            2.1 การรักษาความลับ (Confidentiality): จำกัดสิทธิ์การเข้าถึงข้อมูลเฉพาะผู้ที่ได้รับอนุญาต และเข้ารหัสข้อมูลสำคัญในการส่งผ่านทางอินเทอร์เน็ต
            2.2 ความถูกต้องครบถ้วน (Integrity): ใช้มาตรการป้องกันการแก้ไขข้อมูลโดยไม่ได้รับอนุญาต รวมถึงเก็บประวัติ Log การใช้งาน
            2.3 ความพร้อมใช้งาน (Availability): มีระบบสำรองข้อมูลและแผนฟื้นฟูระบบ (DRP)
            2.4 การป้องกันการโจมตี (Cyber Defense): ใช้ Firewall, IDS/IPS, ระบบตรวจจับมัลแวร์ และอัปเดตแพตช์สม่ำเสมอ
            2.5 การเชื่อมต่อปลอดภัย: ใช้มาตรฐาน HTTPS / SSL Certificate`}
            className="mt-16"
          />

          <SectionWithImage
            title="3. การจัดการเหตุการณ์ด้านความมั่นคงปลอดภัย (Incident Response)"
            content={`ในกรณีที่เกิดเหตุด้านความมั่นคงปลอดภัย หน่วยงานมีขั้นตอนดังนี้:

• ตรวจสอบและยืนยันเหตุการณ์ เช่น DDoS, การเจาะระบบ, ข้อมูลรั่วไหล
• แจ้งเตือนเจ้าหน้าที่ผู้รับผิดชอบ
• ทำการกักกัน (Containment) และแก้ไขปัญหา
• วิเคราะห์สาเหตุและจัดทำรายงาน Post-Incident Report
• แจ้ง ThaiCERT หรือหน่วยงานที่เกี่ยวข้องหากเข้าข่าย`}
            image={PolicyImage2}
            position= {SidePanel.LEFT}
          />

          <SectionWithImage
            title="4. การบริหารจัดการสิทธิ์และบัญชีผู้ใช้งาน"
            content={`เพื่อป้องกันการเข้าถึงระบบโดยไม่ได้รับอนุญาต หน่วยงานมีกระบวนการดังนี้:

• กำหนด Username/Password ที่ปลอดภัย
• จำกัดสิทธิ์ตามหน้าที่ (Least Privilege)
• ตรวจสอบรายการบัญชีผู้ใช้ประจำ
• ระงับบัญชีทันทีเมื่อพ้นสภาพการเป็นเจ้าหน้าที่`}
            image={PolicyImage3}
            position="right"
          />

          <SectionWithImage
            title="5. การอบรมและสร้างจิตสำนึกด้านความปลอดภัยไซเบอร์"
            content={`หน่วยงานจัดอบรมและให้ความรู้แก่เจ้าหน้าที่อย่างต่อเนื่อง เพื่อให้ตระหนักถึงภัยคุกคามไซเบอร์ วิธีใช้งานระบบอย่างปลอดภัย และมีคู่มือ/แนวทางการปฏิบัติให้ศึกษา`}
          />

          <SectionWithImage
            title="6. การตรวจสอบและประเมินความปลอดภัย"
            content={`ดำเนินการตรวจสอบความปลอดภัยเว็บไซต์เป็นประจำ อย่างน้อยปีละ 1 ครั้ง รวมถึงทดสอบเจาะระบบ (PenTest) โดยผู้เชี่ยวชาญภายนอกหากจำเป็น`}
            image={PolicyImage4}
            position= {SidePanel.LEFT}
          />

          <SectionWithImage
            title="7. การปรับปรุงและทบทวนนโยบาย"
            content={`หน่วยงานจะทบทวนและปรับปรุงนโยบายนี้อย่างน้อยปีละครั้ง หรือเมื่อเทคโนโลยีหรือกฎหมายมีการเปลี่ยนแปลง เพื่อให้สอดคล้องกับภัยคุกคามที่เปลี่ยนแปลง`}
            position= {SidePanel.RIGHT}
          />
        </div>

        <div className="text-center py-6">
          <p className="text-gray-500 text-sm mt-4">
            ปรับปรุงล่าสุด: 14 พฤศจิกายน 2568
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
