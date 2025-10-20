/* import { SkeletonLoading } from "@/components/shared/skeleton-loading"; */
import React from "react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

// ----- Types -----
export type Activity = {
  id: string;
  author: string;
  initials: string;
  title: string;
  details?: string;
  bullets?: string[];
  time: string;
  date: string;
};

type CustomerFormCreateProps = {
  form?: any;
  loading?: boolean;
  activities?: Activity[];
};

export const ViewCustomerActivityLog: React.FC<CustomerFormCreateProps> = ({
  loading = false,
  activities = [],
}) => {
  return (
    <Card className="h-50">
      <CardHeader>
        <div className="flex  items-center ">
          <CardTitle className="text-base font-bold">บันทึกกิจกรรม</CardTitle>
        </div>
      </CardHeader>

      {loading ? (
        <CardContent className="space-y-4">
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </CardContent>
      ) : (
        <>
          <div className="flex justify-center">
            <div className="rounded-full w-15 text-sm p-1 mb-3 text-center   bg-neutral-50  text-neutral-600">
              วันนี้
            </div>
          </div>

          <CardContent className="space-y-4">
            {activities.length === 0 ? (
              <div className="text-md mx-6 flex justify-center text-[#71717A]  dark:text-[#b4b4c5]">
                ยังไม่มีกิจกรรม
              </div>
            ) : (
              activities.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-neutral-200 bg-white p-4"
                >
                  <div className="flex gap-4">
                    <Avatar className="w-11 h-11">
                      <AvatarFallback>UI</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-800">
                        {item.author}
                      </h3>
                      <p className="mt-1 text-neutral-700">{item.title}</p>

                      {item.details ||
                      (item.bullets && item.bullets.length > 0) ? (
                        <div className="mt-2 text-neutral-600">
                          <ul className="list-disc space-y-1 pl-5">
                            {item.details && <li>{item.details}</li>}
                            {item.bullets?.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      <div className="mt-3 flex flex-wrap items-center gap-6">
                        <span className="font-semibold text-green-600">
                          {item.time}
                        </span>
                        <span className="font-semibold text-green-600">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
};
