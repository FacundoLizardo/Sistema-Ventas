import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export interface CategoryInterface {
  id: string;
  name: string;
  description?: string;
}

export interface CategoryCreationInterface
  extends Optional<CategoryInterface, "id"> {}

class Category extends Model<CategoryInterface, CategoryCreationInterface> {}

export default (sequelize: Sequelize) => {
  Category.init(
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
      modelName: "Category",
      timestamps: true,
    }
  );

  return Category;
};
