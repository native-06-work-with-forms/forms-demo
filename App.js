import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("deny");
  const [isEnabled, setIsEnabled] = useState(false);
  const toogle = () => setIsEnabled((prev) => !prev);
  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...styles.input, ...styles.text }}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="Input some text"
      />
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={setSelectedValue}
      >
        <Picker.Item style={styles.text} label="Confirm" value="confirm" />
        <Picker.Item style={styles.text} label="Deny" value="deny" />
      </Picker>
      <View style={styles.switchContainer}>
        <Text style={styles.text}>Switch</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          onValueChange={toogle}
          value={isEnabled}
        />
      </View>
      <TouchableOpacity style={styles.button}>
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
});

