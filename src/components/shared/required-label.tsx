import { FormLabel } from "@/components/ui/form";

interface RequiredLabelProps {
  fieldPath: string;
  label: string;
  requiredFields: Set<string>;
}

export const RequiredLabel = ({
  fieldPath,
  label,
  requiredFields,
}: RequiredLabelProps) => {
  const isRequired = requiredFields.has(fieldPath);
  return (
    <FormLabel>
      {isRequired && <span className="text-red-500 mr-1">**</span>}
      {label}
      {isRequired && <span className="text-red-500 mr-1">**</span>}
    </FormLabel>
  );
};
