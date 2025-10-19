"use client";

import logo from "public/assets/images/logo.webp";
import { Check, FileSignature, Trash2 } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import { useRef } from "react";
import React from "react";

export default function ShoppingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [hasSignature, setHasSignature] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
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

    setIsSaving(false);
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
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold">Notation</h1>
        </div>
      </div>

      <div className="border-gray-200 p-4">
        {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Document Preview
        </h2> */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-2 mb-5">
          <div className="bg-white shadow-2xl rounded-xl p-5 max-w-4xl mx-auto border border-gray-200">
            <div className="flex justify-between items-start mb-3 border-b-2 border-gray-200">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {/* {document.type === "quotation" ? "QUOTATION" : "RECEIPT"} */}
                  QUOTATION
                </h3>
                {/* <p className="text-gray-500">#{document.document_number}</p> */}
                <p className="text-gray-500">#101</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {/* {document.company_name} */}
                  utotech
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {/* {document.company_address} */}
                  27
                </p>
                <p className="text-sm text-gray-600">
                  {/* {document.company_email} */}
                  hello@gmail
                </p>
                <p className="text-sm text-gray-600">
                  {/* {document.company_phone} */}
                  096
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Bill To
                </p>
                <p className="font-semibold text-gray-900">
                  {/* {document.client_name} */}
                  Customer Name
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Date
                </p>
                <p className="font-semibold text-gray-900">
                  {/* {formatDate(document.created_at)} */}
                  20/06/2024
                </p>
                {/* {document.due_date && ( */}
                <>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 mt-3">
                    Due Date
                  </p>
                  <p className="font-semibold text-gray-900">
                    {/* {formatDate(document.due_date)} */}
                    20/07/2024
                  </p>
                </>
                {/* )} */}
              </div>
            </div>

            {/* {document.items && document.items.length > 0 && ( */}
            <div className="mb-3">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Description
                    </th>
                    <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Qty
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Unit Price
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {document.items.map((item, index) => ( */}
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-2 text-gray-900">
                      {/* {item.description} */}
                      Product A
                    </td>
                    <td className="py-4 px-2 text-center text-gray-700">
                      {/* {item.quantity} */}2
                    </td>
                    <td className="py-4 px-2 text-right text-gray-700">
                      {/* {formatAmount(item.unit_price)} */}
                      {formatAmount(500)}
                    </td>
                    <td className="py-4 px-2 text-right font-semibold text-gray-900">
                      {/* {formatAmount(item.total)} */}
                      {formatAmount(1000)}
                    </td>
                  </tr>
                  {/* ))} */}
                </tbody>
              </table>
            </div>
            {/* )} */}

            <div className="flex justify-end mb-8">
              <div className="w-64 space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Subtotal:</span>
                  <span className="font-semibold text-gray-900">
                    {/* {formatAmount(document.subtotal)} */}
                    1,000.00
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">
                    {/* Tax ({document.tax_rate}%): */}
                    Tax (7%):
                  </span>
                  <span className="font-semibold text-gray-900">
                    {/* {formatAmount(document.tax_amount)} */}
                    70.00
                  </span>
                </div>
                <div className="flex justify-between py-3 bg-blue-50 px-4 rounded-lg">
                  <span className="text-lg font-bold text-gray-900">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {/* {formatAmount(document.amount)} */}
                    1,070.00
                  </span>
                </div>
              </div>
            </div>

            {/* {document.payment_terms && ( */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Payment Terms
              </p>
              <p className="text-sm text-gray-700">
                {/* {document.payment_terms} */}
                Payment due within 30 days.
              </p>
            </div>
            {/* )} */}

            {/* {document.notes && ( */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Notes
              </p>
              {/* <p className="text-sm text-gray-700">{document.notes}</p> */}
              <p className="text-sm text-gray-700">hello</p>
            </div>
            {/* )} */}

            {/* {document.signature_data && ( */}
            {/* <div className="border-t-2 border-gray-200 pt-8 mt-8">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Authorized Signature
              </p>
              <img
                // src={document.signature_data}
                src=""
                alt="Signature"
                className="h-24 border-b-2 border-gray-900 mb-2"
              />
              {/* {document.signed_at && ( 
              <p className="text-xs text-gray-500">
                {/* Signed on {formatDate(document.signed_at)} 
                Signed on 20/06/2024
              </p>
            </div> */}
          </div>
        </div>

        <Drawer>
          <DrawerTrigger asChild>
            <div className="flex justify-center">
              <button
                // onClick={onSign}
                className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <FileSignature size={24} />
                Sign Document
              </button>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-8">
              <div className="bg-gray-100 rounded-lg mb-10">
                <div className="bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
                  <div className="border-gray-200">
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
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
