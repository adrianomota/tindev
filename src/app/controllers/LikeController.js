const Dev = require('../models/Dev')

class LikeController {
  async store (req, res) {
    const { devId } = req.params
    const { user } = req.headers

    const dev = await Dev.findById(devId)
    const userLogged = await Dev.findById(user)

    if (!dev) return res.status(400).json({ message: 'Dev not exists' })

    if (dev.likes.includes(userLogged._id)) {
      console.log('Deu match')
    }

    userLogged.likes.push(dev._id)

    await userLogged.save()

    return res.status(203).json({ result: userLogged })
  }
}

module.exports = new LikeController()
