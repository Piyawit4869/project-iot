import { Card, CardHeader, CardBody, Switch } from '@nextui-org/react';

export const CardControl = ({ title, description, control }: any) => {
  return (
    <Card className="py-4 bg-primary" isHoverable isPressable>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{title}</h4>
      </CardHeader>
      <CardBody className=" overflow-visible py-2">
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <br />
        <p>{control}</p>
        <Switch className="mt-3" defaultSelected color="secondary"></Switch>
      </CardBody>
    </Card>
  );
};
