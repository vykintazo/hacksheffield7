import Map, { GeolocateControl, Marker } from "react-map-gl";
import MenuBar from "./MenuBar";
import VenueMarker from "../components/VenueMarker";
import { getAuth } from "firebase/auth";
import { useFirebaseApp, useSigninCheck, useFirestore, useFirestoreDocData } from "reactfire";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { doc } from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {useFirebaseApp, useFirestore, useFirestoreCollectionData, useSigninCheck} from "reactfire";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {collection, doc, getDoc, query, where} from "firebase/firestore";


export default function CustomerPage() {
    const markers = [
        {location: [53.38089284303829, -1.4766664972820758], label: "Molly Malone's Irish Tavern"},
        {location: [53.379374277675964, -1.4702493564818155], label: "Costa Coffee"},
        {location: [53.38020004206791, -1.4792187983038223], label: "KFC Sheffield"},
        {location: [53.380888801054645, -1.479620700831369], label: "The Red Deer"},
    ]
    const [businesses, setBusinesses] = useState([]);

    const firestore = useFirestore();
    const offerCollection = collection(firestore, 'offers');
    const offerQuery = query(offerCollection, where('end', '<=', new Date()))

    const {status, data: offers} = useFirestoreCollectionData(offerCollection, {
        idField: 'id', // this field will be added to the object created from each document
    });


    const {data: signInCheckResult} = useSigninCheck();

    const authInstance = getAuth(useFirebaseApp());

    const db = useFirestore();

    const docRef = doc(db, 'users', signInCheckResult?.user?.uid);
    const response = useFirestoreDocData(docRef);

    const navigateTo = useNavigate();


    useEffect(() => {
        const getBusinessUser = async (businessId) => {
            if (businesses.some((b) => b.uid === businessId)) {
                return null;
            }
            const businessSnap = await getDoc(doc(firestore, "users", businessId));
            if (businessSnap.exists()) {
                const businessUser = businessSnap.data();
                console.log(businessUser);
                return businessUser;
            }
            return null;
        };
        const groupOffers = async (offers) => {
            await Promise.allSettled(offers.map(async (offer) => {
                const businessId = offer.uid;
                const businessUser = await getBusinessUser(businessId);
                if (businessUser) {
                    setBusinesses((prev) => [...prev, businessUser])
                }
            }));
        };

        groupOffers(offers);
    }, [offers, firestore])


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
                style={{width: '100vw', height: '100vh'}}
                mapStyle="mapbox://styles/illuminatiboat/cla42292y00ns14p07a4ipgzp"
                mapboxAccessToken="pk.eyJ1IjoiaWxsdW1pbmF0aWJvYXQiLCJhIjoiY2poMjh5eWRhMDFxODJxbXJuaXRvMmJtdCJ9.wiImXdAqSjsqZTaaG5VvXQ"
            >
                <Button onClick={() => authInstance.signOut()} variant="contained"
                        sx={{backgroundColor: "red", position: "absolute", top: 20, right: 20}}>Log Out</Button>
                <MenuBar/>
                <GeolocateControl
                    trackUserLocation={true}
                    position="bottom-right"
                    style={{
                        marginBottom: 40
                    }}
                />
                {businesses.map((businessUser, i) => {
                    const { business, uid } = businessUser

                    return(
                        <VenueMarker
                            key={uid}
                            lon={business.location.lon}
                            lat={business.location.lat}
                            label={business.name}
                            offerCount={5}
                        />
                    );
                })}
            </Map>
        </div>
    );
}
