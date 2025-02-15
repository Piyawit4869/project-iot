// pages/map.tsx
import { useEffect } from 'react';

const LongdoMapPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://api.longdo.com/map3/?key=ea563b949f128ad28cda75e93579013a';
    script.async = true;
    script.onload = () => {
      const longdo = (window as any).longdo;
      new longdo.Map({
        placeholder: document.getElementById('map'),
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="h-full">
      <div id="map" className="w-full h-[500px] rounded-xl p-2"></div>
    </div>
  );
};

export default LongdoMapPage;
