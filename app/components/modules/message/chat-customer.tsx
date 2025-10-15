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
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
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
import { socketConfig } from "~/lib/sockets";
import type { Product } from "~/schemas/product/product";
import { useChat, type Message } from "~/providers/chat/useChat";
import { useGetProducts } from "~/api/client/product/useProductQuery";
import {
  useAiReplySettings,
  useConnectedChatRoomAssistant,
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
  refetchCustomer,
  modelCustomerDetails,
  setCreateOrderOpen,
  setAddCustomerDetail,
  addCustomerDetail,
  currentCustomer,
  api,
}: {
  refetchCustomer: any;
  modelCustomerDetails?: boolean;
  setCreateOrderOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddCustomerDetail: React.Dispatch<React.SetStateAction<boolean>>;
  addCustomerDetail: boolean;
  currentCustomer: Customer;
  api: string;
}) {
  const { data: products } = useGetProducts();
  const { setProducts } = useOrder();
  const { addMessageAI } = useChat();

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
   `;

  const customer = currentCustomer;
  const { mutate: update } = useAiReplySettings(customer?.id);
  const customerAI = currentCustomer?.aiReplySettings?.[0];

  const { data: allUser, isLoading } = useGetAllUsers();
  const { mutate: create, isPending: isCreatingSupport } =
    useCreateCustomerSupoort();
  const { mutate: DaleteCustomerSupport } = useDeleteCustomerSupport();
  const { data, refetch } = useGetAllOrders();
  const [chatRoomAssistantId, setChatRoomAssistantId] =
    React.useState<string>("");

  const { mutateAsync: connectedChatRoomAI, isPending: isPendingAI } =
    useConnectedChatRoomAssistant(customer?.id, chatRoomAssistantId);

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
  const [search, setSearch] = React.useState("");
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
        DaleteCustomerSupport(id, {
          onSuccess: () => {
            toast.success("ลบผู้รับผิดชอบเรียบร้อยแล้ว!", {
              id: toastId,
            });
            refetchCustomer();
          },
          onError: () => {
            toast.error("ไม่สามารถลบผู้รับผิดชอบ กรุณาลองใหม่อีกครั้งภายหลัง", {
              id: toastId,
            });
            refetchCustomer();
          },
        });
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
            refetchCustomer();
          },
          onError: () => {
            toast.error(
              "ไม่สามารถเพิ่มผู้รับผิดชอบ เนื่องจากมีผู้ใช้นี้อยู่แล้ว",
              { id: toastId }
            );
            refetchCustomer();
          },
        });
      },
    });
  };

  // const handleOpenPopover = (isMain: boolean) => {
  //   setAddingMainSupport(isMain);
  //   setIsPopoverOpen(true);
  //   form.reset({
  //     userId: "",
  //     isMain: isMain,
  //     customerId: currentCustomer.id,
  //   });
  // };

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
        quantity: 1,
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
      setCartItems((prev) => prev.filter((i: Product) => i?.id !== item.id));
    } else {
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
    currentCustomer &&
    currentCustomer.supports &&
    currentCustomer.supports.length
      ? currentCustomer.supports.map((support) => support.userId)
      : []
  );

  const filtered: Product[] = React.useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    const searchText: string = search.trim().toLowerCase();

    return list.filter((i) => {
      if (!i) return false;

      const matchText =
        !searchText ||
        (i.name?.toLowerCase().includes(searchText) ?? false) ||
        (i.sku?.toLowerCase().includes(searchText) ?? false);

      const matchStatus =
        applied.length === 0 || (i.status && applied.includes(i.status));

      return matchText && matchStatus;
    });
  }, [products, search, applied]);

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
    const socket = socketConfig(api);

    // ✅ Join chat room (detail)
    if (chatRoomAssistantId) {
      socket.emit("chat", { chatRoomId: `${chatRoomAssistantId}` });
    }

    // ✅ Listen for new messages
    socket.on("chat", (msg: Message) => {
      addMessageAI({
        ...msg,
        imageUrl:
          msg.imageUrl || `https://ui-avatars.com/api/?name=${msg.sender}`,
      });
    });

    // ❌ Don't forget to clean up!
    return () => {
      socket.disconnect();
    };
  }, [chatRoomAssistantId]);

  React.useEffect(() => {
    if (currentCustomer) {
      setChatRoomAssistantId(currentCustomer?.chatRoomAssistantId || "");
    }
  }, [currentCustomer]);
  const countFilterOption: number = selected.length;

  if (!customer || !currentCustomer) return <CustomerInfoSkeleton />;

  return (
    <>
      <aside className="flex flex-col w-full bg-white dark:bg-background justify-between xl:h-[calc(100vh-50px)] xl:px-1">
        <div>
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
                      <h2 className="font-semibold text-lg mr-auto">
                        {currentCustomer.profile.name}
                      </h2>
                      <h2 className="font-semibold text-sm mr-auto">
                        {currentCustomer.profile.lineName || "ไม่ทราบชื่อ"}
                      </h2>
                    </>
                  ) : (
                    <h2 className="font-semibold text-lg mr-auto">
                      {currentCustomer.profile?.lineName || "ไม่ทราบชื่อ"}
                    </h2>
                  )}
                </div>
              </div>
              <div className="flex flex-row gap-2 mt-1">
                <span
                  className={`text-xs p-1 px-3 rounded-full ${
                    STATUS_BG[currentCustomer.status] ??
                    "bg-gray-400 text-white"
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

            <UserPen
              size={18}
              color="#09a799"
              className="cursor-pointer"
              onClick={() => setAddCustomerDetail(true)}
            />
          </div>

          <div className="px-4">
            <div className="mt-4 space-y-1">
              <>
                <p className="font-semibold text-sm text-muted-foreground mb-1">
                  ผู้รับผิดชอบหลัก
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentCustomer &&
                  currentCustomer.supports &&
                  currentCustomer.supports.filter((spl) => spl.isMain)
                    .length ? (
                    <div className="flex flex-wrap gap-2 mb-1">
                      {currentCustomer.supports
                        .filter((spl) => spl.isMain)
                        .map((spl, userIndex) => (
                          <div
                            className="relative inline-block"
                            key={`main-spl-${spl.id}`}
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() =>
                                      navigate(`/user/${spl.userId}`)
                                    }
                                  >
                                    <GlobalImage
                                      src={
                                        spl.imageUrl ||
                                        `https://api.dicebear.com/9.x/initials/svg?seed=${spl.userId}`
                                      }
                                      alt={`main-spl-${spl.userId}`}
                                      className={`w-[35px] h-[35px] rounded-full object-cover border-2 ${
                                        userIndex === 0 && "border-amber-500"
                                      }`}
                                    />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {spl?.fullName ?? "-"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                DeleteSupport(spl.id);
                              }}
                              className="absolute -top-1 -right-1 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100 transition"
                            >
                              <X className="w-2 h-2 text-gray-600" />
                            </button>
                          </div>
                        ))}
                    </div>
                  ) : (
                    // <Popover
                    //   open={isPopoverOpen && addingMainSupport}
                    //   onOpenChange={setIsPopoverOpen}
                    // >
                    //   <PopoverTrigger asChild>
                    //     <button
                    //       type="button"
                    //       onClick={() => handleOpenPopover(true)}
                    //       className="rounded-full object-cover"
                    //     >
                    //       <CirclePlus className="w-9 h-9 text-gray-300" />
                    //     </button>
                    //   </PopoverTrigger>
                    //   <PopoverContent className="w-[200px] p-0">
                    //     <div className="flex flex-col p-2 max-h-[200px] overflow-y-auto">
                    //       {!isLoading &&
                    //         allUser &&
                    //         allUser.length > 0 &&
                    //         allUser
                    //           .filter(
                    //             (user: UserProps) =>
                    //               !supportedUserIds.has(user.id)
                    //           )
                    //           ?.map((item: UserProps) => (
                    //             <button
                    //               key={item.id}
                    //               onClick={() => handleUserButtonClick(item.id)}
                    //               className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-left w-full"
                    //               disabled={isCreatingSupport}
                    //             >
                    //               <span className="text-sm font-medium">
                    //                 {item.userName}
                    //               </span>
                    //             </button>
                    //           ))}

                    //       {isCreatingSupport && (
                    //         <span className="flex items-center justify-center text-sm text-muted-foreground p-2">
                    //           กำลังเพิ่มผู้รับผิดชอบ...
                    //         </span>
                    //       )}
                    //       {allUser &&
                    //         allUser.length > 0 &&
                    //         allUser.filter(
                    //           (user: UserProps) =>
                    //             !supportedUserIds.has(user.id)
                    //         ).length === 0 && (
                    //           <span className="flex items-center justify-center text-sm text-muted-foreground p-2">
                    //             ไม่มีผู้ใช้ให้เลือก
                    //           </span>
                    //         )}
                    //     </div>
                    //   </PopoverContent>
                    // </Popover>

                    <Popover
                      open={isPopoverOpenMain}
                      onOpenChange={setIsPopoverOpenMain}
                    >
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setIsPopoverOpenMain(true)}
                          className="rounded-full object-cover"
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
              </>

              <>
                <p className="font-semibold text-sm text-muted-foreground mb-1">
                  ผู้รับผิดชอบรอง
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {currentCustomer &&
                    currentCustomer.supports &&
                    currentCustomer.supports.filter((spl) => !spl.isMain)
                      .length > 0 &&
                    currentCustomer.supports
                      .filter((spl) => !spl.isMain)
                      .map((user, i) => (
                        <div
                          className="relative inline-block"
                          key={`secondary-spl-${
                            user?.userId ?? `unknown-${i}`
                          }`}
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/user/${user?.userId ?? "unknown"}`
                                    )
                                  }
                                >
                                  <GlobalImage
                                    src={
                                      user?.imageUrl ||
                                      `https://api.dicebear.com/9.x/initials/svg?seed=${
                                        user?.userId ?? "unknown"
                                      }`
                                    }
                                    alt={`secondary-spl-${
                                      user?.userId ?? "unknown"
                                    }`}
                                    className={`w-[35px] h-[35px] rounded-full object-cover`}
                                  />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {user?.fullName ?? "-"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              DeleteSupport(user.id);
                            }}
                            className="absolute -top-1 -right-1 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100 transition"
                          >
                            <X className="w-2 h-2 text-gray-600" />
                          </button>
                        </div>
                      ))}
                  <div>
                    {/* <Popover
                      open={isPopoverOpen && !addingMainSupport}
                      onOpenChange={setIsPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          onClick={() => handleOpenPopover(false)}
                          className="rounded-full object-cover"
                        >
                          <CirclePlus className="w-9 h-9 text-gray-300" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <div className="flex flex-col p-2 max-h-[200px] overflow-y-auto">
                          {!isLoading &&
                            allUser &&
                            allUser.length > 0 &&
                            allUser
                              .filter(
                                (user: UserProps) =>
                                  !supportedUserIds.has(user.id)
                              )
                              ?.map((item: UserProps) => (
                                <button
                                  key={item.id}
                                  onClick={() => handleUserButtonClick(item.id)}
                                  className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-left w-full"
                                  disabled={isCreatingSupport}
                                >
                                  <span className="text-sm font-medium">
                                    asdsdad {item.userName}
                                  </span>
                                </button>
                              ))}
                          {isCreatingSupport && (
                            <span className="flex items-center justify-center text-sm text-muted-foreground p-2">
                              กำลังเพิ่มผู้รับผิดชอบ...
                            </span>
                          )}
                          {allUser &&
                            allUser.length > 0 &&
                            allUser.filter(
                              (user: UserProps) =>
                                !supportedUserIds.has(user.id)
                            ).length === 0 && (
                              <span className="flex items-center justify-center text-sm text-muted-foreground p-2">
                                ไม่มีผู้รับผิดชอบให้เลือก
                              </span>
                            )}
                        </div>
                      </PopoverContent>
                    </Popover> */}

                    <Popover
                      open={isPopoverOpen}
                      onOpenChange={setIsPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setIsPopoverOpen(true)}
                          className="rounded-full object-cover"
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
              </>

              {/* Note Section */}
              <Tabs defaultValue="note" onValueChange={(v) => setActiveTab(v)}>
                <ScrollArea className="h-[40px]">
                  <TabsList className="w-full">
                    {dataInTaps.map(({ value, label, Icon }) => (
                      <TabsTrigger
                        key={value}
                        value={value}
                        className={classForTaps}
                        // className="px-3 py-2 hover:bg-popover hover:text-foreground dark:hover:bg-popover dark:hover:text-white"
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
                    customer={currentCustomer}
                    refetchCustomer={refetchCustomer}
                  />
                </TabsContent>

                <TabsContent value="product">
                  <div className="flex flex-col justify-between w-full pt-1">
                    <div className="flex flex-row items-center justify-between gap-12">
                      <p className="text-sm font-semibold mb-2">
                        สินค้าที่สนใจ
                      </p>

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

                          <PopoverContent
                            className="w-[280px] p-0"
                            align="start"
                          >
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
                              <Button
                                size="sm"
                                onClick={handleApplyFilterStatus}
                              >
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

                  <div className="space-y-3  pt-4">
                    <p className="text-sm text-muted-foreground mb-2 font-semibold">
                      รายการสินค้าในระบบ
                    </p>
                    <Input
                      placeholder="ค้นหาด้วยชื่อ"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    <ScrollArea className="h-[calc(100vh-480px)] rounded-md border p-1">
                      <ul className="space-y-2">
                        {filtered &&
                          filtered.length > 0 &&
                          filtered.map((item: Product) => (
                            <li
                              key={item && item.id}
                              className="flex items-center justify-between gap-4 p-2 hover:bg-muted rounded-md"
                            >
                              {item && item.id && (
                                <div
                                  className="flex gap-2 cursor-pointer w-full"
                                  onClick={() => {}}
                                >
                                  <div className="flex flex-row items-center gap-2">
                                    <Checkbox
                                      checked={isInCart(item.id)}
                                      onCheckedChange={() =>
                                        toggleCartItem(item)
                                      }
                                    />
                                  </div>

                                  <div
                                    className="flex flex-row items-center justify-between gap-2  w-full"
                                    onClick={() => {
                                      toggleCartItem(item);
                                    }}
                                  >
                                    <div className="flex flex-row items-center gap-2">
                                      <GlobalImage
                                        src={item.imageUrl ?? ""}
                                        alt={item.name ?? ""}
                                        className="w-[40px] h-[40px] rounded-lg items-center object-cover"
                                      />

                                      <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full"
                                      >
                                        <AccordionItem
                                          value="item-1"
                                          className="align-middle items-start"
                                        >
                                          <AccordionTrigger>
                                            <div className="flex flex-col items-start">
                                              <div className="text-[12px] truncate max-w-[125px]">
                                                {item.name}
                                              </div>

                                              <div className="text-[10px] text-gray-500 ">
                                                {item.sku}
                                              </div>
                                              <Badge
                                                variant="outline"
                                                className={cn(
                                                  "p-1.5 py-0.5 text-[10px] rounded-full",
                                                  item.status === "active"
                                                    ? "bg-green-400 text-black font-bold"
                                                    : "bg-gray-500 text-white font-bold"
                                                )}
                                              >
                                                {item.status === "active"
                                                  ? "สั่งซื้อได้"
                                                  : "สินค้าหมด"}
                                              </Badge>
                                            </div>
                                          </AccordionTrigger>
                                        </AccordionItem>
                                      </Accordion>
                                    </div>

                                    <div className="flex flex-col items-end justify-between align-middle">
                                      <span className="font-semibold text-sm text-blue-600">
                                        {item.salePrice} ฿
                                      </span>

                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-6 w-6"
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
                          ))}

                        {filtered.length === 0 && (
                          <p className="text-center text-sm text-muted-foreground py-4">
                            No items found
                          </p>
                        )}
                      </ul>
                    </ScrollArea>
                  </div>
                </TabsContent>

                <TabsContent value="settingAI">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between items-center w-full">
                      <h3 className="text-sm font-semibold mt-1">
                        พูดคุยกับ AI
                      </h3>

                      <Button
                        type="button"
                        size={"sm"}
                        className="px-3 py-1  bg-gray-100 hover:bg-gray-200 text-sm text-black"
                        onClick={() => {
                          setOpenAiSetting(true);
                        }}
                      >
                        <Settings />
                      </Button>
                    </div>

                    {/* {isFirstTimeAI ? ( */}
                    {isFirstTimeAI && !currentCustomer?.chatRoomAssistantId ? (
                      <HeroSearch onInputChange={handleFirstTimeAISearch} />
                    ) : (
                      <ChatMessagesWithAI
                        customerId={customer.id}
                        chatRoomId={chatRoomAssistantId}
                        autoScroll={autoScroll}
                        setAutoScroll={setAutoScroll}
                        searchPrompt={firstTimeMessage}
                        // isAILoading={true}
                        isAILoading={isPendingAI}
                      />
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </aside>
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

      {/* <Dialog open={openAiSetting} onOpenChange={setOpenAiSetting}>
        <DialogContent className="sm:max-w-lg w-full max-h-[70vh] overflow-auto p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle>การตั้งค่า AI</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col space-y-2 mt-4 max-h-[50vh] overflow-y-auto">
            <div className="flex items-center justify-between mt-4 mb-3">
              <Label htmlFor="ai-enabled" className="text-sm">
                เปิดใช้งานตลอดเวลา
              </Label>
              <Switch
                id="ai-enabled"
                checked={aiEnabled}
                onCheckedChange={setAiEnabled}
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

                  if (state === true) {
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
                  หากไม่มีการตอบกลับจากเซลภายใน (ชั่วโมง)
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={aiWaitTime || ""}
                    onChange={(e) => setAiWaitTime(e.target.value)}
                    className="w-[120px]"
                    disabled={!aiEnabledWithCondition}
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
      </Dialog> */}

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
    </>
  );
}
