const Dev = require('../models/Dev')
const axios = require('axios')

class DevController {
  async index (req, res) {
    const { user } = req.headers
    const loggedDev = await Dev.findById(user)
    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    })
    return res.json({ result: users })
  }

  async store (req, res) {
    const { username } = req.body

    const userExists = await Dev.findOne({ user: username })

    if (userExists) { return res.status(200).json({ result: userExists }) }

    const { data } = await axios.get(`https://api.github.com/users/${username}`)

    const { name, bio, avatar_url: avatar } = data

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    })

    return res.status(201).json({ result: dev })
  }
}

module.exports = new DevController()
