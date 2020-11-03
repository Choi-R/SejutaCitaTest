const router = require('express').Router()
const controller = require('./controller')

router.get('/', (req, res) => {
    res.send("You have succesfully reach this place. Well done. Please go to /documentation for more details.")
  })

router.route('/api')
    .post(controller.createSomething)
    .get(controller.getSomething)

router.route('/api/:id')
    .put(controller.editSomething)
    .delete(controller.deleteSomething)

module.exports = router;
