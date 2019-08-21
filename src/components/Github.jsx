import React from "react";
import { Route, NavLink } from 'react-router-dom';
import { FaBook, FaMapMarker, FaEnvelope, FaGlobe } from "react-icons/fa";


class Github {
    personal = null
    bio = ""
    followings = []
    followers = []
    starred = []
    repos = []
    id = 0
}

export const menus = {
    repos: 'Repos',
    followings: 'Followings',
    followers: 'Followers',
    starred: 'Starred'
}

export function Collection({ collection }) {

    let [selected, changeSelection] = React.useState({ name: menus.repos, data: collection.repos })

    return (
        <nav className="panel">
            <p className="panel-heading">
                {selected}
            </p>
            <p className="panel-tabs">
                <NavLink activeClassName='is-active' to={''}>Repos</NavLink>
                <NavLink activeClassName='is-active' to={''}>Followings</NavLink>
                <NavLink activeClassName='is-active' to={''}>Followers</NavLink>
                <NavLink activeClassName='is-active' to={''}>Starred</NavLink>
            </p>
            <Route path={`${menus.repos}`} render={(props) => {
                collection.repos.map(val => (
                    <Item name={val.name} key={val.id} />
                ))
            }} />

            <Route path={`${menus.followings}`} render={(props) => {
                collection.followings.map(val => (
                    <Item name={val.name} key={val.id} />
                ))
            }} />

            <Route path={`${menus.followers}`} render={(props) => {
                collection.followers.map(val => (
                    <Item name={val.name} key={val.id} />
                ))
            }} />

            <Route path={`${menus.starred}`} render={(props) => {
                collection.starred.map(val => (
                    <Item name={val.name} key={val.id} />
                ))
            }} />
        </nav>
    )
}

const Item = ({ name }) => {
    return (
        <p className="panel-block">
            <FaBook /> {name}
        </p>
    )
}

export default function ({ user }) {
    return (
        <div>
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src={user.avatarUrl} alt={user.name || 'John Doe'} />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4 is-capitalized">{user.name || 'John Doe'}</p>
                            <p className="subtitle is-6">{`@${user.login}`}</p>
                            <p className={`subtitle is-6 ${!user.location ? 'muted' : ''}`}><FaMapMarker />{`@${user.location || 'n/a'}`}</p>
                        </div>
                    </div>

                    <div className="content">{user.bio}
                        <br />
                        <a href={`mailto:${user.email}`}><FaEnvelope /> {user.email}</a>
                        <br />
                        {user.blog ? <span><FaGlobe /> {user.blog}</span> : null}
                    </div>
                </div>
            </div>
            <nav className="level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Repos</p>
                        <p className="title">{user.repoCount}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Following</p>
                        <p className="title">{user.followingCount}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Followers</p>
                        <p className="title">{user.followerCount}</p>
                    </div>
                </div>
            </nav>

            <Collection collection={user} />
        </div>
    )
}