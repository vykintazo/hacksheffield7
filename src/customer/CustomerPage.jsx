import Map, {GeolocateControl} from "react-map-gl";
import MenuBar from "./MenuBar";
import VenueMarker from "../components/VenueMarker";
import {getAuth} from "firebase/auth";
import {useFirebaseApp, useFirestore, useFirestoreCollectionData, useFirestoreDocData, useSigninCheck} from "reactfire";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import {collection, doc, getDoc, query, where} from "firebase/firestore";

const now = new Date();
export default function CustomerPage() {
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [businesses, setBusinesses] = useState([]);

    const firestore = useFirestore();
    const offerCollection = collection(firestore, 'offers');
    const offerQuery = query(offerCollection, where('end', '>', now));

    const {data: offers} = useFirestoreCollectionData(offerQuery, {
        idField: 'id', // this field will be added to the object created from each document
    });

    const {data: signInCheckResult} = useSigninCheck();

    const authInstance = getAuth(useFirebaseApp());

    const docRef = doc(firestore, 'users', signInCheckResult?.user?.uid);
    const response = useFirestoreDocData(docRef);

    const navigateTo = useNavigate();

    useEffect(() => {
        const getBusinessUser = async (businessId) => {
            const existing = businesses.find((b) => b.uid === businessId)
            if (existing) {
                return {...existing};
            }
            const businessSnap = await getDoc(doc(firestore, "users", businessId));
            if (businessSnap.exists()) {
                return businessSnap.data();
            }
            return null;
        };
        const groupOffers = async (offers) => {
            const businessIds = [...new Set(offers?.map((offer) => offer.uid))];
            console.log('Ids', businessIds);
            const business = await Promise.all(businessIds.map(getBusinessUser));
            setBusinesses(business.filter(Boolean));
        };

        groupOffers(offers);
    }, [offers, firestore]);

    const mapInstance = useRef();

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
                ref={mapInstance}
                style={{width: '100vw', height: '100vh'}}
                mapStyle="mapbox://styles/illuminatiboat/cla42292y00ns14p07a4ipgzp"
                mapboxAccessToken=import.meta.env.APP_MAPBOX_TOKEN
            >
                <Button onClick={() => authInstance.signOut()} variant="contained"
                        sx={{backgroundColor: "red", position: "absolute", top: 20, right: 20}}>Log Out</Button>
                <MenuBar
                    mapInstance={mapInstance}
                    businesses={businesses}
                    offers={offers}
                    selectedBusiness={selectedBusiness}
                    onSelectedBusinessChange={setSelectedBusiness}
                />
                <GeolocateControl
                    trackUserLocation={true}
                    position="bottom-right"
                    style={{
                        marginBottom: 40
                    }}
                />
                {businesses?.map((businessUser, i) => {
                    const {business, uid} = businessUser
                    const businessOffers = offers?.filter((offer) => offer.uid === uid);
                    return (
                        <VenueMarker
                            key={uid}
                            lon={business.location.lon}
                            lat={business.location.lat}
                            label={business.name}
                            offerCount={businessOffers.length}
                            onClick={() => {
                                setSelectedBusiness(businessUser);
                                mapInstance.current?.flyTo({ 
                                    center: [business?.location?.lon, 
                                    business?.location?.lat],
                                    zoom: 17 
                                });
                            }}
                        />
                    );
                })}
            </Map>
        </div>
    );
}
