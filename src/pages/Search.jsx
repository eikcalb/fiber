import React from "react";
import Toolbar from "../components/toolbar";
import { createDebouncer, AppContext } from "../App";
import { FaSearch, FaExternalLinkSquareAlt } from "react-icons/fa";
import { FiMeh } from "react-icons/fi";
import { NavLink } from 'react-router-dom';


export function Search({ data, totalCount, triggerSearch }) {
    let numPages = 1
    if (totalCount > 100) {
        numPages = Number.parseInt((totalCount / 100).toFixed(0), 10)
    }

    return (
        <div>
            <Toolbar triggerSearch={triggerSearch} />
            <div className="section">
                <div className='hero is-fullheight is-bold'>
                    <div className='hero-head'>

                    </div>
                    <div className='hero-body'>
                        <div className='container'>
                            {data.length > 0 ?
                                data.map(user => {
                                    return (
                                        <div key={user.id} className="card">
                                            <div className="card-content">
                                                <div className="media">
                                                    <div className="media-left">
                                                        <NavLink to={`users/${user.login}`}>
                                                            <figure className="image is-32x32">
                                                                <img className='is-rounded' src={user.avatar_url} alt={user.login || 'John Doe'} />
                                                            </figure>
                                                        </NavLink>
                                                    </div>
                                                    <div className="media-content">
                                                        <NavLink to={`users/${user.login}`}>
                                                            <p className="title is-3">{user.login}</p>
                                                        </NavLink>
                                                    </div>
                                                    <div className="media-right">
                                                        <a title='View on Github' target='_blank' href={user.html_url}><FaExternalLinkSquareAlt /></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) :
                                <div className="notification has-text-centered">
                                    <h1 className='title is-size-1 has-text-danger'><FiMeh /></h1>
                                    <h4 className='title is-size-3'>Nothing to show for now!</h4>
                                    <span className='subtitle'>Use the searchbar to find Github users.</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export function SearchBox({ callback }) {

    let [searchText, updateText] = React.useState('')
    /**
     *  triggerSearch is a debouncer for delaying search triggers within the application. 
     *  This way, searches will happen after a certain period from last input event.
     */
    const triggerSearch = createDebouncer((val) => {
        callback(val)
    }, 500)


    return (
        <AppContext.Consumer>{context =>
            <form onSubmit={ev => { ev.preventDefault(); ev.stopPropagation(); triggerSearch(searchText) }}>
                <div className='field has-addons is-centered'>
                    <div className="control has-icons-left has-icons-right">
                        <input maxLength={256} className="input is-rounded" type="text" value={searchText} onChange={ev => { updateText(ev.target.value) }} placeholder="Search for Github user..." />
                        <span className='icon is-left is-small'>
                            <FaSearch />
                        </span>
                    </div>
                    <div className="control">
                        <button type='submit' className="input is-rounded button is-success" type="text" >Search</button>
                    </div>

                </div> </form>
        }
        </AppContext.Consumer>
    )
}