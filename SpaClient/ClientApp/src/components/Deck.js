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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var DeckStore = require("../store/Deck");
var Deck = /** @class */ (function (_super) {
    __extends(Deck, _super);
    function Deck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Deck.prototype.componentDidMount = function () {
        this.props.requestDeck(parseInt(this.props.match.params.id, 10));
    };
    Deck.prototype.componentDidUpdate = function () {
        this.props.requestDeck(parseInt(this.props.match.params.id, 10));
    };
    Deck.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "card text-center" },
                React.createElement("div", { className: "card-header" }, "Featured"),
                React.createElement("div", { className: "card-body" },
                    React.createElement("h5", { className: "card-title" }, "Special title treatment"),
                    React.createElement("p", { className: "card-text" }, "With supporting text below as a natural lead-in to additional content."),
                    React.createElement("a", { href: "#", className: "btn btn-primary" }, "Click to see the meaning")),
                React.createElement("div", { className: "card-footer text-muted" }, "2 days ago")),
            React.createElement("div", { className: "card text-center" },
                React.createElement("div", { className: "card-header" }, "Featured"),
                React.createElement("div", { className: "card-body" },
                    React.createElement("h5", { className: "card-title" }, "Special title treatment"),
                    React.createElement("p", { className: "card-text" }, "With supporting text below as a natural lead-in to additional content."),
                    React.createElement("a", { href: "#", className: "btn btn-primary" }, "Click to see the meaning")),
                React.createElement("div", { className: "card-footer text-muted" }, "2 days ago"))));
    };
    return Deck;
}(React.PureComponent));
;
var mapStateToProps = function (state) {
    //deck: state.deck
};
exports.default = react_redux_1.connect(mapStateToProps, 
//(state: ApplicationState) => state.deck,
DeckStore.actionCreators)(Deck);
//# sourceMappingURL=Deck.js.map