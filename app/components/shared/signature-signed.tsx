import SignatureCanvas from "react-signature-canvas";
import { useRef, useState } from "react";
import ReactSignatureCanvas from "react-signature-canvas";
import Image from "next/image";
import { Button } from "@/components/ui";

import logo from "@/public/images/rome.svg";
import {
  useExportPdf,
  useUpdateSignature,
} from "@/actions/order/client/useGetOrder";
import { useUpload } from "@/actions/upload/client/useGetUpload";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleToastAndRedirect } from "@/utils/toast";

export function SignatureSigned() {
  const params = useParams();
  const router = useRouter();

  const orderId: string = (params?.branchId as string) ?? "";
  const signatureRef = useRef<ReactSignatureCanvas | null>(null);

  const [penColor, setPenColor] = useState<string>("#0275ff");
  const [penSize, setPenSize] = useState<number>(2);

  const { mutate: uploadImage, isPending: isUploading } = useUpload();
  const { mutate: updateSignature, isPending } = useUpdateSignature();
  const { mutate: exportPdf } = useExportPdf();

  const dataURLtoBlob = (dataurl: string): Blob => {
    if (!dataurl || typeof dataurl !== "string") {
      console.error("dataURLtoBlob: Invalid or empty dataurl provided.");
      return new Blob();
    }

    const parts = dataurl.split(",");

    if (parts.length < 2) {
      console.error(
        "dataURLtoBlob: Data URL format invalid. Missing comma separator or insufficient parts."
      );
      return new Blob();
    }

    const [mimePartRaw, base64DataRaw] = parts;

    const mimeMatch = (mimePartRaw || "").match(/:(.*?);/);
    let mimeType = "application/octet-stream";

    if (mimeMatch && mimeMatch.length > 1 && mimeMatch[1]) {
      mimeType = mimeMatch[1];
    } else {
      console.warn(
        "dataURLtoBlob: Could not extract specific MIME type from dataurl, using default."
      );
    }

    let bstr;
    try {
      bstr = atob(base64DataRaw as string);
    } catch (e) {
      console.error("dataURLtoBlob: Failed to decode base64 string.", e);
      return new Blob();
    }

    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mimeType });
  };

  const handleSave = () => {
    if (signatureRef.current?.isEmpty()) {
      alert("Please provide a signature before saving.");
      return;
    }

    const signatureDataURL = signatureRef.current?.toDataURL();

    if (signatureDataURL) {
      const blob = dataURLtoBlob(signatureDataURL);
      const filename = `signature_${Date.now()}.png`;
      const file = new File([blob], filename, {
        type: blob.type,
        lastModified: Date.now(),
      });

      const formData = new FormData();
      formData.append("file", file);

      uploadImage(formData, {
        onSuccess: (data) => {
          const toastSignatureId = toast.loading("กำลังบันทึกรายเซ็น...", {
            position: "bottom-right",
          });
          updateSignature(
            {
              id: orderId,
              values: { signatureUrl: data.res.url },
            },
            {
              onSuccess: (data) => {
                const toastId = toast.loading("กำลังบันทึกข้อมูลเอกสาร...", {
                  position: "bottom-right",
                });
                handleToastAndRedirect({
                  response: data,
                  router,
                  successRedirectPath: "#",
                  loadingToastId: toastSignatureId as string,
                  successMessage: "บันทึกรายเซ็นเรียบร้อยแล้ว!",
                  errorMessage: "ไม่สามารถบันทึกรายเซ็นได้",
                });
                exportPdf(
                  { id: orderId },
                  {
                    onSuccess: (dataPdf) => {
                      handleToastAndRedirect({
                        response: dataPdf,
                        router,
                        successRedirectPath: "/signature/success",
                        loadingToastId: toastId as string,
                        successMessage: "บันทึกข้อมูลเอกสารเรียบร้อยแล้ว!",
                        errorMessage: "ไม่สามารถบันทึกข้อมูลเอกสารได้",
                      });
                    },
                  }
                );
              },
              onError: () => { },
            }
          );

        },
        onError: (error) => {
          //TODO: change this to handle errors
          console.error("Upload failed:", error);
        },
      });
    }
  };

  const handleClear = () => {
    signatureRef.current?.clear();
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="sticky top-0 shadow p-2 flex items-center justify-between z-10">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            width={40}
            height={40}
            unoptimized
            className="rounded-lg"
          />
          <span className="font-semibold ml-3 text-base">ROME SIGNATURE</span>
        </div>
      </header>
      <div className="flex w-full h-full items-center justify-center">
        <div className="container w-full">
          <div className="p-4 rounded-lg max-w-md mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-center mb-10">
              กรุณาเซ็นสำหรับทำรายการ
            </h2>

            <div className="flex items-center gap-2">
              <label htmlFor="colorPicker" className="text-sm font-medium">
                สีปากกา :
              </label>
              <input
                className="rounded-3xl"
                type="color"
                id="colorPicker"
                value={penColor}
                onChange={(e) => setPenColor(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="penSize" className="text-sm font-medium">
                ความหนาของเส้น :
              </label>
              <input
                type="range"
                id="penSize"
                min="1"
                max="10"
                value={penSize}
                onChange={(e) => setPenSize(Number(e.target.value))}
              />
              <span>{penSize}</span>
            </div>

            <SignatureCanvas
              ref={signatureRef}
              penColor={penColor}
              minWidth={penSize}
              maxWidth={penSize}
              canvasProps={{ className: "border w-full h-40" }}
            />
          </div>
        </div>
      </div>
      <footer className="sticky bottom-0 shadow-lg border-t p-2 flex items-center z-10 h-[100px]">
        <Button
          variant="outline"
          onClick={handleClear}
          className="px-4 py-2 bg-outline-1 rounded w-1/2"
        >
          ล้างข้่อมูล
        </Button>
        <Button
          onClick={handleSave}
          className="px-4 py-2 bg-[#000] text-white rounded w-1/2"
          disabled={isUploading || isPending}
        >
          {isUploading ? "กำลังบันทึก..." : "บันทึก"}
        </Button>
      </footer>
    </div>
  );
}
