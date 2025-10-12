"use client";

import { Button } from "~/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  FileImage,
  FileText,
  Globe,
  Mic,
  Star,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function MenuSidebar() {
  return (
    <aside className="w-[40px] border-r bg-white flex flex-col items-center justify-between py-4">
      <ScrollArea className="flex flex-col items-center space-y-4">
        <Link href={"/"}>
          <Button size="icon" variant="ghost">
            <ArrowLeft />
          </Button>
        </Link>
        <Button size="icon" variant="ghost">
          <MessageCircle />
        </Button>
        <Button size="icon" variant="ghost">
          <FileImage />
        </Button>
        <Button size="icon" variant="ghost">
          <FileText />
        </Button>
        <Button size="icon" variant="ghost">
          <Globe />
        </Button>
        <Button size="icon" variant="ghost">
          <Mic />
        </Button>
      </ScrollArea>

      <div className="pb-4">
        <Button size="icon" variant="ghost">
          <Star />
        </Button>
      </div>
    </aside>
  );
}
