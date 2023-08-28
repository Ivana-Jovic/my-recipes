import React from "react";
import { View, StyleSheet, Text, ViewStyle, StyleProp } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface DetailItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  additionalStyles?: StyleProp<ViewStyle>;
}

const DetailItem: React.FC<DetailItemProps> = (props) => {
  const { icon, text, additionalStyles } = props;
  return (
    <View style={[styles.detailsItem, additionalStyles]}>
      <Ionicons name={icon} />
      <Text style={styles.detailsItemText}>{text}</Text>
    </View>
  );
};

export default DetailItem;

const styles = StyleSheet.create({
  detailsItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  detailsItemText: {
    fontSize: 12,
  },
});
