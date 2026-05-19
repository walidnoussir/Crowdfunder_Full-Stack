const User = require('../models/user');
const Project = require('../models/Project');
const Investment = require('../models/Investment');

exports.invest = async (req, res) => {
  const { projectId, amount } = req.body;
  const investorId = req.user.id;

  try {
    const project = await Project.findById(projectId);
    const investor = await User.findById(investorId);

    // 1. Vérifier si le projet est ouvert
    if (project.status === 'closed') {
      return res.status(400).json({ message: "Projet fermé aux investissements." });
    }

    // 2. Vérifier la limite de 50% par investisseur
    const maxAllowed = project.targetCapital * (project.maxInvestmentPercentage / 100);
    if (amount > maxAllowed) {
      return res.status(400).json({ message: `L'investissement dépasse la limite autorisée (${project.maxInvestmentPercentage}%).` });
    }

    // 3. Vérifier le capital restant
    const remaining = project.targetCapital - project.currentCapital;
    if (amount > remaining) {
      return res.status(400).json({ message: `Le montant dépasse le capital restant (${remaining}€).` });
    }

    // 4. Vérifier le solde de l'investisseur
    if (investor.balance < amount) {
      return res.status(400).json({ message: "Solde insuffisant." });
    }

    // Mise à jour (Transactions recommandées en production)
    project.currentCapital += amount;
    investor.balance -= amount;

    // Fermeture automatique si capital atteint
    if (project.currentCapital >= project.targetCapital) {
      project.status = 'closed';
    }

    await project.save();
    await investor.save();
    
    // Créer l'enregistrement de l'investissement
    const investment = await Investment.create({
      project: projectId,
      investor: investorId,
      amount,
      percentage: (amount / project.targetCapital) * 100
    });

    res.status(201).json(investment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// MES INVESTISSEMENTS
exports.getMyInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ investor: req.user.id })
      .populate('project', 'title targetCapital');
    res.json(investments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};