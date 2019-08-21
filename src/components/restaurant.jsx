import React from 'react';
import '../App.css';
import { App } from "../lib";
import { RAW_VALUES } from '../lib/index';
import { getSortValue } from '../lib/sort';
import { useToasts } from "react-toast-notifications";
import { Item } from "./item";
import Toolbar from "./toolbar.jsx";


let app = new App()

export const SortContext = React.createContext(app);

export function Restaurant() {
    let {restaurants} = app.useRestaurants()
    let { addToast } = useToasts()
    return (
        <SortContext.Provider value={app}>
            <main className='container is-fluid is-marginless'>
                <div className='content'>
                    <div className='wrapper '>
                        <Toolbar triggerSearch={app.search.bind(app)} triggerSort={(val) => app.setSortType(val)} />
                        <div className='section'>
                            <div className='columns section is-vcentered is-multiline'>
                                {restaurants.favorites.map((id) => (
                                    <div className='column is-12-mobile is-3-tablet is-2'>
                                        <Item id={id} key={RAW_VALUES[id].name} name={RAW_VALUES[id].name}
                                            status={RAW_VALUES[id].status} isFavorite={RAW_VALUES[id].isFavorite}
                                            sortValue={getSortValue(id, app.currentSort)}
                                            makeFavorite={(isFav) => {
                                                app.updateFavorite(id, isFav)
                                            }} />
                                    </div>
                                ))}
                                {restaurants.open.map((id) => (
                                    <div className='column is-12-mobile is-3-tablet is-2'>
                                        <Item id={id} key={RAW_VALUES[id].name} name={RAW_VALUES[id].name}
                                            status={RAW_VALUES[id].status} isFavorite={RAW_VALUES[id].isFavorite}
                                            sortValue={getSortValue(id, app.currentSort)}
                                            makeFavorite={(isFav) => app.updateFavorite(id, isFav)} />
                                    </div>
                                ))}
                                {restaurants.orderAhead.map((id) => (
                                    <div className='column is-12-mobile is-3-tablet is-2'>
                                        <Item id={id} key={RAW_VALUES[id].name} name={RAW_VALUES[id].name}
                                            status={RAW_VALUES[id].status} isFavorite={RAW_VALUES[id].isFavorite}
                                            sortValue={getSortValue(id, app.currentSort)}
                                            makeFavorite={(isFav) => app.updateFavorite(id, isFav)} />
                                    </div>
                                ))}
                                {restaurants.closed.map((id) => (
                                    <div className='column is-12-mobile is-3-tablet is-2'>
                                        <Item id={id} key={RAW_VALUES[id].name} name={RAW_VALUES[id].name}
                                            status={RAW_VALUES[id].status} isFavorite={RAW_VALUES[id].isFavorite}
                                            sortValue={getSortValue(id, app.currentSort)}
                                            makeFavorite={(isFav) => app.updateFavorite(id, isFav)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </SortContext.Provider >
    );
}

export default Restaurant;
