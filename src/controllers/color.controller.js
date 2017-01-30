'use srict';

import Model from '../models/color.model';
import ResponseFactory from '../factories/responseFactory'

const _responseFactory = new ResponseFactory();


/**
 * Create new color
 * @property {string} req.body.color - The hex of the color.
 * @property {string} req.body.name - The name of the color.
 * @returns {Model}
 */
function create(req, res, next) {
  const vm = new Model({
    userId: req.user._id,
    color: req.body.color,
    name: req.body.name
  });

  vm.save()
    .then(savedObject => res.json(_responseFactory.sucess(savedObject)))
    .catch(e => next(e));
}

/**
 * Get user colors.
 * @returns {Model[]}
 */
function list(req, res, next) {
  
  Model.find({ userId: req.user._id })
    .then(objects => res.json(_responseFactory.sucess(objects)))
    .catch(e => next(e));
}

/**
 * Delete color.
 * @property {string} req.body.color - The hex of the color to be excluded
 * @returns {Model}
 */
function remove(req, res, next) {
  const color = req.body.color;

  Model.find({ userId: req.user._id, color: color })
       .remove()
       .then(deletedColor => res.json(_responseFactory.sucess(deletedColor)))
       .catch(e => next(e));
}

export default { create, list, remove };
