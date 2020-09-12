const { Sequelize, QueryInterface } = require('sequelize')

/**
 * activates an extension that makes possible for us to use auto generated uuid primary keys
 * @param {QueryInterface} queryInterface the object that will handle the database connection
 */
module.exports.uuidGenerator = queryInterface =>
	queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

/**
 * defines a default value for uuid pk columns
 */
module.exports.defaultUuidValue = Sequelize.literal('uuid_generate_v4()')
