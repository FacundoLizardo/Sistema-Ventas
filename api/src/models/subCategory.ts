import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export interface SubCategoryInterface {
  id: string;
  name: string;
  description?: string;
}

export interface SubCategoryCreationInterface
  extends Optional<SubCategoryInterface, "id"> {}

class SubCategory
  extends Model<SubCategoryInterface, SubCategoryCreationInterface>
  implements SubCategoryInterface
{
  public id!: string;
  public name!: string;
  public description?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  SubCategory.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 50],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
    },
    {
      sequelize,
      modelName: "SubCategory",
      timestamps: true,
    }
  );

  return SubCategory;
};
