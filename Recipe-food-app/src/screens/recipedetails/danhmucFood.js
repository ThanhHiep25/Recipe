import React from "react";

import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Pressable,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

import datamonan from "../../../dataMonan";
import * as Animatable from "react-native-animatable";
import Fuse from "fuse.js";
import { TextField } from "@mui/material";
import { LocalFireDepartmentOutlined, ThumbUpOutlined } from "@mui/icons-material";

const dmBanh = ({ navigation, route }) => {
  const colors = route.params.colorItem;
  const id = route.params.id;
  var [dsmonan, setDsmonan] = useState([]);
  var [dsmonanNew, setDsmonanNew] = useState([]);
  const foodItems = route.params.dsmon;
  var [selectedFilter, setSelectedFilter] = useState("All");
  var [searchInput, setSearchInput] = useState("");
  var [searchResult, setSearchResult] = useState([]);
  const fuse = new Fuse(dsmonan, {
    keys: ["Name"],
  });
  const handleSearch = (text) => {
    setSearchInput(text);
    const result = fuse.search(text);
    setSearchResult(result);
  };

  //chạy lại setDsmonan nếu id thay đổi
  useEffect(() => {
    if (id == 1) {
      setDsmonan(datamonan.Banh);
      setDsmonanNew(datamonan.Banh);
    } else if (id == 2) {
      setDsmonan(datamonan.foodIemsSoup);
      setDsmonanNew(datamonan.foodIemsSoup);
    } else if (id == 3) {
      setDsmonan(datamonan.nuong);
      setDsmonanNew(datamonan.nuong);
    } else if (id == 4) {
      setDsmonan(datamonan.Lau);
      setDsmonanNew(datamonan.Lau);
    } else if (id == 5) {
      setDsmonan(datamonan.Nuoctraicay);
      setDsmonanNew(datamonan.Nuoctraicay);
    } else if (id == 6) {
      setDsmonan(datamonan.Anvat);
      setDsmonanNew(datamonan.Anvat);
    } else if (id == 7) {
      setDsmonan(datamonan.Salad);
      setDsmonanNew(datamonan.Salad);
    } else if (id == 8) {
      setDsmonan(datamonan.NuocCham);
      setDsmonanNew(datamonan.NuocCham);
    }
  }, [id]);

  return (
    <ScrollView>
      <LinearGradient colors={route.params.bgcl} style={style.container}>
        <View style={style.container}>
          <View style={style.header}>
            {/* title */}
            <View style={style.containerheader1}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Image
                  source={require("./../../../assets/IMG/Banh/back.png")}
                  style={style.backLogo}
                />
              </Pressable>
              <View style={style.titlePage}>
                <Image
                  source={route.params.img}
                  style={style.lambanhLogo}
                ></Image>
                <Text style={style.Titletext}> {route.params.title}</Text>
              </View>
            </View>
          </View>
          <View style={style.body}>
            {/* thanh search */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                id="outlined-multiline-flexible"
                color="success"
                style={style.searchBar}
                label="Search"
                multiline
                maxRows={4}
                onChange={(event) => handleSearch(event.target.value)} // Use onChange and access event.target.value
                value={searchInput}
              />
              
            </View>
            {/* lọc */}
            <View style={style.filter}>
              {/* all */}
              <Pressable
                style={{
                  ...style.buttonFilter,
                  backgroundColor: selectedFilter === "All" ? "#FCA34D" : null,
                }}
                onPress={() => {
                  setDsmonanNew(dsmonan);
                  console.log(dsmonanNew);
                  setSelectedFilter("All");
                  setSearchInput("");
                }}
              >
                <Text
                  style={{
                    ...style.filterText,
                    color: selectedFilter === "All" ? "#FFFFFF" : "#949292",
                  }}
                >
                  All
                </Text>
              </Pressable>
              {/* Giảm dần */}

              <Pressable
                style={{
                  ...style.buttonFilter,
                  backgroundColor:
                    selectedFilter === "Giamdan" ? "#FCA34D" : null,
                }}
                onPress={() => {
                  setSearchInput("");
                  setSelectedFilter("Giamdan");
                  setDsmonanNew(
                    [...dsmonan].sort(
                      (a, b) => parseFloat(b.kcal) - parseFloat(a.kcal)
                    )
                  );
                }}
              >
                <Text
                  style={{
                    ...style.filterText,
                    color: selectedFilter === "Giamdan" ? "#FFFFFF" : "#949292",
                  }}
                >
                  Calo &darr;
                </Text>
              </Pressable>

              {/* Tăng dần */}

              <Pressable
                style={{
                  ...style.buttonFilter,
                  backgroundColor:
                    selectedFilter === "tangdan" ? "#FCA34D" : null,
                }}
                onPress={() => {
                  setSearchInput("");
                  setSelectedFilter("tangdan");
                  setDsmonanNew(
                    [...dsmonan].sort(
                      (a, b) => parseFloat(a.kcal) - parseFloat(b.kcal)
                    )
                  );
                }}
              >
                <Text
                  style={{
                    ...style.filterText,
                    color: selectedFilter === "tangdan" ? "#FFFFFF" : "#949292",
                  }}
                >
                  Calo &uarr;
                </Text>
              </Pressable>

              {/* <Image
                style={{ resizeMode: "contain", width: 25, height: 25 }}
                source={require("../../assets/IMG/icon _filter_.png")}
              /> */}
              <Pressable
                style={{
                  ...style.buttonFilter,
                  backgroundColor: selectedFilter === "like" ? "#FCA34D" : null,
                }}
                onPress={() => {
                  setSearchInput("");
                  setSelectedFilter("like");
                  setDsmonanNew(
                    [...dsmonan].sort(
                      (a, b) => parseFloat(b.like) - parseFloat(a.like)
                    )
                  );
                }}
              >
                <Text
                  style={{
                    ...style.filterText,
                    color: selectedFilter === "like" ? "#FFFFFF" : "#949292",
                  }}
                >
                  Like &darr;
                </Text>
              </Pressable>
            </View>
            {/* khung search */}
            <View style={style.cangiua}>
              {searchInput.length > 0 && (
                <ScrollView style={style.searchTab}>
                  {searchResult.map((result) => (
                    <Pressable
                      onPress={() => {
                        navigation.navigate("dmctFood", { item: result.item });
                      }}
                      style={style.khungsearch}
                    >
                      <Text
                        style={style.searchResulttext}
                        key={result.item.Name}
                      >
                        {result.item.Name}
                      </Text>
                      <Image
                        style={style.imgSearch}
                        source={result.item.image}
                      />
                    </Pressable>
                  ))}
                </ScrollView>
              )}
            </View>
            <View style={style.cangiua}>
              <FlatList
                numColumns={2}
                data={dsmonanNew}
                renderItem={({ item, index }) => {
                  return (
                    <Animatable.View animation="fadeIn" duration={1000}>
                      <SafeAreaView>
                        <Pressable
                          style={{
                            ...style.fooditem,
                            backgroundColor: colors[index % colors.length],
                          }}
                          onPress={() => {
                            navigation.navigate("dmctFood", { item: item });
                          }}
                        >
                          <Image
                            source={item.image}
                            style={style.imagesFooditem}
                          />
                          <Text style={style.nameFood}>{item.Name}</Text>
                          <View style={style.nguyenlieu}>
                            <Text style={style.detailsFood}>Mô tả</Text>
                            <Text
                              ellipsizeMode="tail"
                              numberOfLines={2}
                              style={style.detailsFood && { marginLeft: 0, marginBottom:10 }}
                            >
                              {item.details}
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                  flexDirection: "row",
                                }}
                              >
                                <LocalFireDepartmentOutlined color="error"/>
                                <Text style={{}}>{item.kcal} </Text>
                              </View>
                              <View
                                style={{
                                  justifyContent: "flex-end",
                                  alignItems: "center",
                                  flexDirection: "row",
                                }}
                              >
                                
                              </View>
                            </View>
                          </View>
                        </Pressable>
                      </SafeAreaView>
                    </Animatable.View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    flex: "1",
  },
  body: {
    display: "flex",
    flex: "9",
  },
  header: {
    padding: 10,
  },

  imagesFooditem: {
    width: "150px",
    height: "100px",
    borderRadius: 15,
  },
  containerheader1: {
    marginTop: "20px",
  },
  backLogo: {
    marginLeft: "10px",
    width: "50px",
    height: "50px",
  },
  lambanhLogo: {
    marginTop: "10px",
    height: "50px",
    width: "50px",
    resizeMode: "contain",
  },
  titlePage: {
    alignItems: "center",
    justifyContent: "center",

    flex: "1",
  },
  Titletext: {
    marginTop: "10px",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Segoe UI",
  },
  fooditem: {
    justifyContent: "center",
    width: "160px",
    height: "236px",
    borderRadius: 10,
    shadowColor: "#00000083",
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  nameFood: {
    fontWeight: "bold",
    fontSize: "14px",
  },
  detailsFood: {
    fontSize: "12px",
    paddingTop: 10,
    paddingBottom:10
  },
  nguyenlieu: {
    width: 130,
  },
  searchBar: {
    width: 300,
    height: 50,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 600,
    color: "#949292",
    marginBottom:10
  },
  imgSe: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    marginLeft: 10,
    borderRadius: 5,
  },
  cangiua: {
    justifyContent: "center",
    alignItems: "center",
  },
  filter: {
    flexDirection: "row",
    padding: "10px",
    justifyContent: "space-around",
    borderBottomColor: "#CBC9D4",
    alignItems: "center",
    marginHorizontal: "5%",
  },
  filterText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#949292",
  },
  buttonFilter: {
    width: 70,
    height: 30,
    borderBlockColor: "black",
    borderWidth: 1,
    alignContent: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: 5,
    flexDirection: "row",
    marginRight: 10,
  },
  searchTab: {
    flex: "1",
    width: "95%",
    backgroundColor: "#ffffff78",
    borderRadius:10
  },
  searchResulttext: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    opacity: "200%",
  },
  imgSearch: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  khungsearch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#CBC9D4",
    borderBottomWidth: 1,
    padding:10,
    marginLeft: 20,
    marginRight: 20
  },
});

export default dmBanh;
