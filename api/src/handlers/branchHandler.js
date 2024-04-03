const {
  postBranchController,
} = require("../controllers/branch/postBranchController");
const {
  deleteBranchController,
} = require("../controllers/branch/deleteBranchController");
const {
  getAllBranchesController,
} = require("../controllers/branch/getAllBranchesController");
const {
  getBranchByIdController,
} = require("../controllers/branch/getBranchByIdController");
const {
  putBranchController,
} = require("../controllers/branch/putBranchController");

const getBranch = async (req, res) => {
  const { id } = req.params;
  try {
    const branch = await getBranchByIdController(id);
    branch
      ? res.status(200).json({ success: true, branch })
      : res.status(404).json({ success: false, message: "No branchs found." });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getBranchs = async (req, res) => {
  try {
    const branches = await getAllBranchesController();
    branches
      ? res.status(200).json({ success: true, branches })
      : res.status(404).json({ success: false, message: "No branchs found." });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postBranch = async (req, res) => {
  const {
    afipId,
    name,
    location,
    isStorage,
    enable,
    manager,
    hours,
    phoneNumber,
  } = req.body;
  if (!name || !location) {
    return res.status(404).json("Missing information.");
  }
  try {
    const newBranch = await postBranchController(
      afipId,
      name,
      location,
      isStorage,
      enable,
      manager,
      hours,
      phoneNumber
    );
    return res.status(200).json(newBranch);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putBranch = async (req, res) => {
  try {
    const branchId = req.params.id;
    const {
      afipId,
      name,
      location,
      isStorage,
      enable,
      manager,
      hours,
      phoneNumber,
    } = req.body;

    const updatedBranch = await putBranchController(
      branchId,
      afipId,
      name,
      location,
      isStorage,
      enable,
      manager,
      hours,
      phoneNumber
    );
    res.status(200).json(updatedBranch);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteBranch = async (req, res) => {
  try {
    const branchId = req.params.id;
    const deletedBranch = await deleteBranchController(branchId);
    res.status(200).json(deletedBranch);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBranch,
  getBranchs,
  postBranch,
  putBranch,
  deleteBranch,
};
