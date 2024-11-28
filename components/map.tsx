import { getWaterLevel } from "@/src/util/calulate";
import { useEffect } from "react";

const LongdoMap = () => {
  useEffect(() => {
    const fetchDataAndInitializeMap = async () => {
      try {
        // Fetch water level data
        const response = await fetch(
          "https://api-v3.thaiwater.net/api/v1/thaiwater30/public/waterlevel_load?basin_code=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21"
        );
        const data = await response.json();

        // Load Longdo Map script
        const script = document.createElement("script");
        script.src =
          "https://api.longdo.com/map/?key=3e21e572ed29f65590f1e3d88039b0f3";
        script.async = true;
        script.onload = () => {
          // Initialize map
          const map = new window.longdo.Map({
            placeholder: document.getElementById("map"),
          });

          // Set default location to user's current location
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                map.location({ lon: longitude, lat: latitude }, true);
                map.zoom(10);
              },
              (error) => {
                console.error("Error getting location:", error);
                // Fallback to a default location
                map.location({ lon: 101.2804, lat: 6.5411 }, true);
                map.zoom(10);
              }
            );
          } else {
            // Fallback if Geolocation is not supported
            console.warn("Geolocation is not supported by this browser.");
            map.location({ lon: 101.2804, lat: 6.5411 }, true);
            map.zoom(10);
          }

          // Add water level markers
          if (data && data.waterlevel_data) {
            data.waterlevel_data?.data?.forEach((item: any) => {
              if (item.station) {
                const { tele_station_lat: lat, tele_station_long: long } =
                  item.station;
                const { th: tele_station_name } =
                  item.station.tele_station_name;
                const waterLevelDisplay = getWaterLevel(+item.storage_percent);
                const marker = new window.longdo.Marker(
                  { lon: parseFloat(long), lat: parseFloat(lat) },
                  {
                    title: tele_station_name || "Water Station",
                    detail: `สถานการณ์น้ำ : ${waterLevelDisplay?.text}`,
                    icon:
                      waterLevelDisplay?.level === "low"
                        ? {
                            html: '<img src="/location-pin.png" height="20" width="20"/>',
                            offset: { x: 10, y: 10 },
                          }
                        : waterLevelDisplay?.level === "medium"
                          ? {
                              html: '<img src="/location-pin-med.png" height="20" width="20"/>',
                              offset: { x: 10, y: 10 },
                            }
                          : undefined,
                  }
                );
                map.Overlays.add(marker);
              }
            });
          }
        };
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
        };
      } catch (error) {
        console.error("Error fetching water level data:", error);
      }
    };

    fetchDataAndInitializeMap();
  }, []);

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default LongdoMap;
