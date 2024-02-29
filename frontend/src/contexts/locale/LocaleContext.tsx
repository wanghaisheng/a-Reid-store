import React, { createContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

type LocaleContextType = {
  lang: string;
  handleSetLang: (lang: string) => void;
};

export const LocaleContext = createContext<LocaleContextType>(null!);

const LocaleContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const userLang = localStorage.getItem('locale');
  const browserLang = i18n.resolvedLanguage;
  const [lang, setLang] = useState(userLang ? userLang! : browserLang!);

  const handleSetLang = (lang: string) => {
    setLang(lang);
    localStorage.setItem('locale', lang);
  };

  return (
    <LocaleContext.Provider value={{ lang, handleSetLang }}>{children}</LocaleContext.Provider>
  );
};

export default LocaleContextProvider;
