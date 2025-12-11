import { TabControl } from "~/components/shared/tab-control";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import {
  GraduationCap,
  CheckCircle,
  XCircle,
  ClockAlert,
  Users,
  BookOpen,
  Settings,
} from "lucide-react";
import peopleplaycomputer from "/assets/images/imgindex.png";
import { Link } from "react-router";
import { StatusCount } from "./components/cardcountstatus";
import { NavCard } from "./components/navigatecard";

export default function OnboardOverview() {
  return (
    <>
      <div className="flex flex-col w-full space-y-4 p-8 dark:bg-background">
        <TabControl title="ออนบอร์ด" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-8">
        <div className="col-span-1 lg:col-span-3 space-y-6">
          <Card className="w-full p-6 flex flex-col md:flex-row items-center md:items-start gap-6 bg-gradient-to-r from-blue-200 to-green-200">
            <img
              src={peopleplaycomputer}
              alt="peopleplaycomputercartoonimage"
              className="w-[265px] h-[265px] object-contain"
            />
            <CardContent className="flex flex-col flex-1 p-0 md:p-8 leading-relaxed text-White-700">
              <CardTitle className="text-2xl font-bold text-White-800 mb-2 pt-10 text-center md:text-left">
                Dashboard Onboarding
              </CardTitle>
              ระบบเรียนรู้ออนไลน์ที่ช่วยให้พนักงานใหม่ทำความเข้าใจองค์กร
              บทบาทงาน กระบวนการทำงาน และนโยบายต่าง ๆ
              ได้ด้วยตัวเองแบบเป็นขั้นตอนในที่เดียว ทั้งบทเรียน วิดีโอ แบบทดสอบ
              และระบบประเมินผล ช่วยให้การ Onboarding เป็นมาตรฐานเดียวกัน
              ลดความสับสนและทำให้พนักงานเริ่มงานได้เร็วขึ้น
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatusCount
              title="ผู้เรียนทั้งหมด"
              value={28}
              icon={<GraduationCap className="h-10 w-10 text-black" />}
            />

            <StatusCount
              title="ผ่านแล้ว"
              value={14}
              icon={<CheckCircle className="h-10 w-10 text-green-600" />}
            />

            <StatusCount
              title="ยังไม่ผ่าน"
              value={14}
              icon={<XCircle className="h-10 w-10 text-red-600" />}
            />

            <StatusCount
              title="เกินเวลา"
              value={14}
              icon={<ClockAlert className="h-10 w-10 text-red-500" />}
            />
          </div>
        </div>
        <div className="col-span-1 space-y-4">
          <Link to="/on-boarding/create" className="block">
            <NavCard
              icon={<BookOpen className="h-10 w-10" />}
              title="จัดการหลักสูตร On-Boarding"
            />
          </Link>
          <Link to="/on-boarding/#" className="block">
            <NavCard
              icon={<Users className="h-10 w-10" />}
              title="รู้จักทีมและเพื่อนร่วมงาน"
            />
          </Link>
          <Link to="/on-boarding/#" className="block">
            <NavCard
              icon={<Settings className="h-10 w-10" />}
              title="ตั้งค่า On-Boarding"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
