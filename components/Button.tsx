import React, { ReactNode } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
//Utils
import { Colors } from "../utils/colors";

interface ButtonProps {
  children: ReactNode;
  additionalStyle?: StyleProp<ViewStyle>;
  onPress:
    | ((event: GestureResponderEvent) => void | Promise<void>)
    | null
    | undefined;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, onPress, additionalStyle } = props;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        additionalStyle,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey,
    padding: 10,
    borderRadius: 5,
  },
  pressed: { opacity: 0.7 },
  text: {
    color: "white",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
