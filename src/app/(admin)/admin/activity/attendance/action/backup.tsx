import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from '@nextui-org/react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import CardComponent from '@/components/common/card';
import {Button} from "@nextui-org/react";

export default function ActionPage({
  customCard,
  custom,
  className,
}: any) {
  return (
    <Card className={className}>
      {customCard ? (
        <div className="m-6">{custom}</div>
      ) : (
        <>
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <div>
                <b>
                  {' '}
                  <h1 className="text-2xl px-4 py-2">Action</h1>{' '}
                </b>
              </div>
              <div>
                <Link href={`action/create`}>
                <Button color="default">Button
                    Create
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="overflow-auto-hidden">
              <div className=" grid grid-row-12 grid-flow-col gap-12">
                <table className="table-auto rounded-md">
                  <thead className="rounded-md">
                    <tr className="text-center bg-black text-white">
                      <th className="border px-2">Name</th>
                      <th className="border px-2">create_at</th>
                      <th className="border px-2">update_at</th>
                      <th className="border px-2">active</th>
                      <th className="border px-2">present</th>
                      <th className="border px-2">Description</th>
                      <th className="border px-2">Important</th>
                      <th className="border px-2">Start_date</th>
                      <th className="border px-2">Due_date</th>
                      <th className="border px-2">Limited_time/day</th>
                      <th className="border px-2">Start_Credits</th>
                      <th className="border px-2">All_Credits</th>
                      <th className="border px-2">Total_hours</th>
                      <th className="border px-2">Pay_Day</th>
                      <th className="border px-2">User_ID</th>
                      <th className="border px-2">Project_Code</th>
                      <th className="border px-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="border px-2">Piyawit</td>
                      <td className="border px-2">00:00</td>
                      <td className="border px-2">12:00</td>
                      <td className="border px-2">yes</td>
                      <td className="border px-2">yes</td>
                      <td className="border px-2">Forward</td>
                      <td className="border px-2">ต่ำ</td>
                      <td className="border px-2">25/08/2567</td>
                      <td className="border px-2">25/09/2571</td>
                      <td className="border px-2">10 ชั่วโมง </td>
                      <td className="border px-2">1000</td>
                      <td className="border px-2">5000</td>
                      <td className="border px-2">40</td>
                      <td className="border px-2">30/08/2567 </td>
                      <td className="border px-2">
                        7c26d407-b242-47aa-9c5e-1d3e0196af59{' '}
                      </td>
                      <td className="border px-2">ไม่มี</td>
                      <td className="border px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                          />
                        </svg>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td className="border px-2">Vachira</td>
                      <td className="border px-2">00:00</td>
                      <td className="border px-2">12:00</td>
                      <td className="border px-2">yes</td>
                      <td className="border px-2">yes</td>
                      <td className="border px-2">Principal</td>
                      <td className="border px-2">ต่ำ</td>
                      <td className="border px-2">25/08/2567</td>
                      <td className="border px-2">25/09/2571</td>
                      <td className="border px-2">10 ชั่วโมง </td>
                      <td className="border px-2">1000</td>
                      <td className="border px-2">5000</td>
                      <td className="border px-2">40</td>
                      <td className="border px-2">30/08/2567 </td>
                      <td className="border px-2">
                        7c26d407-b242-47aa-9c5e-1d3e0196af59{' '}
                      </td>
                      <td className="border px-2">ไม่มี</td>
                      <td className="border px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                          />
                        </svg>
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td className="border px-2">L</td>
                      <td className="border px-2">00:00</td>
                      <td className="border px-2">12:00</td>
                      <td className="border px-2">yes</td>
                      <td className="border px-2">yes</td>
                      <td className="border px-2">Principal</td>
                      <td className="border px-2">ต่ำ</td>
                      <td className="border px-2">25/08/2567</td>
                      <td className="border px-2">25/09/2571</td>
                      <td className="border px-2">10 ชั่วโมง </td>
                      <td className="border px-2">1000</td>
                      <td className="border px-2">5000</td>
                      <td className="border px-2">40</td>
                      <td className="border px-2">30/08/2567 </td>
                      <td className="border px-2">
                        7c26d407-b242-47aa-9c5e-1d3e0196af59{' '}
                      </td>
                      <td className="border px-2">ไม่มี</td>
                      <td className="border px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                          />
                        </svg>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardBody>
          <Divider />
          <CardFooter>paginate</CardFooter>
        </>
      )}
    </Card>
  );
}

CardComponent.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  subTitle: PropTypes.string,
  body: PropTypes.node,
  footer: PropTypes.node,
  customCard: PropTypes.bool,
  custom: PropTypes.node,
  className: PropTypes.string,
};

CardComponent.defaultProps = {
  title: 'Rome welcome',
  icon: 'https://avatars.githubusercontent.com/u/86160567?s=200&v=4',
};
