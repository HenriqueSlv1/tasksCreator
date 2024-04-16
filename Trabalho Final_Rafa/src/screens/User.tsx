import React, { useContext } from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../contexts/UserContext";

export const User = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          resizeMode="cover"
          style={styles.avatar}
          source={{
            uri: user?.image,
          }}
        />
        <Text style={styles.userName}>
          {user?.firstName.toUpperCase()} {user?.lastName.toUpperCase()}
        </Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.infoText}>Email: {user?.email}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#07161B",
    padding: 15,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#3D737F",
    marginBottom: 10,
    
  },
  userName: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  infoText: {
    color: "#FFF",
    fontSize: 18,
    marginVertical: 8,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#3D737F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

