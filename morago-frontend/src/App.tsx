import './App.css'
import { SplashScreen } from './pages/SplashScreen/SplashScreen';
import { OnboardingPage } from './pages/OnboardingPage/OnboardingPage';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'

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
    <>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>

    </>
  )
}

export default App;
