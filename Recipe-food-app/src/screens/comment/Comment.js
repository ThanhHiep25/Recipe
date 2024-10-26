import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { UserContext } from "../UserContext";
import { Avatar, TextField } from "@mui/material";

var url = "https://65557a0784b36e3a431dc70d.mockapi.io/chats";

export const Comment = () => {
  const [state, setState] = useState([]);
  const [comment, setComment] = useState();
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const fetchData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
       <View style={styles.sumCMT}>
          <Text style={styles.commentCount}>
            Tổng số lượt bình luận: {state.length}
          </Text>
        </View>

      <View style={styles.view}>
        <View style={styles.view4}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={state}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.view_1}>
                  <View style={styles.view3}>
                    <View style={styles.view1}>
                      <Avatar />
                      <Text style={styles.text}>{item.name}</Text>
                    </View>

                    {user &&
                      item.name === user.name && ( // Show delete button only for the user's own comments
                        <Pressable
                          onPress={() => {
                            var link = url + "/" + item.id;
                            fetch(link, {
                              method: "DELETE",
                            }).then((data) => {
                              fetchData();
                            });
                          }}
                        >
                          <DeleteSweepIcon color="warning" />
                        </Pressable>
                      )}
                  </View>

                  <View style={styles.view2}>
                    <Text style={styles.text1}>{item.comment}</Text>
                  </View>
                </View>
              )}
            />
          </ScrollView>
        </View>
        <View style={styles.view_2}>
          <View style={styles.view1}>
            <Avatar alt="Remy Sharp" />
            <Text style={styles.textcm}>{user ? user.name : "Guest"}</Text>
          </View>

          <View style={styles.view2}>
            {/* <TextInput
              multiline
              numberOfLines={5}
              style={styles.textIn}
              placeholder=". . ."
              value={comment}
              onChangeText={(text) => setComment(text)}
            /> */}
            <TextField
              id="outlined-multiline-static"
              style={styles.textIn}
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Pressable
              onPress={() => {
                fetch(url, {
                  method: "POST",
                  body: JSON.stringify({
                    name: user.name,
                    comment: comment,
                    chat_id: state.name,
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                  },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    fetchData();
                  });
                setComment("");
              }}
            >
              <Image
                source={require("../../../assets/IMG/send.png")}
                style={styles.img}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  view: {
    margin: 20,
    alignItems: "center",
  },
  viewback: {
    marginLeft: 20,
    marginTop: 20,
  },
  view_1: {
    height: "auto",
    width: 400,
    backgroundColor: "#e5d4ff47",
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  view_2: {
    height: "auto",
    width: 400,
    backgroundColor: "#e5d4ff47",
    padding: 20,
    borderRadius: 20,
    marginTop: 0,
    marginBottom: 100,
  },
  view1: {
    flexDirection: "row",
    alignItems: "center",
  },
  view2: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  view3: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  view4: {
    margin: 20,
    marginTop: 0,
    alignItems: "center",
    height: 250,
    borderRadius: 10,
  },
  img: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },

  img1: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  text: {
    fontSize: 18,
    fontFamily: "Arial",
    fontWeight: 600,
    marginLeft: 20,
  },
  textcm: {
    fontSize: 18,
    fontFamily: "Arial",
    fontWeight: 600,
    marginLeft: 20,
    color: "#535151",
    height: 50,
    width: 200,
    padding: 10,
  },
  text1: {
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: 500,
    marginLeft:60
  },
  textIn: {
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: 500,
    padding: 10,
    width: 360,
    borderRadius: 20,
  },
  sumCMT:{
    marginTop: 20, 
    marginLeft:20,
  },
  commentCount:{
    fontSize:16, 
    marginLeft:20,
    color: "#535151",
    fontWeight: 500,
  }
});
