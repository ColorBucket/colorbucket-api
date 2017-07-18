const Promise = require('bluebird'),
      mongoose = require('mongoose');

/**
 * Color Schema
 */
const ColorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hex: { type: 'String', required: true },
  name: { type: 'String', required: true },
  created: { type: Date, default: Date.now }
});

/**
 * Methods
 */
ColorSchema.method({ });

/**
 * Statics
 */
ColorSchema.statics = { 
  get(params) {
    if(typeof(params) === 'object')
      return this.find(params)
        .exec();
        
    return this.findById(params)
      .exec();
  },

  create(vm) {
    let model = new this(vm);

    return model.save();
  }
  
};

/**
 * @typedef Color
 */
module.exports = mongoose.model('Color', ColorSchema);
