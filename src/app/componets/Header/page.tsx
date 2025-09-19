// components/Header.tsx
"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

type Locale = "en" | "hi" | "kn";
const LOCALES: Locale[] = ["en", "hi", "kn"];
const LOCALE_KEY = "site_locale";

const MESSAGES: Record<Locale, Record<string, string>> = {
  en: {
    portfolio: "Portfolio",
    home: "Home",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    services: "Services",
    features: "Features",
    payments: "Payments",
    contact: "Contact",
    faq: "FAQ",
    blog: "Blog",
    support: "Support",
    languageLabel: "Language",
  },
  hi: {
    portfolio: "पोर्टफोलियो",
    home: "होम",
    about: "हमारे बारे में",
    experience: "अनुभव",
    projects: "प्रोजेक्ट्स",
    services: "सेवाएँ",
    features: "फ़ीचर्स",
    payments: "भुगतान",
    contact: "संपर्क",
    faq: "सामान्य प्रश्न",
    blog: "ब्लॉग",
    support: "सपोर्ट",
    languageLabel: "भाषा",
  },
  kn: {
    portfolio: "ಪೋರ್ಟ್‌ಫೋಲಿಯೊ",
    home: "ಮನೆ",
    about: "ಗುರುತು",
    experience: "ಅನುಭವ",
    projects: "ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು",
    services: "ಸೇವೆಗಳು",
    features: "ವೈಶಿಷ್ಟ್ಯಗಳು",
    payments: "ಪಾವತಿಗಳು",
    contact: "ಸಂಪರ್ಕ",
    faq: "ಪ್ರಶ್ನೆಗಳು",
    blog: "ಬ್ಲಾಗ್",
    support: "ಸಹಾಯ",
    languageLabel: "ಭಾಷೆ",
  },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // detect initial locale from localStorage or default en
  const initial = useMemo<Locale>(() => {
    try {
      const stored = typeof window !== "undefined" ? (localStorage.getItem(LOCALE_KEY) as Locale | null) : null;
      if (stored && LOCALES.includes(stored)) return stored;
    } catch (e) {}
    return "en";
  }, []);

  const [locale, setLocale] = useState<Locale>(initial);

  // sync document lang when locale changes
  useEffect(() => {
    try {
      document.documentElement.lang = locale === "en" ? "en" : locale === "hi" ? "hi" : "kn";
    } catch (e) {}
  }, [locale]);

  // If another tab or code updated localStorage, reflect it (cross-tab)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LOCALE_KEY && e.newValue && LOCALES.includes(e.newValue as Locale)) {
        const newLoc = e.newValue as Locale;
        setLocale(newLoc);
        // also emit custom event for same-tab listeners
        window.dispatchEvent(new CustomEvent("localeChange", { detail: newLoc }));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    try {
      localStorage.setItem(LOCALE_KEY, newLocale);
    } catch (e) {}
    // Emit custom event in this tab so other components can react immediately
    window.dispatchEvent(new CustomEvent("localeChange", { detail: newLocale }));
    // don't navigate anywhere — only change UI language in-place
  };

  const t = (k: string) => MESSAGES[locale]?.[k] ?? k;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo / Name */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          {t("portfolio")}
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="hover:text-blue-500">{t("about")}</Link>
          <Link href="/experience" className="hover:text-blue-500">{t("experience")}</Link>
          <Link href="/projects" className="hover:text-blue-500">{t("projects")}</Link>
          <Link href="/services" className="hover:text-blue-500">{t("services")}</Link>
          <Link href="/features" className="hover:text-blue-500">{t("features")}</Link>
          <Link href="/payments" className="hover:text-blue-500">{t("payments")}</Link>
          <Link href="/contact" className="hover:text-blue-500">{t("contact")}</Link>
          <Link href="/fAQ" className="hover:text-blue-500">{t("faq")}</Link>
          <Link href="/blog" className="hover:text-blue-500">{t("blog")}</Link>
          <Link href="/Support" className="hover:text-blue-500">{t("support")}</Link>

          {/* Language selector */}
          <div className="ml-2">
            <label className="sr-only">{t("languageLabel")}</label>
            <select
              aria-label="Choose language"
              value={locale}
              onChange={(e) => changeLocale(e.target.value as Locale)}
              className="px-2 py-1 border rounded"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="md:hidden p-2 rounded focus:outline-none focus:ring"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 px-6 py-4">
          <nav className="flex flex-col items-end space-y-3 text-left">
            <Link href="/about" onClick={() => setIsOpen(false)} className="block w-full">{t("about")}</Link>
            <Link href="/experience" onClick={() => setIsOpen(false)} className="block w-full">{t("experience")}</Link>
            <Link href="/projects" onClick={() => setIsOpen(false)} className="block w-full">{t("projects")}</Link>
            <Link href="/services" onClick={() => setIsOpen(false)} className="block w-full">{t("services")}</Link>
            <Link href="/features" onClick={() => setIsOpen(false)} className="block w-full">{t("features")}</Link>
            <Link href="/payments" onClick={() => setIsOpen(false)} className="block w-full">{t("payments")}</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block w-full">{t("contact")}</Link>
            <Link href="/fAQ" onClick={() => setIsOpen(false)} className="block w-full">{t("faq")}</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="block w-full">{t("blog")}</Link>
            <Link href="/Support" onClick={() => setIsOpen(false)} className="block w-full">{t("support")}</Link>

            <div className="w-full pt-2">
              <select
                aria-label="Choose language"
                value={locale}
                onChange={(e) => { changeLocale(e.target.value as Locale); setIsOpen(false); }}
                className="w-full p-2 border rounded"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="kn">ಕನ್ನಡ</option>
              </select>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
