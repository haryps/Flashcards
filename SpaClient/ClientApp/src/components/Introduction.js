import * as React from 'react';
import { connect } from 'react-redux';
class Introduction extends React.PureComponent {
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("section", { className: "jumbotron text-center", style: { color: "#1abc9c", backgroundColor: "#1abc9c" } },
                React.createElement("div", { className: "container" },
                    React.createElement("h1", { className: "jumbotron-heading", style: { color: "#fff", fontWeight: 500 } }, "GRE Vocabulary Flashcards")))));
    }
}
;
export default connect()(Introduction);
//# sourceMappingURL=Introduction.js.map