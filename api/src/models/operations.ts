import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { ProductInterface } from "./product";

export interface OperationInterface {
	id: number;
	products: ProductInterface[];
	amount: number;
	discount: number;
	extraCharge: number;
	debtAmount?: number;
	branchId: string;
	paymentType: string;
	invoiceNumber?: string;
	state: string;
	isdelivery: boolean;
	deliveryAddress?: string;
	customersId?: string;
	comments?: string;
}

export interface OperationCreationInterface
	extends Optional<
		OperationInterface,
		| "id"
		| "products"
		| "debtAmount"
		| "invoiceNumber"
		| "deliveryAddress"
		| "customersId"
		| "comments"
	> {}

class Operation
	extends Model<OperationInterface, OperationCreationInterface>
	implements OperationInterface
{
	public id!: number;
	public products!: any[];
	public amount!: number;
	public discount!: number;
	public extraCharge!: number;
	public debtAmount?: number;
	public branchId!: string;
	public paymentType!: string;
	public invoiceNumber?: string;
	public state!: string;
	public isdelivery!: boolean;
	public deliveryAddress?: string;
	public customersId?: string;
	public comments?: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
	Operation.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			products: {
				type: DataTypes.JSONB,
				allowNull: true,
				defaultValue: [],
			},
			amount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			discount: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			extraCharge: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			debtAmount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
				validate: {
					isFloat: {
						msg: "The debt should be a decimal number.",
					},
					min: {
						args: [0],
						msg: "The amount of debt should be equal or higher than 0.",
					},
				},
			},
			branchId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			paymentType: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "cash",
				validate: {
					isIn: [["credit", "debit", "cash", "mercadoPago"]],
				},
			},
			invoiceNumber: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "pending",
				validate: {
					isIn: [["completed", "pending", "cancelled", "failed", "voided"]],
				},
			},
			isdelivery: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			deliveryAddress: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			customersId: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			comments: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "Operation",
			timestamps: true,
		}
	);

	return Operation;
};