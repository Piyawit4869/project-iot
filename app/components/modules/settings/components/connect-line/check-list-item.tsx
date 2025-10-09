import { CheckCircle2 } from "lucide-react";

export const ChecklistItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />
      <span className="leading-6">{children}</span>
    </li>
  );
};
