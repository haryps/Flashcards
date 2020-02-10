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
var react_router_dom_1 = require("react-router-dom");
var GridDeck = /** @class */ (function (_super) {
    __extends(GridDeck, _super);
    function GridDeck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridDeck.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "col-md-4" },
                React.createElement("div", { className: "card mb-4 box-shadow" },
                    React.createElement("svg", { height: "225px", width: "100%" },
                        React.createElement("rect", { fill: "#55595c", x: "0", y: "0", height: "225px", width: "100%" }),
                        React.createElement("text", { x: "50%", y: "50%", fontWeight: "bold", fill: "white", fontSize: "20px", textAnchor: "middle", dominantBaseline: "middle" }, "Thumbnail")),
                    React.createElement("div", { className: "card-body" },
                        React.createElement("p", { className: "card-text" }, "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."),
                        React.createElement("div", { className: "d-flex justify-content-between align-items-center" },
                            React.createElement("div", { className: "btn-group" },
                                React.createElement(react_router_dom_1.Link, { to: "/deck/" + this.props.index, className: "btn btn-sm btn-outline-secondary" },
                                    "Practice this deck ",
                                    this.props.index,
                                    " \u2192"))))))));
    };
    return GridDeck;
}(React.PureComponent));
exports.GridDeck = GridDeck;
;
//# sourceMappingURL=GridDeck.js.map