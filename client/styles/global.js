import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001C55",
  },
  navigation: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 3,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: "#00072D",
    minWidth: 200,
    backgroundColor: "transparent",
    color: "lightgray",
    textAlign: "center",
    fontWeight: "bold",
  },
  // TEXT
  h1: { color: "lightgray", fontWeight: "bold", fontSize: 30 },
  h2: { color: "lightgray", fontWeight: "bold", fontSize: 20 },
  textWhite: {
    color: "white",
  },
  textBlack: {
    color: "black",
  },
  // SCREEN
  screenHeader: {
    backgroundColor: "#00072D",
  },
  screenTitle: {
    color: "lightgray",
    fontSize: 30,
  },
});
