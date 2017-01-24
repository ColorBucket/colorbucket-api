import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const ColorSchema = new mongoose.Schema({
  userId: { type: 'String', required: true },
  color: { type: 'String', required: true },
  name: { type: 'String' },
  date: { type: Date, default: Date.now }
});

/**
 * Methods
 */
ColorSchema.method({
});

/**
 * Statics
 */
ColorSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
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

    return this.findById(id)
      .exec()
      .then((object) => {
        if (object) {
          return object;
        }
        const err = new APIError('No such object exists!', httpStatus.NOT_FOUND);
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
export default mongoose.model('Color', ColorSchema);
