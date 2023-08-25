import React from "react";
import { View, ScrollView, StyleSheet, Image, Dimensions } from "react-native";

interface CarouselProps {
  images: string[];
}

const { width } = Dimensions.get("window");
const height = width * 0.8;

function Carousel(props: CarouselProps) {
  const { images } = props;
  if (images && images.length) {
    return (
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              style={styles.image}
              source={{ uri: "data:image/jpeg;base64," + image }}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
  console.log("Please provide images");
  return null;
}

export default Carousel;

const styles = StyleSheet.create({
  scrollContainer: {
    height,
  },
  imagePreview: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  image: {
    width: width - 40,
    height,
    marginRight: 10,
  },
});
