import React from 'react';
import { FaHome } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { SearchBox } from '../pages/Search';

export default function Toolbar({ triggerSearch, triggerSort }) {
    let [isActive, updateActie] = React.useState(false)
    return (
        <nav className={`navbar has-shadow is-centered is-fixed-top`}>
            <div className="navbar-brand">
                <span className="navbar-item has-text-weight-bold">fibre</span>
                <SearchBox />
                <span onClick={() => updateActie(!isActive)} className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>
            <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                <div className="navbar-end">
                    <NavLink activeClassName='is-active' exact to='/' className='navbar-item'>
                        <FaHome />&emsp;Home
                </NavLink>
                </div>
            </div>
        </nav>
    )
}