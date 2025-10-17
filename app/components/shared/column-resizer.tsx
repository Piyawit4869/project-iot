export const ColumnResizer = ({ header }: { header: any }) => {
  if (header.column.getCanResize() === false) return <></>;

  return (
    <div
      {...{
        onMouseDown: header.getResizeHandler(),
        onTouchStart: header.getResizeHandler(),
        className: `absolute top-[25%] right-0 cursor-col-resize w-px h-1/2 bg-gray-300 hover:bg-gray-400 hover:w-1`,
        style: {
          userSelect: "none",
          touchAction: "none",
        },
      }}
    />
  );
};
