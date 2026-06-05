const User = require("../models/user");
const Project = require("../models/Project");
const Investment = require("../models/Investment");

exports.invest = async (req, res) => {
  const { projectId, amount } = req.body;
  const investorId = req.user.id;

  try {
    // Convert amount safely
    const amountNumber = Number(amount);

    if (Number.isNaN(amountNumber) || amountNumber <= 0) {
      return res.status(400).json({
        message: "Le montant doit être un nombre supérieur à 0.",
      });
    }

    // Fetch data
    const project = await Project.findById(projectId);
    const investor = await User.findById(investorId);

    // Check existence
    if (!project) {
      return res.status(404).json({ message: "Projet introuvable." });
    }

    if (!investor) {
      return res.status(404).json({ message: "Investisseur introuvable." });
    }

    // Check project status
    if (project.status === "closed") {
      return res.status(400).json({
        message: "Projet fermé aux investissements.",
      });
    }

    // Ensure required fields exist
    if (!project.targetCapital) {
      return res.status(400).json({
        message: "Le projet n'a pas de capital cible défini.",
      });
    }

    // Remaining capital check
    const remaining = project.targetCapital - project.currentCapital;

    if (amountNumber > remaining) {
      return res.status(400).json({
        message: `Le montant dépasse le capital restant (${remaining}€).`,
      });
    }

    // Limit per investor (percentage rule)
    const maxAllowed =
      project.targetCapital * (project.maxInvestmentPercentage / 100);

    // Get already invested amount by this user in this project
    const previous = await Investment.aggregate([
      {
        $match: {
          project: project._id,
          investor: investor._id,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const alreadyInvested = previous[0]?.total || 0;

    if (alreadyInvested + amountNumber > maxAllowed) {
      return res.status(400).json({
        message: `Limite de ${project.maxInvestmentPercentage}% dépassée.`,
      });
    }

    // Balance check
    if (investor.balance < amountNumber) {
      return res.status(400).json({
        message: "Solde insuffisant.",
      });
    }

    // Update values
    project.currentCapital += amountNumber;
    investor.balance -= amountNumber;

    // Auto close project
    if (project.currentCapital >= project.targetCapital) {
      project.status = "closed";
    }

    await project.save();
    await investor.save();

    // Create investment record
    const investment = await Investment.create({
      project: projectId,
      investor: investorId,
      amount: amountNumber,
      percentage: (amountNumber / project.targetCapital) * 100,
    });

    return res.status(201).json(investment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// // add balance
// exports.addBalance = async (req, res) => {
//   try {
//     const { balance } = req.body;

//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { $inc: { balance: balance } },
//       { new: true },
//     ).select("-password");

//     res.status(200).json({
//       message: "balance added successfully",
//       currentBalance: user.balance,
//       user,
//     });
//   } catch (error) {
//     console.log("Error on addBalance controller.", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// MES INVESTISSEMENTS
exports.getMyInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({
      investor: req.user.id,
    }).populate("project", "title targetCapital currentCapital");
    res.json(investments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
