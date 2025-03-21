'use client';

import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Form, Select, SelectItem } from '@nextui-org/react';
import React from 'react';

export default function SettingPage() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting to the URL
    // const formData = new FormData(e.currentTarget);

    // Convert formData to an object
    // const data = Object.fromEntries(formData.entries());
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="การตั้งค่า"
            backpath={'/backoffice/user'}
            buttons={[
              //submit form where out form
              <Button
                className="bg-accent3 text-white"
                type="submit"
                form="user"
                key={'cancel button'}
              >
                ยกเลิก
              </Button>,
              <Button
                className="bg-accent2 text-white"
                type="submit"
                form="user"
                key={'create button'}
              >
                ยืนยัน
              </Button>,
            ]}
          />
          <div className="flex space-x-4 mt-6">
            <div className="flex-1">
              <CardComponent
                customCard
                custom={
                  <Form
                    className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center"
                    id="user"
                    onSubmit={onSubmit}
                    method="post"
                  >
                    <div className="w-full gap-4 items-center">
                      <Select
                        className="flex-1  text-headFont"
                        name="position"
                        placeholder="ภาษาที่ต้องการ"
                        label="เปลี่ยนภาษา"
                        labelPlacement={'outside'}
                      >
                        {language.map((item: any) => (
                          <SelectItem
                            className="text-headFont"
                            key={item.label}
                            value={item.value}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </Form>
                }
              />
            </div>
          </div>
        </div>
      }
    />
  );
}

const language = [
  { label: 'ภาษาไทย', value: '1' },
  { label: 'ภาษาอังกฤษ', value: '2' },
];
