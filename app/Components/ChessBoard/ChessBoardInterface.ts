import { Chess } from "@/app/ChessManager/ChessModel";

export interface ChessBoardProps {
  board: string[][];
  color: Chess.Color;
  onPress?: (rowIndex: number, colIndex: number) => void;
  isActivePlayer: boolean;
}
