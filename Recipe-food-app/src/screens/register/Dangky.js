import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
var url = "https://65557a0784b36e3a431dc70d.mockapi.io/user";

const Dangky = () => {
  const navigation = useNavigation();
  const [mail, setMail] = useState();
  const [pass, setPass] = useState();
  const [name, setName] = useState();
  const ngay = new Date().toISOString().split("T")[0];


  const handleCheck = async () => {
    // Kiểm tra các trường đầu vào, loại bỏ khoảng trắng nếu có
    if (!name?.trim() || !pass?.trim() || !mail?.trim()) {
      showToast("Vui lòng điền đầy đủ thông tin");
      return;
    }
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          pass: pass.trim(),
          email: mail.trim(),
          date: ngay,
        }),
      });
  
      if (response.ok) {
        showToast("Đăng ký thành công");
        setTimeout(() => {
           navigation.navigate("name")
        }, 3000);
       
        setMail(""); // Đặt lại các trường đầu vào
        setName("");
        setPass("");
      } else {
        showToast("Đăng ký thất bại, vui lòng thử lại");
      }
    } catch (error) {
      showToast("Có lỗi xảy ra, vui lòng thử lại");
      console.error("Error:", error);
    }
  };
  
  

  const showToast = (message) => {
    Toast.show({
      type: "error",
      position: "top",
      text1: message || "Email đã được đăng ký!",
      visibilityTime: 3000,
      autoHide: true,
      fontFamily: "Arial",
    });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <View style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} />

      <View style={styles.view}>
        <Text style={styles.text}>Đăng ký tài khoản: </Text>
      </View>

      <View>
        <View>
          <Pressable style={styles.Pre1} onPress={() => navigation.goBack()}>
            <Image
              source={require("./../../../assets/IMG/namell/Group 6.png")}
              style={styles.img}
            ></Image>
          </Pressable>
        </View>

        <TextField
          id="outlined-email"
          style={styles.textField}
          label="Email"
          multiline
          maxRows={4}
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />

        <TextField
          id="outlined-username"
          style={styles.textField}
          label="Tên đăng nhập"
          multiline
          maxRows={4}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormControl sx={{ m: 0, width: "320px" }} variant="outlined" style={styles.textField}>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}        
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </View>

      <View style={styles.view1}>
        <Pressable
          style={styles.Pre}
          onPress={handleCheck}
        >
          <Text style={styles.text2}>Đăng ký</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Dangky;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:'center'
  },
  view: {
    marginTop: 0,
  },
  view1: {
    marginTop: 40,
  },
  text: {
    fontSize: 20,
    fontFamily: "Arial",
    fontWeight: 600,
  },
  text1: {
    fontSize: 16,

    fontWeight: 600,
    marginTop: 30,
  },
  text2: {
    fontSize: 20,
    fontFamily: "Arial",
    fontWeight: 700,
    color: "#ffff",
  },
  img: {
    width: 50,
    height: 50,
  },
  Pre: {
    height: 50,
    width: 300,
    backgroundColor: "#46ac46",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    marginTop: 30,
    width: 320,
  },
});
