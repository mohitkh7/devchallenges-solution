const axios = require('axios').default;
const CONSTANTS = require('../constants');
const { generateUrlWithParams }= require('../utils');

exports.catsList = async function(req, res) {
    try{
        console.log('GET: Cats list')
        const apiUrl = generateUrlWithParams(CONSTANTS.CATS_LIST_URL, req);
        console.log('Calling URL: ', apiUrl);
        catsAPIResponse = await axios.get(CONSTANTS.CATS_LIST_URL);
        res.set('Cache-control', 'public, max-age=86400')  // cache for 1 day
        // filter specific keys from response
        catsAPIResponse.data = catsAPIResponse.data.map(obj => (({ id, image, description, name }) => ({ id, image, description, name }))(obj));
        res.json(catsAPIResponse.data);
    } catch (error) {
        console.error(error);
        res.status(503).send({'message': error.message});
    }
};

exports.catsDetail = async function(req, res) {
    try{
        console.log('GET: Cats details');
        const apiUrl = generateUrlWithParams(CONSTANTS.CATS_SEARCH_URL, req);
        console.log('Calling URL: ', apiUrl);
        const catsAPIResponse = await axios.get(apiUrl);
        if (catsAPIResponse.data.length > 0) {
            const catDetails = catsAPIResponse.data[0];
            const imageDetails = await axios.get('https://api.thecatapi.com/v1/images/'+catDetails.reference_image_id);
            // remove unnecessary key 'breeds' from object
            delete imageDetails.breeds;
            catDetails.image = imageDetails.data;
            res.set('Cache-control', 'public, max-age=86400')  // cache for 1 day
            res.json(catDetails);
        } else {
            res.status(404).send({'message': `Cat with name: ${req.params.name} not found`});
        }        
    }
    catch (error) {
        console.error(error);
        res.status(503).json({'message': error.message});
    }
};

exports.catsImages = async function(req, res) {
    try {
        console.log('GET Cats Images');
        const apiUrl = generateUrlWithParams(CONSTANTS.CATS_IMAGE_URL, req);
        console.log('Calling URL: ', apiUrl);
        const resp = await axios.get(apiUrl);
        // remove unnecessary key 'breeds' from image object
        resp.data.map(imageObj => delete imageObj.breeds);
        res.json(resp.data);
    } catch (error) {
        console.error(error);
        res.status(503).send({'message': error.message});
    }
}