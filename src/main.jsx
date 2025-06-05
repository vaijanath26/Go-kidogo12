import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

// Layout and Pages
import Layout from './component/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import City from './pages/City.jsx';
import Partner from './pages/Partner.jsx';
import GokidoTool from './pages/GokidoTool.jsx';
import Login from './pages/Login.jsx';
import SignupPage from './pages/SignupPage.jsx';
import Imprint from './pages/Imprint.jsx';
import Conditions from './pages/Conditions.jsx';
import Cookie from './pages/Cookie.jsx';
import Faq from './pages/Faq.jsx';
import Privacy from './pages/Privacy.jsx';
import PartnerDetailPage from './pages/PartnerDetailPage.jsx';
import Navbar from './component/Navbar.jsx';
import SearchResults from './component/SearchResults';

// Optional: Custom error component
const ErrorBoundary = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Oops! Page Not Found or an Error Occurred.</h2>
      <p>Please try again or check the URL.</p>
    </div>
  );
};

// Define the router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path="city" element={<City />} />
      <Route path="partner" element={<Partner />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="gokido-tool" element={<GokidoTool />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="imprint" element={<Imprint />} />
      <Route path="conditions" element={<Conditions />} />
      <Route path="cookie" element={<Cookie />} />
      <Route path="faq" element={<Faq />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="partner/:partnerId" element={<PartnerDetailPage />} />
      <Route path="Navbar" element={<Navbar />} />
      <Route path="search" element={<SearchResults />} />
    </Route>
  )
);

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
