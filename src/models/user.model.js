import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  name: { type: 'String', required: true },
  username: { type: 'String', required: true },
  email:  { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true },
  about: { type: 'String' },
  date: { type: Date, default: Date.now }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} params - The objectId of user. or a Object containing the params or the search
   * @returns {Promise<User, APIError>}
   */
  get(params) {
    if(typeof(params) === 'object')
      return this.find(params)
        .exec()
        .then((objects) => {
          if (objects) {
            return objects;
          }

          const err = new APIError('No such objects exists!', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        });
        
    return this.findById(params)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
