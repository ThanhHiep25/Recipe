import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import {
  Box,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { UserContext } from "../../screens/UserContext";

//import User from "../../../datauser";
var url = "https://65557a0784b36e3a431dc70d.mockapi.io/user";

const HeaderName = () => {
  const { setUser } = useContext(UserContext); 
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [state, setState] = useState([]);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        setState(data);
      });
  }, []);

  const handleCheck = () => {
    const user = state.find(
      (user) => user.email === email && user.pass === pass
    );

    if (email === null || email.trim() === "") {
      showToast("Chưa nhập email");
    } else if (pass === null || pass.trim() === "") {
      showToast("Chưa nhập mật khẩu");
    } else if (user) {
      showToast("Đang đăng nhập");
      setTimeout(() => {
        navigation.navigate("home");
        setUser(user);
      }, 3000);
    } else {
      showToast("Email hoặc mật khẩu không đúng");
    }
  };
  const showToast = (message) => {
    Toast.show({
      type: "error",
      position: "bottom",
      marginTop: "10px",
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
      fontFamily: "Arial",
    });
  };
  return (
    <View style={styles.container}>
      <View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>

      <Image
        source={require("../../../assets/IMG/namell/lacai.png")}
        style={styles.img}
      ></Image>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "35ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="filled-multiline-flexible"
          label="Email"
          multiline
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <FormControl sx={{ m: 1, width: "35ch" }} variant="filled">
        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
        <FilledInput
          id="filled-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </FormControl>
      <Text style={styles.text1}>
        ** Chúng tôi có thể gửi gợi ý về các công thức nấu ăn của bạn qua email.
      </Text>

      <Pressable
        onPress={() => {
          navigation.navigate("dangky");
        }}
      >
        <Text style={styles.textdk}>Đăng ký tài khoản ?</Text>
      </Pressable>

      <Pressable style={styles.Pre} onPress={() => handleCheck()}>
        <Text style={styles.textLogin}>Đăng nhập</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    fontFamily: 'Roboto-Regular',
    marginTop: 100,
  },

  textTen: {
    fontSize: 20,
    margin: 20,
    left: -70,
    fontWeight: 600,
  },
  textdk: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    color: "#2c2ce0",
    textDecorationLine: "underline",
  },
  textInTen: {
    width: 280,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowRadius: 5,
    padding: 10,
  },
  textEmail: {
    fontSize: 20,
    margin: 20,
    left: -140,
    fontWeight: 600,
  },
  textInEmail: {
    width: 280,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowRadius: 5,
    padding: 10,
  },
  texPass: {
    fontSize: 20,
    margin: 20,
    left: -130,
    fontWeight: 600,
  },
  group1: {
    flexDirection: "row",
  },
  texInPass: {
    width: 280,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowRadius: 5,
    padding: 10,
    paddingRight: 50,
  },
  text1: {
    fontSize: 16,
    margin: 40,
    textAlign: "center",
  },
  imgEye: {
    width: 30,
    height: 30,
    position: "absolute",
    marginLeft: -40,
    marginTop: 5,
  },
  img: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  imgRa: {
    width: 200,
    height: 200,
    margin: 20,
  },
  textLogin: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffff",
    textAlign: "center",
  },
  Pre: {
    margin: 40,
    backgroundColor: "#9ED2BE",
    height: 50,
    width: 230,
    borderRadius: 10,
    padding: 10,
  },
});

export default HeaderName;
