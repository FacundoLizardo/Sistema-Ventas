import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export interface CashRegisterInterface {
	id: string;
	userId: string;
	initialAmount: number;
	finalAmount?: number;
	income?: {
		amount: number;
		details: string;
	};
	egress?: {
		amount: number;
		details: string;
	};
	totalCashRegister: Array<any>;
	comments?: string;
}

export interface CashRegisterCreationInterface
	extends Optional<
		CashRegisterInterface,
		"id" | "finalAmount" | "income" | "egress" | "comments"
	> {}

class CashRegister
	extends Model<CashRegisterInterface, CashRegisterCreationInterface>
	implements CashRegisterInterface
{
	public id!: string;
	public userId!: string;
	public initialAmount!: number;
	public finalAmount?: number;
	public income?: {
		amount: number;
		details: string;
	};
	public egress?: {
		amount: number;
		details: string;
	};
	public totalCashRegister!: Array<any>;
	public comments?: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
	CashRegister.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			initialAmount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			finalAmount: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			income: {
				type: DataTypes.JSONB,
				allowNull: true,
				defaultValue: {
					amount: 0,
					details: "",
				},
			},
			egress: {
				type: DataTypes.JSONB,
				allowNull: true,
				defaultValue: {
					amount: 0,
					details: "",
				},
			},
			totalCashRegister: {
				type: DataTypes.JSONB,
				allowNull: false,
				defaultValue: [],
			},
			comments: {
				type: DataTypes.STRING,
				defaultValue: "",
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "CashRegister",
			timestamps: true,
		}
	);

	return CashRegister;
};
