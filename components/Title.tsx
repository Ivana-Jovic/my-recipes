import React, { ReactNode } from "react";
import { Text, StyleSheet } from "react-native";

// todo vidi da li je ok forma za interf
interface TitleProps {
  children: ReactNode;
}

function Title(props: TitleProps) {
  const { children } = props;
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "500",
  },
});
