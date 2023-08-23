import React, { useEffect, useState } from "react";
import { Alert, Image, View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  useMediaLibraryPermissions,
  launchImageLibraryAsync,
} from "expo-image-picker";
//Components
import Button from "./Button";
//Utils
import { Colors } from "../utils/colors";

interface ImagePickerProps {
  onImagesChange: (newValue: string[]) => void;
}

function ImagePicker(props: ImagePickerProps) {
  const { onImagesChange } = props;
  const [allImages, setAllImages] = useState<string[]>([]);
  const [cameraPermissionInformation, requesPermissionCamera] =
    useCameraPermissions();

  const [mediaPermissionInformation, requestPermissionMedia] =
    useMediaLibraryPermissions();

  async function verifyPermissionsTakeImage() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requesPermissionCamera();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use the app",
      );
      return false;
    }
    return true;
  }

  async function verifyPermissionsMediaLibrary() {
    if (mediaPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermissionMedia();
      return permissionResponse.granted;
    }
    if (mediaPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant media library permissions to use the app",
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissionsTakeImage();
    if (!hasPermission) return;

    const image = await launchCameraAsync({
      aspect: [16, 9],
      quality: 0.3,
      base64: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    setAllImages((prev) => [...prev, image.uri]);
    // // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    // onImagesChange(image.uri);
  }

  async function galeryImageHandler() {
    const hasPermission = await verifyPermissionsMediaLibrary();
    if (!hasPermission) return;
    const image = await launchImageLibraryAsync({
      aspect: [16, 9],
      quality: 0.3,
      base64: true,
    });
    // (image.uri); //image.base64
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    setAllImages((prev) => [...prev, image.uri]);
    // // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    // onImagesChange(image.uri);
  }

  const removeImage = (img: string) => {
    setAllImages((prev) => prev.filter((item) => item !== img));
  };
  //       source={{
  //         uri: imagePreview, //"data:image/jpeg;base64," + image,

  useEffect(() => {
    if (allImages) onImagesChange(allImages);
  }, [allImages]);

  return (
    <View style={styles.container}>
      <Text>Images</Text>
      <View style={styles.imagePreviewContainer}>
        {allImages?.map((img) => (
          <View key={img} style={styles.imagePreview}>
            <Button
              onPress={() => {
                removeImage(img);
              }}
              additionalStyle={{
                alignSelf: "flex-end",
                padding: 5,
                backgroundColor: Colors.lightGrey,
              }}
            >
              <Ionicons name="close" size={20} />
            </Button>

            <Image
              source={{
                uri: img,
              }}
              style={styles.image}
            />
          </View>
        ))}
      </View>
      <View style={styles.addImage}>
        <Button onPress={takeImageHandler} additionalStyle={styles.button}>
          <Ionicons name="add" size={30} />
        </Button>
        <Text>OR</Text>
        <Button onPress={galeryImageHandler} additionalStyle={styles.button}>
          <Ionicons name="images" size={30} />
        </Button>
      </View>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  container: { flex: 1 },
  imagePreviewContainer: {},
  imagePreview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  addImage: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.cardColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  button: {
    width: 50,
    height: 50,
  },
});
