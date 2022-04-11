import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useStore } from "../appStore";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
	const setOrigin = useStore((state) => state.setOrigin);
	const setDestination = useStore((state) => state.setDestination);

	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<View style={tw`p-5`}>
				<Image
					style={{
						width: 100,
						height: 100,
						resizeMode: "contain",
					}}
					source={{
						uri: "https://links.papareact.com/gzs",
					}}
				/>

				<GooglePlacesAutocomplete
					styles={{
						container: {
							flex: 0,
						},
						textInput: {
							fontSize: 18,
						},
					}}
					minLength={2}
					enablePoweredByContainer={false}
					onPress={(data, details = null) => {
						setOrigin({
							location: details.geometry.location,
							description: data.description,
						});
						setDestination(null);
					}}
					fetchDetails={true}
					returnKeyType={"search"}
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: "en",
					}}
					nearbyPlacesAPI="GooglePlacesSearch"
					debounce={400}
					placeholder="Where From?"
				/>
				<NavOptions />
				<NavFavourites />
			</View>
		</SafeAreaView>
	);
};
export default HomeScreen;
