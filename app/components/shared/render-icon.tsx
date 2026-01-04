import * as Icons from "lucide-react";

export const RenderIcon = (iconName: string, className?: string) => {
  const IconComponent = Icons[iconName as keyof typeof Icons] as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  return IconComponent ? (
    <IconComponent className={className ?? "w-10 h-10"} />
  ) : null;
};
