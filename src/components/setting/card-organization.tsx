import { Card, CardHeader, CardBody, Switch } from '@nextui-org/react';

interface CardControlProps {
  title: string;
  description: string;
  control: string;
  name: string;
  onChange?: (e: any) => void;
  checked: boolean;
}

export const CardControl = ({
  title,
  description,
  control,
  name,
  onChange,
  checked,
}: CardControlProps) => {
  return (
    <Card className="py-4 bg-primary" isHoverable isPressable>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{title}</h4>
      </CardHeader>
      <CardBody className=" overflow-visible py-2">
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <br />
        <p>{control}</p>
        <Switch
          name={name}
          className="mt-3"
          color="secondary"
          defaultSelected={false}
          checked={checked}
          onChange={(e) => {
            if (onChange) {
              onChange(e as any);
            }
          }}
        ></Switch>
      </CardBody>
    </Card>
  );
};
