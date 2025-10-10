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
    values: {
      active: true,
      branchId: "",
      customerId: "",
      suppliers: "",
      arrivalDate: "",
      orderDate: "",
      shipping: "",
      startDate: "",
      docName: "",
      expireDate: "",
      note: "",
      trackingNo: "",
      refCode: "",
      docNo: "",
      discount: 0,
      vat: 0,
      wht: 0,
      total: 0,
      grandTotal: 0,
      net: 0,
      subTotal: 0,
      notationType: "quotation",
      orderType: "quotation",
      currency: "THB",
      customer: {
        id: "",
        firstName: "",
        lastName: "",
        taxID: "",
        customerType: "",
        email: "",
        phone: "",
        address: "",
        postalCode: "",
      },

      orderDetail: {
        products: [
          {
            id: "",
            name: "",
            quantity: 0,
            sku: "",
            matType: "",
            status: "",
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
      branchId: data?.branchId ?? "",
      suppliers: data?.suppliers ?? "",
      arrivalDate: data?.arrivalDate ?? "",
      orderDate: data?.orderDate ?? "",
      shipping: data?.shipping ?? "",
      startDate: data?.startDate ?? new Date().toISOString(),
      expireDate: data?.expireDate ?? "",
      note: data?.note ?? "",
      trackingNo: data?.trackingNo ?? "",
      refCode: data?.refCode ?? "",
      docName: data?.docName ?? "",
      docNo: data?.docNo ?? "",
      notationType: data?.notationType ?? "quotation",
      discount: data?.discount ?? 0,
      vat: data?.vat ?? 0,
      wht: data?.wht ?? 0,
      orderType: "quotation" as const,
      currency: "THB" as const,
      customerId: data?.customerId ?? "",

      orderDetail: {
        products: [
          {
            id: data?.orderDetails?.products[0]?.id ?? "",
            name: data?.orderDetails?.products[0]?.name ?? "",
            quantity: data?.orderDetails?.products[0]?.quantity ?? 0,
            sku: data?.orderDetails?.products[0]?.sku ?? "",
            matType: data?.orderDetails?.products[0]?.matType ?? "",
            status: data?.orderDetails?.products[0]?.status ?? "",
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
        branchId: data?.branchId ?? "",
        suppliers: data?.suppliers ?? "",
        arrivalDate: data?.arrivalDate ?? "",
        orderDate: data?.orderDate ?? "",
        shipping: data?.shipping ?? "",
        startDate: data?.startDate ?? new Date().toISOString(),
        expireDate: data?.expireDate ?? "",
        note: data?.note ?? "",
        trackingNo: data?.trackingNo ?? "",
        refCode: data?.refCode ?? "",
        docName: data?.docName ?? "",
        docNo: data?.docNo ?? "",
        notationType: data?.notationType ?? "quotation",
        discount: data?.discount ?? 0,
        vat: data?.vat ?? 0,
        wht: data?.wht ?? 0,
        orderType: "quotation" as const,
        currency: "THB" as const,
        customerId: data?.customerId ?? "",

        orderDetail: {
          products: [
            {
              id: data?.orderDetail?.products[0]?.id ?? "",
              name: data?.orderDetail?.products[0]?.name ?? "",
              quantity: data?.orderDetail?.products[0]?.quantity ?? 0,
              sku: data?.orderDetail?.products[0]?.sku ?? "",
              matType: data?.orderDetail?.products[0]?.matType ?? "",
              status: data?.orderDetail?.products[0]?.status ?? "",
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
