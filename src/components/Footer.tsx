import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-conteudo">
        <p>© 2026 John Dev's. Todos os direitos reservados.</p>
        <div className="redes-sociais">
          <a href="https://github.com/jonathanoliveira94" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/jonathan-de-oliveira94/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};
