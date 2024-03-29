import React from "react";
import { FaExclamationTriangle, FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Toolbar from "../components/toolbar";

export function ErrorPage() {
    return (
        <div>
            <Toolbar />
            <div className="">
                <div className='hero is-fullheight'>
                    <div className='hero-body'>
                        <div className='container has-text-left'>
                            <p className='title is-uppercase'><FaGithub /> Not Found!</p>
                            <span className='subtitle'>Welcome to Fibre search!</span>
                            <br />
                            <NavLink to='/' className='button is-danger is-outlined'>Go to Homepage!</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}