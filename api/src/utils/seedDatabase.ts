import { Branch, Company, Customer, User } from "../db";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default async function seedDatabase() {
  try {
    const existingCompany = await Company.findOne({
      where: { cuit: "20331112225" },
    });

    if (!existingCompany) {
      const company = await Company.create({
        razonSocial: "GPI 360 S.A.",
        domicilioFiscal: "Calle de Prueba 1234, CABA",
        inicioActividad: "20010101",
        regimenTributario: "Responsable Inscripto",
        iibb: "123456789",
        country: "Argentina",
        phoneNumbers: ["3442644674"],
        cuit: "20331112225",
        isActive: true,
      });

      const existingUser = await User.findOne({
        where: { email: "test@gmail.com" },
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash("123456", saltRounds);

        const user = await User.create({
          firstName: "Test",
          lastName: "Test",
          email: "test@gmail.com",
          password: hashedPassword,
          address: "123 Main St",
          phoneNumber: "1234567890",
          cuit: "20123456789",
          enabled: true,
          role: "SUPER_ADMIN",
          companyId: company.dataValues.id,
        });

        const existingBranch = await Branch.findOne({
          where: { afipId: "6677889900" },
        });

        if (!existingBranch) {
          await Branch.create({
            afipId: "6677889900",
            ptoVta: 2,
            name: "Sucursal Norte",
            location: "Zona Rural",
            isStorage: true,
            enable: false,
            manager: [user.dataValues.id],
            hours: "8:00 AM - 4:00 PM",
            phoneNumber: "+6677889900",
            companyId: company.dataValues.id,
          });
        }

        const existingCustomer = await Customer.findOne({
          where: { docNro: "33693450239" },
        });

        if (!existingCustomer) {
          await Customer.create({
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
          });
        }
      }
    }
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}
