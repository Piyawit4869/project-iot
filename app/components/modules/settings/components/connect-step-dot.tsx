export const ConnectStepDot = ({
  stepOrder,
  id,
}: {
  stepOrder: any;
  id: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      {stepOrder.map((s: any, i: any) => (
        <span
          key={s}
          className={[
            "inline-block h-2 w-2 rounded-full transition-all",
            i === id ? "bg-primary" : "bg-muted-foreground/30",
          ].join(" ")}
        />
      ))}
    </div>
  );
};
