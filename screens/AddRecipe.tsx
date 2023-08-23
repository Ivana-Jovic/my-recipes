import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  TextInput,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Colors } from "../utils/colors";
import Button from "../components/Button";
import { RecipeType } from "../utils/types";
import Input from "../components/Input";
// interface FormData {
//   name: string;
// }
function AddRecipe() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeType>({
    defaultValues: {
      title: "",
      picture: "", // todo insert pictures
      description: "",
      cookTime: undefined,
      author: "",
      difficulty: 1,
      id: undefined,
      ingredients: [], // todo srediti input ovoga
      instructions: "",
    },
  });

  const onSubmit = (data: RecipeType) => {
    console.log("Resolved:", data);
    // todo id se sam dodaje isto i author
    //TODO upisati uu storage i uzeti id
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={"position"} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Input label="title">
            <Controller
              control={control}
              rules={{
                required: true, // TODO videti da li je moguce kao inace ovde specificirati poruku
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="title"
            />
          </Input>
          <View style={styles.shorterInputsContainer}>
            <Input label="cookTime">
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /^[0-9]{0,3}$/,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.toString()}
                    keyboardType="numeric"
                  />
                )}
                name="cookTime"
              />
            </Input>
            <Input label="difficulty">
              <Controller
                control={control}
                rules={{ required: true, min: 1, max: 5 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.toString()}
                    keyboardType="numeric"
                    maxLength={1}
                  />
                )}
                name="difficulty"
              />
            </Input>
          </View>
          <Input label="description">
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="description"
            />
          </Input>
          <Input label="instructions">
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  // multiline={true}
                />
              )}
              name="instructions"
            />
          </Input>
          <Input label="ingredients">
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value?.toString()}
                  //   multiline={true}
                  //   numberOfLines={4}
                />
              )}
              name="ingredients"
            />
          </Input>
          {(errors.cookTime ||
            errors.description ||
            errors.ingredients ||
            errors.instructions ||
            errors.picture ||
            errors.title) && <Text>This field is required</Text>}
          {errors.difficulty && <Text>Difficulty mus be between 1 and 5</Text>}
          {/* //TODO: kako ovo resiti na bolji nacin */}
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <Button onPress={handleSubmit(onSubmit)}>Done</Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default AddRecipe;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 20,
    padding: 20,
    flex: 1,
  },
  input: {
    // height: 200,
    // minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 5,
    padding: 15,
    backgroundColor: "white",
    flex: 1,
  },
  shorterInputsContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
