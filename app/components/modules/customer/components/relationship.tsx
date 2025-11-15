import React from "react";

import { useCustomerViewModel } from "../viewmodels/useCustomerViewModel";
import type { CustomerRelationshipFormProps } from "~/schemas/customer/customer";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { NotesCard } from "./cardZone/NoteCard";
import { RemarkCard } from "./cardZone/RemarkCard";
import { TagsCard } from "./cardZone/TagsCard";
import { AICard } from "./cardZone/AiCard";
import { useGetAnalyzeCustomer } from "~/api/client/customer/useCustomer";
import { useParams } from "react-router";
import { PieChart } from "~/components/shared/charts/pie-chart";

export const RelationshipCard: React.FC<CustomerRelationshipFormProps> = ({
  form,
  customer,
  loading,
  isEdit,
}) => {
  const params = useParams();
  const id = params?.id as string;
  const {
    state: {
      customerNote,
      fetchCustomerNote,
      customerAISetting,
      fetchCustomercAISetting,
    },
  } = useCustomerViewModel();

  const { data: analyzeCustomer, isLoading: loadAnalyzeCustomer } =
    useGetAnalyzeCustomer(id);

  return (
    <div className="flex flex-col gap-3 h-full">
      <Card className="h-auto">
        <CardHeader>
          <CardTitle className="text-base font-bold">
            ความสัมพันธ์ลูกค้า
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 ">
          {loadAnalyzeCustomer ? (
            <>
              <div className="flex justify-center">
                <SkeletonLoading
                  shape="rounded"
                  width="w-[190px]"
                  height="h-[190px]"
                  className="mb-10"
                />
              </div>
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
            </>
          ) : (
            <div className="flex justify-center">
              <PieChart initData={analyzeCustomer} />
            </div>
          )}
        </CardContent>
      </Card>
      <NotesCard
        loading={loading ?? false}
        notes={customer?.note ?? []}
        isEdit={isEdit}
        customerNote={customerNote}
        fetchCustomerNote={fetchCustomerNote ?? (() => {})}
        className="min-h-50 h-auto"
      />
      <RemarkCard
        isEdit={isEdit ?? false}
        loading={loading ?? false}
        remark={customer?.remark || ""}
        form={form}
        className="min-h-50 h-auto"
      />
      <TagsCard
        loading={loading ?? false}
        tags={customer?.tags ?? []}
        isEdit={isEdit ?? false}
        form={form}
        className="min-h-50 h-auto"
      />
      <AICard
        loading={loading ?? false}
        isEdit={isEdit ?? false}
        className="min-h-50"
        customers={customerAISetting}
        refetchCustomer={fetchCustomercAISetting}
      />
    </div>
  );
};
