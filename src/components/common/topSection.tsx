'use client';

import React, { ReactNode } from 'react';
import CardComponent from './card';
import PropTypes from 'prop-types';
import * as Icon from '@ant-design/icons';
import Link from 'next/link';
import { div } from 'framer-motion/client';

export function TopSection({ title, subtitle, buttons, backpath }: any) {
  return (
    <CardComponent
      className="sticky top-[-32px] shadow-md z-10"
      customCard
      custom={
        <div className="flex items-center justify-between" key={'title-card'}>
          {/* Title */}

          {backpath ? (
            <div className="flex text-headFont gap-2 items-center">
              <Link href={backpath}>
                <Icon.LeftOutlined className="text-2xl" />
              </Link>
              <h1 className="text-2xl font-bold text-headFont">{title}</h1>
            </div>
          ) : (
            <h1 className="text-2xl font-bold text-headFont">{title}</h1>
          )}

          {subtitle ? (
            <div >
              <h1 className="text-sm">{subtitle}</h1>
            </div>
          ) : (
            <h1 className="text-sm">{subtitle}</h1>
          )}

          {/* Buttons */}
          {buttons ? (
            <div className="flex space-x-2" key={'buttons'}>
              {buttons.map((button: ReactNode) => button)}
            </div>
          ) : (
            <></>
          )}
        </div>
      }
    ></CardComponent>
  );
}

TopSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.element),
  backpath: PropTypes.string,
};
