import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import { ErrorPage } from "./pages/Error";
import { Search } from "./pages/Search";
import { FaHeart, FaMapMarker } from 'react-icons/fa';
import OctoAdapter from './lib/adapter';
import Github from './components/Github';

export const lib = new OctoAdapter()
export const AppContext = React.createContext({ lib })

/**
 * App is the root of this application and contains the required logic for communication and state management.
 */
class App extends React.Component {

    constructor(props) {
        super(props)
        this.adapter = lib
    }

    state = {
        users: [],
        totalCount: 0
    }

    render() {
        return (
            <>
                <div className='is-clipped container is-widescreen'>
                    <Switch>
                        <Route path='/users/:username' render={({ match }) => {
                            return (
                                <Github username={match.params.username} />
                            )
                        }} />

                        <Route exact path="/" render={() => <Search data={this.state.users} totalCount={this.state.totalCount} triggerSearch={async (q, page) => {
                            if (q == "") return
                            let res = await this.adapter.searchUsers(q, page)

                            this.setState({ users: res.data.items, totalCount: res.data.total_count })
                            console.log(res)
                        }} />} />

                        <Route component={ErrorPage} />
                    </Switch>
                </div>

                <footer>
                    <div className="content has-text-centered">
                        <p>
                            <strong>Fiber</strong> by <a href="mailto:agwaisraelonome@gmail.com">eikcalb</a> with <FaHeart className='has-text-danger' /> from <FaMapMarker /> Lagos
                    </p>
                    </div>
                </footer>
            </>
        );

    }
}


/**
 * 
 * @param {function} callback curried function to debounce.
 * @param {int} timeout debounce duration.
 */
export function createDebouncer(callback, timeout = 300) {
    let timeID = undefined
    let context = this

    return function debouncer() {
        clearTimeout(timeID)
        timeID = setTimeout(() => callback.apply(context, arguments), timeout)
    }
}

export default App;