import * as React from 'react';
import { Link } from 'react-router-dom';
export class GridDeck extends React.PureComponent {
    render() {
        let percentage = (this.props.currentValue / this.props.maxValue) * 100;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "col-md-4" },
                React.createElement("div", { className: "card mb-4 box-shadow" },
                    React.createElement("svg", { height: "100%", width: "100%" },
                        React.createElement("rect", { fill: "#563d7c", strokeWidth: "0", stroke: "#563d7c", x: "0", y: "0", height: "100%", width: "100%", style: {} }),
                        React.createElement("text", { x: "50%", y: "50%", fontWeight: "bold", fill: "white", fontSize: "20px", textAnchor: "middle", dominantBaseline: "middle" },
                            "Deck ",
                            this.props.deckId)),
                    React.createElement("div", { className: "card-body" },
                        React.createElement("p", { style: { color: "#2c3e50", marginBottom: "5px" } },
                            this.props.currentValue,
                            " of ",
                            this.props.maxValue,
                            " words mastered"),
                        React.createElement("div", { className: "progress", style: { marginTop: "5px", marginBottom: "10px" } },
                            React.createElement("div", { className: "progress-bar bg-success", role: "progressbar", style: { width: `${percentage}%` }, "aria-valuenow": percentage, "aria-valuemin": 0, "aria-valuemax": 100 })),
                        React.createElement("div", { className: "d-flex justify-content-between align-items-center" },
                            React.createElement("div", { className: "btn-group" },
                                React.createElement(Link, { to: {
                                        pathname: `/deck/${this.props.deckId}`,
                                        state: this.props.cards
                                    }, className: "btn btn-sm btn-primary" }, "Practice this deck \u2192"))))))));
    }
}
;
//# sourceMappingURL=GridDeck.js.map