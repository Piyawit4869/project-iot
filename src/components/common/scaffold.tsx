export default function Scaffold({ child, backgroundColor }: any) {
  return (
    <div className={`${backgroundColor ? backgroundColor : ''} p-8`}>
      <div className="max-w-7xl mx-auto">{child}</div>
    </div>
  );
}
