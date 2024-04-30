const { generateTicket } = require("../controllers/afip/generateTicket.js");
const { postFacturaAController } = require("../controllers/afip/postFacturaAController.js");
const {
  editProductStockController,
} = require("../controllers/products/putProductsControllers.js");

const postAfip = async (req, res) => {
  const { cbteTipo, products } = req.body;

  try {
    let afipInvoice;
    switch (cbteTipo) {
      case 1:
        afipInvoice = await postFacturaAController(req);
        break;
      default:
        afipInvoice = await generateTicket(req);
    }

    if (afipInvoice) {
      for (const product of products) {
        const { productId } = product;
        await editProductStockController({ productId });
      }
    }

    return res.status(200).json({ success: true, afipInvoice });
  } catch (error) {
    console.error("Error in postAfip:", error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { postAfip };
