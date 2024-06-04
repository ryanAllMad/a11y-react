import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@deque/cauldron-react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider initialTheme='light'>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
