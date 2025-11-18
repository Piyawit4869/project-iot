"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  UserRoundCog,
  Landmark,
  Trash2,
} from "lucide-react";
import { UserProfileCardProps } from "../constants/type";

export default function UserProfileCard({
  data,
  onDelete,
  onChangeRole,
}: UserProfileCardProps) {
  return (
    <Card className="flex w-[510px] h-[260px] overflow-hidden shadow-md rounded-2xl">
      <div className="w-[34%] bg-primary flex flex-col items-center justify-center">
        <Avatar className="w-[84px] h-[84px] ring-4 ring-white/20">
          {data.photoUrl && <AvatarImage src={data.photoUrl} />}
          <AvatarFallback className="text-xl">
            {data.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>

      <CardContent className="flex-1 relative p-6">
        <span className="absolute top-2 right-2 w-3 h-3 border-t-4 border-r-4 border-primary rotate-45" />

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold leading-5">{data.name}</h2>
            <span className="text-muted-foreground text-xs">
              ({data.mainRole})
            </span>
          </div>

          <Button
            size="sm"
            variant="secondary"
            className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs h-7"
            onClick={() => onChangeRole?.(data.id)}
          >
            ย้ายตำแหน่ง
            <Landmark className="w-3 h-3 ml-2" />
          </Button>
        </div>

        {/* ปรับ grid layout */}
        <div className="grid grid-cols-[max-content_1fr] gap-y-2 gap-x-4 mt-4 text-sm">
          <DetailItem
            icon={<UserRoundCog />}
            label="ตำแหน่ง"
            value={data.position}
          />
          <DetailItem
            icon={<Landmark />}
            label="ลักษณะนิสัย"
            value={data.traits.join(" / ")}
          />
          <DetailItem icon={<Mail />} label="อีเมล" value={data.email} />
          <DetailItem icon={<Landmark />} label="เพศ" value={data.gender} />
          <DetailItem
            icon={<Phone />}
            label="เบอร์โทรศัพท์"
            value={data.phone}
          />
          <DetailItem
            icon={<Landmark />}
            label="วันที่เริ่มงาน"
            value={data.startDate}
          />
          <div className="col-span-2">
            <DetailItem
              icon={<MapPin />}
              label="ที่อยู่"
              value={data.address}
            />
          </div>
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(data.id)}
            className="absolute bottom-3 right-4 text-destructive hover:text-destructive-foreground"
            aria-label="delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </CardContent>
    </Card>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 min-w-0">
      <span className="mt-[2px] text-primary/80 flex-shrink-0">{icon}</span>
      <div className="flex flex-col leading-4 min-w-0">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-[13px] break-words whitespace-pre-wrap">
          {value}
        </span>
      </div>
    </div>
  );
}
