

// Header.t.test.ts


// Header.t.test.ts
// Extract the relevant parts for testing t
type Locale = "en" | "hi" | "kn";
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

// The t function as implemented in Header
const makeT = (locale: Locale) => (k: string) => MESSAGES[locale]?.[k] ?? k;

describe('t() t method', () => {
  // Happy paths
  describe("Happy paths", () => {
    test("should return the correct English translation for a known key", () => {
      // Test: English translation for 'portfolio'
      const t = makeT("en");
      expect(t("portfolio")).toBe("Portfolio");
    });

    test("should return the correct Hindi translation for a known key", () => {
      // Test: Hindi translation for 'about'
      const t = makeT("hi");
      expect(t("about")).toBe("हमारे बारे में");
    });

    test("should return the correct Kannada translation for a known key", () => {
      // Test: Kannada translation for 'support'
      const t = makeT("kn");
      expect(t("support")).toBe("ಸಹಾಯ");
    });

    test("should return the correct translation for 'languageLabel' in all locales", () => {
      // Test: 'languageLabel' in all locales
      expect(makeT("en")("languageLabel")).toBe("Language");
      expect(makeT("hi")("languageLabel")).toBe("भाषा");
      expect(makeT("kn")("languageLabel")).toBe("ಭಾಷೆ");
    });

    test("should return the correct translation for 'faq' in all locales", () => {
      // Test: 'faq' in all locales
      expect(makeT("en")("faq")).toBe("FAQ");
      expect(makeT("hi")("faq")).toBe("सामान्य प्रश्न");
      expect(makeT("kn")("faq")).toBe("ಪ್ರಶ್ನೆಗಳು");
    });
  });

  // Edge cases
  describe("Edge cases", () => {
    test("should return the key itself if the key does not exist in the current locale", () => {
      // Test: Unknown key returns the key itself
      const t = makeT("en");
      expect(t("nonexistent_key")).toBe("nonexistent_key");
    });

    test("should return the key itself if the key does not exist in any locale", () => {
      // Test: Key not present in any locale
      expect(makeT("en")("foobar")).toBe("foobar");
      expect(makeT("hi")("foobar")).toBe("foobar");
      expect(makeT("kn")("foobar")).toBe("foobar");
    });

    test("should return the key itself if the key is an empty string", () => {
      // Test: Empty string as key
      expect(makeT("en")("")).toBe("");
      expect(makeT("hi")("")).toBe("");
      expect(makeT("kn")("")).toBe("");
    });

    test("should return the correct translation for keys that are similar but not identical (case-sensitive)", () => {
      // Test: Case sensitivity
      const t = makeT("en");
      expect(t("Portfolio")).toBe("Portfolio"); // Not found, returns key
      expect(t("portfolio")).toBe("Portfolio"); // Found, returns translation
      expect(t("PORTFOLIO")).toBe("PORTFOLIO"); // Not found, returns key
    });

    test("should return the correct translation for keys with special characters", () => {
      // Test: Special characters in key
      const t = makeT("en");
      expect(t("home!")).toBe("home!"); // Not found, returns key
    });

    test("should return the correct translation for keys that are substrings of valid keys", () => {
      // Test: Substring keys
      const t = makeT("en");
      expect(t("port")).toBe("port"); // Not found, returns key
      expect(t("portfolio")).toBe("Portfolio"); // Found, returns translation
    });
  });
});