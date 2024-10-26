import { useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import { UserContext } from "../UserContext";

const Setting = ({navigation}) => {
  const { user } = useContext(UserContext);
  return (
    <View style={styles.container}>
    <View style={styles.view}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          source={require("../../../assets/IMG/setting/Groupback.png")}
          style={styles.back}
        />
      </Pressable>
    </View>

    <View style={styles.view1}>
      {user ? (
        <>
          <Pressable
            style={styles.Pre}
            onPress={() => navigation.navigate("thongtincanhan", user)}
          >
            <Text style={styles.textPre}>Thông tin cá nhân</Text>
            <Image
              source={require("../../../assets/IMG/setting/thongtin.gif")}
              style={styles.img}
            />
          </Pressable>
          <Pressable style={styles.Pre} onPress={() => navigation.navigate("csdk")}>
            <Text style={styles.textPre}>Chính sách và điều khoản</Text>
            <Image
              source={require("../../../assets/IMG/setting/chinhsach.gif")}
              style={styles.img}
            />
          </Pressable>
          <Pressable style={styles.Pre}>
            <Text style={styles.textPre}>Liên hệ hỗ trợ</Text>
            <Image
              source={require("../../../assets/IMG/setting/call.gif")}
              style={styles.img}
            />
          </Pressable>
        </>
      ) : (
        <>
          <Pressable style={styles.PreGuest} onPress={() => navigation.navigate("name")}>
            <Text style={styles.textPreGuest}>Đăng nhập</Text>
          </Pressable>
          <Pressable style={styles.PreGuest} onPress={() => navigation.navigate("dangky")}>
            <Text style={styles.textPreGuest}>Đăng ký</Text>
          </Pressable>
        </>
      )}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  view: {
    margin: 20,
  },
  view1: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },

  back: {
    width: 50,
    height: 50,
  },
  img: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  Pre: {
    height: 80,
    width: 330,
    shadowColor: "#000000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    margin: 40,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
  },
  textPre: {
    width: 250,
    fontSize: 18,
  },
  PreGuest:{
    height: 80,
    width: 330,
    shadowColor: "#000000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    margin: 40,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#E87104",
    color: "white"
  },
  textPreGuest:{
    fontSize: 18,
    color: "white",
    fontWeight: 700,
  }
});

export default Setting;
