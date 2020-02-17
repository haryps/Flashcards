import * as React from 'react';
import { Link } from 'react-router-dom';
export class GridDeck extends React.PureComponent {
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "col-md-4" },
                React.createElement("div", { className: "card mb-4 box-shadow" },
                    React.createElement("svg", { height: "225px", width: "100%" },
                        React.createElement("rect", { fill: "#55595c", x: "0", y: "0", height: "225px", width: "100%" }),
                        React.createElement("text", { x: "50%", y: "50%", fontWeight: "bold", fill: "white", fontSize: "20px", textAnchor: "middle", dominantBaseline: "middle" },
                            "Deck ",
                            this.props.index)),
                    React.createElement("div", { className: "card-body" },
                        React.createElement("p", { className: "card-text" }, "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."),
                        React.createElement("div", { className: "d-flex justify-content-between align-items-center" },
                            React.createElement("div", { className: "btn-group" },
                                React.createElement(Link, { to: `/deck/${this.props.index}`, className: "btn btn-sm btn-outline-secondary" },
                                    "Practice this deck ",
                                    this.props.index,
                                    " \u2192"))))))));
    }
}
;
//# sourceMappingURL=GridDeck.js.map