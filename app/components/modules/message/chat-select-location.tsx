import { Dialog } from "@radix-ui/react-dialog";
import { MapPin } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import type { LatLong } from "./chat-input";
import { toast } from "sonner";

interface ChatSelectLocationProps {
  address: string;
  latlng: LatLong | undefined;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setLatLng: React.Dispatch<React.SetStateAction<LatLong | undefined>>;
  handleSendLocation: () => void;
}

export const ChatSelectLocation: React.FC<ChatSelectLocationProps> = ({
  address,
  latlng,
  setAddress,
  setLatLng,
  handleSendLocation,
}) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [loadingAddress, setLoadingAddress] = React.useState(false);

  const handleChangeLatLng = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const [lat, lng] = e.target.value.split(",").map((v) => v.trim());

      if (!lat || !lng) {
        setLatLng(undefined);
        return;
      }

      setLatLng({
        lat: Number(lat),
        lng: Number(lng),
      });
    },
    [setLatLng]
  );

  const handleFetchAddress = async (controller: AbortController) => {
    try {
      setLoadingAddress(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${(latlng && latlng.lat) || ""}&lon=${(latlng && latlng.lng) || ""}&accept-language=th`,
        {
          headers: {
            "User-Agent": "YourAppName/1.0 (your@email.com)",
          },
          signal: controller.signal,
        }
      );

      const data = await res.json();
      setAddress(data.display_name ?? "");
    } catch (err) {
      if ((err as any).name !== "AbortError") {
        setAddress("");
      }
    } finally {
      setLoadingAddress(false);
    }
  };

  const handleCloseModal = React.useCallback(
    () => setOpenModal(false),
    [setOpenModal]
  );

  const handleConfirmLocation = React.useCallback(() => {
    handleSendLocation();
    handleCloseModal();
  }, [handleSendLocation, handleCloseModal]);

  React.useEffect(() => {
    if (typeof latlng?.lat !== "number" || typeof latlng?.lng !== "number") {
      setAddress("");
      return;
    }

    const controller = new AbortController();

    handleFetchAddress(controller);
    return () => controller.abort();
  }, [latlng?.lat, latlng?.lng, setAddress]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("ไม่สามารถค้นหาที่อยู่ได้");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatLng({ lat: latitude, lng: longitude });
      },
      (error) => {
        toast.error("ไม่สามารถดึงตำแหน่งได้ : " + error);
      }
    );
  };

  React.useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" type="button">
          <MapPin className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[50%] h-[75vh] p-0 flex flex-col">
        <DialogHeader className="px-6 pt-5 shrink-0">
          <DialogTitle>เลือกโลเคชั่น</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4 flex-1 overflow-auto">
          <Input
            placeholder="ละติจูด, ลองติจูด (เช่น 13.7563, 100.5018)"
            onChange={handleChangeLatLng}
          />

          <p className="mt-2 text-sm text-muted-foreground">
            ไม่รู้พิกัด?{" "}
            <a
              href={
                latlng
                  ? `https://www.google.com/maps?q=${(latlng && latlng.lat) || ""},${(latlng && latlng.lng) || ""}`
                  : "https://www.google.com/maps"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              เปิด Google Maps เพื่อหาพิกัด
            </a>
          </p>

          {latlng &&
            latlng.lat !== undefined &&
            latlng &&
            latlng.lng !== undefined && (
              <div className="mt-4 overflow-hidden rounded-lg border">
                <iframe
                  src={`https://www.google.com/maps?q=${(latlng && latlng.lat) || ""},${(latlng && latlng.lng) || ""}&z=17&output=embed`}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            )}

          {loadingAddress && (
            <p className="mt-3 text-sm text-muted-foreground">
              กำลังโหลดที่อยู่...
            </p>
          )}

          {address && !loadingAddress && (
            <div className="mt-3 rounded-md bg-muted p-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span>{address}</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="px-6 py-5 shrink-0 border-t flex items-center justify-end gap-4">
          <Button variant="secondary" onClick={handleCloseModal}>
            ยกเลิก
          </Button>

          {latlng &&
            latlng.lat !== undefined &&
            latlng &&
            latlng.lng !== undefined && (
              <Button onClick={handleConfirmLocation}>ส่ง</Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
