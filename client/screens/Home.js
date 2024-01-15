import { Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { logged, socket } from "../socket";
import Login from "./Login";
import { useState } from "react";

export default function Home() {
  const [logged, setLogged] = useState(false);

  socket.on("logged", (data) => {
    setLogged(true);
  });

  if (!logged) return <Login />;

  return (
    <View style={globalStyles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}
