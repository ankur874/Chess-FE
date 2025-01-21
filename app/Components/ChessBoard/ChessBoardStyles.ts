import { StyleSheet } from "react-native";
import { ChessBoardProps } from "./ChessBoardInterface";

export const B$B = require("../../../assets/images/BlackBishop.png");
export const B$K = require("../../../assets/images/BlackKing.png");
export const B$N = require("../../../assets/images/BlackKnight.png");
export const B$P = require("../../../assets/images/BlackPawn.png");
export const B$Q = require("../../../assets/images/BlackQueen.png");
export const B$R = require("../../../assets/images/BlackRook.png");

export const W$B = require("../../../assets/images/WhiteBishop.png");
export const W$K = require("../../../assets/images/WhiteKing.png");
export const W$N = require("../../../assets/images/WhiteKnight.png");
export const W$P = require("../../../assets/images/WhitePawn.png");
export const W$Q = require("../../../assets/images/WhiteQueen.png");
export const W$R = require("../../../assets/images/WhiteRook.png");

export const getChessBoardStyles = (width: number, props: ChessBoardProps) => {
  return StyleSheet.create({
    board: {
      borderColor: "black",
      borderWidth: 2,
      flexDirection: "row",
    },
    row: {
      flexDirection: "column",
    },
    boardPeice: {
      width: width / 9,
      height: width / 9,
      justifyContent: "center",
      alignItems: "center",
    },
    Peice: {
      width: width / 12,
      height: width / 12,
    },
    files: {
      position: "absolute",
      top: 1,
      left: 1,
      fontSize: 8,
      fontWeight: "bold",
    },
    rank: {
      position: "absolute",
      bottom: 1,
      right: 1,
      fontSize: 8,
      fontWeight: "bold",
    },
  });
};
