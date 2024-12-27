export default function Scaffold({ child, backgroundColor }: any) {
  return (
    <div className={`${backgroundColor ? backgroundColor : ''} p-8`}>
      <div className="max-w-[1600px] mx-auto">{child}</div>
    </div>
  );
}
