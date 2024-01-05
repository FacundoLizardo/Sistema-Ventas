const { Router } = require("express");
const {
	getBranch,
	getBranchs,
	postBranch,
	putBranch,
	deleteBranch,
} = require("../Handlers/branchHandler");
const router = Router();

router.get("/:id", getBranch);
router.get("/", getBranchs);
router.post("/", postBranch);
router.put("/:id", putBranch);
router.delete("/:id", deleteBranch);

module.exports = router;
