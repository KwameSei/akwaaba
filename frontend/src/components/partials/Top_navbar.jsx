import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Top-nav.css'
import { logOut } from "../../store/authActions";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaCartArrowDown } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { BsFillBrightnessLowFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

// Material UI Imports
import { Box, IconButton, useTheme, InputBase } from "@mui/material";
import { ColorModeContext, tokens } from "./theme";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchIcon from "@mui/icons-material/Search";

export const NavBar = () => {
  const {cartTotalQuantity} = useSelector(state => state.cart);
  const state = useSelector(state => state);
  console.log(state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleLogout = () => {
    dispatch(logOut())
    navigate("/");
  };

    return (
      <nav className="nav-bar">
        <Link to='/' className="link">
          <div className="brand">
            <img src="./akwaaba-low-white.png" width='40px' height='40px' alt="logo" />
          </div>
        </Link>
        <Link to='/' className="link">
          <div className="nav"><FaHome className="icon" />Home</div>
        </Link>
        <Link to='/sign-up' className="link">
          <div className="nav"><SiGnuprivacyguard className="icon" />Sign Up</div>
        </Link>
        <Link to='/sign-in' className="link">
          <div className="nav"><FaSignInAlt className="icon" />Sign In</div>
        </Link>
        <Link to='/cart' className="link">
          <div className="nav"><FaCartArrowDown className="icon" />
            <span className="cart-quantity">{cartTotalQuantity}</span>
          </div>
        </Link>
        <div className="right-icons">
          <div className="nav" onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <FaMoon className="icon" />
            ) : (
              <BsFillBrightnessLowFill className="icon white-icon" />
            )}
          </div>
          <div className="nav"><FaBell className="icon white-icon" /></div>
          <Link to='/' className="link">
            <div className="nav"><FaCog className="icon" /></div>
          </Link>
          <div className="nav"><BsPersonCircle className="icon white-icon" /></div>
          <div className="nav logout" onClick={() => handleLogout()}><FaSignOutAlt className="icon" />Log Out</div>
        </div>
      </nav>
      // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      //     <span className="navbar-toggler-icon"></span>
      //   </button>

      //   <div className="collapse navbar-collapse" id="navbarSupportedContent">
      //     <ul className="navbar-nav mr-auto">
      //     <Link className="navbar-brand active" to='/'>
      //       {/* <img src="./public/akwaaba-logo.png" width="30" height="30" alt="" /> */}
      //       <h4>akwaaba</h4>
      //     </Link>
      //       <li className="nav-item active">
      //         <Link className="nav-link" to='/'>Home <span className="sr-only">(current)</span></Link>
      //       </li>
      //       <li className="nav-item">
      //         <Link className="nav-link active" to='/sign-up'>Register</Link>
      //       </li>
      //       <li className="nav-item">
      //         <Link className="nav-link active" to='/sign-in'>Sign In</Link>
      //       </li>
      //       <li className="nav-item">
      //         <Link className="nav-link active" to='create-event-page'>Create Event</Link>
      //       </li>
      //       <li className="nav-item dropdown">
      //         <Link className="nav-link dropdown-toggle"  role="button" data-toggle="dropdown" aria-expanded="false">
      //           Dropdown
      //         </Link>
      //         <div className="dropdown-menu">
      //           <Link className="dropdown-item" >Action</Link>
      //           <Link className="dropdown-item" >Another action</Link>
      //           <div className="dropdown-divider"></div>
      //           <Link className="dropdown-item" >Something else here</Link>
      //         </div>
      //       </li>
      //       <li className="nav-item">
      //         <Link className="nav-link">Log Out</Link>
      //       </li>
      //     </ul>
      //   </div>
      // </nav>
    )
}

// export default NavBar