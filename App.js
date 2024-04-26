import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      inputValue: "",
      selectedValue: "deny",
      isEnabled: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const onError = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={"text"}
        rules={{
          required: { value: true, message: "Please fill the field" },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Please enter the email address",
          },
        }}
        render={({ field: { onChange, value } }) => {
          return (
            <TextInput
              style={{ ...styles.input, ...styles.text }}
              onChangeText={onChange}
              value={value}
              placeholder="Input some text"
            />
          );
        }}
      ></Controller>
      {errors.text && <Text style={styles.error}>{errors.text.message}</Text>}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit, onError)}
      >
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    marginVertical: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#389B10",
    padding: 10,
    alignItems: "center",
  },
  text: { fontSize: 20 },
  error: { color: "red" },
});

