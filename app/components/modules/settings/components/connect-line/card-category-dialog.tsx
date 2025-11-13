import { useEffect, useState } from "react"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { cn } from "~/lib/utils"

export const CARD_CATEGORY_OPTIONS = [
  {
    id: "product",
    label: "สินค้า",
    description: "เหมาะสำหรับแนะนำสินค้าและแสดงราคาโดยย่อ",
    preview: "Product",
  },
  {
    id: "place",
    label: "สถานที่",
    description: "ใช้บอกตำแหน่งหรือจุดนัดหมายพร้อมรายละเอียด",
    preview: "Place",
  },
  {
    id: "person",
    label: "บุคคล",
    description: "แบ่งปันข้อมูลโปรไฟล์หรือทีมงาน",
    preview: "Profile",
  },
  {
    id: "image",
    label: "รูปภาพ",
    description: "เหมาะกับคอนเทนต์ที่เน้นภาพเป็นหลัก",
    preview: "Image",
  },
] as const

export type CardCategoryId = (typeof CARD_CATEGORY_OPTIONS)[number]["id"]

type CardCategoryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  value?: CardCategoryId
  onConfirm: (value: CardCategoryId) => void
}

export function CardCategoryDialog({
  open,
  onOpenChange,
  value,
  onConfirm,
}: CardCategoryDialogProps) {
  const [pendingValue, setPendingValue] = useState<CardCategoryId | "">(
    value ?? ""
  )

  useEffect(() => {
    if (open) setPendingValue(value ?? "")
  }, [open, value])

  const handleConfirm = () => {
    if (!pendingValue) return
    onConfirm(pendingValue)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>เลือกประเภทการ์ด</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARD_CATEGORY_OPTIONS.map((category) => {
            const selected = pendingValue === category.id

            return (
              <button
                key={category.id}
                type="button"
                className={cn(
                  "flex flex-col rounded-lg border bg-background p-4 text-left transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                  selected
                    ? "border-primary ring-1 ring-primary/30 shadow-sm"
                    : "hover:border-primary/70"
                )}
                onClick={() => setPendingValue(category.id)}
              >
                <div className="bg-muted text-muted-foreground mb-3 flex aspect-[4/3] items-center justify-center rounded-md text-xs uppercase tracking-wide">
                  {category.preview}
                </div>

                <div className="flex items-center gap-2 font-medium">
                  <span
                    className={cn(
                      "size-3 rounded-full border",
                      selected
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/40"
                    )}
                    aria-hidden
                  />
                  {category.label}
                </div>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {category.description}
                </p>
              </button>
            )
          })}
        </div>

        <DialogFooter className="mt-6 gap-2">
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            variant="outline"
          >
            ยกเลิก
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={!pendingValue}>
            เลือก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
