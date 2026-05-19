const Project = require('../models/Project');


exports.createProject = async (req, res) => {
  try {
    const { title, description, targetCapital, initialInvestment, maxPercentage } = req.body;
    
    const newProject = await Project.create({
      title,
      description,
      targetCapital,
      currentCapital: initialInvestment || 0,
      maxInvestmentPercentage: maxPercentage || 50,
      owner: req.user.id,
      status: 'open'
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user.id });
  res.json(projects);
};
// MODIFIER UN PROJET (Avant fermeture)
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, owner: req.user.id });
    if (!project) return res.status(404).json({ message: "Projet non trouvé" });
    if (project.status === 'closed') return res.status(400).json({ message: "Projet déjà fermé" });

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SUPPRIMER UN PROJET
exports.deleteProject = async (req, res) => {
  try {
    await Project.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    res.json({ message: "Projet supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// FERMER MANUELLEMENT
exports.closeProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { status: 'closed' },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};