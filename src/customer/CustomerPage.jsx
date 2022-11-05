import Map from "react-map-gl";

export default function CustomerPage() {
    return (
        <Map
            initialViewState={{
                longitude: -1.477,
                latitude: 53.378,
                zoom: 13.21
            }}
            style={{width: '100vw', height: '100vh'}}
            mapStyle="mapbox://styles/illuminatiboat/cla42292y00ns14p07a4ipgzp"
            mapboxAccessToken="pk.eyJ1IjoiaWxsdW1pbmF0aWJvYXQiLCJhIjoiY2poMjh5eWRhMDFxODJxbXJuaXRvMmJtdCJ9.wiImXdAqSjsqZTaaG5VvXQ"
        />
    );
}
