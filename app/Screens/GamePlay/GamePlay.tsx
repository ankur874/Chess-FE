import { View } from "react-native";
import { useSocket } from "../../Hooks/useSocket";
import { useEffect, useRef, useState } from "react";
import { ChessManager } from "../../ChessManager/ChessManager";
import { ChessBoard } from "../../Components/ChessBoard/ChessBoard";
import { Chess } from "../../ChessManager/ChessModel";
import { GAME_OVER, INIT_GAME, MOVE } from "../../constants/AppConstants";
import { IndexPath } from "./GamePlayInterface";
import { getGamePlayStyles } from "./GamePlayStyles";
import { Loader } from "@/app/Components/Loader/loader";
import { ProfileCard } from "@/app/Components/ProfileCard/profileCard";
import { PlayBoardSound, stopSound } from "@/app/AudioManager/AudioManager";
import { useTime } from "@/app/Context/timeContext";

export const GamePlay = (props: any) => {
  const socket = useSocket({ name: props.route.params.name ?? "" });
  const chessManager = useRef<ChessManager>(new ChessManager());
  const [board, setBoard] = useState<string[][]>();
  const [color, setColor] = useState<Chess.Color>(Chess.Color.NONE);
  const [isActivePlayer, setActivePlayer] = useState(false);
  const [pendingIndexPath, setPendingIndexPath] = useState<IndexPath>({});
  const [winner, setWinner] = useState<Chess.Color>(Chess.Color.NONE);
  const [myName, setMyName] = useState<string>(props.route.params.name ?? "");
  const [opponentName, setOpponentName] = useState<string>("");
  const { myTime, opponentTime, stopTime, startTime, resetTime } = useTime();

  const styles = getGamePlayStyles();

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (data) => {
      const message = JSON.parse(data.data);
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

  useEffect(() => {
    return () => {
      stopSound();
      resetTime();
    };
  }, []);

  useEffect(() => {
    if (myTime <= 0 || opponentTime <= 0) {
      const message = {
        payload: {
          color: color,
          winner:
            myTime <= 0
              ? color === "black"
                ? "white"
                : "black"
              : color === "black"
              ? "black"
              : "white",
        },
      };
      makeGameOver(message);
    }
  }, [myTime, opponentTime]);

  const initilizeGame = (message: any) => {
    setBoard(chessManager.current.getBoard());
    setOpponentName(message.payload.opponentName);
    setActivePlayer(message.payload.color === Chess.Color.W);
    setColor(message.payload.color);
    if (message.payload.color === Chess.Color.W) {
      startTime(true);
    } else {
      startTime(false);
    }
  };

  const makeMove = (message: any) => {
    setPendingIndexPath({});
    setActivePlayer(true);
    chessManager.current.updateBoardOnValidation(message.payload);
    setBoard(chessManager.current.getBoard());
    PlayBoardSound();
    stopTime(false);
    startTime(true);
  };

  const makeGameOver = (message: any) => {
    setActivePlayer(false);
    if (message?.payload?.move) {
      chessManager.current.updateBoardOnValidation(message.payload.move);
      setBoard(chessManager.current.getBoard());
    }
    setWinner(message.payload.winner);
    stopSound();
    resetTime();
    setColor(message.payload.color);
    props?.navigation.navigate("GameOver", {
      isWinner: message.payload.winner === message.payload.color,
      message: message.payload.message ?? undefined,
    });
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
    const isMoveValid = chessManager.current.move(
      color === Chess.Color.W,
      moveToBePerformed
    );
    if (isMoveValid) {
      setActivePlayer(false);
      setBoard(chessManager.current.getBoard());
      setPendingIndexPath({});
      sendDataToServer(moveToBePerformed);
      PlayBoardSound();
      stopTime(true);
      startTime(false);
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
      {board && (
        <ProfileCard
          isActivePlayer={!isActivePlayer}
          name={opponentName}
          isOpponentProfile={true}
          timerInSeconds={opponentTime}
        />
      )}
      {board ? (
        <ChessBoard
          board={board}
          color={color}
          onPress={onPeicePress}
          isActivePlayer={isActivePlayer}
        />
      ) : (
        <Loader message="Finding another Player..." loading={!board} />
      )}
      {board && (
        <ProfileCard
          isActivePlayer={isActivePlayer}
          name={myName}
          isOpponentProfile={false}
          timerInSeconds={myTime}
        />
      )}
    </View>
  );
};
