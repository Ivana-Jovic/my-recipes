import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../utils/types";
//Components
import Button from "../components/Button";
//Utils
import { insertUser } from "../utils/database";
import { Colors } from "../utils/colors";
import { fetchUser } from "../utils/database";

interface FormData {
  name: string;
}
const SignInScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

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
    console.log("in useEff");
    fetchUser()
      .then((res) => {
        console.log("in useEff fetchUser");
        if (res.rows.length !== 0) {
          navigation.navigate("Recipes");
        }
      })
      .catch(() => {});
  }, []);

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
};

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
