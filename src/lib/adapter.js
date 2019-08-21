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

    get(path, options) {

    }

    getRepos() {
        throw new Error('Not implemented! Extend this class!!')
    }

}


/**
 * FetchAdapter is the default adapter used for resourse management in fibre.
 */
export default class FetchAdapter extends Adapter {

    buildFetch() {

    }

    getRepos() {
    }

}