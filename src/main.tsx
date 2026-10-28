import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* Vercel Web Analytics: cookieless page-view + referrer data, no consent banner needed */}
    <Analytics />
    {/* Vercel Speed Insights: real Core Web Vitals from visitors, cookieless */}
    <SpeedInsights />
  </StrictMode>,
)
