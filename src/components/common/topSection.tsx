'use client';

import React, { ReactNode, cloneElement, isValidElement } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@nextui-org/react';
import * as Icon from '@ant-design/icons';
import Link from 'next/link';

export function TopSection({ title, subtitle, buttons = [], backpath }: any) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 851);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="sticky top-[-10px] shadow-md z-30 bg-white p-4 rounded-2xl">
      <div className="flex items-center justify-between">
        {/* Title */}
        {backpath ? (
          <div className="flex text-headFont gap-2 items-center">
            <Link href={backpath} passHref>
              <Icon.LeftOutlined className="text-base cursor-pointer" />
            </Link>
            <h1 className="text-base font-bold text-headFont text-xl">
              {title}
            </h1>
          </div>
        ) : (
          <h1 className="text-base font-bold text-headFont text-xl">{title}</h1>
        )}

        {subtitle && <h1 className="text-sm">{subtitle}</h1>}

        {/* ✅ Fixed Popover for Mobile */}
        {buttons && buttons.length > 0 && isMobile ? (
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button
                isIconOnly
                variant="light"
                className="hover:bg-gray-200 focus:outline-none"
              >
                <Icon.MoreOutlined className="text-xl" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-white shadow-md rounded-md p-2 min-w-[180px]">
              <div className="flex flex-col gap-2">
                {buttons.map((button: ReactNode, index: number) => (
                  <div key={index} className="w-full">
                    {isValidElement(button) &&
                    typeof button.type !== 'string' ? (
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
                        variant="light"
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
        ) : (
          <div className="flex space-x-2">
            {buttons.map((button: ReactNode, index: number) => (
              <div key={index}>{button}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
