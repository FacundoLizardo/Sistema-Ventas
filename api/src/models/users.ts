import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export interface UserInterface {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	address?: string;
	phoneNumber?: string;
	cuit?: string;
	branch?: string[];
	enabled: boolean;
	role: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface UserCreationInterface
	extends Optional<
		UserInterface,
		| "id"
		| "address"
		| "phoneNumber"
		| "cuit"
		| "branch"
		| "createdAt"
		| "updatedAt"
	> {}

class User
	extends Model<UserInterface, UserCreationInterface>
	implements UserInterface
{
	public id!: string;
	public firstName!: string;
	public lastName!: string;
	public email!: string;
	public password!: string;
	public address?: string;
	public phoneNumber?: string;
	public cuit?: string;
	public branch?: string[];
	public enabled!: boolean;
	public role!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
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
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
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
			cuit: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					len: [0, 50],
				},
			},
			branch: {
				type: DataTypes.ARRAY(DataTypes.UUID),
				allowNull: true,
			},
			enabled: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "User",
			timestamps: true,
		}
	);

	return User;
};
