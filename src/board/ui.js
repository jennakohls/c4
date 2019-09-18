"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var base_1 = require("./base");
var utils_1 = require("../utils");
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board(canvas) {
        var _this = _super.call(this, canvas.getContext('2d')) || this;
        _this.canvas = canvas;
        _this.getBoardScale();
        _this.initConstants();
        _this.reset();
        _this.onresize();
        return _this;
    }
    Board.prototype.onresize = function () {
        var _this = this;
        var prevBoardScale = base_1.BoardBase.SCALE;
        utils_1.Utils.onresize().add(function () {
            _this.getBoardScale();
            if (prevBoardScale !== base_1.BoardBase.SCALE) {
                prevBoardScale = base_1.BoardBase.SCALE;
                _this.initConstants();
                utils_1.Utils.clearCanvas(_this);
                _this.render();
            }
        });
    };
    Board.prototype.reset = function () {
        _super.prototype.reset.call(this);
        if (this.canvas) {
            utils_1.Utils.clearCanvas(this);
            this.render();
        }
    };
    Board.prototype.initConstants = function () {
        _super.prototype.initConstants.call(this);
        if (this.canvas) {
            /**
             * Scale the canvas to make it look sharper on hi-dpi devices
             * https://www.html5rocks.com/en/tutorials/canvas/hidpi/
             */
            var dpr = self.devicePixelRatio || 1;
            this.canvas.width = Board.CANVAS_WIDTH * dpr;
            this.canvas.height = Board.CANVAS_HEIGHT * dpr;
            this.context.scale(dpr, dpr);
            this.canvas.style.width = Board.CANVAS_WIDTH + 'px';
            this.canvas.style.height = Board.CANVAS_HEIGHT + 'px';
        }
    };
    Board.prototype.animateAction = function (newRow, column, boardPiece) {
        return __awaiter(this, void 0, void 0, function () {
            var fillStyle, currentY, doAnimation;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fillStyle = this.getPlayerColor(boardPiece);
                        currentY = 0;
                        doAnimation = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                utils_1.Utils.clearCanvas(this);
                                utils_1.Utils.drawCircle(this.context, {
                                    x: 3 * base_1.BoardBase.PIECE_RADIUS * column +
                                        base_1.BoardBase.MASK_X_BEGIN +
                                        2 * base_1.BoardBase.PIECE_RADIUS,
                                    y: currentY + base_1.BoardBase.MASK_Y_BEGIN + 2 * base_1.BoardBase.PIECE_RADIUS,
                                    r: base_1.BoardBase.PIECE_RADIUS,
                                    fillStyle: fillStyle,
                                    strokeStyle: base_1.BoardBase.PIECE_STROKE_STYLE
                                });
                                this.render();
                                currentY += base_1.BoardBase.PIECE_RADIUS;
                                return [2 /*return*/];
                            });
                        }); };
                        _a.label = 1;
                    case 1:
                        if (!(newRow * 3 * base_1.BoardBase.PIECE_RADIUS >= currentY)) return [3 /*break*/, 3];
                        return [4 /*yield*/, utils_1.Utils.animationFrame()];
                    case 2:
                        _a.sent();
                        doAnimation();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Board.prototype.render = function () {
        utils_1.Utils.drawMask(this);
        for (var y = 0; y < base_1.BoardBase.ROWS; y++) {
            for (var x = 0; x < base_1.BoardBase.COLUMNS; x++) {
                utils_1.Utils.drawCircle(this.context, {
                    x: 3 * base_1.BoardBase.PIECE_RADIUS * x +
                        base_1.BoardBase.MASK_X_BEGIN +
                        2 * base_1.BoardBase.PIECE_RADIUS,
                    y: 3 * base_1.BoardBase.PIECE_RADIUS * y +
                        base_1.BoardBase.MASK_Y_BEGIN +
                        2 * base_1.BoardBase.PIECE_RADIUS,
                    r: base_1.BoardBase.PIECE_RADIUS,
                    fillStyle: this.getPlayerColor(this.map[y][x]),
                    strokeStyle: base_1.BoardBase.PIECE_STROKE_STYLE
                });
            }
        }
    };
    Board.prototype.applyPlayerAction = function (player, column) {
        return __awaiter(this, void 0, void 0, function () {
            var isColumnEverFilled, row, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.map[0][column] !== base_1.BoardPiece.EMPTY ||
                            column < 0 ||
                            column >= base_1.BoardBase.COLUMNS) {
                            return [2 /*return*/, false];
                        }
                        isColumnEverFilled = false;
                        row = 0;
                        for (i = 0; i < base_1.BoardBase.ROWS - 1; i++) {
                            if (this.map[i + 1][column] !== base_1.BoardPiece.EMPTY) {
                                isColumnEverFilled = true;
                                row = i;
                                break;
                            }
                        }
                        if (!isColumnEverFilled) {
                            row = base_1.BoardBase.ROWS - 1;
                        }
                        return [4 /*yield*/, this.animateAction(row, column, player.boardPiece)
                            // reflect player's action to the map
                        ];
                    case 1:
                        _a.sent();
                        // reflect player's action to the map
                        this.map[row][column] = player.boardPiece;
                        this.debug();
                        return [4 /*yield*/, utils_1.Utils.animationFrame()];
                    case 2:
                        _a.sent();
                        this.render();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return Board;
}(base_1.BoardBase));
exports.Board = Board;
