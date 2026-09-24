import { Text, View, StyleSheet } from "react-native";
// https://pokeapi.co/api/v2/pokemon/?limit=30
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900">
      <Text className="text-xl font-bold text-sky-400">
        Uniwind is set up successfully!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
