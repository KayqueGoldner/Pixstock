"use strict";


import { urlEncode } from "./encode.js";

const API_KEY = import.meta.env.VITE_API_KEY;
const headers = new Headers();
headers.append("Authorization", API_KEY);
const requestOption = { headers };

/**
 * Fetch data from Pexels api
 * @param {String} url Fetch url
 */
export const fetchData = async function(url) {
  const response = await fetch(url, requestOption);
  if(!response.ok) {
    throw new Error("Could not fetch the data.");
  }

  const data = await response.json();
  return data;
}

const root = {
  default: "https://api.pexels.com/v1/",
  videos: "https://api.pexels.com/videos/"
}

export const client = {

  photos: {

    /**
     * Search photos from Pexels api
     * @param {Object} parameters URL object
     */
    search(parameters) {
      try {
        const data = fetchData(`${root.default}search?${urlEncode(parameters)}`);
        return data;
      } catch(error) {
        throw Error({ message: "Could not fetch the data." });
      }
    },

    /**
     * Curated photos
     * @param {Object} parameters URL object
     */
    curated(parameters) {
      try {
        const data = fetchData(`${root.default}curated?${urlEncode(parameters)}`);
        return data;
      } catch(error) {
        throw Error({ message: "Could not fetch the data." });
      }
    },

    /**
     * Get single photo detail
     * @param {String} id Photo ID
     */
    detail(id) {
      try {
        const data =  fetchData(`${root.default}photos/${id}`);
        return data;
      } catch(error) {
        throw Error({ message: "Could not fetch the data." });
      }
    }

  },

  videos: {

    /**
     * Search videos from Pexels api
     * @param {Object} parameters URL object
     */
    search(parameters) {
      try {
        const data = fetchData(`${root.videos}search?${urlEncode(parameters)}`);
        return data;
      } catch(error) {
        throw Error({ message: "Could not fetch the data." });
      }
    },

    /**
     * Popular videos
     * @param {Object} parameters URL object
     */
    popular(parameters) {
      try {
        const data = fetchData(`${root.videos}popular?${urlEncode(parameters)}`);
        return data;
      }catch(error) {
        throw Error({ message: "Could not fetch the data." });
      };
    },

    /**
     * Get single video detail
     * @param {String} id video ID
     */
    detail(id) {
      try {
        const data = fetchData(`${root.videos}videos/${id}`);
        return data;
      }catch(error) {
        throw Error({ message: "Could not fetch the data." });
      };
    }

  },
  
  collections: {

    /**
     * Get featured collections
     * @param {Object} parameters URL object
     */
    featured(parameters) {
      try {
        const data = fetchData(`${root.default}collections/featured?${urlEncode(parameters)}`);
        return data;
      } catch(error) {
        throw Error({ message: "Could not fetch the data." });
      };
    },

    /**
     * Get a collection medias
     * @param {String} id Collection ID
     * @param {Object} parameters URL object
     */
    async detail(id, parameters) {
      try {
        const data = await fetchData(`${root.default}collections/${id}?${urlEncode(parameters)}`);
        return data;
      } catch(error) {
        throw Error({ message: "Could not fetch the data." });
      };
    }

  },

}
