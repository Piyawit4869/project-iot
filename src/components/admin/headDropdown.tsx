import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import * as Icon from '@ant-design/icons';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export function DropdownHead() {
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/login', // Redirect to login page after logout
    });
  };

  const items = [
    {
      key: 'profile',
      label: 'โปรไฟล์',
      path: '/admin/profile',
      icon: <Icon.UserOutlined />,
    },
    {
      key: 'setting',
      label: 'ตั้งค่า',
      path: '/admin/profile/setting',
      icon: <Icon.SettingOutlined />,
    },
    {
      key: 'logout',
      label: 'ออกจากระบบ',
      onclick: handleSignOut,
      path: '',
      icon: <Icon.LogoutOutlined />,
    },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Icon.BellOutlined />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>New User</DropdownMenuItem>
          <DropdownMenuItem>Delete Notation</DropdownMenuItem>
          <DropdownMenuItem>Change Theme</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <DropdownSection title="การแจ้งเตือน">
        <DropdownItem key="new" description="Create new user succeed">
          New User
        </DropdownItem>
        <DropdownItem key="delete" description="Dalete Notation PO-25010700242">
          Delete Notation
        </DropdownItem>
        <DropdownItem key="change" description="Change theme Black">
          Change Theme
        </DropdownItem>
      </DropdownSection> */}

      <DropdownMenu>
        <div className="relative">
          <DropdownMenuTrigger>
            <button className="flex items-center space-x-2">
              <Image
                width={100}
                height={100}
                src={'/logo.png'} // Replace with the path to your profile image
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-800 text-xs">
                {/* {`${
                        me?.profile?.firstName ? me?.profile?.firstName : ''
                      // } ${me?.profile?.lastName ? me?.profile?.lastName : ''}`} */}
              </span>
            </button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent aria-label="Dynamic Actions">
          <DropdownMenuLabel>Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item: any) => (
            <DropdownMenuItem
              key={item.key}
              className={
                item.key === 'delete' ? 'text-danger' : 'text-headFont'
              }
              color={item.key === 'delete' ? 'danger' : 'default'}
            >
              <Link href={item.path} onClick={item.onclick}>
                <div className="flex">
                  {item.icon}
                  <div className="ml-3 text-xs">{item.label}</div>
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
