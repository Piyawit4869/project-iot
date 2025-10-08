import SignatureCanvas from "react-signature-canvas";
import { useEffect, useRef, useState } from "react";
import ReactSignatureCanvas from "react-signature-canvas";
import Image from "next/image";
import GlobalButton from "@/components/shared/global-button";
import { Card } from "../ui/card";

export function SignaturePad() {
  const signatureRef = useRef<ReactSignatureCanvas | null>(null);
  const [savedSignature, setSavedSignature] = useState<string | null>(null);


  const [penColor, setPenColor] = useState<string>("black");
  const [penSize, setPenSize] = useState<number>(2);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSignature = localStorage.getItem("signature");
      setSavedSignature(storedSignature);
    }
  }, []);

  const handleSave = () => {
    const signatureData = signatureRef.current?.toDataURL();
    if (signatureData) {
      localStorage.setItem("signature", signatureData);
      setSavedSignature(signatureData);
    }
  };

  const handleClear = () => {
    signatureRef.current?.clear();
    localStorage.removeItem("signature");
    setSavedSignature(null);
  };

  return (
    <Card className="p-4 border rounded-lg shadow-lg max-w-md mx-auto space-y-4">
      <h2 className="text-lg font-bold text-center">แผ่นลายเซ็น</h2>

      <div className="flex items-center gap-2">
        <label htmlFor="colorPicker" className="text-sm font-medium">
          สีลายเซ็น:
        </label>
        <input
          type="color"
          id="colorPicker"
          value={penColor}
          onChange={(e) => setPenColor(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="penSize" className="text-sm font-medium">
          ความหนา:
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
        minWidth={penSize} // Line thickness control
        maxWidth={penSize} // Ensures uniform thickness
        canvasProps={{ className: "border w-full h-40" }}
      />

      <div className="flex flex-col gap-4 justify-center">
        <GlobalButton
          onClick={handleSave}
          label="บันทึก"
          className="px-4 py-2 bg-[#000] text-white rounded"
        />

        <GlobalButton
          onClick={handleClear}
          label="เคลียร์"
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded"
          variant="outline"
        />


      </div>

      {savedSignature && (
        <div className="mt-4">
          <h3 className="text-center">Saved Signature:</h3>
          <Image
            width={200}
            height={200}
            src={savedSignature}
            alt="Saved Signature"
            className="border w-full h-40"
            unoptimized
          />
        </div>
      )}
    </Card>
  );
}
