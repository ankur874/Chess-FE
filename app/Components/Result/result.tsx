import { View, Text } from "react-native";
import { ResultProps } from "./resultInterfaces";
import { useEffect, useState } from "react";
import { Chess } from "@/app/ChessManager/ChessModel";

export const Result = (props: ResultProps) => {
  const { winner, color } = props;
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (winner != Chess.Color.NONE) {
      winner === color
        ? setTitle("Congratulations!! You won")
        : setTitle("You lose,Better luck next time!");
    }
  }, []);

  return title ? (
    <View>
      <Text>{title}</Text>
    </View>
  ) : (
    <></>
  );
};
