import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Drawer, Switch, Avatar, Dropdown } from "antd";
import {
  MenuOutlined,
  PhoneOutlined,
  BulbOutlined,
  BulbFilled,
  UserOutlined,
  IdcardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useShade } from "../theme/ThemeContext";
import { openAuthModal, logout } from "../store/authSlice";
import logo from "../assets/green-logo.svg";
import "./Navbar.css";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/doctors", label: "Doctors" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const scrolled = useScrollPosition(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { shade, toggleShade } = useShade();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const navItemClass = ({ isActive }) =>
    `navbar__link${isActive ? " navbar__link--active" : ""}`;

  const profileMenuItems = [
    { key: "profile", icon: <IdcardOutlined />, label: "My Profile" },
    { key: "logout", icon: <LogoutOutlined />, label: "Log Out", danger: true },
  ];

  const handleProfileMenuClick = ({ key }) => {
    if (key === "profile") navigate("/profile");
    if (key === "logout") dispatch(logout());
  };

  return (
    <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <img src={logo} alt="SmileCare logo" className="navbar__logo" />
          {/* SmileCare */}
        </Link>

        <nav className="navbar__links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={navItemClass}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <Switch
            checked={shade === "dark"}
            onChange={toggleShade}
            checkedChildren={<BulbFilled />}
            unCheckedChildren={<BulbOutlined />}
            aria-label="Toggle dark mode"
          />
          <a href="tel:+922135551234" className="navbar__phone">
            <PhoneOutlined /> (021) 3555-1234
          </a>
          <Button type="primary" onClick={() => navigate("/book-appointment")}>
            Book an Appointment
          </Button>

          {user ? (
            <Dropdown
              menu={{ items: profileMenuItems, onClick: handleProfileMenuClick }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Avatar
                className="navbar__avatar"
                icon={<UserOutlined />}
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          ) : (
            <Button
              shape="circle"
              icon={<UserOutlined />}
              aria-label="Log in or sign up"
              onClick={() => dispatch(openAuthModal("login"))}
            />
          )}

          <Button
            className="navbar__menu-btn"
            icon={<MenuOutlined />}
            onClick={() => setDrawerOpen(true)}
          />
        </div>
      </div>

      <Drawer
        title="SmileCare"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <div className="navbar__drawer-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={navItemClass}
              onClick={() => setDrawerOpen(false)}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
          <Button
            type="primary"
            block
            onClick={() => {
              setDrawerOpen(false);
              navigate("/book-appointment");
            }}
          >
            Book an Appointment
          </Button>

          {user ? (
            <>
              <Button
                block
                icon={<IdcardOutlined />}
                onClick={() => {
                  setDrawerOpen(false);
                  navigate("/profile");
                }}
              >
                My Profile
              </Button>
              <Button
                block
                danger
                icon={<LogoutOutlined />}
                onClick={() => {
                  setDrawerOpen(false);
                  dispatch(logout());
                }}
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button
              block
              icon={<UserOutlined />}
              onClick={() => {
                setDrawerOpen(false);
                dispatch(openAuthModal("login"));
              }}
            >
              Log In / Sign Up
            </Button>
          )}
        </div>
      </Drawer>
    </header>
  );
}
