import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerStyle: "",
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
        }}
      />
    </Stack>
  );
}
