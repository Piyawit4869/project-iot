"use client";

import logo from "public/assets/images/logo.webp";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { mockNotation } from "./_modules/data/mocknotation";
import { Link } from "react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { FileSignature } from "lucide-react";

export default function ShoppingPage() {
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
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Notation</h1>
        </div>

        <Tabs className="p-2" defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="quotation">Quotation</TabsTrigger>
            <TabsTrigger value="receipt">Receipt</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {mockNotation.map((notation) => (
              <Card
                key={notation.id}
                className="p-4 border-b last:border-0 mb-4"
              >
                <div className="flex justify-start items-center mb-2">
                  <Badge
                    className={
                      notation.type === "receipt"
                        ? "bg-blue-500 text-white"
                        : "bg-black text-white"
                    }
                  >
                    {notation.type === "receipt" ? "Receipt" : "Quotation"}
                  </Badge>
                  {notation.type === "quotation" && (
                    <Badge
                      className={`${
                        notation.status === "Unsigned"
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      } ml-2`}
                    >
                      {notation.status === "Unsigned" ? "Unsigned" : "Signed"}
                    </Badge>
                  )}

                  <Link
                    to={`/public/notation-view/${notation.id}`}
                    className="ml-auto underline text-sm"
                  >
                    <p>More</p>
                  </Link>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem
                    value="item-1"
                    className="px-4 data-[state=open]:bg-secondary rounded-md"
                  >
                    <AccordionTrigger>
                      <div>
                        {notation.name}
                        <p className="text-sm text-gray-600 mt-2">
                          {notation.date}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                      <p className="text-sm text-gray-600 mt-2">
                        DocNo: {notation.docNo}
                      </p>
                      <p className="text-sm text-gray-600">
                        Code: {notation.code}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Price: {notation.unitPrice}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="quotation"></TabsContent>
          <TabsContent value="receipt"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
