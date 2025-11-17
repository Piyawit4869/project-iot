import React from "react";

import { GlobalImage } from "~/components/shared/global-image";

import GlobalButton from "~/components/shared/global-button";
import {
  Notebook,
  UserPen,
  CirclePlus,
  X,
  Box,
  Bot,
  Settings,
  Eye,
  Check,
  Brain,
  ShoppingBag,
  PlusIcon,
} from "lucide-react";
import { GlobalModal } from "~/components/shared/modal/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AboutCustomer } from "./about-customer";

import { ViewOrderDialog } from "./view-order";
import { NoteLists } from "./note-lists";
import { DialogFooter, DialogHeader } from "~/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog";
import ChatMessagesWithAI from "./chat-message-with-ai";
import HeroSearch from "./hero-search";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import { CustomerInfoSkeleton } from "./noData/customer-info-skeleton";
import { useNavigate } from "react-router";
import { GlobalProductStatus } from "~/types/order";
import type { Product } from "~/schemas/product/product";
import { usePaginate } from "~/api/client/product/useProductQuery";
import {
  useAiReplySettings,
  useChatRoomParticipants,
  useConnectedChatRoomAssistant,
  useGetAiNote,
  useGetAllTags,
  useGetSummaryAINote,
  useUpdateCustomerTags,
} from "~/api/client/customer/useCustomer";
import {
  CustomerSupportFormSchema,
  type CustomerSupportFormValues,
} from "~/schemas/customer/support/support";
import type { Customer } from "~/schemas/customer/customer-form";
import { useGetAllUsers } from "~/api/client/user";
import { useOrder } from "~/hooks/order/order";
import { cn } from "~/lib/utils";
import { customerStatus, customerType } from "~/initData/customer-initData";
import { useGetAllOrders } from "~/api/client/order/useGetOrder";
import {
  useCreateCustomerSupoort,
  useDeleteCustomerSupport,
} from "~/api/client/customer/useGetCustomerSupport";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { useDebounce } from "~/hooks/use-debounce";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { GlobalTagsBadge } from "~/components/shared/global-tags";
import { OrderViewModal } from "./orders-view-modal";
import { AIMessageView } from "./ai-message-view-modal";
import { GlobalTooltip } from "~/components/shared/global-tooltip";
import { ChatCustomerTags } from "./chat-customer-tags";

interface UserProps {
  id: string;
  userName: string;
}

const STATUS_OPTIONS: { value: GlobalProductStatus; label: string }[] = [
  { value: GlobalProductStatus.ACTIVE, label: "สินค้าที่เปิดขาย" },
  { value: GlobalProductStatus.INACTIVE, label: "สินค้าที่ไม่เปิดขาย" },
  { value: GlobalProductStatus.OUT_OF_SEASON, label: "สินค้าที่อยู่นอกฤดูกาล" },
  {
    value: GlobalProductStatus.DISCONTINUED,
    label: "สินค้าที่หยุดผลิตหรือขาย",
  },
  {
    value: GlobalProductStatus.COMING_SOON,
    label: "สินค้าที่จะวางจำหน่ายในอนาคต",
  },
];

