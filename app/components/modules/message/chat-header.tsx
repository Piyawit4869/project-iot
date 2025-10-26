// import React from "react";
// import { Button } from "~/components/ui/button";
// import { Settings2 } from "lucide-react";
// import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
// import { SkeletonLoading } from "~/components/shared/skeleton-loading";
// import ChatCustomerInfo from "./chat-customer";
// import MenuWhenNoData from "./noData/menuWhenNoData";

// /**
//  * ChatHeader
//  * A compact, responsive header for the chat page that shows the current customer name
//  * and provides access to the right-side settings/info drawer. Matches the provided JSX structure.
//  */
// export type ChatHeaderProps = {
//   // UI states
//   isLoading?: boolean;
//   isMobile?: boolean;

//   // Customer / room context
//   customerSingle?: { profile?: { name?: string | null } | null } | null;
//   selectedRoom: { id?: string | null; customerId?: string | null } | null;

//   // Drawer controls
//   drawer: boolean;
//   customerInfoOpen?: boolean; // used to combine with `isMobile`
//   handleOpenDrawer: () => void;
//   handleCloseDrawer: () => void;

//   // Actions
//   handleShowSetting: () => void;

//   // Props for nested components
//   api: any;
//   refetch: () => void;
//   setCreateOrderOpen: (open: boolean) => void;
//   setAddCustomerDetail: (open: boolean) => void;
//   addCustomerDetail: boolean;
// };

// const hasCustomerId = (selectedRoom: ChatHeaderProps["selectedRoom"]) => {
//   if (!selectedRoom) return true; // keep same truthy behavior as original snippet
//   return !!selectedRoom.customerId;
// };

// export default function ChatHeader(props: ChatHeaderProps) {
//   const {
//     isLoading = false,
//     isMobile = false,
//     customerSingle,
//     selectedRoom,
//     drawer,
//     customerInfoOpen,
//     handleOpenDrawer,
//     handleCloseDrawer,
//     handleShowSetting,
//     api,
//     refetch,
//     setCreateOrderOpen,
//     setAddCustomerDetail,
//     addCustomerDetail,
//   } = props;

//   return (
//     <div className="flex items-center border-b px-4 py-2 dark:bg-background">
//       {/* Desktop settings button */}
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={handleShowSetting}
//         className="hidden md:flex"
//         aria-label="เปิดการตั้งค่า"
//       >
//         <Settings2 className="h-4 w-4" />
//       </Button>

//       <div className="flex items-center w-full gap-2 h-[36px] justify-between">
//         {isLoading ? (
//           <SkeletonLoading className="w-[200px] h-[20px]" />
//         ) : (
//           <h2 className="text-lg font-semibold">
//             {customerSingle?.profile?.name ?? ""}
//           </h2>
//         )}

//         {/* Right-side drawer on mobile (and also controllable on desktop via `drawer`) */}
//         <Drawer
//           direction="right"
//           open={isMobile ? drawer || !!customerInfoOpen : drawer}
//           onClose={handleCloseDrawer}
//         >
//           <DrawerTrigger asChild>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={handleOpenDrawer}
//               className="flex md:hidden"
//               aria-label="เปิดข้อมูลลูกค้า"
//             >
//               <Settings2 className="h-4 w-4" />
//             </Button>
//           </DrawerTrigger>

//           <DrawerContent>
//             <div className="mx-auto w-full">
//               {selectedRoom?.id ? (
//                 <ChatCustomerInfo
//                   api={api}
//                   refetchCustomer={refetch}
//                   setCreateOrderOpen={setCreateOrderOpen}
//                   setAddCustomerDetail={setAddCustomerDetail}
//                   addCustomerDetail={addCustomerDetail}
//                   modelCustomerDetails={addCustomerDetail}
//                   currentCustomer={customerSingle as any}
//                 />
//               ) : (
//                 <MenuWhenNoData hasCustomerId={hasCustomerId(selectedRoom)} />
//               )}
//             </div>
//           </DrawerContent>
//         </Drawer>
//       </div>
//     </div>
//   );
// }
