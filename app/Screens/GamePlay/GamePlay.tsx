import { Button, Text, View } from "react-native";
import { useSocket } from "../../Hooks/useSocket";
import { useEffect, useState } from "react";
import { ChessManager } from "../../ChessManager/ChessManager";
import { ChessBoard } from "../../Components/ChessBoard/ChessBoard";
import { Chess } from "../../ChessManager/ChessModel";
import { GAME_OVER, INIT_GAME, MOVE } from "../../constants/AppConstants";
import { IndexPath } from "./GamePlayInterface";
import { useIsFocused } from "@react-navigation/native";
import { getGamePlayStyles } from "./GamePlayStyles";
import { Result } from "@/app/Components/Result/result";

export const GamePlay = () => {
  const socket = useSocket();
  const [chessManager, setChessManager] = useState(new ChessManager());
  const [board, setBoard] = useState<string[][]>();
  const [color, setColor] = useState<Chess.Color>(Chess.Color.NONE);
  console.log("check reredner", color);
  const [isActivePlayer, setActivePlayer] = useState(false);
  const [pendingIndexPath, setPendingIndexPath] = useState<IndexPath>({});
  const [winner, setWinner] = useState<Chess.Color>(Chess.Color.NONE);

  const styles = getGamePlayStyles();

  useEffect(() => {
    console.log("changedd");
    if (!socket) return;
    socket.onmessage = (data) => {
      const message = JSON.parse(data.data);
      console.log("---", color);
      switch (message.type) {
        case INIT_GAME:
          initilizeGame(message);
          break;
        case MOVE:
          makeMove(message);
          break;
        case GAME_OVER:
          makeGameOver(message);
          break;
      }
    };
  }, [socket]);

  const initilizeGame = (message: any) => {
    setColor(message.payload.color);

    setBoard(chessManager.getBoard());
    setActivePlayer(message.payload.color === Chess.Color.W);

    console.log("init_game", message, color);
  };

  const makeMove = (message: any) => {
    console.log("make move", message, color);
    setPendingIndexPath({});
    setActivePlayer(true);
    chessManager.updateBoardOnValidation(message.payload);
    setBoard(chessManager.getBoard());
  };

  const makeGameOver = (message: any) => {
    console.log("game over", message, color);
    setActivePlayer(false);
    if (message?.payload?.move) {
      chessManager.updateBoardOnValidation(message.payload.move);
      setBoard(chessManager.getBoard());
    }

    setWinner(message.payload.winner);
  };

  const getSelectedChessPeiceValue = (rowIndex: number, colIndex: number) => {
    return color === Chess.Color.W
      ? board?.[rowIndex][colIndex]
      : board?.[7 - rowIndex][7 - colIndex];
  };

  const isSelectedChessPeiceMine = (selectedPeiceColor: string) => {
    //selectedPeiceColor -> W | B
    return (
      color === Chess.Color[selectedPeiceColor as keyof typeof Chess.Color]
    );
  };

  const onPeicePress = (rowIndex: number, colIndex: number) => {
    if (!isActivePlayer || winner != Chess.Color.NONE) return;
    const selectedPeiceValue = getSelectedChessPeiceValue(rowIndex, colIndex);

    const [selectedPeiceColor] = selectedPeiceValue?.split("$") as [
      string,
      string
    ];

    if (Object.keys(pendingIndexPath).length !== 0) {
      if (selectedPeiceValue != "") {
        if (isSelectedChessPeiceMine(selectedPeiceColor)) {
          setPendingIndexPath({ rowIndex: rowIndex, colIndex: colIndex });
          return;
        } else {
          validateAndMovePeice(rowIndex, colIndex);
        }
      } else {
        validateAndMovePeice(rowIndex, colIndex);
      }
    } else {
      if (
        selectedPeiceValue == "" ||
        !isSelectedChessPeiceMine(selectedPeiceColor)
      )
        return;
      setPendingIndexPath({ rowIndex: rowIndex, colIndex: colIndex });
    }
  };

  const validateAndMovePeice = (rowIndex: number, colIndex: number) => {
    const destIndexPath: IndexPath = {
      rowIndex: rowIndex,
      colIndex: colIndex,
    };
    const currCoordinates = getPeiceCordinateFromIndex(pendingIndexPath);
    const destCoordinates = getPeiceCordinateFromIndex(destIndexPath);
    const moveToBePerformed = `${currCoordinates}$${destCoordinates}`;
    const isMoveValid = chessManager.move(
      color === Chess.Color.W,
      moveToBePerformed
    );
    if (isMoveValid) {
      setActivePlayer(false);
      setBoard(chessManager.getBoard());
      setPendingIndexPath({});
      sendDataToServer(moveToBePerformed);
    }
  };

  const sendDataToServer = (moveToBePerformed: string) => {
    socket?.send(
      JSON.stringify({
        type: MOVE,
        move: moveToBePerformed,
      })
    );
  };

  const getPeiceCordinateFromIndex = (indexPath: IndexPath) => {
    //[5,1] -> b3

    if (color === Chess.Color.B) {
      indexPath.rowIndex = 7 - (indexPath.rowIndex ?? 0);
      indexPath.colIndex = 7 - (indexPath.colIndex ?? 0);
    }
    const coordinate =
      String.fromCharCode("a".charCodeAt(0) + (indexPath.colIndex ?? 0)) +
      (8 - (indexPath.rowIndex ?? 0));
    return coordinate;
  };

  return (
    <View style={styles.mainContainer}>
      {board && isActivePlayer ? (
        <Text>Your Turn</Text>
      ) : (
        board && <Text>Opponent's Turn</Text>
      )}

      {board ? (
        <ChessBoard board={board} color={color} onPress={onPeicePress} />
      ) : (
        <Text>Connecting....</Text>
      )}
      {winner != Chess.Color.NONE ? (
        <Result winner={winner} color={color} />
      ) : null}
    </View>
  );
};
