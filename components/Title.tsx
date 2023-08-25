import React, { ReactNode } from "react";
import { Text, StyleSheet } from "react-native";

interface TitleProps {
  children: ReactNode;
}

const Title: React.FC<TitleProps> = (props) => {
  const { children } = props;

  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "500",
  },
});
