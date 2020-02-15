/* eslint-disable new-cap */
/* eslint-disable strict */
'use strict';

/** Class representing a generic mongo model. */
class Model {

  /**
   * Model Constructor
   * @param schema {object} - mongo schema
   */

  constructor(schema) {
    this.schema = schema;
  }
  /**
   * Retrieves one or more records
   * @param filters {object} optional mongo
   * @returns {array} array of records
   */
  get(id) {
    if (id) {
      return this.schema.findById(id);
    } else {
      return this.schema.find({});
    }
  }
  /**
   * Create a new record
   * @param record {object} matches the format of the schema
   * @returns {*}
   */
  post(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  /**
   * Replaces a record in the database
   * @param id {string} Mongo Record ID
   * @param record {object} The record data to replace. ID is a required field
   * @returns {*}
   */
  put(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }


  /**
   * Deletes a recod in the model
   * @param id {string} Mongo Record ID
   * @returns {*}
   */
  delete(_id) {
    return this.schema.deleteMany({_id});
  }
}

module.exports = Model;