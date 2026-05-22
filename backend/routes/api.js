const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const Project = require("../models/Project");
const User = require("../models/user");

const projectCtrl = require("../controllers/projectController");
const investCtrl = require("../controllers/investmentController");
const adminCtrl = require("../controllers/adminController");
const authCtrl = require("../controllers/authController");

// ROUTES PUBLIQUES
router.post(
  "/projects",
  protect,
  authorize("owner"),
  projectCtrl.createProject,
);
router.get(
  "/my-projects",
  protect,
  authorize("owner"),
  projectCtrl.getMyProjects,
);

router.get("/projects/:id", protect, projectCtrl.getProjectById);

// ROUTES INVESTISSEURS
router.get(
  "/open-projects",
  protect,
  authorize("investor"),
  async (req, res) => {
    const projects = await Project.find({ status: "open" });
    res.json(projects);
  },
);
router.post("/invest", protect, authorize("investor"), investCtrl.invest);

// ROUTES ADMIN
router.get(
  "/admin/dashboard",
  protect,
  authorize("admin"),
  adminCtrl.getGlobalStats,
);

//Pour authentifier
router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/me", protect, authCtrl.getMyProfile);
// _____

// -- AUTH / USER --
router.put("/balance", protect, authorize("investor"), authCtrl.topUpBalance);

// -- PROJECTS --
router.put(
  "/projects/:id",
  protect,
  authorize("owner"),
  projectCtrl.updateProject,
);
router.delete(
  "/projects/:id",
  protect,
  authorize("owner"),
  projectCtrl.deleteProject,
);
router.patch(
  "/projects/:id/close",
  protect,
  authorize("owner"),
  projectCtrl.closeProject,
);

// -- INVESTMENTS --
router.get(
  "/my-investments",
  protect,
  authorize("investor"),
  investCtrl.getMyInvestments,
);

// -- ADMIN --
router.get(
  "/admin/users/:role",
  protect,
  authorize("admin"),
  adminCtrl.getAllByRole,
);
router.get(
  "/admin/portfolio/:id",
  protect,
  authorize("admin"),
  adminCtrl.getUserPortfolio,
);

module.exports = router;
