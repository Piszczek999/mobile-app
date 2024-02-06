import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Tile from "./Tile";
import { Fragment, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import MyButton from "./MyButton";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Input from "./Input";
import { changeName } from "../socket";

export default function SettingsMenu() {
  const [visible, setVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [changeNameVisible, setChangeNameVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleNameChange = () => {
    changeName(newName);
    handleClose();
  };

  return (
    <Fragment>
      <Pressable onPress={() => setVisible(true)} style={{ marginRight: 16 }}>
        <Icon name="gear" color="white" size={30} />
      </Pressable>
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={handleClose}
      >
        <Pressable style={styles.background} onPress={handleClose}>
          <Pressable style={{ width: "80%" }}>
            <Tile style={styles.modal} colors={["#666", "#444"]}>
              {changeNameVisible ? (
                <Fragment>
                  <Input
                    textContentType="nickname"
                    onChangeText={setNewName}
                    placeholder="New name"
                  />
                  <MyButton onPress={handleNameChange}>Submit</MyButton>
                  <MyButton
                    colors={["#a33", "#933"]}
                    onPress={() => setChangeNameVisible(false)}
                  >
                    Back
                  </MyButton>
                </Fragment>
              ) : (
                <Fragment>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 30,
                      textAlign: "center",
                    }}
                  >
                    Settings
                  </Text>
                  <MyButton onPress={() => setChangeNameVisible(true)}>
                    Change Name
                  </MyButton>
                  <MyButton onPress={handleLogout} colors={["#a33", "#933"]}>
                    Logout
                  </MyButton>
                </Fragment>
              )}
            </Tile>
          </Pressable>
        </Pressable>
      </Modal>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    display: "flex",
    gap: 10,
    padding: 10,
  },
});
