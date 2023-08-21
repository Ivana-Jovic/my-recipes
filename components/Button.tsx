import React, { ReactNode } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { Colors } from "../utils/colors";

interface ButtonProps {
  children: ReactNode;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
}
function Button(props: ButtonProps) {
  const { children, onPress } = props;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey,
    padding: 10,
    borderRadius: 5,
  },
  text: { color: "white" },
});
