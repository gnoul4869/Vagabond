import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';

const NavBarUserSubmenu = ({ isSubmenuShown, setIsSubmenuShown }) => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        setIsSubmenuShown(false);
    };

    return (
        <aside className={`navbar-user-submenu ${isSubmenuShown && 'show'}`}>
            <div className="container">
                <div className="row submenu-item">
                    <Link to="#">Tài khoản của tôi</Link>
                </div>
                <div className="row submenu-item">
                    <Link to="#">Đơn mua</Link>
                </div>
                <div className="row submenu-item">
                    <Link to="#logout" onClick={logoutHandler}>
                        Đăng xuất
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default NavBarUserSubmenu;
