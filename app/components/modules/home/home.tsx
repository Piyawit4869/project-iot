import { DataTable } from "~/components/shared/data-table";
import { TabControl } from "~/components/shared/tab-control";
import { Button } from "~/components/ui/button";
import { useAllUserSummary, usePaginate } from "~/api/client/user";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TabIndexTableUser } from "~/types/user/init-data";
import { cn } from "~/lib/utils";
import { useSidebar } from "~/components/ui/sidebar";
import React, { useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { mockUsers } from "./userData";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";
import { Spinner } from "~/components/ui/spinner";
import {
  AlertCircle,
  Camera,
  CheckCircle,
  Scan,
  Unlock,
  User,
  XCircle,
  Lock,
} from "lucide-react";
import { useUserColumns } from "../users/component/columns";

export default function HomeComponent() {
  const columns = useUserColumns();
  const paginate = usePaginate;
  const { data: user } = useAllUserSummary();
  const items = TabIndexTableUser(user);
  const { isMobile } = useSidebar();
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);
  const [tableKey, setTableKey] = React.useState(0);
  const [sp, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [status, setStatus] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:9000/status?token=supersecret",
        );
        const data = await res.json();
        setStatus(data);
      } catch (err) {
        console.error("status error", err);
      }
    };

    fetchStatus(); // เรียกทันที
    const t = setInterval(fetchStatus, 1000); // ทุก 1 วิ

    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:9000/ws/stream");

    ws.binaryType = "arraybuffer"; // สำคัญมาก

    ws.onopen = () => {
      console.log("WS connected");
    };

    ws.onmessage = (event) => {
      const blob = new Blob([event.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);

      if (imgRef.current) {
        imgRef.current.src = url;
      }
    };

    ws.onerror = (err) => {
      console.error("WS error", err);
    };

    ws.onclose = () => {
      console.log("WS closed");
    };

    return () => {
      ws.close(); // ปิดเมื่อออกจากหน้า
    };
  }, []);

  const clearAllFilters = React.useCallback(() => {
    setSearchParams({});

    navigate(location.pathname, { replace: true });
  }, [setSearchParams, navigate, location.pathname]);

  const handleChangeTab = (val: string) => {
    const hadQuery =
      new URLSearchParams(window.location.search).toString().length > 0;
    setStatus(val);
    clearAllFilters();
    if (hadQuery) {
      setTableKey((k) => k + 1);
    }
  };

  const mockPaginate = async ({
    pageIndex,
    limit,
  }: {
    pageIndex: number;
    limit: number;
  }) => {
    return {
      data: mockUsers.slice(pageIndex * limit, pageIndex * limit + limit),
      total: mockUsers.length,
    };
  };

  const ESP_BASE = "http://192.168.43.3:80";

  type Command = "unlock";

  const sendCommand = async (cmd: Command) => {
    try {
      const res = await fetch(`${ESP_BASE}/${cmd}`, {
        method: "GET",
      });

      const text = await res.text();
      console.log("ESP response:", text);
    } catch (err) {
      console.error("Failed to send command:", err);
    }
  };

  return (
    <div className="container h-[calc(100vh-58px)] mx-auto">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Dashboard Content */}
        <div className="flex-1 p-6 bg-gradient-to-br">
          {/* Welcome Section */}
          <TabControl
            title="Smart AI Access Control System"
            buttons={[
              <Button
                key="create-button"
                className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
                onClick={() => sendCommand("unlock")}
              >
                <span className="hidden sm:inline">ปลดล็อคประตู</span>
              </Button>,
            ]}
          />

          <div className="rounded-xl shadow-sm border p-6 dark:bg-card">
            <div className="flex">
              <div className="flex flex-1">
                {!imgSrc ? (
                  <Empty className="w-1/2 rounded-lg border-1 border-solid border-black">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Spinner className="w-8 h-8" />
                      </EmptyMedia>
                      <EmptyTitle>กำลังโหลดภาพจากกล้อง</EmptyTitle>
                      <EmptyDescription>
                        โปรดตรวจสอบ IP และเครือข่ายให้อยู่ในวงเดียวกัน
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                ) : (
                  <img
                    ref={imgRef}
                    src={imgSrc}
                    alt="Live"
                    className="w-1/2 bg-black rounded-lg"
                  />
                )}
              </div>
              <div className="flex flex-col flex-1">
                <div className="ml-6">
                  <h1 className="text-xl font-bold text-black mb-2">
                    ระบบควบคุมการเข้าออกอัจฉริยะด้วยการรู้จำบุคคลและท่าทางโดยใช้ปัญญาประดิษฐ์
                  </h1>
                  <p className="text-slate-500">
                    Real-time facial recognition and access control
                  </p>
                </div>
                <div className="flex-1 space-y-6 mt-4 ml-6">
                  <StatusCard
                    icon={<Camera className="w-5 h-5" />}
                    label="Camera Status"
                    value={status?.cameraReady ? "Ready" : "Offline"}
                    status={status?.cameraReady ? "success" : "error"}
                  />

                  <StatusCard
                    icon={<User className="w-5 h-5" />}
                    label="Person Detection"
                    value={
                      status?.personDetected ? "Person Detected" : "No Person"
                    }
                    status={status?.personDetected ? "success" : "idle"}
                  />

                  <StatusCard
                    icon={<Scan className="w-5 h-5" />}
                    label="Face Recognition"
                    value={
                      status?.faceMatched
                        ? "Match Found"
                        : status?.personDetected
                          ? "Scanning..."
                          : "Waiting"
                    }
                    status={
                      status?.faceMatched
                        ? "success"
                        : status?.personDetected
                          ? "warning"
                          : "idle"
                    }
                  />

                  <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-300 font-medium">
                        Similarity Score
                      </span>
                      <span className="text-2xl font-bold text-white">
                        {status?.similarityScore}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          status?.similarityScore >= 80
                            ? "bg-green-400"
                            : status?.similarityScore >= 60
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                        style={{ width: `${status?.similarityScore}%` }}
                      />
                    </div>
                  </div>

                  <StatusCard
                    icon={
                      status?.doorLocked ? (
                        <Lock className="w-5 h-5" />
                      ) : (
                        <Unlock className="w-5 h-5" />
                      )
                    }
                    label="Door Status"
                    value={status?.doorLocked ? "Locked" : "Unlocked"}
                    status={status?.doorLocked ? "idle" : "success"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <DataTable
              queryFunction={(res) =>
                mockPaginate({
                  pageIndex: res.pageIndex,
                  limit: res.pageSize,
                })
              }
              columns={columns}
              addOn={
                <Tabs
                  value={status}
                  onValueChange={handleChangeTab}
                  className={cn("block", isMobile && "hidden")}
                >
                  <TabsList>
                    {items.map((c) => (
                      <TabsTrigger
                        key={c.label}
                        value={c.status}
                        className="hover:bg-border relative px-4 py-2 !shadow-none !border-0 rounded-md after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black after:transition-all after:w-0 data-[state=active]:after:w-full"
                      >
                        {c.icon} {c.label} ({c.value})
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatusCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: "success" | "error" | "warning" | "idle";
}

function StatusCard({ icon, label, value, status }: StatusCardProps) {
  const statusColors = {
    success: "text-green-400 bg-green-400/10 border-green-400/30",
    error: "text-red-400 bg-red-400/10 border-red-400/30",
    warning: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    idle: "text-slate-400 bg-slate-700/50 border-slate-600",
  };

  const StatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`rounded-xl p-4 border transition-all duration-300 ${statusColors[status]}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="opacity-70">{icon}</div>
          <div>
            <p className="text-sm text-slate-400 mb-1">{label}</p>
            <p className="font-semibold text-white">{value}</p>
          </div>
        </div>
        <StatusIcon />
      </div>
    </div>
  );
}
