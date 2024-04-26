import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  Switch,
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
    getValues,
    trigger,
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
        name={"inputValue"}
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
      <Controller
        control={control}
        name={"selectedValue"}
        rules={{
          validate: () => {
            const { selectedValue, isEnabled } = getValues();
            return selectedValue === "confirm" && isEnabled
              ? true
              : "The data does not match";
          },
        }}
        render={({ field: { onChange, value } }) => {
          return (
            <Picker
              style={styles.picker}
              selectedValue={value}
              onValueChange={(value) => {
                onChange(value);
                trigger();
              }}
            >
              <Picker.Item
                style={styles.text}
                label="Confirm"
                value="confirm"
              />
              <Picker.Item style={styles.text} label="Deny" value="deny" />
            </Picker>
          );
        }}
      ></Controller>
      <Controller
        control={control}
        name={"isEnabled"}
        rules={{
          validate: () => {
            const { selectedValue, isEnabled } = getValues();
            return selectedValue === "confirm" && isEnabled
              ? true
              : "The data does not match";
          },
        }}
        render={({ field: { onChange, value } }) => {
          return (
            <View style={styles.switchContainer}>
              <Text style={styles.text}>Switch</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                onValueChange={(value) => {
                  onChange(value);
                  trigger();
                }}
                value={value}
              />
            </View>
          );
        }}
      ></Controller>
      {Object.values(errors) && (
        <Text style={{ ...styles.text, ...styles.error }}>
          {Object.values(errors).reduce((current, error) => {
            return `${current}
            ${error.message} `;
          }, "")}
        </Text>
      )}

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

