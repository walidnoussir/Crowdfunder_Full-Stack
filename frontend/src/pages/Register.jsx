import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'owner', // Rôle par défaut
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((result) => {
      if (!result.error) {
        navigate('/login'); // Rediriger vers login après inscription réussie
      }
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col justify-center items-center p-4">
      <span className="text-gray-500 self-start mb-4 ml-4 text-sm font-semibold">Register</span>

      <div className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-xl flex flex-col items-center">
        <h2 className="text-3xl font-bold text-black mb-6">Créer un compte</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm ml-1">Nom complet</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full h-12 bg-brand-grayBg rounded-2xl px-4 outline-none border-none focus:ring-2 focus:ring-brand-green/50 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm ml-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-12 bg-brand-grayBg rounded-2xl px-4 outline-none border-none focus:ring-2 focus:ring-brand-green/50 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm ml-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="••••••"
              onChange={handleChange}
              required
              className="w-full h-12 bg-brand-grayBg rounded-2xl px-4 outline-none border-none focus:ring-2 focus:ring-brand-green/50 transition placeholder-gray-400"
            />
          </div>

          {/* AJOUT DU CHAMP SELECT ROLE */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm ml-1">Rôle de l'utilisateur</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full h-12 bg-brand-grayBg rounded-2xl px-4 outline-none border-none focus:ring-2 focus:ring-brand-green/50 transition cursor-pointer text-gray-700"
            >
              <option value="owner">Porteur de projet (Owner)</option>
              <option value="investor">Investisseur (Investor)</option>
              <option value="admin">Administrateur (Admin)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-brand-green hover:bg-green-700 text-white font-bold rounded-2xl mt-4 transition duration-200 flex items-center justify-center text-lg"
          >
            {isLoading ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between w-full text-sm px-2">
          <span className="text-gray-600">Déjà un compte ?</span>
          <Link to="/login" className="text-brand-green font-semibold hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;