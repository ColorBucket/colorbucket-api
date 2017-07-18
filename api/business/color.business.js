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

    getPopulated(params) {
        if(typeof(params) === 'object')
          return Color.find(params)
            .populate({path : 'user', select :'-password'})
            .exec();
            
        return Color.findById(params)
          .populate({path : 'user', select :'-password'})
          .exec();
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