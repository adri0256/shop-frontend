import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BaseLayout } from './Components/Layout/BaseLayout'

import './App.css'

function App() {
  const Home = lazy(() => import('./Pages/Home/Home'));
  const Login = lazy(() => import('./Pages/Login/Login'));

  const lazyLoad = (Component: React.LazyExoticComponent<() => JSX.Element>) => {
    return (
      <Suspense fallback={
        <div className="loading">
          <p>Loading...</p>
        </div>
      }>
        <Component />
      </Suspense>
    );
  }

  return (
    <BrowserRouter>
      <BaseLayout>
        <Routes>
          <Route path="/Home" element={lazyLoad(Home)} />
          <Route path="/Login" element={lazyLoad(Login)} />
          <Route path="*" element={<Navigate to="/Home" />} />
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  )
}

export default App
