const { Sequelize, QueryInterface, DataTypes } = require('sequelize')

/**
 * defines default columns for ALL the tables
 */
module.exports.defaultColumns = {
	is_deleted: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	deleted_at: {
		type: DataTypes.DATE,
		allowNull: true,
		defaultValue: Sequelize.literal(`null`),
	},
	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	updated_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},
}

/**
 * alters a column and sets it's default value to null
 * @param {QueryInterface} queryInterface the QueryInterface object that will manage the database connection
 * @param {string} tableName the table to be affected
 * @param {string} columnName the column to be affected
 * @param {string} [schema='public'] the schema that owns the affected table
 */
module.exports.setTimestampsDefault = async (
	queryInterface,
	tableName,
	schema = 'public'
) => {
	await this.setColumnDefaultValueNow(
		queryInterface,
		tableName,
		`created_at`,
		schema
	)
	await this.setColumnDefaultValueNow(
		queryInterface,
		tableName,
		`updated_at`,
		schema
	)
}

/**
 * alters a column and sets it's default value to NOW
 * @param {QueryInterface} queryInterface the QueryInterface object that will manage the database connection
 * @param {string} tableName the table to be affected
 * @param {string} columnName the column to be affected
 * @param {string} [schema='public'] the schema that owns the affected table
 */
module.exports.setColumnDefaultValueNow = async (
	queryInterface,
	tableName,
	columnName,
	schema = 'public'
) => {
	const query = `ALTER TABLE ${schema}.${tableName} ALTER COLUMN ${columnName} SET DEFAULT now();`
	console.log(`query:`, query)
	await queryInterface.sequelize.query(query)
}

/**
 * alters a column and sets it's default value to null
 * @param {QueryInterface} queryInterface the QueryInterface object that will manage the database connection
 * @param {string} tableName the table to be affected
 * @param {string} columnName the column to be affected
 * @param {string} [schema='public'] the schema that owns the affected table
 */
module.exports.setColumnDefaultValueNull = async (
	queryInterface,
	tableName,
	columnName,
	schema = 'public'
) => {
	const query = `ALTER TABLE ${schema}.${tableName} ALTER COLUMN ${columnName} SET DEFAULT null;`
	console.log(`query:`, query)
	await queryInterface.sequelize.query(query)
}

/**
 * alters a column and sets it's default value to null
 * @param {QueryInterface} queryInterface the QueryInterface object that will manage the database connection
 * @param {string} tableName the table to be affected
 * @param {string} columnName the column to be affected
 * @param {string} [schema='public'] the schema that owns the affected table
 */
module.exports.setColumnDefaultValueZero = async (
	queryInterface,
	tableName,
	columnName,
	schema = 'public'
) => {
	const query = `ALTER TABLE ${schema}.${tableName} ALTER COLUMN ${columnName} SET DEFAULT 0;`
	console.log(`query:`, query)
	await queryInterface.sequelize.query(query)
}

/**
 * alters a column and sets it's default value to null
 * @param {QueryInterface} queryInterface the QueryInterface object that will manage the database connection
 * @param {string} tableName the table to be affected
 * @param {string} columnName the column to be affected
 * @param {string} [schema='public'] the schema that owns the affected table
 */
module.exports.setColumnDefaultValueOne = async (
	queryInterface,
	tableName,
	columnName,
	schema = 'public'
) => {
	const query = `ALTER TABLE ${schema}.${tableName} ALTER COLUMN ${columnName} SET DEFAULT 1;`
	console.log(`query:`, query)
	await queryInterface.sequelize.query(query)
}
