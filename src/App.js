import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import { Lib } from './lib';
import { ErrorPage, Search } from "./pages";

const lib = new Lib()
export const AppContext = React.createContext({ lib })

/**
 * App is the root of this application and contains the required logic for communication and state management.
 */
class App extends React.Component {

    state = {

    }

    render() {
        return (
            <Switch>
                <div className='is-clipped'>
                    <Route exact path="/" render={() => <Search />} />
                    <Route component={ErrorPage} />
                </div>
            </Switch>
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