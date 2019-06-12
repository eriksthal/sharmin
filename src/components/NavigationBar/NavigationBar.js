import React from "react";
import Image from "react-image-webp";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "@reach/router";

import "./NavigationBar.css";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false, children: null };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div className="navbar-bar">
        <div className="navbar-anchor">
          <div className="navbar-hamburger">
            <MenuIcon onClick={this.toggleMenu} />
          </div>

          <div className="navbar-logo">
            <Link to="/registration">
              <Image
                class
                src={require(`../../img/${this.props.logo}.png`)}
                webp={require(`../../img/${this.props.logo}.webp`)}
              />
            </Link>
          </div>
        </div>
        <div className={this.state.open ? "navbar-menu" : "navbar-menu hidden"}>
          {this.props.children.map(child => {
            return (
              <div
                onClick={this.toggleMenu}
                key={child.props.id}
                className="navbar-menu-link"
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default NavigationBar;
