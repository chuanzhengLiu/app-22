import React from 'react';
import './LanguageSelector.less';

interface Props {
  currentLang: string;
}

const LanguageSelector: React.FC<Props> = ({ currentLang }) => {
  const toggleLanguage = () => {
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    const currentPath = window.location.pathname;
    
    // Simple logic to switch path prefix
    let newPath = currentPath;
    if (currentLang === 'zh') {
        // zh -> en: add /en prefix
        newPath = `/en${currentPath === '/' ? '' : currentPath}`;
    } else {
        // en -> zh: remove /en prefix
        newPath = currentPath.replace(/^\/en/, '') || '/';
    }
    
    window.location.href = newPath;
  };

  return (
    <button className="lang-selector" onClick={toggleLanguage}>
      <span className={currentLang === 'zh' ? 'active' : ''}>中文</span>
      <span className="divider">/</span>
      <span className={currentLang === 'en' ? 'active' : ''}>EN</span>
    </button>
  );
};

export default LanguageSelector;
