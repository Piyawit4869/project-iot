'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import CardComponent from './card';
import PropTypes from 'prop-types';
import * as Icon from '@ant-design/icons';
import Link from 'next/link';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';

export function TopSection({ title, subtitle, buttons, backpath }: any) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 851); // Mobile threshold
    };

    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <CardComponent
      className="sticky top-[-10px] shadow-md z-30" // Added min-height
      customCard
      custom={
        <div className="flex items-center justify-between" key={'title-card'}>
          {/* Title */}
          {backpath ? (
            <div className="flex text-headFont gap-2 items-center">
              <Link href={backpath}>
                <Icon.LeftOutlined className="text-base cursor-pointer" />
              </Link>
              <h1 className="text-base font-bold text-headFont">{title}</h1>
            </div>
          ) : (
            <h1 className="text-base font-bold text-headFont">{title}</h1>
          )}

          {subtitle && <h1 className="text-sm">{subtitle}</h1>}

          {/* Responsive Buttons */}
          {buttons &&
            buttons.length > 0 &&
            (isMobile ? (
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light" isIconOnly>
                    <Icon.MoreOutlined className="text-xl" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Actions">
                  {buttons.map((button: ReactNode, index: number) => (
                    <DropdownItem
                      key={index}
                      as="button"
                      className="w-full text-left text-base"
                    >
                      {button}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <div className="flex space-x-2" key={'buttonTitle'}>
                {buttons.map((button: ReactNode, index: number) => (
                  <div key={index} className="text-base">
                    {button}
                  </div>
                ))}
              </div>
            ))}
        </div>
      }
    />
  );
}

TopSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.element),
  backpath: PropTypes.string,
};
