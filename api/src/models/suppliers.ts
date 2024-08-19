import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import urlValidator from "../utils/urlValidator";

export interface SupplierInterface {
	supplierId: string;
	location?: string;
	purchases?: string[];
	phoneNumber?: string;
	email: string;
	webUrl?: string;
	sellers?: string[];
	frecuentProducts?: string[];
}

export interface SupplierCreationInterface
	extends Optional<
		SupplierInterface,
		| "location"
		| "purchases"
		| "phoneNumber"
		| "webUrl"
		| "sellers"
		| "frecuentProducts"
	> {}

class Supplier
	extends Model<SupplierInterface, SupplierCreationInterface>
	implements SupplierInterface
{
	public supplierId!: string;
	public location?: string;
	public purchases?: string[];
	public phoneNumber?: string;
	public email!: string;
	public webUrl?: string;
	public sellers?: string[];
	public frecuentProducts?: string[];
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
	Supplier.init(
		{
			supplierId: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			location: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					len: [0, 50],
				},
			},
			purchases: {
				type: DataTypes.ARRAY(DataTypes.UUID),
				allowNull: true,
			},
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: true,
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
			webUrl: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isValidUrl: urlValidator,
				},
			},
			sellers: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
			},
			frecuentProducts: {
				type: DataTypes.ARRAY(DataTypes.UUID),
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "Supplier",
			timestamps: false,
		}
	);

	return Supplier;
};