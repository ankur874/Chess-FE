import { Chess, IndexPath } from "@/app/ChessManager/ChessModel";
import {
  DARK_COLOR,
  SECONDARY_COLOR,
  PRIMARY_COLOR,
} from "@/app/constants/AppConstants";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { ChessBoardProps } from "./ChessBoardInterface";
import {
  B$B,
  B$K,
  B$N,
  B$P,
  B$Q,
  B$R,
  W$B,
  W$K,
  W$N,
  W$P,
  W$Q,
  W$R,
  getChessBoardStyles,
} from "./ChessBoardStyles";

export const ChessBoard = (props: ChessBoardProps) => {
  const { board: chessBoard, color, onPress } = props;
  const { width } = Dimensions.get("window");
  const [selectedPeice, setSelectedPeice] = useState({ row: -1, col: -1 });

  const [board, setBoard] = useState(chessBoard);

  useEffect(() => {
    let updatedBoard: string[][] = [];
    for (let i = 0; i < 8; i++) {
      updatedBoard[i] = [];
      for (let j = 0; j < 8; j++) {
        updatedBoard[i][j] =
          color === Chess.Color.B ? chessBoard[7 - i][7 - j] : chessBoard[i][j];
      }
    }

    setBoard(updatedBoard);
  }, [chessBoard]);

  const styles = getChessBoardStyles(width, props);

  const renderChessBoard = (board: string[][]) => {
    const peiceColor = {
      oddIndex: PRIMARY_COLOR,
      evenIndex: SECONDARY_COLOR,
    };
    if (color === Chess.Color.B) {
      peiceColor.evenIndex = PRIMARY_COLOR;
      peiceColor.oddIndex = SECONDARY_COLOR;
    }

    const getPeiceBgColor = (rowIndex: number, colIndex: number) => {
      return rowIndex === selectedPeice.row &&
        colIndex === selectedPeice.col &&
        board[rowIndex][colIndex] != ""
        ? DARK_COLOR
        : (rowIndex + colIndex) % 2 == 0
        ? peiceColor.evenIndex
        : peiceColor.oddIndex;
    };

    const getTextColor = (rowIndex: number, colIndex: number) => {
      const peiceColor = getPeiceBgColor(rowIndex, colIndex);
      if (peiceColor === PRIMARY_COLOR) {
        return SECONDARY_COLOR;
      }
      return PRIMARY_COLOR;
    };

    return (
      <View style={styles.board}>
        {board.map((row, colIndex) => (
          <View key={colIndex} style={styles.row}>
            {row.map((col, rowIndex) => (
              <Pressable
                key={`${rowIndex}$${colIndex}`}
                onPress={() => {
                  setSelectedPeice({ row: rowIndex, col: colIndex });
                  onPress?.(rowIndex, colIndex);
                }}
              >
                <View
                  style={[
                    styles.boardPeice,
                    {
                      backgroundColor: getPeiceBgColor(rowIndex, colIndex),
                    },
                  ]}
                >
                  {colIndex == 0 ? (
                    <Text
                      style={[
                        styles.files,
                        { color: getTextColor(rowIndex, colIndex) },
                      ]}
                    >
                      {color === Chess.Color.W ? 8 - rowIndex : rowIndex + 1}
                    </Text>
                  ) : null}

                  {rowIndex == 7 ? (
                    <Text
                      style={[
                        styles.rank,
                        { color: getTextColor(rowIndex, colIndex) },
                      ]}
                    >
                      {color === Chess.Color.W
                        ? String.fromCharCode("a".charCodeAt(0) + colIndex)
                        : String.fromCharCode("h".charCodeAt(0) - colIndex)}
                    </Text>
                  ) : null}

                  {board[rowIndex][colIndex] != "" ? (
                    <Image
                      source={getImageSource(board[rowIndex][colIndex])}
                      style={styles.Peice}
                    />
                  ) : (
                    <></>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    );
  };

  const getImageSource = (piece: string) => {
    switch (piece) {
      case "B$B":
        return B$B;
      case "B$K":
        return B$K;
      case "B$N":
        return B$N;
      case "B$P":
        return B$P;
      case "B$Q":
        return B$Q;
      case "B$R":
        return B$R;
      case "W$B":
        return W$B;
      case "W$K":
        return W$K;
      case "W$N":
        return W$N;
      case "W$P":
        return W$P;
      case "W$Q":
        return W$Q;
      case "W$R":
        return W$R;
      default:
        return "";
    }
  };

  return <View>{renderChessBoard(board)}</View>;
};