export default function ChatCustomerInfo({
  selectedRoom,
  refetchCustomer,
  modelCustomerDetails,
  setCreateOrderOpen,
  setAddCustomerDetail,
  addCustomerDetail,
  currentCustomer,
  api,
}: {
  selectedRoom: any;
  refetchCustomer: any;
  modelCustomerDetails?: boolean;
  setCreateOrderOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddCustomerDetail: React.Dispatch<React.SetStateAction<boolean>>;
  addCustomerDetail: boolean;
  currentCustomer: Customer;
  api: string;
}) {
  const { data: allTags } = useGetAllTags();

  const { data: participantData, refetch: refetchParicipant } =
    useChatRoomParticipants(selectedRoom?.id);
  let participants = participantData && participantData?.items;

  const [search, setSearch] = React.useState<string>("");
  const [showTagManager, setShowTagManager] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState<
    { id: string; name: string }[]
  >([]);

  const debouncedSearch = useDebounce(search);

  const { data: productsPaginate, isLoading: productsLoading } = usePaginate({
    pageIndex: 1,
    pageSize: 20,
    name: debouncedSearch,
  });

  const { data: getData } = useGetAiNote(currentCustomer?.id);
  const { mutate: updateTags } = useUpdateCustomerTags(currentCustomer?.id);

  const dataFromAI = getData?.customerData;

  const { setProducts } = useOrder();

  const classForTaps = `
     group relative inline-flex items-center gap-2
     rounded-md text-sm font-semibold
     px-3 py-2 hover:bg-popover hover:text-foreground dark:hover:bg-popover dark:hover:text-white
     w-25
     text-gray-500 data-[state=active]:text-white
     data-[state=active]:text-[#19142A]
     data-[state=inactive]:hover:bg-gray-100
      data-[state=active]:shadow-none
     transition-colors

     focus-visible:outline-none focus-visible:ring-0
     disabled:opacity-50 disabled:pointer-events-none

     after:absolute after:bottom-[-1px] after:left-1/2 after:-translate-x-1/2
     after:h-0.5 after:w-25 after:rounded-full after:bg-[#19142A]
     data-[state=inactive]:after:hidden

    data-[state=active]:drak:text-white
    dark:after:bg-[#FFFFFF]
      
   `;

  const customer = currentCustomer;
  const { mutate: update } = useAiReplySettings(customer?.id);
  const customerAI = currentCustomer?.aiReplySettings?.[0];

  const { data: allUser, isLoading } = useGetAllUsers();

  const { mutate: create, isPending: isCreatingSupport } =
    useCreateCustomerSupoort(selectedRoom?.id ?? "");
  const { mutate: DeleteCustomerSupport } = useDeleteCustomerSupport(
    selectedRoom?.id ?? ""
  );

  const { data, refetch } = useGetAllOrders();
  const [chatRoomAssistantId, setChatRoomAssistantId] =
    React.useState<string>("");

  const { mutateAsync: connectedChatRoomAI, isPending: isPendingAI } =
    useConnectedChatRoomAssistant();

  const navigate = useNavigate();

  const [isFirstTimeAI, setIsFirstTimeAI] = React.useState<boolean>(true);
  const [firstTimeMessage, setFirstTimeMessage] = React.useState<string>("");
  const [aiEnabled, setAiEnabled] = React.useState<boolean>(
    customerAI?.allDay || false
  );
  const [aiEnabledWithCondition, setAiEnabledWithCondition] =
    React.useState(false);
  const [aiStartTime, setAiStartTime] = React.useState(
    customerAI?.startTime || "09:00"
  );
  const [aiEndTime, setAiEndTime] = React.useState(
    customerAI?.endTime || "18:00"
  );

  const [hours, setHours] = React.useState("");
  const [minutes, setMinutes] = React.useState("");

  const h = Math.min(24, Math.max(0, Number(hours) || 0));
  const m = Math.min(59, Math.max(0, Number(minutes) || 0));
  const totalMinutes = h * 60 + m;

  const [, setSelectItemIds] = React.useState<string[]>([]);
  const [, setProductSelected] = React.useState<Product[]>([]);
  const [isPopoverOpenMain, setIsPopoverOpenMain] = React.useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [viewOrderDetail] = React.useState<string>("");
  const [viewOrderDetailOpen, setViewOrderDetailOpen] = React.useState(false);

  const [cartItems, setCartItems] = React.useState<Product[]>([]);
  const [selectProductItem, setSelectProductItem] = React.useState<
    Product | undefined
  >(undefined);

  const [customerOrders, setCustomerOrders] = React.useState<any[]>([]);
  const [activeTab, setActiveTab] = React.useState("note");

  const [openAiSetting, setOpenAiSetting] = React.useState(false);
  const [openProductModal, setOpenProductModal] =
    React.useState<boolean>(false);

  const [autoScroll, setAutoScroll] = React.useState(true);

  const [open, setOpen] = React.useState<boolean>(false);

  const [selected, setSelected] = React.useState<GlobalProductStatus[]>([
    GlobalProductStatus.ACTIVE,
  ]);

  const [applied, setApplied] = React.useState<GlobalProductStatus[]>([
    GlobalProductStatus.ACTIVE,
  ]);

  const [AIOpen, setAIOpen] = React.useState(false);
  const [isCheckStatusOpen, setCheckStatusOpen] = React.useState(false);

  const [openSelected, setOpenSelected] = React.useState(false);

  const dataInTaps = [
    { value: "note", label: "โน้ต", Icon: Notebook },
    { value: "product", label: "สินค้า", Icon: Box },
    { value: "settingAI", label: "AI Insight", Icon: Bot },
  ];

  const form = useForm<CustomerSupportFormValues>({
    resolver: zodResolver(CustomerSupportFormSchema),
    defaultValues: {
      isMain: true,
      userId: "",
      customerId: customer?.id,
    },
  });

  const statusCustomer =
    customerStatus.find((item) => item.value === currentCustomer?.status)
      ?.label ?? "-";
  const typeCustomer =
    customerType.find((item) => item.value === currentCustomer?.customerType)
      ?.label ?? "-";

  const STATUS_BG: Record<string, string> = {
    newly_registered: "bg-[#F7C61E] text-black",
    active: "bg-[#16a34a] text-white",
    loyal_customer: "bg-[#1F78FF] text-white",
    at_risk: "bg-[#ED4949] text-white",
    churned: "bg-[#D9D9D9] text-black",
  };

  const TYPE_BG: Record<string, string> = {
    ordinary_person: "bg-[#06C755] text-white",
    juristic_person: "bg-[#FF7700] text-white",
  };

  const handleChangeAIConfig = () => {
    const data = {
      isAiReply: true,
      settings: [
        {
          enabled: aiEnabled ? false : true,
          allDay: aiEnabled ? true : false,
          startTime: aiEnabled ? "00:00" : aiStartTime || "",
          endTime: aiEnabled ? "23:59" : aiEndTime || "",
          aiReplyResponseDuration: aiEnabledWithCondition
            ? totalMinutes || ""
            : "",
        },
      ],
    };

    GlobalModal.info({
      title: "ปรับการตั้งค่า AI",
      description: "คุณต้องการปรับการตั้งค่า AI ใช้หรือไม่ ?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังปรับข้อมูล AI...");

        toast.success("แก้ไขการตั้งค่าเรียบร้อยแล้ว!", {
          id: toastId,
        });

        update(data, {
          onSuccess: () => {
            toast.success("แก้ไขการตั้งค่าเรียบร้อยแล้ว!", { id: toastId });
            setOpenAiSetting(false);
            refetchCustomer();
          },
          onError: () => {
            toast.error(
              "ไม่สามารถปรับการตั้งค่าได้ กรุณาลองใหม่อีกครั้งภายหลัง",
              { id: toastId }
            );
          },
        });
      },
    });
  };

  const DeleteSupport = (id: string) => {
    GlobalModal.delete({
      title: "ลบผู้รับผิดชอบ",
      description: "คุณต้องการลบผู้รับผิดชอบ ใช่หรือไม่ ?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังลบผู้รับผิดชอบ...");

        DeleteCustomerSupport(
          {
            userId: id,
            customerId: currentCustomer.id,
          },
          {
            onSuccess: () => {
              toast.success("ลบผู้รับผิดชอบเรียบร้อยแล้ว!", {
                id: toastId,
              });
              refetchParicipant();
            },
            onError: () => {
              toast.error(
                "ไม่สามารถลบผู้รับผิดชอบ กรุณาลองใหม่อีกครั้งภายหลัง",
                {
                  id: toastId,
                }
              );
              refetchParicipant();
            },
          }
        );
      },
    });
  };

  const CreateSupport = (values: CustomerSupportFormValues) => {
    GlobalModal.info({
      title: "เพิ่มผู้รับผิดชอบ",
      description: "คุณต้องการเพิ่มผู้รับผิดชอบ ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังเพิ่มผู้รับผิดชอบ...");
        create(values, {
          onSuccess: () => {
            toast.success("เพิ่มผู้รับผิดชอบเรียบร้อยแล้ว!", {
              id: toastId,
            });
            refetchParicipant();
          },
          onError: () => {
            toast.error(
              "ไม่สามารถเพิ่มผู้รับผิดชอบ เนื่องจากมีผู้ใช้นี้อยู่แล้ว",
              { id: toastId }
            );
            refetchParicipant();
          },
        });
      },
    });
  };

  const handleSubmit = () => {
    GlobalModal.info({
      title: "เพิ่มแท็กของลูกค้า",
      description: "คุณต้องการเพิ่มแท็กของลูกค้า ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังเพิ่มผู้แท็กของลูกค้า...");

        const result = selectedTags.map((tag) => {
          return {
            id: tag.id,
            name: tag.name,
            active: true,
          };
        });

        updateTags(
          { tags: result },
          {
            onSuccess: () => {
              toast.success("เพิ่มผู้แท็กของลูกค้าเรียบร้อยแล้ว!", {
                id: toastId,
              });
              refetchCustomer();
            },
            onError: () => {
              toast.error("ไม่สามารถเพิ่มผู้แท็กของลูกค้า", { id: toastId });
              refetchCustomer();
            },
          }
        );

        setShowTagManager(false);
      },
    });
  };

  const handleUserButtonClick = (selectedUserId: string, isMain: boolean) => {
    CreateSupport({
      userId: selectedUserId,
      isMain: isMain,
      customerId: currentCustomer.id,
    });
  };

  const createOrder = () => {
    setProducts(
      cartItems.map((product: Product) => ({
        ...product,
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        status: product.status,
        publishStatus: product.publishStatus,
        active: true,
        sku: product.sku,
        matType: product.matType,
        discountPrice: product.discountPrice,
        vatPrice: product.vatPrice,
      })) ?? []
    );

    setCreateOrderOpen?.(true);
  };

  const handleModel = () => {
    if (!modelCustomerDetails) {
      refetchCustomer();
    }
  };

  const handleFirstTimeAISearch = async (value: string) => {
    setIsFirstTimeAI(false);
    setFirstTimeMessage(value);

    try {
      // const res = await new Promise<{ chatRoomId: string }>((resolve) =>
      //   setTimeout(() => {
      //     resolve({ chatRoomId: "34bc45eb-403e-4882-aa82-aa46fd222196" });
      //   }, 5000)
      // );

      const res = await connectedChatRoomAI({
        message: value,
        messageType: "text",
        customerId: customer?.id,
      });

      setChatRoomAssistantId(res.chatRoomId);
    } catch (err) {
      setIsFirstTimeAI(false);
      console.error(err);
    }

    // try {
    //   const res = await connectedChatRoomAI({
    //     message: value,
    //     messageType: "text",
    //     customerId: customer?.id,
    //   });

    //   setIsFirstTimeAI(false);
    //   setFirstTimeMessage(value);

    //   setChatRoomId(res.chatRoomId);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const isInCart = (itemId: string) => {
    return cartItems.some((item: Product) => item.id === itemId);
  };

  const toggleCartItem = (item: Product) => {
    if (isInCart(`${item.id}`)) {
      const idx = cartItems.findIndex((prd: Product) => prd.id === item.id);
      const updatedProducts = cartItems.map((p, index) =>
        index === idx ? { ...p, quantity: p.quantity + 1 } : p
      );
      setCartItems(updatedProducts);
    } else {
      item.quantity = 1;
      setCartItems((prev: Product[]) => [...prev, item]);
    }
  };

  const handleOpenProductModalsWithItem = (item: Product) => {
    setSelectProductItem(item);
    setOpenProductModal(true);
  };

  const handleToggleFilterStatus = (val: GlobalProductStatus) =>
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );

  const clearAllFilterStatus = () => setSelected([]);

  const handleApplyFilterStatus = () => {
    setApplied(selected);
    setOpen(false);
  };

  React.useEffect(() => {
    handleModel();
  }, [modelCustomerDetails]);

  const supportedUserIds = new Set(
    participants && participants?.length
      ? participants.map((support: any) => support.userId)
      : []
  );

  const filteredUser = allUser?.filter((item: any) =>
    item.userName?.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    if (customerAI) {
      setAiEnabled(customerAI?.allDay);

      const enabledCondition = customerAI?.aiReplyResponseDuration;
      setAiEnabledWithCondition(enabledCondition ? true : false);

      if (enabledCondition) {
        const h = Math.floor(enabledCondition / 60);
        const m = enabledCondition % 60;

        setHours(h.toString());
        setMinutes(m.toString());
      }
    }

    if (customer?.id) {
      form.reset({
        ...form.getValues(),
        customerId: customer.id,
      });
    }
  }, [customerAI, customer?.id]);

  React.useEffect(() => {
    setProductSelected([]);
    setSelectItemIds([]);
  }, [customer]);

  React.useEffect(() => {
    if (activeTab === "orders") {
      refetch();
    }
  }, [activeTab]);

  React.useEffect(() => {
    if (currentCustomer) {
      const dataDetailFilter =
        data?.items?.filter(
          (order: any) => order.customerId === currentCustomer.id
        ) ?? [];

      setCustomerOrders(dataDetailFilter);
    }
  }, [data, currentCustomer]);

  React.useEffect(() => {
    if (currentCustomer) {
      setChatRoomAssistantId(currentCustomer?.chatRoomAssistantId || "");
    }

    if (currentCustomer && currentCustomer?.tags) {
      setSelectedTags(currentCustomer?.tags as []);
    }
  }, [currentCustomer]);

  const countFilterOption: number = selected.length;

  const secondarySupports = React.useMemo(() => {
    if (!participants?.length) return [];
    return participants.filter(
      (spl: any) => !spl.isMain && spl.participantType !== "customer"
    );
  }, [participants]);

  const displayed = secondarySupports.slice(0, 3);
  const extraCount = Math.max(secondarySupports.length - 3, 0);

  if (!customer || !currentCustomer) return <CustomerInfoSkeleton />;

  const tags =
    currentCustomer && currentCustomer.tags && currentCustomer.tags.length > 0
      ? currentCustomer.tags
      : [];

  const availableTags =
    allTags && allTags.length
      ? allTags
          .filter((a: any, index: number) => index < 20)
          .map((b: any) => {
            return { name: b.name, id: b.id };
          })
      : [];

  const isLineNameSameAsCustomerName =
    currentCustomer?.profile?.name === currentCustomer?.profile?.lineName;

  return (
    <>
      <aside className="flex flex-col w-full bg-white dark:bg-background xl:h-[calc(100vh-50px)] xl:px-1 border-l overflow-y-auto">
        <div className="py-4 px-2 flex w-full mt-6 items-center justify-between gap-2 h-[60px] rounded-2xl bg-background">
          <div>
            <div className="flex gap-2">
              <GlobalImage
                src={currentCustomer.profile?.imageUrl || ""}
                alt="Customer"
                className="w-[50px] h-[50px] rounded-full object-cover mt-1"
              />
              <div className="flex flex-col ml-1">
                {currentCustomer.profile?.name ? (
                  <>
                    <div className="flex flex-row gap-2 items-center">
                      <h2 className="font-semibold text-lg mr-auto">
                        {currentCustomer.profile.name}
                      </h2>

                      <UserPen
                        size={18}
                        color="#09a799"
                        className="cursor-pointer"
                        onClick={() => setAddCustomerDetail(true)}
                      />
                    </div>

                    {!isLineNameSameAsCustomerName && (
                      <h2 className="font-semibold text-sm mr-auto">
                        {currentCustomer.profile.lineName || "ไม่ทราบชื่อ"}
                      </h2>
                    )}
                  </>
                ) : (
                  <div className="flex flex-row gap-2 items-center">
                    <h2 className="font-semibold text-lg mr-auto">
                      {currentCustomer.profile?.lineName || "ไม่ทราบชื่อ"}
                    </h2>

                    <UserPen
                      size={18}
                      color="#09a799"
                      className="cursor-pointer"
                      onClick={() => setAddCustomerDetail(true)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-2 mt-1">
              <span
                className={`text-xs p-1 px-3 rounded-full ${
                  STATUS_BG[currentCustomer.status] ?? "bg-gray-400 text-white"
                }`}
              >
                {statusCustomer}
              </span>
              <span
                className={`text-xs p-1 px-3 rounded-full ${
                  TYPE_BG[currentCustomer.customerType] ??
                  "bg-gray-400 text-white"
                }`}
              >
                {typeCustomer}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <GlobalTooltip content={"กดเพื่อดูข้อมูลลูกค้าผ่าน AI"}>
              <Brain
                className="w-5 h-5 "
                onClick={() => {
                  setAIOpen(true);
                }}
              />
            </GlobalTooltip>
            <GlobalTooltip content={"กดเพื่อดูออเดอร์ของลูกค้า"}>
              <ShoppingBag
                className="w-5 h-5"
                onClick={() => {
                  setCheckStatusOpen(true);
                }}
              />
            </GlobalTooltip>
          </div>
        </div>

        <div className="px-4 mt-2">
          <div className="mt-4 space-y-1">
            <div className="flex flex-row">
              <div>
                <p className="font-semibold text-sm text-muted-foreground mb-1">
                  ผู้รับผิดชอบหลัก
                </p>
                <div className="flex flex-wrap gap-2">
                  {participants &&
                  participants.length &&
                  participants.filter((spl: any) => spl.isMain).length ? (
                    <div className="flex flex-wrap gap-2 mb-1">
                      {participants
                        .filter((spl: any) => spl.isMain)
                        .map((par: any, userIndex: number) => {
                          return (
                            <div
                              className="relative inline-block"
                              key={`main-spl-${par.participantId}`}
                            >
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      onClick={() =>
                                        navigate(`/users/${par.participantId}`)
                                      }
                                    >
                                      <GlobalImage
                                        src={
                                          par.imageUrl ||
                                          `https://api.dicebear.com/9.x/initials/svg?seed=${par.participantId}`
                                        }
                                        alt={`main-spl-${par.participantId}`}
                                        className={`w-[35px] h-[35px] rounded-full object-cover border-2 ${
                                          userIndex === 0 && "border-amber-500"
                                        }`}
                                        notShowPreview
                                      />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {par?.displayName ?? "-"}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  DeleteSupport(par.participantId);
                                }}
                                className="absolute -top-1 -right-1 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100 transition"
                              >
                                <X className="w-2 h-2 text-gray-600" />
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <Popover
                      open={isPopoverOpenMain}
                      onOpenChange={setIsPopoverOpenMain}
                    >
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setIsPopoverOpenMain(true)}
                          className="rounded-full object-cover cursor-pointer"
                          disabled={isCreatingSupport}
                        >
                          <CirclePlus className="w-9 h-9 text-gray-300" />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent className="w-95">
                        <Command>
                          <CommandInput
                            placeholder="ค้นหาชื่อผู้รับผิดชอบ"
                            value={search}
                            onValueChange={setSearch}
                          />
                          <CommandList>
                            {isLoading ? (
                              <div className="p-5 text-gray-400 text-sm">
                                กำลังโหลด...
                              </div>
                            ) : filteredUser && filteredUser.length > 0 ? (
                              filteredUser
                                .filter(
                                  (user: UserProps) =>
                                    !supportedUserIds.has(user.id)
                                )
                                .map((item: any) => {
                                  return (
                                    <CommandItem
                                      key={item.id}
                                      onSelect={() => {
                                        handleUserButtonClick(item.id, true);
                                      }}
                                      className="flex items-center gap-2 py-1.5"
                                    >
                                      <GlobalImage
                                        src={
                                          item.profile?.imageUrl ||
                                          `https://api.dicebear.com/9.x/initials/svg?seed=${item.userName}`
                                        }
                                        alt={item?.userName || ""}
                                        className="w-10 h-10 rounded-2xl"
                                      />
                                      <div className="flex flex-col text-sm">
                                        <span>
                                          ชื่อ :{" "}
                                          {item?.profile?.firstName ||
                                            "-" + item?.profile?.lastName ||
                                            "-"}
                                        </span>
                                        <span>อีเมล : {item.email || "-"}</span>
                                        <span>
                                          ตำแหน่ง : {item.mainDepartment || "-"}
                                        </span>
                                      </div>
                                    </CommandItem>
                                  );
                                })
                            ) : (
                              <div className="p-5 text-gray-400 text-sm">
                                ไม่มีข้อมูลผู้รับผิดชอบ
                              </div>
                            )}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              </div>

              <div className="mx-2 w-[0.8px] h-hull bg-gray-200" />
              <div>
                <p className="font-semibold text-sm text-muted-foreground mb-1">
                  ผู้รับผิดชอบรอง
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {displayed.length > 0 &&
                    displayed.map((user: any, i: any) => (
                      <div
                        className="relative inline-block"
                        key={`secondary-spl-${user?.participantId ?? `unknown-${i}`}`}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() =>
                                  navigate(
                                    `/users/${user?.participantId ?? "unknown"}`
                                  )
                                }
                              >
                                <GlobalImage
                                  src={
                                    user?.imageUrl ||
                                    `https://api.dicebear.com/9.x/initials/svg?seed=${
                                      user?.id ?? "unknown"
                                    }`
                                  }
                                  alt={`secondary-spl-${user?.participantId ?? "unknown"}`}
                                  className={`w-[35px] h-[35px] rounded-full object-cover`}
                                  notShowPreview
                                />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {user?.displayName ?? "-"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            DeleteSupport(user.participantId);
                          }}
                          className="absolute -top-1 -right-1 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100 transition"
                        >
                          <X className="w-2 h-2 text-gray-600" />
                        </button>
                      </div>
                    ))}
                  {extraCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setOpenSelected(true)}
                      className="w-9 h-9 rounded-full border border-gray-300 text-sm font-semibold text-gray-600 bg-white shadow inline-flex items-center justify-center hover:bg-gray-50"
                      aria-label={`ดูรายชื่อผู้รับผิดชอบทั้งหมดอีก ${extraCount} คน`}
                      title={`ดูรายชื่อทั้งหมด (+${extraCount})`}
                    >
                      +{extraCount}
                    </button>
                  )}
                  <div>
                    <Popover
                      open={isPopoverOpen}
                      onOpenChange={setIsPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setIsPopoverOpen(true)}
                          className="rounded-full object-cover cursor-pointer"
                          disabled={isCreatingSupport}
                        >
                          <CirclePlus className="w-9 h-9 text-gray-300 cursor-pointer" />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent className="w-95">
                        <Command>
                          <CommandInput
                            placeholder="ค้นหาชื่อผู้รับผิดชอบ"
                            value={search}
                            onValueChange={setSearch}
                          />
                          <CommandList>
                            {isLoading ? (
                              <div className="p-5 text-gray-400 text-sm">
                                กำลังโหลด...
                              </div>
                            ) : filteredUser && filteredUser.length > 0 ? (
                              filteredUser
                                .filter(
                                  (user: UserProps) =>
                                    !supportedUserIds.has(user.id)
                                )
                                .map((item: any) => {
                                  return (
                                    <CommandItem
                                      key={item.id}
                                      onSelect={() => {
                                        handleUserButtonClick(item.id, false);
                                      }}
                                      className="flex items-center gap-2 py-1.5"
                                    >
                                      <GlobalImage
                                        src={
                                          item.profile?.imageUrl ||
                                          `https://api.dicebear.com/9.x/initials/svg?seed=${item.userName}`
                                        }
                                        alt={item?.userName || ""}
                                        className="w-10 h-10 rounded-2xl"
                                      />
                                      <div className="flex flex-col text-sm">
                                        <span>
                                          ชื่อ :{" "}
                                          {item?.profile?.firstName ||
                                            "-" + item?.profile?.lastName ||
                                            "-"}
                                        </span>
                                        <span>อีเมล : {item.email || "-"}</span>
                                        <span>
                                          ตำแหน่ง : {item.mainDepartment || "-"}
                                        </span>
                                      </div>
                                    </CommandItem>
                                  );
                                })
                            ) : (
                              <div className="p-5 text-gray-400 text-sm">
                                ไม่มีข้อมูลผู้รับผิดชอบ
                              </div>
                            )}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>

            {/* TAG UI START */}
            <div className="px-1">
              <Separator className="mt-2 mb-2" />

              {tags && tags.length ? (
                <>
                  <h2>แท็กลูกค้า</h2>
                  <div className="pb-0 mt-2 px-2">
                    <div className="gap-2 flex flex-row flex-wrap">
                      {tags.map((item: any) => {
                        return (
                          <GlobalTagsBadge
                            key={item.id}
                            value={item.name}
                            fontSize={10}
                            paddingX={1.5}
                          />
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="px-2">
                  <h2>แท็กลูกค้า</h2>
                  <div className="flex justify-center p-4">
                    <span className="text-sm transition-colors break-words text-slate-400 italic">
                      ยังไม่มีข้อมูล
                    </span>
                  </div>
                </div>
              )}
              <GlobalButton
                className="mt-4"
                key="sync-ai"
                type="button"
                onClick={() => setShowTagManager(true)}
                variant="secondary"
                icon={<PlusIcon />}
                label={<span className="hidden sm:inline">แก้ไขแท็ก</span>}
              />
              <Separator className="mt-2 mb-2" />
            </div>
            {/* TAG UI END*/}

            <Tabs defaultValue="note" onValueChange={(v) => setActiveTab(v)}>
              <ScrollArea className="h-[40px]">
                <TabsList className="w-full ">
                  {dataInTaps.map(({ value, label, Icon }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className={classForTaps}
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <ScrollBar orientation="horizontal" className="h-1" />
              </ScrollArea>

              <TabsContent value="note">
                <NoteLists
                  selectedRoom={selectedRoom}
                  customer={currentCustomer}
                  refetchCustomer={refetchCustomer}
                />
              </TabsContent>

              <TabsContent value="product">
                <div className="flex flex-col justify-between w-full pt-1">
                  <div className="flex flex-row items-center justify-between gap-12">
                    <p className="text-sm font-semibold mb-2">สินค้าที่สนใจ</p>

                    <div className="flex gap-2">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-[30px] w-[70px] px-2 gap-2"
                          >
                            <span className="text-[12px]">กรอง</span>
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-[280px] p-0" align="start">
                          <div className="flex items-center justify-between px-3 py-2">
                            <span className="text-sm font-medium">
                              สถานะสินค้า
                            </span>
                            {countFilterOption > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2"
                                onClick={clearAllFilterStatus}
                              >
                                <X className="h-3.5 w-3.5 mr-1" />
                                เคลียร์
                              </Button>
                            )}
                          </div>

                          <Separator />

                          <Command>
                            <CommandList>
                              <CommandEmpty>ไม่พบรายการ</CommandEmpty>
                              <CommandGroup>
                                {STATUS_OPTIONS.map((opt) => {
                                  const active = selected.includes(opt.value);
                                  return (
                                    <CommandItem
                                      key={opt.value}
                                      onSelect={() =>
                                        handleToggleFilterStatus(opt.value)
                                      }
                                      className="flex items-center justify-between"
                                      aria-checked={active}
                                      role="option"
                                    >
                                      <span>{opt.label}</span>
                                      {active ? (
                                        <Check className="h-4 w-4" />
                                      ) : null}
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </CommandList>
                          </Command>

                          <div className="p-3 flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setOpen(false)}
                            >
                              ปิด
                            </Button>
                            <Button size="sm" onClick={handleApplyFilterStatus}>
                              ใช้ตัวกรอง
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-[30px] w-[70px] p-2 px-3"
                        onClick={createOrder}
                        disabled={cartItems.length <= 0}
                      >
                        <span className="text-[12px]">ตะกร้า</span>

                        {cartItems.length > 0 && (
                          <div className="text-amber-500">
                            {cartItems.length}
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-2 font-semibold">
                    รายการสินค้าในระบบ
                  </p>
                  <Input
                    placeholder="ค้นหาด้วยชื่อ"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <ScrollArea className="h-[calc(100vh-560px)] rounded-md border p-2 bg-white dark:bg-black/30 pb-[35px]">
                    <ul className="space-y-2">
                      {productsLoading ? (
                        <div className="space-y-2">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="flex flex-row gap-2">
                              <SkeletonLoading height="h-15" width="w-1/4" />
                              <SkeletonLoading height="h-15" />
                            </div>
                          ))}
                        </div>
                      ) : productsPaginate &&
                        productsPaginate.items.length > 0 ? (
                        productsPaginate.items.map((item: Product) => (
                          <li
                            key={item?.id}
                            className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-muted/60 transition-colors"
                          >
                            {item?.id && (
                              <div
                                className="flex gap-2 cursor-pointer w-full"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleOpenProductModalsWithItem(item);
                                  // toggleCartItem(item);
                                }}
                              >
                                {/* <Checkbox
                                  checked={isInCart(item.id)}
                                  onClick={(e) => e.stopPropagation()}
                                  onCheckedChange={() => toggleCartItem(item)}
                                /> */}
                                <div className="flex items-center justify-between gap-2 w-full">
                                  <div className="flex items-center gap-3">
                                    <GlobalImage
                                      notShowPreview={true}
                                      src={item.imageUrl ?? ""}
                                      alt={item.name ?? ""}
                                      className="w-[50px] h-[50px] rounded-md object-cover border"
                                    />

                                    <Accordion
                                      type="single"
                                      collapsible
                                      className="w-full"
                                    >
                                      <AccordionItem
                                        value={`item-${item.id}`}
                                        className="border-none"
                                      >
                                        <AccordionItem
                                          value={`item-${item.id}`}
                                          className="border-none"
                                        >
                                          <AccordionTrigger className="p-0 hover:no-underline [&>svg]:hidden">
                                            <div className="flex flex-col items-start text-left">
                                              <span className="text-sm font-medium truncate max-w-[150px]">
                                                {item.name}
                                              </span>
                                              <span className="text-xs text-muted-foreground">
                                                {item.sku}
                                              </span>
                                              <span className="text-xs text-muted-foreground">
                                                สินค้าคงเหลือ : {item.available}{" "}
                                                ชิ้น
                                              </span>
                                              <Badge
                                                variant="outline"
                                                className={cn(
                                                  "mt-1 px-2 py-0.5 text-xs rounded-full border-none",
                                                  item.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-500"
                                                )}
                                              >
                                                {item.status === "active"
                                                  ? "สั่งซื้อได้"
                                                  : "สินค้าหมด"}
                                              </Badge>
                                            </div>
                                          </AccordionTrigger>
                                        </AccordionItem>
                                      </AccordionItem>
                                    </Accordion>
                                  </div>

                                  <div className="flex flex-col items-end gap-1">
                                    <span className="font-semibold text-sm text-blue-600">
                                      {item.salePrice} ฿
                                    </span>

                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleOpenProductModalsWithItem(item);
                                      }}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </li>
                        ))
                      ) : (
                        <p className="text-center text-sm text-muted-foreground py-4">
                          ไม่พบสินค้าในรายการ
                        </p>
                      )}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="settingAI">
                <div className="space-y-3 h-[calc(100vh-450px)] overflow-auto">
                  <div className="flex flex-row justify-between items-center w-full">
                    <h3 className="text-sm font-semibold mt-1">พูดคุยกับ AI</h3>

                    <Button
                      type="button"
                      size={"sm"}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm text-black"
                      onClick={() => {
                        setOpenAiSetting(true);
                      }}
                    >
                      <Settings />
                    </Button>
                  </div>

                  {isFirstTimeAI && !chatRoomAssistantId ? (
                    <HeroSearch onInputChange={handleFirstTimeAISearch} />
                  ) : (
                    <ChatMessagesWithAI
                      customerId={customer?.id}
                      chatRoomId={chatRoomAssistantId}
                      autoScroll={autoScroll}
                      setAutoScroll={setAutoScroll}
                      searchPrompt={firstTimeMessage}
                      isAILoading={isPendingAI}
                    />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </aside>

      {/* {isFirstTimeAI ? ( */}
      {/* {isFirstTimeAI &&
                  currentCustomer &&
                  !currentCustomer.chatRoomAssistantId ? (
                    <AIInsightExampleRender
                      customerName={currentCustomer.name}
                    />
                  ) : (
                    // <HeroSearch onInputChange={handleFirstTimeAISearch} /> // !! old code for p'aon
                    <ChatMessagesWithAI
                      customerId={customer.id}
                      chatRoomId={chatRoomAssistantId}
                      autoScroll={autoScroll}
                      setAutoScroll={setAutoScroll}
                      searchPrompt={firstTimeMessage}
                      isAILoading={isPendingAI}
                    />
                  )} */}

      {showTagManager && (
        <ChatCustomerTags
          title="แก้ไขแท็ก"
          selectedTags={selectedTags}
          availableTags={availableTags}
          onTagsChange={setSelectedTags}
          onClose={() => setShowTagManager(false)}
          handleSubmit={handleSubmit}
        />
      )}

      <OrderViewModal
        open={isCheckStatusOpen}
        onOpenChange={setCheckStatusOpen}
      />

      <AIMessageView
        open={AIOpen}
        onOpenChange={setAIOpen}
        customer={dataFromAI}
        noSyncBtn={true}
      />

      <AboutCustomer
        open={addCustomerDetail}
        onOpenChange={setAddCustomerDetail}
        customer={currentCustomer}
        setAddCustomerDetail={setAddCustomerDetail}
      />

      <ViewOrderDialog
        open={viewOrderDetailOpen}
        onOpenChange={setViewOrderDetailOpen}
        customerId={currentCustomer?.id}
        orderId={viewOrderDetail}
        details={
          customerOrders &&
          customerOrders.length &&
          customerOrders?.find((co) => co.id === viewOrderDetail)
        }
      />

      <Dialog open={openAiSetting} onOpenChange={setOpenAiSetting}>
        <DialogContent className="sm:max-w-lg w-full max-h-[70vh] overflow-auto p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle>การตั้งค่า AI</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col space-y-2 mt-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mt-4 mb-3">
              <Label htmlFor="ai-enabled" className="text-sm">
                เปิดใช้งานตลอดเวลา
              </Label>
              <Switch
                id="ai-enabled"
                checked={aiEnabled}
                onCheckedChange={(state) => {
                  setAiEnabled(state);
                  if (state) {
                    setAiEnabledWithCondition(false);
                  }
                }}
              />
            </div>

            <div className="flex items-center justify-between mt-4 mb-3">
              <Label htmlFor="ai-enabled-condition" className="text-sm">
                ใช้งาน AI ตามเงื่อนไข
              </Label>
              <Switch
                id="ai-enabled-condition"
                checked={aiEnabledWithCondition}
                onCheckedChange={(state) => {
                  setAiEnabledWithCondition(state);
                  if (state) {
                    setAiEnabled(false);
                  }
                }}
              />
            </div>

            <div
              className={cn(
                "mt-4 space-y-4 transition-all",
                !aiEnabledWithCondition && "opacity-50 pointer-events-none"
              )}
            >
              <div className="flex flex-col gap-2">
                <Label className="text-sm">ช่วงเวลาที่ให้ AI ตอบ</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={aiStartTime || ""}
                    onChange={(e) => setAiStartTime(e.target.value)}
                    className="w-[120px]"
                    disabled={!aiEnabledWithCondition}
                  />
                  <span className="text-sm">ถึง</span>
                  <Input
                    type="time"
                    value={aiEndTime || ""}
                    onChange={(e) => setAiEndTime(e.target.value)}
                    className="w-[120px]"
                    disabled={!aiEnabledWithCondition}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm">
                  หากไม่มีการตอบกลับจากเซลภายใน (ชั่วโมง:นาที)
                </Label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="HH"
                    min={0}
                    max={24}
                    value={hours}
                    onChange={(e) => {
                      const v = e.target.value.slice(0, 2);
                      if (Number(v) <= 24) setHours(v);
                    }}
                    className="border p-1 rounded w-[70px] text-center"
                  />
                  :
                  <input
                    type="number"
                    placeholder="MM"
                    min={0}
                    max={59}
                    value={minutes}
                    onChange={(e) => {
                      const v = e.target.value.slice(0, 2);
                      if (Number(v) <= 59) setMinutes(v);
                    }}
                    className="border p-1 rounded w-[70px] text-center"
                  />
                </div>
              </div>
            </div>

            <GlobalButton
              label="บันทึกการตั้งค่า AI"
              className="mt-8 mb-8"
              onClick={handleChangeAIConfig}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openProductModal} onOpenChange={setOpenProductModal}>
        <DialogContent className="sm:max-w-xl w-full max-h-[75vh] overflow-auto p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle>รายละเอียดสินค้า</DialogTitle>
            {/* ซับไตเติลสั้น ๆ เผื่ออนาคต */}
            {/* <DialogDescription>Quick view</DialogDescription> */}
          </DialogHeader>

          {/* ====== BODY ====== */}
          <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-5">
            {/* Image */}
            <div className="flex items-start">
              <div className="size-[160px] rounded-lg border bg-muted/40 overflow-hidden">
                <GlobalImage
                  notShowPreview={true}
                  src={selectProductItem?.imageUrl || ""}
                  alt={selectProductItem?.name || "product-image"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              {/* Name + Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-semibold leading-6">
                    {selectProductItem?.name ?? "-"}
                  </h3>
                  <p className="text-gray-500">
                    {selectProductItem?.description ?? ""}
                  </p>
                </div>

                <GlobalStatusBadge value={selectProductItem?.status} />
              </div>

              {/* Definition list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                <div className="flex justify-between sm:block">
                  <span className="text-muted-foreground">SKU</span>
                  <div className="font-medium">
                    {selectProductItem?.sku ?? "-"}
                  </div>
                </div>

                {/* <div className="flex justify-between sm:block">
                  <span className="text-muted-foreground">หมวดหมู่</span>
                  <div className="font-medium">
                    {
                      // รองรับทั้ง category.name หรือ productCategory.name
                      selectProductItem?.category?.name ??
                        selectProductItem?.productCategory?.name ??
                        "-"
                    }
                  </div>
                </div> */}

                <div className="flex justify-between sm:block">
                  <span className="text-muted-foreground">ราคาต่อชิ้น</span>
                  <div className="font-semibold">
                    {/* {formatTHB(selectProductItem?.salePrice)} */}
                    {selectProductItem?.salePrice}
                  </div>
                </div>

                <div className="flex justify-between sm:block">
                  <span className="text-muted-foreground">พร้อมขาย</span>
                  <div className="font-semibold">
                    {Number(
                      selectProductItem?.availableForSale
                    ).toLocaleString()}
                  </div>
                </div>

                <div className="flex justify-between sm:block">
                  <span className="text-muted-foreground">
                    สินค้าคงเหลือในคลัง
                  </span>
                  <div className="font-semibold">
                    {Number(selectProductItem?.available ?? 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====== FOOTER ====== */}
          <DialogFooter className="mt-6 gap-2">
            <Button
              variant="secondary"
              onClick={() => setOpenProductModal(false)}
            >
              ปิด
            </Button>
            <Button
              onClick={() => {
                toggleCartItem(selectProductItem as Product);
                setOpenProductModal(false);
              }}
            >
              บันทึกลงตะกร้า
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openSelected} onOpenChange={setOpenSelected}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              ผู้รับผิดชอบรองทั้งหมด ({secondarySupports.length})
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {secondarySupports.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                ยังไม่มีผู้รับผิดชอบรอง
              </div>
            ) : (
              secondarySupports.map((item: any) => (
                <div key={item.id} className="flex items-center gap-3">
                  <GlobalImage
                    src={
                      item?.imageUrl ||
                      `https://api.dicebear.com/9.x/initials/svg?seed=${
                        item?.userId ?? "unknown"
                      }`
                    }
                    alt={item?.fullName || item?.userId || ""}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {item?.fullName ?? "-"}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {item?.email ?? item?.userName ?? "-"}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="text-sm underline underline-offset-2"
                      onClick={() =>
                        navigate(`/users/${item?.userId ?? "unknown"}`)
                      }
                    >
                      ดูโปรไฟล์
                    </button>

                    <Separator orientation="vertical" className="h-4" />

                    <button
                      className="text-sm text-red-600 hover:text-red-700"
                      onClick={() => DeleteSupport(item.id)}
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
