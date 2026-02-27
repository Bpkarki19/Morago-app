import './App.css'
import { SplashScreen } from './pages/SplashScreen/SplashScreen';
import { OnboardingPage } from './pages/OnboardingPage/OnboardingPage';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage/LoginPage';
import { ClientHomePage } from './pages/ClientHomePage/ClientHomePage';
import { SignupPage } from './pages/SignupPage/SignupPage';
import { TopUp } from './pages/TopUp/TopUp';
import { ResultPage } from './pages/ResultPage/ResultPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { EditProfile } from './pages/EditProfile/EditProfile';
import { ChangePassword } from './pages/ChangePassword/ChangePassword';
import { AvailableTranslators } from './pages/Translators/AvailableTranslators';
import { PublicLayout } from './layouts/PublicLayout';
import { PrivateLayout } from './layouts/PrivateLayout';
import { TranslatorProfileEdit } from './pages/TranslatorProfileEdit/TranslatorProfileEdit';
import { TranslatorHomePage } from './pages/TranslatorHome/TranslatorHomePage';
import { WithdrawFundsPage } from './pages/TranslatorWithdrawl/WithdrawFunds';
import { RoleProtectedRoute } from './components/RoleProtectedRoute';

function App() {
  const [showSplash, setShowSplash] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className='appContainer'>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Authenticated Routes */}
        <Route element={<PrivateLayout />}>
          {/* Shared Authenticated Routes */}
          <Route path="/result" element={<ResultPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />

          {/* Client Only Routes */}
          <Route element={<RoleProtectedRoute allowedRoles={['ROLE_USER']} />}>
            <Route path="/home" element={<ClientHomePage />} />
            <Route path="/topup" element={<TopUp />} />
            <Route path="/available-translators" element={<AvailableTranslators />} />
          </Route>

          {/* Translator Only Routes */}
          <Route element={<RoleProtectedRoute allowedRoles={['ROLE_TRANSLATOR']} />}>
            <Route path="/translator-home" element={<TranslatorHomePage />} />
            <Route path="/withdraw" element={<WithdrawFundsPage />} />
            <Route path="/translator-profile-edit" element={<TranslatorProfileEdit />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
