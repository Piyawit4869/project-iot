"use client";

import { DualProgressCircle } from "~/components/shared/dual-progress-circle";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";

export const CreditZone = () => {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            สรุปการขายสินค้า
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm">
            <p className="text-gray-900">
              ขายโดย: <span className="text-gray-600">ยังไม่มีข้อมูล </span>
            </p>
            <p className="text-gray-900 font-medium">
              ปิดการขายโดย:{" "}
              <span className="text-gray-600">ยังไม่มีข้อมูล</span>
            </p>
          </div>

          <div className="space-y-1">
            <Progress value={0} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>AI 0%</span>
              <span>เซลส์ 0%</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">พนักงานขาย</h3>
            <div>
              <p className="text-sm font-medium text-gray-900">
                ผู้รับผิดชอบหลัก
              </p>
              <p className="text-sm text-gray-600">ยังไม่มีข้อมูล</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                ผู้รับผิดชอบรอง
              </p>
              <p className="text-sm text-gray-600">ยังไม่มีข้อมูล</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <DualProgressCircle />
    </>
  );
};
