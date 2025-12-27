export const RequiredLabel = ({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) => (
  <span className="text-sm gap-1 flex pb-0">
    {children}
    {required ? <span className="text-red-500">*</span> : null}
  </span>
);
