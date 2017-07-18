const Promise = require('bluebird'),
      mongoose = require('mongoose');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  name: { type: 'String', required: true },
  username: { type: 'String', required: true, unique: true, lowercase: true, trim: true },
  email:  { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true },
  about: { type: 'String', required: false },
  created: { type: Date, default: Date.now }
},
{ 
  toObject: {
    transform: function (doc, ret, game) { delete ret.__v; delete ret.password; }
  }
});

/**
 * Methods
 */
UserSchema.method({ });

/**
 * Statics
 */
UserSchema.statics = { 
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
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
