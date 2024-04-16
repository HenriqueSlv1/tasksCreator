import { StyleSheet, TextInput, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Button";

const Login = () => {
  const { getToken, getUser, login, googleSignIn } = useContext(UserContext);

  const [username, setUsername] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");

  useEffect(() => {
    getToken();
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholder="Insira seu usuário"
          placeholderTextColor="#fff" // Cor do placeholder
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Insira sua senha"
          placeholderTextColor="#fff" // Cor do placeholder
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => login(username, password)}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Button
        onPress={() => googleSignIn()}
        title="Login com Google"
        icon="google"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#07161B", 
    padding: 20,
  },
  title: {
    color: "#00FF00", 
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#003300", 
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    color: "#fff", 
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#00FF00",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff", 
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Login;
