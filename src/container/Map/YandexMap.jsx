// components/YandexMap.js
import { useEffect, useRef } from "react";

const YandexMap = ({ locations, zoom }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const loadYandexMap = () => {
      if (!window.ymaps) return;

      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(mapContainerRef.current, {
          center: locations[0].coordinates,
          zoom: zoom,
          controls: ["zoomControl", "geolocationControl"],
        });

        locations.forEach((location) => {
          const placemark = new window.ymaps.Placemark(location.coordinates, {
            balloonContent: location.name || "Location",
          });
          map.geoObjects.add(placemark);
        });
      });
    };
    if (!window.ymaps) {
      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=7b0c7127-aa6a-470e-970b-3034cca2805f&lang=en_US`;
      script.onload = loadYandexMap;
      document.body.appendChild(script);
    } else {
      loadYandexMap();
    }
  }, [locations, zoom]);

  return (
    <div
      ref={mapContainerRef}
      className="md:h-[818px] h-[409px] w-full rounded-lg shadow-md"
    >
      {locations.length === 0 && (
        <p className="text-center text-gray-500">Loading map...</p>
      )}
    </div>
  );
};

export default YandexMap;
