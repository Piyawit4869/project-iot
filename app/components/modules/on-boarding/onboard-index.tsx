"use client";

import { TabControl } from "~/components/shared/tab-control";
import { Plus } from "lucide-react";
import { DataTable } from "~/components/shared/data-table";
import { usePaginate } from "~/api/client/user";
import { useOnboardColumns } from "../on-boarding/components/columns";
import { OnboardFilterFields } from "~/types/onboard/filter";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Modal } from "./components/modaldialog";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function OnboardIndex() {
  const paginate = usePaginate;
  const columns = useOnboardColumns();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full space-y-4 p-8 dark:bg-background">
        <TabControl
          title="จัดการหลักสูตร On-Boarding"
          backpath="/on-boarding"
          buttons={[
            <Button
              onClick={() => setOpen(true)}
              key="create-button"
              className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">&nbsp;สร้าง</span>
            </Button>,
          ]}
        />
        {/* <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="สร้างเทมเพลต"
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>
                ยกเลิก
              </Button>
              <Button onClick={() => alert("บันทึกสำเร็จ")}>บันทึก</Button>
            </>
          }
        >
          <p className="text-gray-600">เนื้อหา</p>
        </Modal> */}
        <DataTable
          // queryFunction={(res) =>
          //   paginate({
          //     pageIndex: res.pageIndex,
          //     limit: res.pageSize,
          //   } as any)
          // }
          data={[]}
          columns={columns}
          customerFilterFields={OnboardFilterFields}
          // isCustomLoading={isLoading}
        />
      </div>
    </>
  );
}
