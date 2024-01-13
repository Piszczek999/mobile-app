import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCF2F1",
  },
  // TEXT
  textWhite: {
    color: "white",
  },
  textBlack: {
    color: "black",
  },
  // SCREEN
  screenHeader: {
    backgroundColor: "#7FC7D9",
  },
  // DRAWER
  drawerHeader: {
    backgroundColor: "#7FC7D9",
  },
  drawerTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#DCF2F1",
  },
});
