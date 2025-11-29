"use client";

import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";

export default function ResultSidebar() {
  return (
    <aside className="w-[320px] border-r bg-white flex flex-col">
      <div className="p-3">
        <h2 className="text-lg font-semibold">ผลลัพธ์</h2>
      </div>
      <Separator />
      <ScrollArea className="flex-1 p-4 space-y-4">
        <Section title="วันนี้">
          <ResultItem text="Parrot Image Request" />
        </Section>
        <div className="h-5" />
        <Section title="เมื่อวานนี้">
          <ResultItem text="AI Search" />
          <ResultItem text="How to decrease CAC?" />
          <ResultItem text="How to increase LTV?" />
        </Section>
      </ScrollArea>
    </aside>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-2">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ResultItem({ text }: { text: string }) {
  return (
    <div className="bg-muted p-3 rounded-lg text-sm text-foreground hover:bg-muted/70 cursor-pointer transition">
      {text}
    </div>
  );
}
