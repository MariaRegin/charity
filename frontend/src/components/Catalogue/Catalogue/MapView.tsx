import { YMaps, Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";

const MapView = ({ requests }) => {
  return (
    <YMaps>
      <Map
        defaultState={{ center: [55.75, 37.57], zoom: 5 }}
        style={{ width: "500px", height: "400px" }}
        modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
      >
        {requests.map((request) => (
          <Placemark
            key={request.id}
            geometry={[request.location.latitude, request.location.longitude]}
            properties={{
              balloonContent: `${request.title}, ${request.location.city}, ${request.location.district}, ${request.contacts.phone}`,
              hintContent: `${request.title}, ${request.location.city}`,
            }}
          />
        ))}
        <ZoomControl options={{ position: { right: 10, top: 10 } }} />
      </Map>
    </YMaps>
  );
};

export default MapView;
