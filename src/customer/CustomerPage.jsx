import Map, { GeolocateControl, Marker } from "react-map-gl";
import MenuBar from "./MenuBar";
import VenueMarker from "../components/VenueMarker";
import { getAuth } from "firebase/auth";
import { useFirebaseApp, useSigninCheck, useFirestore, useFirestoreDocData } from "reactfire";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { doc } from "firebase/firestore";

export default function CustomerPage() {

    const markers = [
        { location: [53.38089284303829, -1.4766664972820758], label: "Molly Malone's Irish Tavern" },
        { location: [53.379374277675964, -1.4702493564818155], label: "Costa Coffee" },
        { location: [53.38020004206791, -1.4792187983038223], label: "KFC Sheffield" },
        { location: [53.380888801054645, -1.479620700831369], label: "The Red Deer" },
    ]

    const { data: signInCheckResult } = useSigninCheck();

    const authInstance = getAuth(useFirebaseApp());

    const db = useFirestore();

    const docRef = doc(db, 'users', signInCheckResult?.user?.uid);
    const response = useFirestoreDocData(docRef);

    const navigateTo = useNavigate();

    useEffect(() => {
        signInCheckResult?.signedIn === false && navigateTo("/auth");
        response?.data?.userRole === "business" && navigateTo("/business");
    }, [response?.data, signInCheckResult?.signedIn]);

    return (
        <div>
            <Map
                initialViewState={{
                    longitude: -1.477,
                    latitude: 53.378,
                    zoom: 13.21
                }}
                style={{ width: '100vw', height: '100vh' }}
                mapStyle="mapbox://styles/illuminatiboat/cla42292y00ns14p07a4ipgzp"
                mapboxAccessToken="pk.eyJ1IjoiaWxsdW1pbmF0aWJvYXQiLCJhIjoiY2poMjh5eWRhMDFxODJxbXJuaXRvMmJtdCJ9.wiImXdAqSjsqZTaaG5VvXQ"
            >
                <Button onClick={() => authInstance.signOut()} variant="contained" sx={{ backgroundColor: "red", position: "absolute", top: 20, right: 20 }}>Log Out</Button>
                <MenuBar />
                <GeolocateControl
                    trackUserLocation={true}
                    position="bottom-right"
                    style={{
                        marginBottom: 40
                    }}
                />
                {markers.map((marker, i) => (
                    <VenueMarker
                        key={i}
                        lon={marker.location[1]}
                        lat={marker.location[0]}
                        label={marker.label}
                        offerCount={5}
                    />
                ))}
            </Map>
        </div>
    );
}
