"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var utils_1 = require("../utils");
var BoardPiece;
(function (BoardPiece) {
    BoardPiece[BoardPiece["EMPTY"] = 0] = "EMPTY";
    BoardPiece[BoardPiece["PLAYER_1"] = 1] = "PLAYER_1";
    BoardPiece[BoardPiece["PLAYER_2"] = 2] = "PLAYER_2";
    BoardPiece[BoardPiece["DRAW"] = 3] = "DRAW";
})(BoardPiece = exports.BoardPiece || (exports.BoardPiece = {}));
var BoardBase = /** @class */ (function () {
    function BoardBase(canvasContext) {
        this.context = canvasContext;
        this.map = [];
        this.winnerBoardPiece = BoardPiece.EMPTY;
        this.getBoardScale();
        this.initConstants();
        this.reset();
    }
    BoardBase.prototype.reset = function () {
        this.map = [];
        for (var i = 0; i < BoardBase.ROWS; i++) {
            this.map.push([]);
            for (var j = 0; j < BoardBase.COLUMNS; j++) {
                this.map[i].push(BoardPiece.EMPTY);
            }
        }
        this.winnerBoardPiece = BoardPiece.EMPTY;
    };
    BoardBase.prototype.getBoardScale = function () {
        return window.innerWidth < 640
            ? (BoardBase.SCALE = 0.5)
            : (BoardBase.SCALE = 1.0);
    };
    BoardBase.prototype.initConstants = function () {
        BoardBase.CANVAS_HEIGHT = BoardBase.SCALE * 480;
        BoardBase.CANVAS_WIDTH = BoardBase.SCALE * 640;
        BoardBase.PIECE_RADIUS = BoardBase.SCALE * 25;
        BoardBase.MASK_X_BEGIN =
            Math.max(0, BoardBase.CANVAS_WIDTH -
                (3 * BoardBase.COLUMNS + 1) * BoardBase.PIECE_RADIUS) / 2;
        BoardBase.MASK_Y_BEGIN =
            Math.max(0, BoardBase.CANVAS_HEIGHT -
                (3 * BoardBase.ROWS + 1) * BoardBase.PIECE_RADIUS) / 2;
        BoardBase.MESSAGE_WIDTH = BoardBase.SCALE * 400;
        BoardBase.MESSAGE_X_BEGIN =
            (BoardBase.CANVAS_WIDTH - BoardBase.MESSAGE_WIDTH) / 2;
        BoardBase.MESSAGE_Y_BEGIN = BoardBase.SCALE * 20;
    };
    /**
     * @returns is the action succesfully applied
     * @param player current player
     * @param column the colum in which the player want to drop a piece
     */
    BoardBase.prototype.applyPlayerAction = function (player, column) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, actionSuccessful, nextState;
            return __generator(this, function (_b) {
                _a = utils_1.Utils.getMockPlayerAction(this.map, player.boardPiece, column), actionSuccessful = _a.success, nextState = _a.map;
                this.map = nextState;
                this.debug();
                return [2 /*return*/, actionSuccessful];
            });
        });
    };
    BoardBase.prototype.debug = function () {
        console.log(this.map.map(function (row) { return row.join(' '); }).join('\n'));
    };
    BoardBase.prototype.getWinner = function () {
        var _this = this;
        if (this.winnerBoardPiece !== BoardPiece.EMPTY) {
            return this.winnerBoardPiece;
        }
        var direction = [
            [0, -1],
            [0, 1],
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [1, -1],
            [1, 0],
            [1, 1]
        ];
        var isWinningSequence = function (i, j, playerPiece, dir, count) {
            if (count >= 4) {
                return true;
            }
            if (i < 0 ||
                j < 0 ||
                i >= BoardBase.ROWS ||
                j >= BoardBase.COLUMNS ||
                _this.map[i][j] !== playerPiece) {
                return false;
            }
            return isWinningSequence(i + dir[0], j + dir[1], playerPiece, dir, count + 1);
        };
        var countEmpty = 0;
        for (var i = 0; i < BoardBase.ROWS; i++) {
            for (var j = 0; j < BoardBase.COLUMNS; j++) {
                var playerPiece = this.map[i][j];
                if (playerPiece !== BoardPiece.EMPTY) {
                    for (var k = 0; k < direction.length; k++) {
                        var isWon = isWinningSequence(i + direction[k][0], j + direction[k][1], playerPiece, direction[k], 1);
                        if (isWon) {
                            return (this.winnerBoardPiece = playerPiece);
                        }
                    }
                }
                else {
                    countEmpty++;
                }
            }
        }
        if (countEmpty === 0) {
            return (this.winnerBoardPiece = BoardPiece.DRAW);
        }
        return BoardPiece.EMPTY;
    };
    BoardBase.prototype.announceWinner = function () {
        if (this.winnerBoardPiece === BoardPiece.EMPTY) {
            return;
        }
        var message = '<h1>Thank you for playing.</h1>';
        if (this.winnerBoardPiece === BoardPiece.DRAW) {
            message += "It's a draw";
        }
        else {
            message += "Player " + this.winnerBoardPiece + " wins";
        }
        message +=
            '.<br />After dismissing this message, click the board to reset game.';
        utils_1.Utils.showMessage(message);
    };
    BoardBase.prototype.getPlayerColor = function (boardPiece) {
        switch (boardPiece) {
            case BoardPiece.PLAYER_1:
                return BoardBase.PLAYER_1_COLOR;
            case BoardPiece.PLAYER_2:
                return BoardBase.PLAYER_2_COLOR;
            default:
                return 'transparent';
        }
    };
    BoardBase.ROWS = 6;
    BoardBase.COLUMNS = 7;
    BoardBase.PLAYER_1_COLOR = '#ef453b';
    BoardBase.PLAYER_2_COLOR = '#0059ff';
    BoardBase.PIECE_STROKE_STYLE = 'black';
    BoardBase.MASK_COLOR = '#d8d8d8';
    return BoardBase;
}());
exports.BoardBase = BoardBase;
