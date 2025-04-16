import { FormLabel } from "@/components/ui/form";

interface SmartLabelProps {
  fieldPath: string;
  label: string;
  requiredFields: Set<string>;
}

export const SmartLabel = ({
  fieldPath,
  label,
  requiredFields,
}: SmartLabelProps) => {
  const isRequired = requiredFields.has(fieldPath);
  return (
    <FormLabel>
      {isRequired && <span className="text-red-500 mr-1">**</span>}
      {label}
      {isRequired && <span className="text-red-500 mr-1">**</span>}
    </FormLabel>
  );
};
