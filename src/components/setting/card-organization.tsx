import React from 'react';
import { Card, CardHeader, CardBody, Switch } from '@nextui-org/react';

interface CardControlProps {
  title: string;
  description: string;
  control: string;
  name: string;
  onChange?: (e: any) => void;
  isSelected: boolean;
}

export const CardControl = ({
  title,
  description,
  control,
  name,
  onChange,
  isSelected,
}: CardControlProps) => {
  const [selected, setSelected] = React.useState(isSelected);

  React.useEffect(() => {
    if (isSelected !== undefined) {
      setSelected(isSelected);
    }
  }, [isSelected]);

  const handleToggle = (e: any) => {
    setSelected(e.target.checked);
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  console.log('selected', selected);

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
          isSelected={selected}
          // onChange={(e) => {
          //   if (onChange) {
          //     onChange(e as any);
          //   }
          // }}
          onChange={handleToggle}
        ></Switch>
      </CardBody>
    </Card>
  );
};
