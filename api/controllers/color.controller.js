'use srict';

const ColorBusiness = require('../business/color.business'),
      ResponseFactory = require('../factories/response.factory');

const _responseFactory = new ResponseFactory();
const _colorBusiness = new ColorBusiness();

/**
 * Get color
 * @returns {Color}
 */
function get(req, res, next) {
  _colorBusiness.getPopulated(req.query._id)
    .then(color => {
      res.json(_responseFactory.success(color));
    })
    .catch(e => next(e));
}

/**
 * Create new color
 * @property {string} req.body.hex - The Hex of the color.
 * @property {string} req.body.name - The name of the color.
 * @returns {Color}
 */
function create(req, res, next) {
  let vm = {
    user: req.decoded._id,
    hex: req.body.hex,
    name: req.body.name,
    created: new Date()
  };

  _colorBusiness.create(vm)
    .then(savedColor => {
      res.json(_responseFactory.success(savedColor)) 
    })
    .catch(e => next(e));
}

/**
 * Update existing color
 * @property {string} req.body._id - The color id to be updated.
 * @property {string} req.body.name - The new color name.
 * @returns {Color}
 */
function update(req, res, next) {
  let color = req.body;
  color._id = req.body._id;
  color.name = req.body.name;

  _colorBusiness.get(req.body._id)
    .then(savedColor => {
      if(savedColor.user != req.decoded._id)
        return res.json(_responseFactory.fail(-1, "not your color"));

      _colorBusiness.update(color)
        .then(savedColor => {
          res.json(_responseFactory.success(color))
        })
        .catch(e => next(e));
    })
    .catch(e => next(e));
}

/**
 * Delete color.
 * @returns {Color}
 */
function remove(req, res, next) {
  _colorBusiness.get(req.body._id)
    .then(color => {
      if(color.user != req.decoded._id)
        return res.json(_responseFactory.fail(-1, "not your color"));

      _colorBusiness.remove(req.body._id)
        .then(status => {
          res.json(_responseFactory.success(status))
        })
        .catch(e => next(e));
    })
    .catch(e => next(e));
}

module.exports = { get, create, update, remove };
