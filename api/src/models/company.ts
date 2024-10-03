import { Sequelize, DataTypes, Model, Optional } from "sequelize";

export interface CompanyInterface {
  id: string;
  country?: string;
  phoneNumbers?: string;
  isActive: boolean;

  // Campos adicionales
  cuit?: string;
  razonSocial?: string; // RAZON_SOCIAL
  domicilioFiscal?: string; // DOMICILIO_FISCAL
  inicioActividad?: string; // INICIO_ACTIVIDAD
  regimenTributario?: string; // REGIMEN_TRIBUTARIO
  iibb?: string; // IIBB
}

export interface CompanyCreationInterface
  extends Optional<
    CompanyInterface,
    | "country"
    | "phoneNumbers"
    | "cuit"
    | "razonSocial"
    | "domicilioFiscal"
    | "inicioActividad"
    | "regimenTributario"
    | "iibb"
  > {}

class Company extends Model<CompanyInterface, CompanyCreationInterface> {}

export default (sequelize: Sequelize) => {
  Company.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumbers: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      cuit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      razonSocial: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      domicilioFiscal: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      inicioActividad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      regimenTributario: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      iibb: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Company",
      timestamps: true,
    }
  );

  return Company;
};
