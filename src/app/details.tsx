import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Details = () => {
  const params = useLocalSearchParams()
  return (
    <View>
      <Text>Details</Text>
        <Text>{params.name}</Text>
    </View>
  );
};

export default Details;
