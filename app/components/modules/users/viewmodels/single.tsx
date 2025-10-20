"use client";

import React from "react";
import GlobalButton from "~/components/shared/global-button";
import { Form } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "~/components/ui/card";

import dayjs from "dayjs";
import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";

import { X } from "lucide-react";

import { useEntityBreadcrumb } from "~/providers/RouteProvider";
import { ensureIds } from "~/components/shared/withId";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import {
  useDeleteUsers,
  useGetAllDepartments,
  useGetUsers,
  useUpdateUsers,
} from "~/api/client/user";
import { useNavigate, useParams } from "react-router";
import { UsersFormSchema, type UsersFormValues } from "~/schemas/users/user";
import { TabControl } from "~/components/shared/tab-control";
import { UserSocalmedias } from "../components/formSocalmedia";
import { UserStudy } from "../components/formStudy";
import { UserWorkExperience } from "../components/formworkExperiences";
import { UserSkills } from "../components/formSkills";
import { UserCompensation } from "../components/formCompensation";
import { UserProfileEdit } from "../components/formInformationEdit";
import { UserDocuments } from "../components/formDocuments";
import { SingleUsersView } from "./single-users-view";

dayjs.locale("th");

const isSameEmail = (a?: string | null, b?: string | null) => {
  const A = (a ?? "").trim().toLowerCase();
  const B = (b ?? "").trim().toLowerCase();
  return A === B;
};

