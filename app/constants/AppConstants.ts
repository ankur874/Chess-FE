export const INIT_GAME = "init_game";
export const MOVE = "move";
export const REVERT_MOVE = "revert_move";
export const GAME_OVER = "game_over";
export const LEAVE_GAME = "leave_over";

export const KING = "king";
export const QUEEN = "queen";
export const KNIGHT = "knight";
export const BISHOP = "bishop";
export const PAWN = "pawn";
export const ROOK = "rook";

export const WHITE = "white";
export const BLACK = "black";

export const PRIMARY_COLOR = "white";
export const SECONDARY_COLOR = "gray";
export const DARK_COLOR = "black";

export const RANDOM_COLORS_ARRAY: string[] = [
  "#010009",
  "#2e231c",
  "#010b07",
  "#2a1421",
  "#2d0b2a",
  "#274402",
  "#3f0120",
  "#170d17",
  "#392e50",
  "#434a40",
];

export const getRandomColor = () => {
  return RANDOM_COLORS_ARRAY[
    Math.floor(Math.random() * RANDOM_COLORS_ARRAY.length)
  ];
};

export const LANDING_PAGE_IMAGE =
  "https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg";

export const WebSocketUrl = "ws://localhost:8080";
