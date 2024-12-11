import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from '@nextui-org/react';
import PropTypes from 'prop-types';

export default function CardComponent({
  title,
  icon,
  subTitle,
  body,
  footer,
  customCard,
  custom,
}: any) {
  return (
    <Card>
      {customCard ? (
        <div className="m-6">{custom}</div>
      ) : (
        <>
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src={icon}
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">{title}</p>
              <p className="text-small text-default-500">{subTitle}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>{body}</CardBody>
          <Divider />
          <CardFooter>{footer}</CardFooter>
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
};

CardComponent.defaultProps = {
  title: 'Rome welcome',
  icon: 'https://avatars.githubusercontent.com/u/86160567?s=200&v=4',
};