export default function SingleUsers() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const { data, isLoading } = useGetUsers(params.id ?? "");
  const { mutate: DeleteUsers } = useDeleteUsers();

  const { data: departments } = useGetAllDepartments(true);
  const [isEdit, setIsEdit] = React.useState(false);
  const displayName =
    `${data?.profile?.firstName}` + " " + `${data?.profile?.lastName}`;

  useEntityBreadcrumb({
    feature: "user",
    entity: data
      ? {
          id: data.id,
          name: displayName ?? data.id,
        }
      : undefined,
    base: data && {
      href: `/user/${data?.id}`,
      label: displayName,
      uuid: data?.id,
    },
  });

  function emptyStringToNullDeep<T>(value: T): T {
    if (value === null || value === undefined) return value;

    if (typeof value === "string") {
      return (value.trim() === "" ? null : value) as unknown as T;
    }

    if (Array.isArray(value)) {
      return value.map((v) => emptyStringToNullDeep(v)) as unknown as T;
    }

    if (value instanceof Date) return value;

    if (typeof value === "object") {
      const out: Record<string, any> = Array.isArray(value) ? [] : {};
      for (const [k, v] of Object.entries(value as Record<string, any>)) {
        out[k] = emptyStringToNullDeep(v);
      }
      return out as T;
    }

    return value;
  }

  const originalEmailRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    originalEmailRef.current = data?.email ?? null;
  }, [data?.email]);

  const normalizeUser = (raw: any): UsersFormValues => ({
    id: raw?.id ?? "",
    email: raw?.email ?? "",
    userName: raw?.userName ?? "",
    status: raw?.status ?? "active",
    active: raw?.active ?? true,
    activate: raw?.activate ?? true,
    profile: {
      prefix: raw?.profile?.prefix ?? "",
      firstName: raw?.profile?.firstName ?? "",
      lastName: raw?.profile?.lastName ?? "",
      firstNameTh: raw?.profile?.firstNameTh ?? "",
      lastNameTh: raw?.profile?.lastNameTh ?? "",
      gender: raw?.profile?.gender ?? "",
      birthDate: raw?.profile?.birthDate ?? null,
      phone: raw?.profile?.phone ?? "",
      age: raw?.profile?.age ?? undefined,
      imageUrl: raw?.profile?.imageUrl ?? "",
      photoUrl: raw?.profile?.photoUrl ?? "",
      taxId: raw?.profile?.taxId ?? "",
      nickName: raw?.profile?.nickName ?? "",
      nationality: raw?.profile?.nationality ?? "",
      religion: raw?.profile?.religion ?? "",
      weight: raw?.profile?.weight ?? undefined,
      height: raw?.profile?.height ?? undefined,
      startWorkDate: raw?.profile?.startWorkDate ?? null,
      endWorkDate: raw?.profile?.endWorkDate ?? null,
      isMobile: raw?.profile?.isMobile ?? false,
      deviceToken: raw?.profile?.deviceToken || "",

      educationInformations: ensureIds(
        raw?.profile?.educationInformations ?? []
      ).map((e: any) => ({
        id: e.id ?? undefined,
        institution: e.institution ?? "",
        degree: e.degree ?? "",
        major: e.major ?? "",
        faculty: e.faculty ?? "",
        gpa: e.gpa ?? undefined,
        startDate: e.startDate ?? "",
        endDate: e.endDate ?? "",
        isGraduated: !!e.isGraduated,
        description: e.description ?? "",
        createdAt: e.createdAt ?? undefined,
        updatedAt: e.updatedAt ?? undefined,
      })),

      socialMedia: ensureIds(raw?.profile?.socialMedia ?? []).map((s: any) => ({
        id: s.id ?? undefined,
        platform: s.platform ?? "",
        username: s.username ?? "",
        url: s.url ?? "",
        isPrimary: !!s.isPrimary,
        description: s.description ?? "",
        createdAt: s.createdAt ?? undefined,
        updatedAt: s.updatedAt ?? undefined,
      })),

      skills: ensureIds(raw?.profile?.skills ?? []).map((s: any) => ({
        id: s.id ?? undefined,
        name: s.name ?? "",
        level: s.level ?? "",
        yearsOfExperience: s.yearsOfExperience ?? undefined,
        isPrimary: !!s.isPrimary,
        description: s.description ?? "",
        createdAt: s.createdAt ?? undefined,
        updatedAt: s.updatedAt ?? undefined,
      })),

      workExperiences: ensureIds(raw?.profile?.workExperiences ?? []).map(
        (w: any) => ({
          id: w.id ?? undefined,
          company: w.company ?? "",
          position: w.position ?? "",
          location: w.location ?? "",
          employmentType: w.employmentType ?? "",
          isCurrent: !!w.isCurrent,
          startDate: w.startDate ?? "",
          endDate: w.endDate ?? "",
          description: w.description ?? "",
          createdAt: w.createdAt ?? undefined,
          updatedAt: w.updatedAt ?? undefined,
        })
      ),

      compensationConfigs: ensureIds(
        raw?.profile?.compensationConfigs ?? []
      ).map((c: any) => ({
        id: c.id ?? undefined,
        contractType: c.contractType ?? "",
        currency: c.currency ?? "THB",
        baseSalary: c.baseSalary ?? undefined,
        allowance: c.allowance ?? undefined,
        bonusEligible: !!c.bonusEligible,
        bonusRate: c.bonusRate ?? undefined,
        insurance: c.insurance ?? null,
        providentFund: !!c.providentFund,
        effectiveDate: c.effectiveDate ?? "",
        expireDate: c.expireDate ?? null,
        description: c.description ?? null,
        createdAt: c.createdAt ?? undefined,
        updatedAt: c.updatedAt ?? undefined,
      })),

      documents: ensureIds(raw?.profile?.documents ?? []).map((d: any) => ({
        id: d.id ?? undefined,
        fileName: d.fileName ?? "",
        url: d.url ?? "",
        mimeType: d.mimeType ?? "",
        size: d.size ?? undefined,
        type: d.type ?? "",
        tags: Array.isArray(d.tags) ? d.tags : [],
        version: d.version ?? undefined,
        remark: d.remark || "",
        verified: !!d.verified,
        isPrimary: !!d.isPrimary,
        storageProvider: d.storageProvider ?? "",
        checksum: d.checksum ?? "",
        expiresAt: d.expiresAt ?? null,
        createdAt: d.createdAt ?? undefined,
        updatedAt: d.updatedAt ?? undefined,
      })),
    },
    userDepartments: raw?.departments ?? [],
    permissions: raw?.permissions ?? [],
  });

  const form = useForm<UsersFormValues>({
    resolver: zodResolver(UsersFormSchema as any),
    defaultValues: normalizeUser(data ?? {}),
  });

  React.useEffect(() => {
    if (data) form.reset(normalizeUser(data));
  }, [data, form]);

  const { isSubmitting } = form.formState;

  const { mutate } = useUpdateUsers(params.id ?? "");

  const onSubmit = (values: UsersFormValues) => {
    GlobalModal.info({
      title: "แก้ไขพนักงาน",
      description: "คุณต้องการแก้ไขพนักงานนี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังแก้ไขพนักงาน...");

        const payload: Record<string, any> = { ...values };
        delete payload.userName;
        if (isSameEmail(values.email, originalEmailRef.current)) {
          delete payload.email;
        }

        const cleaned = emptyStringToNullDeep(payload);

        mutate(cleaned as UsersFormValues, {
          onSuccess: () => {
            toast.success("แก้ไขพนักงานเรียบร้อยแล้ว!", { id: toastId });
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดขณะแก้ไขพนักงาน", { id: toastId });
          },
        });
      },
    });
  };

  const handleDelete = (id: string) => {
    GlobalModal.warning({
      title: "ลบพนักงาน",
      description: "คุณต้องการลบพนักงานนี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังลบพนักงาน...");
        DeleteUsers(id, {
          onSuccess: () => {
            toast.success("ลบพนักงานเรียบร้อยแล้ว!", { id: toastId });
            navigate("/users");
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดขณะลบพนักงาน", { id: toastId });
          },
        });
      },
    });
  };

  const handleCancel = () => {
    if (data) form.reset(form.getValues(), { keepDirty: false });
    setIsEdit(false);
  };

  return (
    <div className="flex flex-col space-y-3 p-8">
      <TabControl
        title={
          isEdit
            ? `แก้ไขพนักงาน ${data?.profile?.firstName ?? ""} ${
                data?.profile?.lastName ?? ""
              }`
            : `พนักงาน  ${data?.profile?.firstName ?? ""} ${
                data?.profile?.lastName ?? ""
              }`
        }
        backpath="/users"
        buttons={[
          isEdit ? (
            <div className="w-full flex flex-row pl-10" key="edit-actions">
              <GlobalButton
                label={
                  <>
                    <X /> ยกเลิก
                  </>
                }
                type="button"
                className="mr-4 max-w-[90px] bg-[#EF4343] text-white hover:bg-[#d73232]"
                onClick={handleCancel}
                variant="secondary"
              />
              <GlobalButton
                label="บันทึก"
                key="save-btn"
                type="button"
                loading={isSubmitting}
                className="max-w-[90px] mr-5"
                onClick={form.handleSubmit(onSubmit)}
              />
            </div>
          ) : (
            <div className="w-full flex flex-row pl-10">
              <GlobalButton
                label="ลบ"
                variant="outline"
                key="delete-btn"
                className="mr-4 max-w-[90px]"
                onClick={() => params.id && handleDelete(params.id)}
              />
              <GlobalButton
                label="แก้ไข"
                key="update-button"
                type="button"
                className="max-w-[90px] mr-15"
                onClick={() => setIsEdit(true)}
              />
            </div>
          ),
        ]}
      />
      {isLoading ? (
        <div className="mt-2 flex flex-col md:flex-row gap-5">
          <div className="md:w-[35%] h-[50%] w-full">
            <SkeletonLoading className="w-full h-[calc(100vh-200px)]" />
          </div>
          <div className="md:w-[65%] w-full flex flex-col gap-5">
            <SkeletonLoading className="w-full h-1/6" />
            <SkeletonLoading className="w-full h-1/6" />
            <SkeletonLoading className="w-full h-1/6" />
            <SkeletonLoading className="w-full h-1/6" />
            <SkeletonLoading className="w-full h-1/6" />
            <SkeletonLoading className="w-full h-1/6" />
          </div>
        </div>
      ) : (
        <>
          {isEdit ? (
            <Form {...form}>
              <form
                id="users"
                onSubmit={form.handleSubmit(onSubmit, (errors) => {
                  const count = Object.keys(errors).length;
                  if (count > 0) {
                    toast.error(
                      `กรอกข้อมูลไม่ครบหรือไม่ถูกต้อง (${count} จุด)`
                    );
                  }
                })}
              >
                <div className="mt-2 flex flex-col md:flex-row gap-5">
                  <div className="md:w-[35%] h-[50%] w-full">
                    <Card className=" h-full">
                      <UserProfileEdit
                        form={form}
                        data={data}
                        departments={departments}
                      />
                    </Card>
                  </div>

                  <div className="md:w-[65%] w-full flex flex-col gap-5">
                    <Card className="p-2">
                      <UserCompensation form={form} data={data} />
                    </Card>

                    <Card className="p-2">
                      <UserSkills form={form} data={data} />
                    </Card>

                    <Card className="p-2">
                      <UserWorkExperience form={form} data={data} />
                    </Card>

                    <Card className="p-2">
                      <UserStudy form={form} data={data} />
                    </Card>

                    <Card className="p-2">
                      <UserSocalmedias form={form} data={data} />
                    </Card>

                    <Card className="p-2">
                      <UserDocuments form={form} data={data} />
                    </Card>
                  </div>
                </div>
              </form>
            </Form>
          ) : (
            <SingleUsersView
              data={data}
              onEdit={() => setIsEdit(true)}
              onDelete={() => params.id && handleDelete(params.id)}
              loading={false}
            />
          )}
        </>
      )}
    </div>
  );
}
