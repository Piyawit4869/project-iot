import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { NoteLists } from "./note-lists";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { DateISOToDisplayDate } from "~/utils/date-format";

export interface TNote {
  id: string;
  note: string;
  user_id: string;
  user_name: string;
  userName: string;
  createdAt: string;
  created_at: string;
  updated_at: string;
}

export const NotesCard = ({
  loading,
  notes,
  isEdit,
  customerNote,
  fetchCustomerNote,
  className,
}: {
  loading: boolean;
  notes?: any;
  isEdit?: boolean;
  customerNote?: any;
  className: string;
  fetchCustomerNote?: () => void;
}) => {
  return (
    <Card className={className}>
      {!isEdit ? (
        <CardHeader>
          <CardTitle className="text-base font-bold">โน้ต</CardTitle>
        </CardHeader>
      ) : (
        <></>
      )}

      <CardContent>
        {loading ? (
          <>
            <div className="flex flex-col gap-4">
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
            </div>
          </>
        ) : notes && notes.length > 0 ? (
          !isEdit ? (
            <div className="flex flex-wrap gap-2">
              {notes.map((item: TNote, index: TNote) => {
                return (
                  <div
                    key={item.id ?? index}
                    className="border rounded-lg p-3 bg-white shadow-sm space-y-2 w-full"
                  >
                    <p className="whitespace-pre-line text-sm text-gray-800">
                      {item.note}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {DateISOToDisplayDate(
                          item.created_at ?? item.createdAt ?? ""
                        )}{" "}
                        {item.user_name ?? item.userName ?? ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <NoteLists
              customer={customerNote}
              refetchCustomer={fetchCustomerNote ?? (() => {})}
            />
          )
        ) : isEdit ? (
          <>
            <span>
              <NoteLists
                customer={customerNote}
                refetchCustomer={fetchCustomerNote ?? (() => {})}
              />
            </span>
            <span className="text-sm text-gray-500 flex mt-3">
              หากต้องการเพิ่มโน้ตกรุณากดที่ปุ่ม + เพื่อเพิ่มโน้ต
            </span>
          </>
        ) : (
          <span className="text-sm text-gray-500">
            ลูกค้ารายนี้ยังไม่มีโน้ต หากต้องการเพิ่มโน้ตกรุณากดที่ปุ่มแก้ไข
          </span>
        )}
      </CardContent>
    </Card>
  );
};
