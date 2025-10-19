import { Check, Trash2 } from "lucide-react";
import logo from "public/assets/images/logo.webp";
import { useRef, useState, useEffect } from "react";

interface SignaturePageProps {
  document: Document;
  onBack: () => void;
  onComplete: () => void;
}

export default function SignaturePage({
  document,
  onBack,
  onComplete,
}: SignaturePageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasSignature(true);

    const rect = canvas.getBoundingClientRect();
    const x =
      "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y =
      "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x =
      "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y =
      "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const saveSignature = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;

    setIsSaving(true);

    const signatureData = canvas.toDataURL("image/png");

    // const { error } = await supabase
    //   .from("documents")
    //   .update({
    //     signature_data: signatureData,
    //     signed_at: new Date().toISOString(),
    //     status: "signed",
    //   })
    //   .eq("id", document.id);

    // if (error) {
    //   console.error("Error saving signature:", error);
    //   alert("Failed to save signature. Please try again.");
    //   setIsSaving(false);
    //   return;
    // }

    setIsSaving(false);
    onComplete();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    // <div className="min-h-screen bg-gray-50 py-8 px-4">
    //   <div className="max-w-5xl mx-auto">
    //     <button
    //       onClick={onBack}
    //       className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
    //     >
    //       <ArrowLeft size={20} />
    //       Back
    //     </button>

    //     <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    //       <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 text-white">
    //         <h1 className="text-3xl font-bold mb-2">Sign Document</h1>
    //         <p className="text-green-100">
    //           Please provide your signature below to complete this document
    //         </p>
    //       </div>

    //       <div className="p-8">
    //         <div className="bg-gray-100 rounded-lg p-12 mb-6">
    //           <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
    //             <div className="text-center mb-8">
    //               <h3 className="text-2xl font-bold text-gray-900 mb-2">
    //                 {/* {document.type === "quotation" ? "QUOTATION" : "RECEIPT"} */}
    //                 QUOTATION
    //               </h3>
    //               <p className="text-gray-600">
    //                 {/* Document #{document.document_number} */}
    //                 Document #101
    //               </p>
    //             </div>

    //             <div className="space-y-4 mb-8">
    //               <div className="flex justify-between py-2 border-b border-gray-200">
    //                 <span className="font-medium text-gray-700">Client:</span>
    //                 <span className="text-gray-900">
    //                   {/* {document.client_name} */}
    //                   Customer Name
    //                 </span>
    //               </div>
    //               <div className="flex justify-between py-2 border-b border-gray-200">
    //                 <span className="font-medium text-gray-700">Date:</span>
    //                 <span className="text-gray-900">
    //                   {/* {formatDate(document.created_at)} */}
    //                   20/06/2024
    //                 </span>
    //               </div>
    //               <div className="flex justify-between py-2 border-b border-gray-200">
    //                 <span className="font-medium text-gray-700">
    //                   Description:
    //                 </span>
    //                 {/* <span className="text-gray-900">{document.title}</span> */}
    //                 <span className="text-gray-900">hello</span>
    //               </div>
    //             </div>

    //             {/* {document.items && document.items.length > 0 && ( */}
    //             <div className="mb-6">
    //               <table className="w-full text-sm">
    //                 <thead>
    //                   <tr className="border-b border-gray-200">
    //                     <th className="text-left py-2 font-medium text-gray-700">
    //                       Item
    //                     </th>
    //                     <th className="text-center py-2 font-medium text-gray-700">
    //                       Qty
    //                     </th>
    //                     <th className="text-right py-2 font-medium text-gray-700">
    //                       Price
    //                     </th>
    //                     <th className="text-right py-2 font-medium text-gray-700">
    //                       Total
    //                     </th>
    //                   </tr>
    //                 </thead>
    //                 <tbody>
    //                   {/* {document.items.map((item, index) => ( */}
    //                   <tr className="border-b border-gray-100">
    //                     <td className="py-2 text-gray-900">
    //                       {/* {item.description} */}
    //                       Sample Item Description
    //                     </td>
    //                     <td className="py-2 text-center text-gray-700">
    //                       {/* {item.quantity} */}2
    //                     </td>
    //                     <td className="py-2 text-right text-gray-700">
    //                       {/* {formatAmount(item.unit_price)} */}
    //                       {formatAmount(50)}
    //                     </td>
    //                     <td className="py-2 text-right text-gray-900">
    //                       {/* {formatAmount(item.total)} */}
    //                       {formatAmount(100)}
    //                     </td>
    //                   </tr>
    //                   {/* ))} */}
    //                 </tbody>
    //               </table>
    //             </div>
    //             {/* )} */}

    //             <div className="bg-gray-50 rounded-lg p-4 mb-8">
    //               <div className="space-y-2">
    //                 <div className="flex justify-between">
    //                   <span className="text-gray-700">Subtotal:</span>
    //                   <span className="text-gray-900">
    //                     {/* {formatAmount(document.subtotal)} */}
    //                     {formatAmount(100)}
    //                   </span>
    //                 </div>
    //                 <div className="flex justify-between">
    //                   <span className="text-gray-700">
    //                     {/* Tax ({document.tax_rate}%): */}
    //                     Tax (7%):
    //                   </span>
    //                   <span className="text-gray-900">
    //                     {/* {formatAmount(document.tax_amount)} */}
    //                     {formatAmount(7)}
    //                   </span>
    //                 </div>
    //                 <div className="flex justify-between items-center pt-2 border-t border-gray-300">
    //                   <span className="text-xl font-bold text-gray-900">
    //                     Total Amount:
    //                   </span>
    //                   <span className="text-2xl font-bold text-green-600">
    //                     {/* {formatAmount(document.amount)} */}
    //                     {formatAmount(107)}
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="border-t border-gray-200 pt-6">
    //               <p className="text-sm font-medium text-gray-700 mb-3">
    //                 Signature:
    //               </p>
    //               <div className="border-2 border-gray-300 rounded-lg bg-white relative">
    //                 <canvas
    //                   ref={canvasRef}
    //                   width={600}
    //                   height={200}
    //                   onMouseDown={startDrawing}
    //                   onMouseMove={draw}
    //                   onMouseUp={stopDrawing}
    //                   onMouseLeave={stopDrawing}
    //                   onTouchStart={startDrawing}
    //                   onTouchMove={draw}
    //                   onTouchEnd={stopDrawing}
    //                   className="w-full cursor-crosshair touch-none"
    //                 />
    //                 {!hasSignature && (
    //                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    //                     <p className="text-gray-400 text-lg">Sign here</p>
    //                   </div>
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="flex justify-center gap-4">
    //           <button
    //             onClick={clearSignature}
    //             disabled={!hasSignature || isSaving}
    //             className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    //           >
    //             <Trash2 size={20} />
    //             Clear
    //           </button>
    //           <button
    //             onClick={saveSignature}
    //             disabled={!hasSignature || isSaving}
    //             className="flex items-center gap-3 px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
    //           >
    //             {isSaving ? (
    //               <>
    //                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    //                 Saving...
    //               </>
    //             ) : (
    //               <>
    //                 <Check size={20} />
    //                 Confirm Signature
    //               </>
    //             )}
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col h-screen w-screen min-h-screen bg-background">
      <header className="sticky top-0 shadow p-2 flex items-center justify-between bg-white z-10 print:hidden">
        <div className="flex items-center print:hidden">
          <img
            src={logo}
            alt="logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="font-semibold ml-3 text-base">Cutomer</span>
        </div>

        {/* <button
          onClick={() => window.print()}
          className=" bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow print:hidden"
          type="button"
          aria-label="Print PDF"
        >
          พิมพ์ใบเสนอราคา (PDF)
        </button> */}
      </header>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Notation</h1>
        </div>
      </div>

      <div className="p-8">
        <div className="bg-gray-100 rounded-lg p-12 mb-6">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {/* {document.type === "quotation" ? "QUOTATION" : "RECEIPT"} */}
                QUOTATION
              </h3>
              <p className="text-gray-600">
                {/* Document #{document.document_number} */}
                Document #101
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Client:</span>
                <span className="text-gray-900">
                  {/* {document.client_name} */}
                  Customer Name
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Date:</span>
                <span className="text-gray-900">
                  {/* {formatDate(document.created_at)} */}
                  20/06/2024
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Description:</span>
                {/* <span className="text-gray-900">{document.title}</span> */}
                <span className="text-gray-900">hello</span>
              </div>
            </div>

            {/* {document.items && document.items.length > 0 && ( */}
            <div className="mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-medium text-gray-700">
                      Item
                    </th>
                    <th className="text-center py-2 font-medium text-gray-700">
                      Qty
                    </th>
                    <th className="text-right py-2 font-medium text-gray-700">
                      Price
                    </th>
                    <th className="text-right py-2 font-medium text-gray-700">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {document.items.map((item, index) => ( */}
                  <tr className="border-b border-gray-100">
                    <td className="py-2 text-gray-900">
                      {/* {item.description} */}
                      Sample Item Description
                    </td>
                    <td className="py-2 text-center text-gray-700">
                      {/* {item.quantity} */}2
                    </td>
                    <td className="py-2 text-right text-gray-700">
                      {/* {formatAmount(item.unit_price)} */}
                      {formatAmount(50)}
                    </td>
                    <td className="py-2 text-right text-gray-900">
                      {/* {formatAmount(item.total)} */}
                      {formatAmount(100)}
                    </td>
                  </tr>
                  {/* ))} */}
                </tbody>
              </table>
            </div>
            {/* )} */}

            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="text-gray-900">
                    {/* {formatAmount(document.subtotal)} */}
                    {formatAmount(100)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">
                    {/* Tax ({document.tax_rate}%): */}
                    Tax (7%):
                  </span>
                  <span className="text-gray-900">
                    {/* {formatAmount(document.tax_amount)} */}
                    {formatAmount(7)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                  <span className="text-xl font-bold text-gray-900">
                    Total Amount:
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    {/* {formatAmount(document.amount)} */}
                    {formatAmount(107)}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Signature:
              </p>
              <div className="border-2 border-gray-300 rounded-lg bg-white relative">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={200}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full cursor-crosshair touch-none"
                />
                {!hasSignature && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-gray-400 text-lg">Sign here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={clearSignature}
            disabled={!hasSignature || isSaving}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={20} />
            Clear
          </button>
          <button
            onClick={saveSignature}
            disabled={!hasSignature || isSaving}
            className="flex items-center gap-3 px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Check size={20} />
                Confirm Signature
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
