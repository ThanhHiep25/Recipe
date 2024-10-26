import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/welcome";
import NameScreen from "../screens/name";
import Home from "../screens/home/homeScreen";
import Setting from "../screens/setting/setting";
import Thongtincanhan from "../screens/Thongtincanhan";
import GD_CT from "../screens/recipedetails/gd_Monan";
import dmBanh from "../screens/recipedetails/danhmucFood";
import dmctFood from "../screens/recipedetails/danhmucChitietFood";
import CS_DK from "../screens/policyterms/ChinhsachvaDieukhoan";
import Dangky from "../screens/register/Dangky";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="name" component={NameScreen} />
        <Stack.Screen name="dangky" component={Dangky} />
        <Stack.Screen name="danhmucFood" component={dmBanh} />
        <Stack.Screen name="dmctFood" component={dmctFood} />
        <Stack.Screen name="gdct" component={GD_CT} />
        <Stack.Screen name="setting" component={Setting} />
        <Stack.Screen name="thongtincanhan" component={Thongtincanhan} />
        <Stack.Screen name="csdk" component={CS_DK} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default AppNavigator;
