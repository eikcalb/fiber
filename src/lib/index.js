import React from "react";
import { restaurants } from "../sample.json";
import { SORT, SORT_MAPPING } from "./adapter";

export const DEFAULT_CONFIG = {
    appName: 'fibre',
    appVersion: '1.0.0',
    description: 'fibre is a Github user search application. With fibre, you may find Github users and information about their work.',
    author: 'eikcalb',
    apiEndpoint: 'https://api.github.com/'
}

/**
 * Lib is a container for app functinality. 
 * This is used by the @see App root component for making necessary actions and is passed to child components that require this class.
 * 
 * Network requests are made over an abstraction layer, Adapter.
 * These Adapters implement a similar interface and ensure loose-coupling the functions of fibre and resource fetching mechanisms.
 * 
 */

export class Lib {

    /**
     * Creates a new @see Lib instance using the adapter provided.
     * 
     * @param {objet} adapter This is the object used for making network requests.
     */
    constructor(adapter) {

    }
}
