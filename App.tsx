
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import Timeline from './components/Timeline';
import FloatingMenu from './components/FloatingMenu';
import Stats from './components/Stats';
import Achievements from './components/Achievements';
import Library from './components/Library';
import AddGame from './components/AddGame';
import FinishGame from './components/FinishGame';
import DropGame from './components/DropGame';
import Playground from './components/Playground';
import Settings from './components/Settings';
import Header from './components/Header';
import { GameProvider, useGames } from './context/GameContext';
import { Toaster } from './components/ui/toaster';

const Footer = () => (
  <footer className="text-center py-8 text-muted-foreground text-sm">
    <p>GameLine v1.0</p>
    <p className="mt-1">Sua memória gamer pessoal.</p>
  </footer>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const RouteGuard: React.FC = () => {
    const { userProfile } = useGames();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!userProfile.name && location.pathname !== '/settings') {
            navigate('/settings', { replace: true });
        }
    }, [userProfile, location, navigate]);

    return null;
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <Router>
        <ScrollToTop />
        <RouteGuard />
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground dark">
          {/* Decorative background blobs - Updated for new tokens */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>

          <Header />

          <main className="relative z-10 min-h-[calc(100vh-5rem)]">
            <Routes>
              <Route path="/" element={<Timeline />} />
              <Route path="/library" element={<Library />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/add" element={<AddGame />} />
              <Route path="/finish" element={<FinishGame />} />
              <Route path="/drop" element={<DropGame />} />
              <Route path="/playground" element={<Playground />} />
            </Routes>
          </main>

          <Footer />
          <FloatingMenu />
          <Toaster />
        </div>
      </Router>
    </GameProvider>
  );
};

export default App;
