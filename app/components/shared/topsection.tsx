import React from "react";
import * as Icons from "lucide-react";
import { Card, CardTitle } from "../ui/card";
import { Link } from "react-router";

interface TagProps {
  label: string;
  variant?: "success" | "warning" | "danger";
}

interface CardWithFormProps {
  title: string | React.ReactElement;
  backpath?: string | (() => void);
  subtitle?: string;
  buttons?: React.ReactNode[];
  admin?: boolean;
  tag?: TagProps;
  noneSticky?: boolean;
}

export function Tabcontrol({
  title,
  backpath,
  subtitle,
  buttons,
  // admin,
  tag,
  noneSticky = false,
}: CardWithFormProps) {
  return (
    <div className={noneSticky ? "mb-4 z-0" : "sticky top-[52px] z-10 mb-4"}>
      {/* <Card className={`p-4 ${!admin ? "mt-4" : "mt-2"}`}> */}
      <Card className={"p-4"}>
        <div className="flex flex-row flex-wrap justify-between">
          <div className="flex items-center justify-between text-wrap">
            {backpath ? (
              <div className="flex text-headFont gap-2 items-center">
                {typeof backpath === "string" ? (
                  <Link to={backpath}>
                    <Icons.ChevronLeft className="text-base cursor-pointer" />
                  </Link>
                ) : (
                  <button
                    onClick={backpath}
                    className="text-base cursor-pointer"
                  >
                    <Icons.ChevronLeft />
                  </button>
                )}

                <CardTitle className="text-xl ">{title}</CardTitle>
                {tag && (
                  <span
                    className={`ml-2 px-2 py-0.5 text-sm rounded-full ${
                      tag.variant === "success"
                        ? "bg-green-100 text-green-700"
                        : tag.variant === "warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tag.label}
                  </span>
                )}
              </div>
            ) : (
              <CardTitle className="text-2xl">{title}</CardTitle>
            )}

            {subtitle && <CardTitle className="text-xl">{subtitle}</CardTitle>}
          </div>

          <div className="w-full md:w-1/2 flex justify-end gap-3 mt-2 sm:mt-0 ">
            {buttons?.map((button: React.ReactNode, index: number) => (
              <div key={index}>{button}</div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

//TOFIX design responsive
{
  /* <Card className="p-4">
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
    {backpath ? (
      <div className="flex flex-col sm:flex-row items-start sm:items-center text-headFont gap-2">
        {typeof backpath === "string" ? (
          <Link href={backpath} passHref>
            <Icons.ChevronLeft className="text-base cursor-pointer" />
          </Link>
        ) : (
          <button onClick={backpath} className="text-base cursor-pointer">
            <Icons.ChevronLeft />
          </button>
        )}

        <CardTitle className="text-xl break-words whitespace-normal">
          {title}
        </CardTitle>

        {tag && (
          <span
            className={`ml-2 px-2 py-0.5 text-sm rounded-full ${
              tag.variant === "success"
                ? "bg-green-100 text-green-700"
                : tag.variant === "warning"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {tag.label}
          </span>
        )}
      </div>
    ) : (
      <CardTitle className="text-2xl break-words whitespace-normal">
        {title}
      </CardTitle>
    )}

    {subtitle && (
      <CardTitle className="text-xl break-words whitespace-normal">
        {subtitle}
      </CardTitle>
    )}

    <div className="flex space-x-2">
      {buttons?.map((button: ReactNode, index: number) => (
        <div key={index}>{button}</div>
      ))}
    </div>
  </div>
</Card>; */
}
