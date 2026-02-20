import { TabControl } from "~/components/shared/tab-control";
import { Button } from "~/components/ui/button";
import React, { useRef } from "react";
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
import axios from "axios";
import { accessLogColumns, type AccessLog } from "./columns";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";
import { Spinner } from "~/components/ui/spinner";
import { DataTable } from "~/components/shared/data-table";
import { useLogsTableQuery } from "~/api/client/user";
import LogsPage from "./table";

type GetLogsParams = {
  pageIndex: number;
  limit: number;
};

export async function getLogsSafe({
  pageIndex,
  limit,
  token,
}: GetLogsParams & { token?: string }) {
  try {
    const res = await axios.get("http://127.0.0.1:9000/logs", {
      params: { limit },
      headers: token ? { "x-agent-token": token } : undefined,
      timeout: 3000,
    });

    const items: AccessLog[] = res.data?.items ?? [];

    return {
      data: items,
      meta: {
        totalItems: items.length,
      },
    };
  } catch (err) {
    console.error(err);
    return { data: [] as AccessLog[], meta: { totalItems: 0 } };
  }
}

export default function HomeComponent() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [stream, setStream] = React.useState(false);
  const [status, setStatus] = React.useState<any>(null);
  const simPercent = Math.round((status?.last_result?.sim ?? 0) * 100);

  // fetch status
  React.useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:9000/status?token=supersecret",
        );
        const data = await res.json();
        setStatus(data);
        console.log("Fetched status:", data);
      } catch (err) {
        console.error("status error", err);
      }
    };

    fetchStatus();
    const t = setInterval(fetchStatus, 1000);

    return () => clearInterval(t);
  }, []);

  // streaming camera
  React.useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:9000/ws/stream");
    ws.binaryType = "arraybuffer";

    ws.onmessage = (event) => {
      if (typeof event.data === "string") {
        const msg = JSON.parse(event.data);

        if (msg.type === "status") {
          setStream(msg.camera_ready);
        }
        return;
      }

      const blob = new Blob([event.data], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);

      if (imgRef.current) {
        imgRef.current.src = url;
        setStream(true);
      }
    };

    ws.onclose = () => setStream(false);
    ws.onerror = () => setStream(false);

    return () => ws.close();
  }, []);

  // send to esp32
  const ESP_BASE = "http://172.16.200.59:80";
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
    <div className="container mx-auto">
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
                {!stream && (
                  <Empty className="w-1/2 rounded-lg border border-black">
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
                )}
                <img
                  ref={imgRef}
                  alt="Live"
                  className={`bg-black rounded-lg ${!stream ? "hidden" : ""}`}
                />
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
                    label="สถานะกล้อง"
                    value={stream ? "พร้อมใช้งาน" : "ไม่พร้อมใช้งาน"}
                    status={stream ? "success" : "error"}
                  />

                  <StatusCard
                    icon={<User className="w-5 h-5" />}
                    label="ตรวจจับบุคคล"
                    value={
                      status?.last_result?.name
                        ? status?.last_result?.name
                        : "ไม่พบบุคคล"
                    }
                    status={status?.last_result?.name ? "success" : "warning"}
                  />

                  <div className="rounded-xl p-4 bg-orange-400/10 border border-orange-400/30">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-base font-semibold text-black mb-1">
                        ค่าความถูกต้อง
                      </p>
                      <span className="text-2xl font-bold text-black">
                        {simPercent}%
                      </span>
                    </div>
                    <div className="w-full border border-black rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          simPercent >= 80
                            ? "bg-green-400"
                            : simPercent >= 60
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                        style={{ width: `${simPercent}%` }}
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
                    label="สถานะประตู"
                    value={
                      status?.last_result?.ok ? "ปลดล็อคประตู" : "ล็อคประตู"
                    }
                    status={status?.last_result?.ok ? "success" : "error"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <DataTable
              columns={accessLogColumns}
              queryFunction={({ pageIndex, pageSize, sorting }) =>
                useLogsTableQuery({
                  pageIndex,
                  pageSize,
                  sorting,
                  ok: status === "all" ? undefined : status === "success",
                })
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
    idle: "text-yellow-400 bg-yellow-50 border border-yellow-400/30",
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
            <p className="text-base font-semibold text-black mb-1">{label}</p>
            <p className="text-black">{value}</p>
          </div>
        </div>
        <StatusIcon />
      </div>
    </div>
  );
}
