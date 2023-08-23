import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

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
    gap: 5,
    flex: 1,
  },
  label: {},
  innerContainer: {
    flex: 1,
    width: "100%",
  },
});
