import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  frame: {
    padding: 5,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#00072D",
    backgroundColor: "#0B3680",
  },
  itemFrame: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#00072D",
    backgroundColor: "#0B3680",
    width: 60,
    height: 60,
  },
  // TEXT
  h1: { color: "lightgray", fontWeight: "bold", fontSize: 30 },
  h2: { color: "lightgray", fontWeight: "bold", fontSize: 20 },
  // SCREEN
  screenHeader: {
    backgroundColor: "#00072D",
  },
  screenTitle: {
    color: "lightgray",
    fontSize: 30,
  },
});
