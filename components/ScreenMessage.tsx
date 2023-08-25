import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface ScreenMessageProps {
  msg: string;
}

const ScreenMessage: React.FC<ScreenMessageProps> = (props) => {
  const { msg } = props;

  return (
    <View style={styles.screen}>
      <Text>{msg}</Text>
    </View>
  );
};

export default ScreenMessage;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
