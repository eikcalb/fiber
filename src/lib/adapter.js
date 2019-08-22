import Octo from "@octokit/rest";
import { DEFAULT_CONFIG } from ".";

/**
 * Adapter creates an abstraction between resource fetching mechanisms and normal application funcionality.
 * 
 * This provides various benefits, along with the ability to make request sensitive decision, like caching,
 * within each adapter.
 * 
 * Use of this class is forbidden, this class must be extended!!!!!!!
 * 
 * Direct use of this class will throw an Error.
 * 
 */

export class Adapter {
    // I really wish this was a TypeScript environment... Oh well!


    config = DEFAULT_CONFIG

    constructor(config) {

    }


    /**
     * Fetches information about a user.
     * 
     * @param {string} user username of user to fetch.
     */
    getUser(user) {
        throw new Error('Not implemented! Extend this class!!')
    }

    getRepos(user, page) {
        throw new Error('Not implemented! Extend this class!!')
    }

    getFollowers(user, page) {
        throw new Error('Not implemented! Extend this class!!')
    }

    getFollowing(user, page) {
        throw new Error('Not implemented! Extend this class!!')
    }

    getStarred(user, page) {
        throw new Error('Not implemented! Extend this class!!')
    }

    searchUsers(query, page) {
        throw new Error('Not implemented! Extend this class!!')
    }

}


/**
 * FetchAdapter is the default adapter used for resourse management in fibre.
 * 
 * ... no time!
 * 
 * Creating adapter for @Octokit instead.
 */
export class FetchAdapter extends Adapter {

    buildFetch() {

    }

    getRepos() {
    }

}


/**
 * OctoAdapter is a container for app functinality. 
 * This is used by the @see App root component for making necessary actions and is passed to child components that require this class.
 * 
 * Network requests are made over an abstraction layer, Adapter.
 * These Adapters implement a similar interface and ensure loose-coupling the functions of fibre and resource fetching mechanisms.
 * 
 */

export default class OctoAdapter extends Adapter {

    constructor(config) {
        super(config)
        this.octo = new Octo({
            userAgent: `${DEFAULT_CONFIG.appName}/${DEFAULT_CONFIG.appVersion}`
        })
    }

    searchUsers(query, page) {
        return this.octo.search.users({
            q: query,
            order: 'asc',
            per_page: 100,
            sort: 'repositories',
            page
        })
    }

    getUser(user) {
        return this.octo.users.getByUsername({
            username: user
        })
    }

    getFollowers(user, page = 1) {
        return this.octo.users.listFollowersForUser({
            username: user,
            per_page: 100,
            page
        })
    }

    getFollowing(user, page = 1) {
        return this.octo.users.listFollowingForUser({
            username: user,
            per_page: 100,
            page
        })
    }

    getRepos(user, page = 1) {
        return this.octo.repos.listForUser({
            username: user,
            per_page: 100,
            type: 'all',
            sort: 'full_name',
            direction: 'asc',
            page
        })
    }

    getStarred(user, page = 1) {
        return this.octo.activity.listReposStarredByUser({
            username: user,
            per_page: 100,
            sort: 'updated',
            direction: 'desc',
            page
        })
    }

}

