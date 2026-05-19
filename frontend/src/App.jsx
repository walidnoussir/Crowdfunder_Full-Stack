import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';

// Composant de protection Strict (Redirection si pas de token)
const ProtectedLayout = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  
  // Ila makaynch token, rj3ih direct l /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex bg-neutral-100 min-h-screen">
      {/* Space 🧩 temporaire pour la Sidebar du collègue */}
      <div className="w-64 bg-brand-dark text-slate-300 p-6 min-h-screen flex flex-col justify-between">
        <div>
          <div className="h-10 w-full bg-slate-700/30 rounded mb-8"></div>
          <nav className="flex flex-col gap-4 font-semibold">
            <span className="text-white border-l-2 border-brand-purple pl-2">Dashboard</span>
            <span className="opacity-60 pl-2">Projects</span>
            <span className="opacity-60 pl-2">Create Projects</span>
          </nav>
        </div>
        <div className="text-brand-red font-bold cursor-pointer">Logout &rarr;</div>
      </div>

      {/* Contenu de la page */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* Routes publiques (Si connecté, on l'envoie au dashboard automatiquement) */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" replace />} />

        {/* Routes privées sécurisées */}
        <Route path="/" element={
          <ProtectedLayout>
            <div className="bg-white p-8 rounded-[32px] shadow-sm">
              <h1 className="text-3xl font-bold text-black">Tableau de bord</h1>
              <p className="text-gray-500 mt-2">Vue d’ensemble de tes projets collaboratifs.</p>
            </div>
          </ProtectedLayout>
        } />

        {/* Sécurité si le chemin n'existe pas */}
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;