const express = require('express')
const routes = express.Router()

/**
 * Controllers
 */
const DevController = require('./app/controllers/DevController')
const LikeController = require('./app/controllers/LikeController')
const DislikeController = require('./app/controllers/DislikeControler')
/**
 * Dev Controller
 */

routes.get('/api/v1/dev/list', DevController.index)
routes.post('/api/v1/dev/me', DevController.store)

/**
 * Like Controller
 */
routes.post('/api/v1/dev/:devId/like', LikeController.store)

/**
 * Dislike Controller
 */
routes.post('/api/v1/dev/:devId/dislike', DislikeController.store)

module.exports = routes
