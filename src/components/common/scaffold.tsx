export default function Scaffold({ child, backgroundColor }: any) {
  return (
    <div
      className={`${backgroundColor ? backgroundColor : ''} 
      p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10`}
    >
      <div className="max-w-[1600px] mx-auto">{child}</div>
    </div>
  );
}
