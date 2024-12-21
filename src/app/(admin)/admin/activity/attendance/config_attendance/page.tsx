'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import React from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  Textarea,
  // TimeInput,
} from '@nextui-org/react';
// import { Time } from '@internationalized/date';

// export const ClockCircleLinearIcon = (props : any) => {
//   return (
//     <svg
//       aria-hidden="true"
//       fill="none"
//       focusable="false" 
//       height="1em"
//       role="presentation"
//       viewBox="0 0 24 24"
//       width="1em"
//       {...props}
//     >
//       <g fill="none" stroke="currentColor" strokeWidth="1.5">
//         <circle cx="12" cy="12" r="10" />
//         <path
//           d="M12 8v4l2.5 2.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </g>
//     </svg>
//   );
// };

export default function ConfigAttendancesPage() {

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="การตั้งค่าAttendance"
            // backpath={'/admin/activity/attendance/'}
            buttons={[
              <div className="flex gap-2" key={"button"}> 
                <Button className="bg-accent2 text-white" type="submit">
                  Submit
                </Button>
                <Button type="reset" variant="flat">
                  Cancel
                </Button>
              </div>,
            ]}
          />
          <div className="bg-white shadow rounded-lg  mb-4 mt-4 p-5 ">
            <Form
              className="w-full"
              validationBehavior="native"
              //   onReset={() => setAction('Cancel')}
              //   onSubmit={(e) => {
              //     e.preventDefault();
              //     let data = Object.fromEntries(new FormData(e.currentTarget));

              //     setAction(`submit ${JSON.stringify(data)}`);
              //   }}
            >
              {/* <div className="w-full flex flex-col gap-4">
                {variants.map((variant) => (
                  <div
                    key={variant}
                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                  > */}
              <div className=" gap-8">
                {/* <DateRangePicker
                      className="max-w-xs"
                      label="Work time"
                      variant={bordered}
                    /> */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h2 className="p-2">Select Working Days</h2>
                    <CheckboxGroup className="pt-2">
                      <Checkbox value="monday" color="success">
                        Monday
                      </Checkbox>
                      <Checkbox value="tuesday" color="success">
                        Tuesday
                      </Checkbox>
                      <Checkbox value="wednesday" color="success">
                        Wednesday
                      </Checkbox>
                      <Checkbox value="thurday" color="success">
                        Thurday
                      </Checkbox>
                      <Checkbox value="friday" color="success">
                        Friday
                      </Checkbox>
                      <Checkbox value="satuday" color="success">
                        Satuday
                      </Checkbox>
                      <Checkbox value="sunday" color="success">
                        Sunday
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                  {/* <div className="flex flex-col">
                    <TimeInput
                      defaultValue={new Time(9, )}
                      endContent={
                        <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Start working"
                      labelPlacement="outside"
                    />
                    <TimeInput
                      defaultValue={new Time(17, )}
                      endContent={
                        <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="End working"
                      labelPlacement="outside"
                    />
                  </div> */}
                </div>
                {/* </div>
                  </div>  ))} */}
              </div>
              
              <Input
                errorMessage="Please enter a valid salary"
                label="Salary"
                labelPlacement="outside"
                name="salary"
                type="number"
                className='mb-5'
              />

              <Textarea
                disableAnimation
                disableAutosize
                classNames={{
                  base: 'max-w-2xl',
                  input: 'resize-y min-h-[40px] min-w-[40px]',
                }}
                label="location"
                placeholder="Enter your location"
                variant="bordered"
              />
            </Form>
          </div>
        </div>
      }
    />
  );
}
