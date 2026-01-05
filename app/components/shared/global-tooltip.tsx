import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const GlobalTooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string | React.ReactNode;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild className="cursor-pointer">
        {children}
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};
