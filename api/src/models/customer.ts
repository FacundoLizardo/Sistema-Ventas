import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export interface CustomerInterface {
	dni: string;
	firstName: string;
	lastName: string;
	email: string;
	address?: string;
	phoneNumber?: string;
	dateOfBirth?: Date;
	enableDebt?: boolean;
}

export interface CustomerCreationInterface
	extends Optional<
		CustomerInterface,
		"address" | "phoneNumber" | "dateOfBirth" | "enableDebt"
	> {}

class Customer
	extends Model<CustomerInterface, CustomerCreationInterface>
	implements CustomerInterface
{
	public dni!: string;
	public firstName!: string;
	public lastName!: string;
	public email!: string;
	public address?: string;
	public phoneNumber?: string;
	public dateOfBirth?: Date;
	public enableDebt?: boolean;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
	Customer.init(
		{
			dni: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
				validate: {
					esDNIoPasaporte(value: string) {
						const dniRegex = /^\d+$/;
						const pasaporteRegex = /^[a-zA-Z0-9]+$/;

						if (!dniRegex.test(value) && !pasaporteRegex.test(value)) {
							throw new Error("The format of the DNI or passport is invalid.");
						}
					},
				},
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [0, 50],
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [0, 50],
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			address: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					len: [0, 50],
				},
			},
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					len: [0, 50],
				},
			},
			dateOfBirth: {
				type: DataTypes.DATE,
				allowNull: true,
				validate: {
					isValidDate(value: string) {
						if (value && isNaN(Date.parse(value))) {
							throw new Error("Date of birth is not valid.");
						}
					},
				},
			},
			enableDebt: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: "Customer",
			timestamps: true,
		}
	);

	return Customer;
};
