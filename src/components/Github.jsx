import React from "react";
import { FaBook, FaCodeBranch, FaEnvelope, FaGlobe, FaMapMarker, FaStar } from "react-icons/fa";
import { NavLink, Route } from 'react-router-dom';
import { lib } from "../App";
import Toolbar from "./toolbar";


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
    return (
        <nav className="panel">
            <p className="panel-heading">
                Select a view
            </p>
            <p className="panel-tabs">
                <NavLink activeClassName='is-active' to={`/users/${collection.login}/${menus.repos}`}>Repos</NavLink>
                <NavLink activeClassName='is-active' to={`/users/${collection.login}/${menus.followings}`}>Followings</NavLink>
                <NavLink activeClassName='is-active' to={`/users/${collection.login}/${menus.followers}`}>Followers</NavLink>
                <NavLink activeClassName='is-active' to={`/users/${collection.login}/${menus.starred}`}>Starred</NavLink>
            </p>
            <Route path={`/users/${collection.login}/${menus.repos}`} render={(props) => {
                return collection.Repos.map(val => (
                    <Item icon={val.fork ? <FaCodeBranch /> : null} name={val.name} key={val.id} title={val.description} link={val.html_url} />
                ))
            }} />

            <Route path={`/users/${collection.login}/${menus.followings}`} render={(props) => {
                return collection.Followings.map(val => (
                    <Item icon={
                        <figure className="image is-32x32">
                            <img className="is-rounded" src={val.avatar_url} alt={val.login} />
                        </figure>} name={val.login} key={val.id} link={val.html_url} />
                ))
            }} />

            <Route path={`/users/${collection.login}/${menus.followers}`} render={(props) => {
                return collection.Followers.map(val => (
                    <Item icon={
                        <figure className="image is-32x32">
                            <img className="is-rounded" src={val.avatar_url} alt={val.login} />
                        </figure>} name={val.login} key={val.id} link={val.html_url} />
                ))
            }} />

            <Route path={`/users/${collection.login}/${menus.starred}`} render={(props) => {
                return collection.Starred.map(val => (
                    <Item icon={<FaStar />} name={val.name} key={val.id} link={val.html_url} />
                ))
            }} />
        </nav>
    )
}

const Item = ({ name, title, link, icon }) => {
    return (
        <a href={link} target='_blank' className="panel-block" title={title || name}>
            <span>{icon || <FaBook />} </span>  &emsp;
            <span className='has-text-weight-bold'>{name}</span>
        </a>
    )
}

export default function ({ username }) {
    let [ready, updateReady] = React.useState(false)
    let [user, updateUser] = React.useState(null)
    if (!ready || !user) {
        lib.getUser(username).then(async (res) => {
            user = res.data
            user.Repos = (await lib.getRepos(username)).data
            user.Followers = (await lib.getFollowers(username)).data
            user.Followings = (await lib.getFollowing(username)).data
            user.Starred = (await lib.getStarred(username)).data
            updateUser(user)
            updateReady(true)
        })
    }

    return (
        <div className='section'>
            <Toolbar isNotFixed={ready ? false : null} noShowSearch={true} />
            {ready ?
                <div className='section'>
                    <div className="media box">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img src={user.avatar_url} alt={user.name || 'John Doe'} />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4 is-capitalized">{user.name || 'John Doe'}</p>
                            <p className="subtitle is-6">{`@${user.login}`}</p>
                            <div className="content">{user.bio || 'No bio available!'}
                                <br />
                                {user.email ? <a href={`mailto:${user.email}`}><FaEnvelope /> {user.email}</a> : null}
                                <br />
                                {user.blog ? <span><FaGlobe /> {user.blog}</span> : null}
                            </div>
                            <p className={`subtitle is-6 ${!user.location ? 'muted' : ''}`}><FaMapMarker />{`${user.location || 'n/a'}`}</p>
                        </div>
                    </div>
                    <br />
                    <nav className="level is-mobile">
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading">Public Repos</p>
                                <p className="title">{user.public_repos}</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading">Following</p>
                                <p className="title">{user.following}</p>
                            </div>
                        </div>
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading">Followers</p>
                                <p className="title">{user.followers}</p>
                            </div>
                        </div>
                    </nav>

                    <Collection collection={user} />
                </div>
                :
                <div className='box has-text-centered'>
                    <progress className="progress is-large is-info" max="100">Please wait...</progress>
                    <h3 className='title is-3'>I am currently fetching data for display!</h3>
                </div>
            }
        </div>
    )
}