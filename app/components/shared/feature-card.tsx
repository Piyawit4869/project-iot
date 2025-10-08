import { Card, CardContent, CardHeader, CardTitle } from "../ui";

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex items-center justify-center space-y-2">
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground text-center">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
