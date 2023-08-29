import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
//Components
import Button from "../components/Button";
//Utils
import { Colors } from "../utils/colors";
import { NavigationProp } from "../utils/types";
import { useUser } from "../store/user";

interface FormData {
  name: string;
}
const SignInScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const addUser = useUser((state) => state.addUser);
  const user = useUser((state) => state.user);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: FormData) => {
    try {
      // await insertUser(data.name);
      addUser(data.name);
      navigation.navigate("Recipes");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) navigation.navigate("Recipes");
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
