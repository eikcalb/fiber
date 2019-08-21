import React from "react";
import Toolbar from "../components/toolbar";
import { createDebouncer, AppContext } from "../App";
import { FaSearch } from "react-icons/fa";

export function Search() {
    return (
        <div>
            <Toolbar />
            <div className="section">
                <div className='hero is-fullheight is-bold'>
                    <div className='hero-head'>

                    </div>
                    <div className='hero-body'>
                        <div className='container'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 *  triggerSearch is a debouncer for delaying search triggers within the application. 
 *  This way, searches will happen after a certain period from last input event.
 */
const triggerSearch = createDebouncer((val) => {
    triggerSearch(val)
}, 500)


export function SearchBox({ callback }) {

    return (
        <AppContext.Consumer>{context =>
            <div className='field has-addons is-centered'>
                <div className="control has-icons-left has-icons-right">
                    <input sclassName="input is-rounded" type="text" onChange={ev => { triggerSearch(ev.target.value.trim()).then(res => callback(res)) }} placeholder="Search for Github user..." />
                    <FaSearch className='icon is-left' />
                </div>
                <div className="control">
                    <button className="input button is-success" type="text" onChange={ev => triggerSearch(ev.target.value)} >Search</button>
                </div>
            </div>
        }
        </AppContext.Consumer>
    )
}