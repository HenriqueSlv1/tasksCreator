import React, { useContext, useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { TaskContext } from "../contexts/TaskContext";
import DropDownPicker from "react-native-dropdown-picker";
import { categories } from "../utils/data/todos";
import { UserContext } from "../contexts/UserContext"; // Importe o contexto do usuário

const AddTask = () => {
  const {
    open,
    setOpen,
    taskInput,
    setTaskInput,
    setCategoryValue,
    categoryValue,
    handleAddTask,
    dateInput,
    setDateInput,
  } = useContext(TaskContext);

  const { user } = useContext(UserContext); // aqui to pegando pra adicionar la em bx

  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateInput;
    setShow(false);
    setDateInput(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.avatar}
        source={{
          uri: user?.image,
        }}
      />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateInput || new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <TextInput
        style={styles.input}
        value={taskInput}
        onChangeText={setTaskInput}
        placeholder="Adicione uma nova tarefa"
        placeholderTextColor="#ccc"
      />
      <DropDownPicker
        style={styles.dropdown}
        open={open}
        value={categoryValue}
        items={categories.filter(
          (c) => c.value !== "all" && c.value !== "done"
        )}
        setOpen={setOpen}
        setValue={setCategoryValue}
        placeholder="Escolha uma categoria"
        theme="DARK"
        placeholderStyle={{
          color: "#ccc",
          fontSize: 16,
          textAlign: "center",
        }}
        listItemLabelStyle={{
          textAlign: "center",
        }}
        dropDownContainerStyle={{
          backgroundColor: "#1f4068",
          borderRadius: 10,
          borderWidth: 0,
          width: "77%",
          marginLeft: "10%",
          marginTop: 2,
        }}
        selectedItemContainerStyle={{
          backgroundColor: "#2563eb",
        }}
        selectedItemLabelStyle={{
          fontWeight: "bold",
          fontSize: 16,
          color: "#fff",
        }}
      />
      <TouchableOpacity style={styles.button} onPress={showDatePicker}>
        <MaterialIcons name="schedule" size={24} color="#fff" />
        <Text style={styles.buttonText}>Escolha uma data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <MaterialIcons name="send" size={24} color="#fff" />
        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#05171E",
    paddingHorizontal: 16,
    paddingVertical: 24,
    width: "100%",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  dropdown: {
    width: "80%",
    marginBottom: 16,
    marginLeft: "10%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
