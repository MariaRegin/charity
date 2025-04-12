import { YMaps, Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";

interface Location {
  latitude: number;
  longitude: number;
  city: string;
  district: string;
}

interface Contacts {
  phone: string;
}

interface Request {
  title: string;
  id: string;
  location: Location;
  contacts: Contacts;
}

interface MapViewProps {
  requests: Request[];
}

const MapView: React.FC<MapViewProps> = ({ requests }) => {
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
