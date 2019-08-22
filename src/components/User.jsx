import React from 'react';
import { FaDoorClosed, FaDoorOpen, FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import '../App.css';
import { SortContext } from "./restaurant";


export function User({ login,id,avatarUrl,url,htmlUrl,reposUrl, status, isFavorite, sortValue, makeFavorite }) {

    return (
        <div className='card'>
            <header className="card-header">
                <p className="card-header-title">{name}</p>
            </header>
            <div className="card-content">
                <div className="content">
                    <span className='title is-size-5'>{description}</span>
                    <p className='has-text-grey'>created by: {owner}</p>
                    <br />
                    <FaMapPin className='has-text-danger' />&nbsp;{venue}
                    <br />
                    <time dateTime={date}>{date}</time>
                </div>
            </div>
            <footer className="card-footer">
                <span className="card-footer-item">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Capacity</p>
                            <p className="title">{capacity.toLocaleString()}</p>
                        </div>
                    </div>
                </span>
                <span className="card-footer-item">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">Period</p>
                            <p className="title">{period}</p>
                        </div>
                    </div>
                </span>
                {user.isAdmin ?
                    <span onClick={triggerDelete} className="card-footer-item button is-text is-radiusless"><FaTrash className='has-text-danger' /></span>
                    :
                    <span onClick={triggerEnrollment} className="card-footer-item button is-link is-radiusless is-outlined">Enroll</span>
                }
            </footer>
        </div>
    )
}
