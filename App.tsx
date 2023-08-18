import React from "react";
// import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, StatusBar } from "react-native";
import Recipes from "./screens/Recipes";
import { Colors } from "./utils/colors";
import SignInScreen from "./screens/SignInScreen";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        {/* <Text>Open up App.tsx to start working on your app!!</Text> */}
        <Recipes />
        {/* <SignInScreen /> */}
        <StatusBar />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10, //Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
