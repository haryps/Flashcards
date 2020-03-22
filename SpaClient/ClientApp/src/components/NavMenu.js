import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { LoginMenu } from './authorization/LoginMenu';
export default class NavMenu extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            isOpen: false
        };
        this.toggle = () => {
            this.setState({
                isOpen: !this.state.isOpen
            });
        };
    }
    render() {
        return (React.createElement("header", { style: { color: "#2c3e50", backgroundColor: "#2c3e50" } },
            React.createElement(Navbar, { className: "navbar-expand-sm navbar-toggleable-sm", light: true },
                React.createElement(Container, null,
                    React.createElement(NavbarBrand, { tag: Link, to: "/" },
                        React.createElement("a", { style: { color: "#fff" } }, "Flashcards")),
                    React.createElement(NavbarToggler, { onClick: this.toggle, className: "mr-2" }),
                    React.createElement(Collapse, { className: "d-sm-inline-flex flex-sm-row-reverse", isOpen: this.state.isOpen, navbar: true },
                        React.createElement("ul", { className: "navbar-nav flex-grow" },
                            React.createElement(LoginMenu, null)))))));
    }
    handleClick(event) {
    }
}
//# sourceMappingURL=NavMenu.js.map