import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((result) => {
      if (!result.error) {
        navigate('/home'); // Rediriger vers le Dashboard après succès
      }
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col justify-center items-center p-4">      
      <div className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-xl flex flex-col items-center">
        <h2 className="text-3xl font-bold text-black mb-8">Connexion</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm ml-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-12 bg-gray-200 rounded-2xl px-4 outline-none border-none focus:ring-2 focus:ring-brand-green/50 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm ml-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-12 bg-gray-200 rounded-2xl px-4 outline-none border-none focus:ring-2 focus:ring-brand-green/50 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl mt-4 transition duration-200 flex items-center justify-center text-lg"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-1 text-sm">
          <p className="text-gray-600">Pas encore de compte ?</p>
          <Link to="/register" className="text-green-600 font-semibold hover:underline">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;