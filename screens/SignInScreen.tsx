import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
//Components
import Button from "../components/Button";
//Utils
import { insertUser } from "../utils/database";
import { Colors } from "../utils/colors";
import { fetchUser } from "../utils/database";
import { User } from "../utils/types";
import ScreenMessage from "../components/ScreenMessage";

type Props = NativeStackScreenProps<RootStackParamList, "Recipes">;
type SignInScreenNavigationProp = Props["navigation"];

interface FormData {
  name: string;
}

function SignInScreen() {
  const [user, setUser] = useState<string | undefined>(undefined);
  const navigation = useNavigation<SignInScreenNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Resolved:", data);
      const userId = await insertUser(data.name);
      console.log("res", userId.insertId);
      navigation.navigate("Recipes");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser()
      .then((res) => {
        if (res.rows.length !== 0) {
          navigation.navigate("Recipes");
          setUser((res.rows._array[0] as User).name);
        } else setUser("");
      })
      .catch(() => {});
  }, []);

  if (user === undefined) return <ScreenMessage msg="Loading..." />; //todo da li ima neki lepsi nacin za ovaj signin

  return (
    <View style={styles.container}>
      <Text>Please enter you name:</Text>
      <View style={styles.containerError}>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              required: "Name is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          <Button onPress={handleSubmit(onSubmit)}>Done</Button>
        </View>
        {errors.name && (
          <Text style={{ color: "red" }}>{errors.name.message}</Text>
        )}
      </View>
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    gap: 15,
    paddingHorizontal: 20,
    paddingTop: 150,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 20,
  },
  containerError: { gap: 10 },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
    flex: 1,
  },
});
