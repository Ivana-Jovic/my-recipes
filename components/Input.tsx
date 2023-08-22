import React, { ReactNode } from "react";
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";

interface InputProps {
  label: string;
  children: ReactNode;
}
function Input(props: InputProps) {
  const { label, children } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.innerContainer}>{children}</View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // alignItems: "center",
    gap: 5,
    flex: 1,
  },
  label: {
    // flex: 1,
  },
  innerContainer: {
    // flex: 4,
    flex: 1,
    width: "100%",
  },
});
