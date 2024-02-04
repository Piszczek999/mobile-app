import React from "react";
import {
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import mapImages from "../../assets/maps/mapImages";
import { useCharacter } from "../../shared/CharacterContext";
import ItemFrame from "../../shared/ItemFrame";
import MyButton from "../../shared/MyButton";
import Tile from "../../shared/Tile";
import Expbar from "../Profile/Expbar";
import RewardExpbar from "./RewardExpbar";

type Props = {
  visible: boolean;
  setRewardVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RewardModal({ visible, setRewardVisible }: Props) {
  const { rewards, setRewards, character } = useCharacter();
  if (!character) return;

  const handleClose = () => {
    setRewards(undefined);
    setRewardVisible(false);
  };

  if (!rewards) return null;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={handleClose}
    >
      <Pressable style={styles.background} onPress={handleClose}>
        <Pressable style={{ width: "80%" }}>
          <ImageBackground
            source={mapImages[rewards.mapId]}
            style={{
              height: 100,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></ImageBackground>
          <Tile colors={["#666", "#444"]} style={styles.modal}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
              >
                Reward:
              </Text>
              <Text style={{ color: "gold", fontSize: 20, fontWeight: "bold" }}>
                {"Gold: " + Math.floor(rewards.gold)}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: "white", fontSize: 25, fontWeight: "bold" }}
              >
                Items found:
              </Text>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                {rewards.items ? (
                  rewards.items.map((item) => (
                    <ItemFrame key={item.id} item={item} />
                  ))
                ) : (
                  <Text style={{ color: "white", fontSize: 20 }}>
                    No items found
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Progress:</Text>
              <RewardExpbar character={character} exp={rewards.exp} />
            </View>

            <MyButton onPress={handleClose}>Collect</MyButton>
          </Tile>
        </Pressable>
      </Pressable>
    </Modal>
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
    padding: 10,
    alignItems: "center",
    display: "flex",
    gap: 20,
  },
});
