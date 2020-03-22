import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { LoginMenu } from './authorization/LoginMenu';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header style={{ color: "#2c3e50", backgroundColor: "#2c3e50" }}>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">
                            <a style={{ color: "#fff" }}>Flashcards</a>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <LoginMenu>
                                </LoginMenu>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private handleClick(event: MouseEvent) {

    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
