const BaseModel = require('./BaseModel');

class Feature extends BaseModel {
  constructor() {
    super('features');
  }

  // Get all features ordered by creation date
  async findAll() {
    return await super.findAll({
      orderBy: 'created_at',
      orderDirection: { ascending: true }
    });
  }
}

module.exports = Feature;
