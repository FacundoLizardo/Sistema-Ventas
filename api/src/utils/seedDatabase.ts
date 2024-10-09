import { Branch, Company, Customer, User } from "../db";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default async function seedDatabase() {
  try {
    const [company] = await Company.findOrCreate({
      where: { cuit: "20409378472", razonSocial: "GPI 360 S.A." },
      defaults: {
        domicilioFiscal: "Calle de Prueba 1234, CABA",
        inicioActividad: "20010101",
        regimenTributario: "Responsable Inscripto",
        iibb: "123456789",
        country: "Argentina",
        phoneNumbers: ["3442644674"],
        isActive: true,
      },
    });

    const [user] = await User.findOrCreate({
      where: { email: "test@gmail.com" },
      defaults: {
        firstName: "Test",
        lastName: "Test",
        password: await bcrypt.hash("123456", saltRounds),
        address: "123 Main St",
        phoneNumber: "1234567890",
        cuit: "20409378472",
        enabled: true,
        role: "SUPER_ADMIN",
        companyId: company.dataValues.id,
      },
    });

    await Branch.findOrCreate({
      where: { afipId: "6677889900" },
      defaults: {
        ptoVta: 2,
        name: "Sucursal Norte",
        location: "Zona Rural",
        isStorage: true,
        enable: false,
        manager: [user.dataValues.id],
        hours: "8:00 AM - 4:00 PM",
        phoneNumber: "+6677889900",
        companyId: company.dataValues.id,
      },
    });

    await Customer.findOrCreate({
      where: { docNro: "33693450239" },
      defaults: {
        customerType: "company",
        docTipo: "80",
        docNro: "33693450239",
        companyName: "Tech Solution",
        email: "info@techsolutionds.com",
        address: "456 Industrial Ave, Buenos Aires",
        phoneNumber: "01145678900",
        enableDebt: false,
        userId: user.dataValues.id,
        companyId: company.dataValues.id,
      },
    });
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}
