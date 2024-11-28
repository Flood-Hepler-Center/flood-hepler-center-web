import { useEffect } from 'react';

const LongdoMap = () => {
  useEffect(() => {
    // Dynamically load the Longdo Map script
    const script = document.createElement('script');
    script.src =
      'https://api.longdo.com/map/?key=3e21e572ed29f65590f1e3d88039b0f3'; // Replace with your Longdo Map API key
    script.async = true;
    script.onload = () => {
      // Initialize the Longdo Map
      const map = new window.longdo.Map({
        placeholder: document.getElementById('map'),
      });

      // Example: Add a marker
      map.location({ lon: 100.5018, lat: 13.7563 }); // Bangkok coordinates
      map.Overlays.add(
        new window.longdo.Marker({ lon: 100.5018, lat: 13.7563 })
      );
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up script when the component unmounts
    };
  }, []);

  return <div id='map' style={{ width: '100%', height: '500px' }}></div>;
};

export default LongdoMap;
