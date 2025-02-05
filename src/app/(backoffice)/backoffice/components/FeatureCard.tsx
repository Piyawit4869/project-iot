import { Card, CardBody, CardHeader, Divider, Link } from '@nextui-org/react';

export default function FeatureCard({
  title,
  description,
  icon,
  color,
  link,
}: {
  title: string;
  description: string;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'danger';
  link: string;
}) {
  return (
    <Link href={link}>
      <Card
        isPressable
        shadow="md"
        className="transition-transform transform hover:scale-105 duration-300"
      >
        <CardHeader className="flex flex-col items-center gap-2">
          <div
            className={`text-4xl p-4 rounded-full bg-${color}-200 text-${color}-700`}
          >
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-gray-600 text-center">{description}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
