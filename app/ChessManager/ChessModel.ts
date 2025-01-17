import { BISHOP, BLACK, KING, KNIGHT, PAWN, QUEEN, ROOK, WHITE } from "../constants/AppConstants";

export enum Files {
    h = 7,
    g = 6,
    f = 5,
    e = 4,
    d = 3,
    c = 2,
    b = 1,
    a = 0
}

export namespace Chess {

    export enum Peice {
        K = "king",
        Q = "queen",
        N = "knight",
        R = "rook",
        B = "bishop",
        P = "pawn",
        NONE = "none",
    }

    export enum Color {
        W = "white",
        B = "black",
        NONE = "none",
    }

}


export interface PeiceDetails {
    color: Chess.Color,
    peice: Chess.Peice
}

export interface IndexPath {
    row: number;
    column: number;
}
