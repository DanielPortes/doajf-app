// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './input.css'; // Importa o CSS do Tailwind
import App from './App.jsx'; // Importa seu componente principal com as rotas

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);