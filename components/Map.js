import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import MapView, { Marker } from "react-native-maps";
import { useStore } from "../appStore";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useEffect, useRef } from "react";

const Map = () => {
	const origin = useStore((state) => state.origin);
	const destination = useStore((state) => state.destination);
	const setTravelTimeInformation = useStore((state) => state.setTravelTimeInformation);
	const mapRef = useRef(null);

	useEffect(() => {
		if (!origin || !destination) return;

		// Zoom & fit to markers
		mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
			edgePadding: { top: 70, right: 70, bottom: 70, left: 70 },
		});
	}, [origin, destination]);

	useEffect(() => {
		if (!origin || !destination) return;

		const getTravelTime = async () => {
			fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`)
				.then((res) => res.json())
				.then((data) => {
					setTravelTimeInformation(data.rows[0].elements[0]);
				});
		};

		getTravelTime();
	}, [origin, destination, GOOGLE_MAPS_APIKEY]);

	return (
		<MapView
			ref={mapRef}
			style={tw`flex-1`}
			mapType="mutedStandard"
			initialRegion={{
				latitude: origin.location.lat,
				longitude: origin.location.lng,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			}}
		>
			{origin && destination && <MapViewDirections origin={origin.description} destination={destination.description} apikey={GOOGLE_MAPS_APIKEY} strokeWidth={3} strokeColor="black" />}

			{origin?.location && (
				<Marker
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					}}
					title="Origin"
					description={origin.description}
					identifier="origin"
				/>
			)}

			{destination?.location && (
				<Marker
					coordinate={{
						latitude: destination.location.lat,
						longitude: destination.location.lng,
					}}
					title="Destination"
					description={destination.description}
					identifier="destination"
				/>
			)}
		</MapView>
	);
};
export default Map;
const styles = StyleSheet.create({});
