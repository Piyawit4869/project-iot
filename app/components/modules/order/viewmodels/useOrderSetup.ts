// TODO:FIX BUILD

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";

import React from "react";
import { useParams } from "react-router";
import { useGetOrder } from "~/api/client/order/useGetOrder";
import { orderFormSchema, type OrderFormValues } from "~/schemas/order/order";

export const useOrderSetup = () => {
  const params = useParams();
  const id = params.id as string;

  const { data } = useGetOrder(id);

  const formCreate = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema) as Resolver<OrderFormValues>,
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      active: true,
      branchId: null,
      saler: null,
      company: null,
      customerId: "",
      suppliers: null,
      arrivalDate: null,
      orderDate: null,
      shipping: null,
      startDate: "",
      docName: "",
      expireDate: "",
      note: null,
      discountType: undefined,
      trackingNo: null,
      refCode: null,
      docNo: "",
      discount: 0,
      vat: 0,
      wht: 0,
      total: 0,
      grandTotal: 0,
      net: 0,
      subTotal: 0,

      discountCode: null,
      credit: null,
      discountStep: null,

      discountNote: null,
      seal: null,
      makeSign: null,
      approvedSign: null,
      makeByName: null,
      approvedByName: null,
      makeByPosition: null,
      approvedByPosition: null,
      notationType: "quotation",
      orderType: "quotation",
      currency: "THB",
      customer: {
        id: "",
        firstName: null,
        lastName: null,
        taxID: null,
        customerType: null,
        email: null,
        phone: null,
        address: null,
        postalCode: null,
      },

      orderDetails: {
        products: [
          {
            id: null,
            name: null,
            quantity: 0,
            sku: null,
            matType: null,
            status: null,
            price: 0,
            salePrice: 0,
            costPrice: 0,
            discountPrice: 0,
            vatPrice: 0,
            active: true,
          },
        ],
      },
    },
  });

  const { isSubmitting: isCreating } = formCreate.formState;
  const formUpdate = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema) as Resolver<OrderFormValues>,
    mode: "onSubmit",
    reValidateMode: "onChange",
    // defaultValues: initialOrderFormData,
    defaultValues: {
      active: data?.active ?? true,
      branchId: data?.branchId ?? null,
      suppliers: data?.suppliers ?? null,
      arrivalDate: data?.arrivalDate ?? null,
      orderDate: data?.orderDate ?? null,
      shipping: data?.shipping ?? null,
      startDate: data?.startDate ?? new Date().toISOString(),
      expireDate: data?.expireDate ?? null,
      note: data?.note ?? null,
      trackingNo: data?.trackingNo ?? null,
      refCode: data?.refCode ?? null,
      docName: data?.docName ?? null,
      docNo: data?.docNo ?? null,
      notationType: data?.notationType ?? "quotation",
      discount: data?.discount ?? 0,
      vat: data?.vat ?? 0,
      wht: data?.wht ?? 0,
      orderType: "quotation" as const,
      currency: "THB" as const,
      customerId: data?.customerId ?? null,

      orderDetails: {
        products: [
          {
            id: data?.orderDetails?.products[0]?.id ?? null,
            name: data?.orderDetails?.products[0]?.name ?? null,
            quantity: data?.orderDetails?.products[0]?.quantity ?? 0,
            sku: data?.orderDetails?.products[0]?.sku ?? null,
            matType: data?.orderDetails?.products[0]?.matType ?? null,
            status: data?.orderDetails?.products[0]?.status ?? null,
            price: data?.orderDetails?.products[0]?.price ?? 0,
            salePrice: data?.orderDetails?.products[0]?.salePrice ?? 0,
            costPrice: data?.orderDetails?.products[0]?.costPrice ?? 0,
            discountPrice: data?.orderDetails?.products[0]?.discountPrice ?? 0,
            vatPrice: data?.orderDetails?.products[0]?.vatPrice ?? 0,
            active: data?.orderDetails?.products[0]?.active ?? true,
          },
        ],
      },
    },
  });

  const { isSubmitting } = formUpdate.formState;
  React.useEffect(() => {
    if (data) {
      formUpdate.reset({
        active: data?.active ?? true,
        branchId: data?.branchId ?? null,
        suppliers: data?.suppliers ?? null,
        arrivalDate: data?.arrivalDate ?? null,
        orderDate: data?.orderDate ?? null,
        shipping: data?.shipping ?? null,
        startDate: data?.startDate ?? new Date().toISOString(),
        expireDate: data?.expireDate ?? null,
        note: data?.note ?? null,
        trackingNo: data?.trackingNo ?? null,
        refCode: data?.refCode ?? null,
        docName: data?.docName ?? null,
        docNo: data?.docNo ?? null,
        notationType: data?.notationType ?? "quotation",
        discount: data?.discount ?? 0,
        vat: data?.vat ?? 0,
        wht: data?.wht ?? 0,
        orderType: "quotation" as const,
        currency: "THB" as const,
        customerId: data?.customerId ?? null,

        orderDetails: {
          products: [
            {
              id: data?.orderDetail?.products[0]?.id ?? null,
              name: data?.orderDetail?.products[0]?.name ?? null,
              quantity: data?.orderDetail?.products[0]?.quantity ?? 0,
              sku: data?.orderDetail?.products[0]?.sku ?? null,
              matType: data?.orderDetail?.products[0]?.matType ?? null,
              status: data?.orderDetail?.products[0]?.status ?? null,
              price: data?.orderDetail?.products[0]?.price ?? 0,
              salePrice: data?.orderDetail?.products[0]?.salePrice ?? 0,
              costPrice: data?.orderDetail?.products[0]?.costPrice ?? 0,
              discountPrice: data?.orderDetail?.products[0]?.discountPrice ?? 0,
              vatPrice: data?.orderDetail?.products[0]?.vatPrice ?? 0,
              active: data?.orderDetail?.products[0]?.active ?? true,
            },
          ],
        },
      });
    }
  }, [data]);

  return {
    formUpdate,
    isSubmitting,
    isCreating,
    formCreate,
  };
};
