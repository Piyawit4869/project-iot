import React, { ReactNode } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import * as Icons from "lucide-react";

interface CardWithFormProps {
  title: string;
  backpath?: string;
  subtitle?: string;
  buttons: ReactNode[];
}

export function Control({
  title,
  backpath,
  subtitle,
  buttons,
}: CardWithFormProps) {
  // const [isMobile, setIsMobile] = React.useState(false);

  // React.useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 851);
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <Card className="sticky p-4 mt-8">
      <div className="flex items-center justify-between">
        {/* Title */}
        {backpath ? (
          <CardHeader className="flex text-headFont gap-2 items-center">
            <Link href={backpath} passHref>
              <Icons.ChevronLeft className="text-base cursor-pointer" />
            </Link>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        ) : (
          <CardTitle className="text-xl">{title}</CardTitle>
        )}

        {subtitle && <CardTitle className="text-sm">{subtitle}</CardTitle>}

        {/* ✅ Fixed Popover for Mobile */}
        {/* {buttons && buttons.length > 0 && isMobile ? (
          <Popover>
            <PopoverTrigger>
              <Button className="hover:bg-gray-200 focus:outline-none">
                <Icons.EllipsisVertical className="text-xl" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-white shadow-md rounded-md p-2 min-w-[180px]">
              <div className="flex flex-col gap-2">
                {buttons.map((button: ReactNode, index: number) => (
                  <div key={index} className="w-full">
                    {isValidElement(button) &&
                    typeof button.type !== "string" ? (
                      cloneElement(button, {
                        ...(button.props.onClick && {
                          onClick: (e: any) => {
                            e.stopPropagation();
                            button.props.onClick?.(e);
                          },
                        }),
                      })
                    ) : (
                      <Button
                        className="w-full text-left text-base"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {button}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ) : ( */}
        <div className="flex space-x-2">
          {buttons.map((button: ReactNode, index: number) => (
            <div key={index}>{button}</div>
          ))}
        </div>
        {/* )} */}
      </div>
    </Card>
  );
}
