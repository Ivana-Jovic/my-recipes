import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface ScreenMessageProps {
  msg: string;
}

function ScreenMessage(props: ScreenMessageProps) {
  const { msg } = props;

  return (
    <View style={styles.screen}>
      <Text>{msg}</Text>
    </View>
  );
}

export default ScreenMessage;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
