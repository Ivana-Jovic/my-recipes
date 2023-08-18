import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View, Text, StyleSheet, Button } from "react-native";
import { Colors } from "../utils/colors";
// import Button from "../components/Button";

interface FormData {
  name: string;
}
function SignInScreen() {
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
    console.log("Resolved:", data);
    //TODO upisati uu storage i uzeti id
  };
  return (
    <View style={styles.container}>
      <Text>Please enter you name:</Text>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true, // TODO videti da li je moguce kao inace ovde specificirati poruku
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && <Text>This field is required</Text>}
        {/* //TODO: kako ovo resiti na bolji nacin */}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button title={"Done"} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    gap: 30,
    padding: 20,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 20,
  },
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
