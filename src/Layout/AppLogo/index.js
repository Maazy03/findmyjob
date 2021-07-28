import React, { Fragment } from "react";
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import Hamburger from "react-hamburgers";
import AppMobileMenu from "../AppMobileMenu";
import { setEnableClosedSidebar } from "../../store/reducers/ThemeOptions";
import { Link, NavLink } from 'react-router-dom'
import AfricanArt from '../../assets/img/African_Art.png'
import styles from './AppLogo.module.css';

class HeaderLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      mobile: false,
      activeSecondaryMenuMobile: false
    };

  }

  toggleEnableClosedSidebar = () => {
    let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
    setEnableClosedSidebar(!enableClosedSidebar);
  };

  state = {
    openLeft: false,
    openRight: false,
    relativeWidth: false,
    width: 280,
    noTouchOpen: false,
    noTouchClose: false
  };

  render() {
    let { enableClosedSidebar } = this.props;

    return (
      <Fragment>
        <div className="app-header__logo">
          
          <div className="header__pane ml-auto">
            <div onClick={this.toggleEnableClosedSidebar}>
              <Hamburger
                active={enableClosedSidebar}
                type="elastic"
                onClick={() => this.setState({ active: !this.state.active })}
              />
            </div>
          </div>
          {!enableClosedSidebar && (
            <div
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <div>
                <NavLink
                  className={styles.Nav_link}
                  // activeStyle={{ color: 'red' }}
                  style={{color:"black"}}
                   to=""
                >
                  JOBSMIDEAST.com
                </NavLink>
              </div>
            </div>
          )}
        </div>
        <AppMobileMenu />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar
});

const mapDispatchToProps = dispatch => ({
  setEnableClosedSidebar: enable => dispatch(setEnableClosedSidebar(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogo);
