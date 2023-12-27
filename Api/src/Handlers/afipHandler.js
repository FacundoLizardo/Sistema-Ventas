const postAfipTicketController = require("../Controllers/afip/postAfipTicketController");

const postAfip = async (req, res) => {
    try {
        const afipInvoice = postAfipTicketController();
        return res.status(200).json({ success: true, afipInvoice })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = { postAfip }