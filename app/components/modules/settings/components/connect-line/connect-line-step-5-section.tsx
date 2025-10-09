export const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="rounded-md bg-gray-100 p-5">
      <p className="mb-3 font-semibold text-gray-800">{title}</p>
      {children}
    </div>
  );
};
