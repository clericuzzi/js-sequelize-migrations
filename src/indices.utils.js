const { QueryInterface } = require('sequelize')

/**
 * creates indices for the default tables
 *
 * @param {string} tableName the table's name
 * @param {QueryInterface} queryInterface the query interface that will manage the data manipulation
 */
module.exports.is_deleted = async (tableName, queryInterface) => {
	await queryInterface.addIndex(tableName, [`is_deleted`])
}

/**
 * adds a new index in the target table that covers the given columns
 * @param {string} tableName the affected table's name
 * @param {QueryInterface} queryInterface the query interface that will manage the data manipulation
 * @param  {...string} columns the list of columns that will compose the index
 */
module.exports.newIndex = async (tableName, queryInterface, ...columns) => {
	await queryInterface.addIndex(tableName, columns)
}

/**
 * adds a unique constraint to the table
 * @param {string} tableName the affected table's name
 * @param {QueryInterface} queryInterface the query interface that will manage the data manipulation
 * @param  {...string} columns the list of columns that will compose the index
 */
module.exports.unique = async (tableName, queryInterface, ...columns) => {
	const name = `${tableName}_${columns.join(`_`)}_unique`
	const options = { type: `unique`, name, fields: columns }
	await queryInterface.addConstraint(tableName, options)
}
