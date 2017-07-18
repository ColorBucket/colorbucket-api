'use strict';
const crypto = require('crypto'),
      Promisse = require('bluebird'),
      Color = require('../models/color.model');

class ColorBusiness {

	constructor() { }

    /*
    * Params could be either a json or a single Id
    */
    get(params) {
        return Color.get(params);
    };

    update(vm) {
        return Color.update({_id: vm._id}, {$set: { name: vm.name }});
    };

    create(vm) {
        return Color.create(vm);
    };

    remove(id) {
        return Color.find({_id: id}).remove().exec();;
    };
}

module.exports = ColorBusiness;