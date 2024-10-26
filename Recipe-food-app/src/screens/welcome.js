import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Header from "../components/welcom/header";
import Main from "../components/welcom/main";
import Footer from "../components/welcom/footer";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Main />
      <Footer />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#ffff",
  },
  button: {
    borderRadius: 8,
    padding: 6,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
});
export default Welcome;
