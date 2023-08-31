import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface InputWrapperProps {
  label: string;
  error?: string;
  children: ReactNode;
}

const InputWrapper: React.FC<InputWrapperProps> = (props) => {
  const { label, children, error } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.innerContainer}>{children}</View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default InputWrapper;

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
  error: {
    color: "red",
    fontSize: 12,
  },
});
