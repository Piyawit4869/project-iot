import { NotesCard } from "../components/cardZone/NoteCard";
import { RemarkCard } from "../components/cardZone/RemarkCard";
import { ViewCustomerActivityLog } from "../components/customer-activityLog";

export function NoteTabContent({
  isLoading,
  customer,
  formUpdate,
  onUpdate,
  fetchCustomerNote,
  customerNote,
  isEdit,
  setIsEdit,
}: any) {
  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <div className="w-full md:w-[50%]  ">
        <NotesCard
          loading={isLoading ?? false}
          notes={customer?.note ?? []}
          customerNote={customerNote}
          onClick={onUpdate}
          fetchCustomerNote={fetchCustomerNote ?? (() => {})}
          className="min-h-50 h-auto"
        />

        <RemarkCard
          loading={isLoading ?? false}
          remark={customer?.remark || ""}
          form={formUpdate}
          onClick={onUpdate}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          className="min-h-50 h-auto mt-5"
        />
      </div>
      <div className="w-full md:w-[50%] ">
        <ViewCustomerActivityLog className="h-full" />
      </div>
    </div>
  );
}
