const { QueryInterface } = require('sequelize')

const onDeleteUpdateActions = {
	NONE: `NO ACTION`,
	NULL: `SET NULL`,
	DEFAULT: `SET DEFAULT`,
	CASCADE: `CASCADE`,
}

const constraintTypes = {
	CHECK: `check`, // (MySQL - Ignored by the database engine )
	UNIQUE: `unique`,
	DEFAULT: `default`, //(MSSQL only)
	FOREIGN_KEY: `foreign key`,
	PRIMARY_KEY: `primary key`,
}

/**
 * adds a fk constraint to the table
 * @param {string} tableName the table's name
 * @param {string} column the column's name
 * @param {string} targetTable the referenced table
 * @param {string} targetPkColumn the referenced table's PK column
 * @param {QueryInterface} queryInterface the query interface that will manage the data manipulation
 */
module.exports.fk = async (
	tableName,
	column,
	targetTable,
	targetPkColumn,
	queryInterface,
	onDelete = onDeleteUpdateActions.NONE,
	onUpdate = onDeleteUpdateActions.NONE
) => {
	const name = `fk|${tableName}:${targetTable}|${column}`
	const options = {
		type: constraintTypes.FOREIGN_KEY,
		name,
		fields: [column],
		references: {
			table: targetTable,
			field: targetPkColumn,
		},
		onDelete,
		onUpdate,
	}

	console.log(`fk on`, tableName, options)
	await queryInterface.addConstraint(tableName, options)
}
/**
 * adds a unique constraint to the table
 * @param {string} tableName the affected table's name
 * @param {QueryInterface} queryInterface the query interface that will manage the data manipulation
 * @param  {...string} columns the list of columns that will compose the index
 */
module.exports.unique = async (tableName, queryInterface, ...columns) => {
	const name = `unique|${tableName}|${columns.join(`:`)}`
	const options = { type: constraintTypes.UNIQUE, name, fields: columns }
	console.log(`unique index on`, tableName, options)
	await queryInterface.addConstraint(tableName, options)
}
