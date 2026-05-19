const User = require('../models/user');
const Investment = require('../models/Investment');

exports.getGlobalStats = async (req, res) => {
  try {
    const totalInvestors = await User.countDocuments({ role: 'investor' });
    const totalOwners = await User.countDocuments({ role: 'owner' });
    
    // Récupérer tous les investissements avec détails
    const allInvestments = await Investment.find()
      .populate('investor', 'name email')
      .populate('project', 'title');

    res.json({
      stats: { totalInvestors, totalOwners },
      activities: allInvestments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LISTER TOUS LES UTILISATEURS PAR RÔLE
exports.getAllByRole = async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// VOIR PORTEFEUILLE D'UN UTILISATEUR
exports.getUserPortfolio = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if (user.role === 'investor') {
      const invs = await Investment.find({ investor: userId }).populate('project');
      return res.json({ user, investments: invs });
    } else {
      const projs = await Project.find({ owner: userId });
      return res.json({ user, projects: projs });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};