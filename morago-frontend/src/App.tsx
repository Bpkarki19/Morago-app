import './App.css'
import { SplashScreen } from './pages/SplashScreen/SplashScreen';
import { OnboardingPage } from './pages/OnboardingPage/OnboardingPage';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage/LoginPage';
import { ClientHomePage } from './pages/ClientHomePage/ClientHomePage';
import { SignupPage } from './pages/SignupPage/SignupPage';
import { TopUp } from './pages/TopUp/TopUp';
import { ResultPage } from './pages/ResultPage/ResultPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { EditProfile } from './pages/EditProfile/EditProfile';
import { ChangePassword } from './pages/ChangePassword/ChangePassword';
import { Footer } from './pages/Footer/Footer';
import { AvailableTranslators } from './pages/Translators/AvailableTranslators';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  // Check if user is logged in (token exists)
  const isLoggedIn = !!localStorage.getItem('token');

  // Routes where the Footer should NOT be displayed
  const hideFooterRoutes = ['/', '/login', '/signup', '/edit-profile', '/change-password'];

  // Show footer only if logged in and NOT on a public/auth route
  const shouldShowFooter = isLoggedIn && !hideFooterRoutes.includes(location.pathname);

  return (
    <div className='appContainer'>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<ClientHomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/topup" element={<TopUp />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/available-translators" element={<AvailableTranslators />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  )
}

export default App;
