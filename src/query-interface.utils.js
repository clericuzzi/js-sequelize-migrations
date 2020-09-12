const { QueryInterface } = require('sequelize')
/**
 * returns the given data in a format that the function 'addColumns' understands
 *
 * @param {string} name the new column's name
 * @param {*} definition the new column's definition
 */
module.exports.newColumn = (name, definition) => ({
	name,
	definition,
})
/**
 * removes a list of columns from the given table (IF EXISTS)
 *
 * @param {string} tableName the table to be handled
 * @param {[{name: string, definition: object}]} columns a list of column defining objects
 * @param {QueryInterface} queryInterface the query interface object
 */
module.exports.addColumns = async (queryInterface, tableName, columns) => {
	const tableDescription = await queryInterface.describeTable(tableName)
	const tableColumns = Object.keys(tableDescription)

	for (let column of columns) {
		if (!tableColumns.includes(column.name))
			await queryInterface.addColumn(tableName, column.name, column.definition)
	}
}
/**
 * removes a list of columns from the given table (IF EXISTS)
 *
 * @param {string} tableName the table to be handled
 * @param {[string]} columnNames the table to be handled
 * @param {QueryInterface} qry the query interface object
 */
module.exports.removeColumns = async (tableName, columnNames, qry) => {
	const tableDescription = await qry.describeTable(tableName)
	const tableColumns = Object.keys(tableDescription)
	for (let columnName of columnNames)
		if (tableColumns.includes(columnName))
			await qry.removeColumn(tableName, columnName)
}
