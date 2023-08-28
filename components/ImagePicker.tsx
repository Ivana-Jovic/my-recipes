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
  recipeToEditPictures?: string[];
}

const ImagePicker: React.FC<ImagePickerProps> = (props) => {
  const { onImagesChange, recipeToEditPictures } = props;
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
    try {
      const hasPermission = await verifyPermissionsTakeImage();
      if (!hasPermission) return;

      const image = await launchCameraAsync({
        aspect: [16, 9],
        quality: 0.3,
        base64: true,
      });

      if (image.canceled || !image.assets) {
        console.log("Taking image has been canceled");
        return;
      }
      if (!image.assets[0].base64) {
        console.log("Image needs to be base64");
        return;
      }
      setAllImages((prev) => [...prev, image.assets[0].base64!]);
    } catch (error) {
      console.log(error);
    }
  }

  async function galeryImageHandler() {
    try {
      const hasPermission = await verifyPermissionsMediaLibrary();
      if (!hasPermission) return;
      const image = await launchImageLibraryAsync({
        aspect: [16, 9],
        quality: 0.3,
        base64: true,
      });
      if (image.canceled || !image.assets) {
        console.log("Using galery has been canceled");
        return;
      }
      if (!image.assets[0].base64) {
        console.log("Image needs to be base64");
        return;
      }
      setAllImages((prev) => [...prev, image.assets[0].base64!]);
    } catch (error) {
      console.log(error);
    }
  }

  const removeImage = (img: string) => {
    setAllImages((prev) => prev.filter((item) => item !== img));
  };

  useEffect(() => {
    if (allImages) onImagesChange(allImages);
  }, [allImages]);

  useEffect(() => {
    if (recipeToEditPictures) setAllImages(recipeToEditPictures);
  }, [recipeToEditPictures]);

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
              additionalStyles={{
                alignSelf: "flex-end",
                padding: 1,
                backgroundColor: Colors.lightGrey,
                marginBottom: 5,
              }}
            >
              <Ionicons name="close" size={20} />
            </Button>

            <Image
              source={{ uri: "data:image/jpeg;base64," + img }}
              style={styles.image}
            />
          </View>
        ))}
      </View>
      <View style={styles.addImage}>
        <Button onPress={takeImageHandler} additionalStyles={styles.button}>
          <Ionicons name="add" size={30} />
        </Button>
        <Text>OR</Text>
        <Button onPress={galeryImageHandler} additionalStyles={styles.button}>
          <Ionicons name="images" size={30} />
        </Button>
      </View>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
  },
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
    borderRadius: 5,
  },
  addImage: {
    width: "100%",
    height: 200,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 5,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: "center",
  },
});
