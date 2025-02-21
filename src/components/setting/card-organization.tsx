import React from 'react';
import { Card, CardHeader, CardBody, Switch } from '@nextui-org/react';

interface CardControlProps {
  title: string;
  description: string;
  name: string;
  onChange?: (e: any) => void;
}

export const CardControl: React.FC<CardControlProps> = ({
  title,
  description,
  name,
  onChange = () => {},
}) => {
  return (
    <Card className="py-4 bg-primary" isHoverable isPressable>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{title}</h4>
      </CardHeader>
      <CardBody className=" overflow-visible py-2">
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <br />
        <p>เปิดใช้งาน</p>
        <Switch
          name={name}
          className="mt-3"
          color="secondary"
          onChange={onChange}
        ></Switch>
      </CardBody>
    </Card>
  );
};
