import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';

//================================================================================
// 1. PRODUCTION DEPENDENCIES (Firebase)
// These are the imports for our live backend.
//================================================================================
/*
// Uncomment these lines when you deploy and link your Firebase project
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  getFirestore, collection, doc, onSnapshot,
  addDoc, serverTimestamp
} from 'firebase/firestore';
*/

// Mock Firebase for prototype to prevent errors
const initializeApp = () => ({});
const getAuth = () => ({});
const onAuthStateChanged = (auth, callback) => callback(null); // No user
const signInWithEmailAndPassword = () => alert("PRODUCTION: signInWithEmailAndPassword()");
const signOut = () => alert("PRODUCTION: signOut()");
const getFirestore = () => ({});
const collection = () => ({});
const doc = () => ({});
const onSnapshot = (ref, callback) => callback({ docs: [] }); // Empty
const addDoc = () => alert("PRODUCTION: addDoc()");
const serverTimestamp = () => new Date();


//================================================================================
// 2. STYLING & FONT CONFIGURATION
//================================================================================
const StyleInjector = () => {
  useEffect(() => {
    // 1. Add Google Fonts
    const fontsLink = document.createElement('link');
    fontsLink.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Source+Sans+Pro:wght@400;600;700&display=swap";
    fontsLink.rel = "stylesheet";
    document.head.appendChild(fontsLink);

    // 2. Add Tailwind Configuration
    const tailwindScript = document.createElement('script');
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);

    const configScript = document.createElement('script');
    configScript.innerHTML = `
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              'sans': ['Source Sans Pro', 'sans-serif'],
              'serif': ['EB Garamond', 'serif'],
            },
            colors: {
              stone: {
                50: '#fafaf9',
                100: '#f5f5f4',
                200: '#e7e5e4',
                300: '#d6d3d1',
                400: '#a8a29e',
                500: '#78716c',
                600: '#57534e',
                700: '#44403c',
                800: '#292524',
                900: '#1c1917',
                950: '#0c0a09',
              }
            }
          }
        }
      }
    `;
    document.head.appendChild(configScript);

    // 3. Add global styles (Minimalistic UI)
    const globalStyle = document.createElement('style');
    globalStyle.innerHTML = `
      body {
        font-family: 'Source Sans Pro', 'sans-serif';
        background-color: #ffffff;
        color: #292524; /* stone-800 */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      h1, h2, h3, h4, h5, .font-brand {
        font-family: 'EB Garamond', 'serif';
      }
      .font-darija {
        font-size: 1.15rem; /* Slightly more subtle */
        font-weight: 500;
        color: #57534e; /* stone-600 */
        direction: rtl; /* Right-to-left for Arabic script */
      }
      html { scroll-behavior: smooth; }
      /* Modal Animation */
      .modal-fade-in { animation: fadeIn 0.3s ease-out; }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      /* Installment Tab (Minimalistic) */
      .installment-tab {
        transition: background-color 0.2s, color 0.2s;
      }
      .installment-tab.active-tab {
        background-color: #1c1917; /* stone-900 */
        color: #ffffff;
        font-weight: 600;
      }
      /* Focus Ring */
      select:focus, button:focus, input:focus, a:focus {
        outline: none;
        box-shadow: 0 0 0 2px #a8a29e; /* stone-400 */
        border-radius: 0.375rem; /* rounded-md */
      }
      /* Horizontal Scroll container */
      .horizontal-scroll-container {
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
      }
      .horizontal-scroll-container::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
      }
    `;
    document.head.appendChild(globalStyle);

  }, []);
  return null;
};

//================================================================================
// 3. SVG ICON LIBRARY (Minimalistic)
//================================================================================

const IconCheck = ({ className = "w-5 h-5" }) => ( // Smaller
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);
const IconPlay = ({ className = "w-16 h-16" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
  </svg>
);
const IconPlus = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);
const IconMinus = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);
const IconClose = ({ className = "w-6 h-6" }) => ( // Thinner
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const IconMenu = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const IconArrowRight = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);
const IconBookOpen = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
  </svg>
);
const IconUsers = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-4.682 2.72a.75.75 0 01-.063-.768A5.25 5.25 0 0115.75 12a.75.75 0 01.75.75v3.372c0 .414-.336.75-.75.75h-1.5a.75.75 0 01-.75-.75v-3.372a5.25 5.25 0 012.063-4.133.75.75 0 01.063-.768 9.094 9.094 0 00-3.741-.479h-.001a9.094 9.094 0 00-3.741.479.75.75 0 01.063.768A5.25 5.25 0 019 12a.75.75 0 01.75.75v3.372c0 .414-.336.75-.75.75h-1.5a.75.75 0 01-.75-.75v-3.372a5.25 5.25 0 012.063-4.133.75.75 0 01.063-.768 9.094 9.094 0 00-3.741.479m-.001 0a9.094 9.094 0 00-3.741-.479m7.482 0a9.094 9.094 0 01-3.741-.479M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
  </svg>
);
const IconPercent = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m-4.5-3.493V10.5h3.493M19.5 19.5l-6-6m4.5 3.493V9h-3.493" />
  </svg>
);
const IconLink = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);
const IconClock = ({ className = "w-5 h-5" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const IconChevronLeft = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);
const IconChevronRight = ({ className = "w-6 h-6" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);
const IconSparkles = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624l.259 1.035.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 18l1.035.259a3.375 3.375 0 002.456 2.456z" />
  </svg>
);
const IconCode = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5 0l-4.5 16.5" />
  </svg>
);

//================================================================================
// 4. MOCK DATABASE & NEW PRICE MATRIX (Confirmed)
//================================================================================

// NEW: Prices updated from "Project ChihEFL_ Optimized Price Matrix.pdf"
const PILOT_COURSES_DATA = [
  {
    id: 'pilot-t1',
    tier: 'Tier 1: Live',
    name: 'A1-B1 Pilot Program (Live)',
    description: 'The 6-month pilot program. Be the first to join this high-touch live course.',
    priceDZD: 32900,
    priceEUR: 999, // N/A
    priceUSD: 999, // N/A
    priceCAD: 999, // N/A
    seats: 60,
    features: [
      '6-Month Pilot Program',
      'Capped live classes (60 students)',
      'Direct access to Chiheb',
      'Personalized feedback',
    ],
    duration: 6,
    installments: ['2'],
  },
  {
    id: 'pilot-t2',
    tier: 'Tier 2: Recorded',
    name: 'A1-B1 Pilot Program (Recorded)',
    description: 'The 6-month self-paced recorded version of the pilot program.',
    priceDZD: 19900,
    priceEUR: 999, // N/A
    priceUSD: 999, // N/A
    priceCAD: 999, // N/A
    seats: null,
    features: [
      '6-Month Pilot Program',
      'All recorded Tier 1 lessons',
      'Community & support',
      'Self-paced learning'
    ],
    duration: 6,
    installments: ['2'],
  },
];

// NEW: Prices updated from "Project ChihEFL_ Optimized Price Matrix.pdf"
const PHASE_2_COURSES_DATA = [
  {
    id: 'p2a-t1',
    tier: 'Tier 1: Live',
    name: 'A1-B1 Foundations (Live)',
    description: 'The complete 10-month journey from beginner to intermediate with live classes.',
    priceDZD: 59900,
    priceEUR: 299,
    priceUSD: 329,
    priceCAD: 439,
    seats: 120,
    features: [
      '10-Month Full Program',
      'Capped live classes (120 students)',
      'Direct access to Chiheb',
      'Includes all Tier 2 content'
    ],
    duration: 10,
    installments: ['1', '2', '3'],
  },
  {
    id: 'p2a-t2',
    tier: 'Tier 2: Recorded',
    name: 'A1-B1 Foundations (Recorded)',
    description: 'The 10-month self-paced, scalable recorded course. Our primary profit engine.',
    priceDZD: 34900,
    priceEUR: 179,
    priceUSD: 199,
    priceCAD: 259,
    seats: null,
    features: [
      '10-Month Full Program',
      'All recorded Tier 1 lessons',
      'Lifetime access to materials',
      'Community & support'
    ],
    duration: 10,
    installments: ['1', '2', '3'],
  },
  {
    id: 'p2b-t1',
    tier: 'Tier 1: Live',
    name: 'B2-C2 Advanced (Live)',
    description: 'Master advanced grammar, nuance, and professional communication in 10 months.',
    priceDZD: 69900,
    priceEUR: 379,
    priceUSD: 399,
    priceCAD: 549,
    seats: 60,
    features: [
      '10-Month Full Program',
      'Capped live classes (60 students)',
      'Focus on accent & fluency',
      'Advanced professional English'
    ],
    duration: 10,
    installments: ['1', '2', '3'],
  },
  {
    id: 'p2b-t2',
    tier: 'Tier 2: Recorded',
    name: 'B2-C2 Advanced (Recorded)',
    description: 'The 10-month advanced curriculum, delivered as a self-paced recorded course.',
    priceDZD: 39900,
    priceEUR: 219,
    priceUSD: 239,
    priceCAD: 319,
    seats: null,
    features: [
      '10-Month Full Program',
      'All recorded Tier 1 lessons',
      'Lifetime access to materials',
      'Community & support'
    ],
    duration: 10,
    installments: ['1', '2', '3'],
  },
  {
    id: 'speaking-club',
    tier: 'Subscription',
    name: 'Monthly Speaking Club',
    description: 'Practice your speaking weekly in guided, small-group conversations.',
    priceDZD: 2490, // Per month
    priceEUR: 15,  // Per month
    priceUSD: 15,
    priceCAD: 20,
    seats: null,
    features: [
      'Monthly subscription',
      'Practice speaking weekly',
      'Correct your pronunciation',
      'Build confidence'
    ],
    duration: 1, // Billed monthly
    installments: ['1'],
  },
];

// Testimonials and Community data remains the same
const TESTIMONIALS_DATA = [
  { id: 1, market: 'INTL', name: 'Fatima Z.', location: 'Student, Lyon (From Oran)', quote: "This is the best English course I've ever taken. Chiheb understands exactly how we think and makes learning simple. I got the job I wanted in France thanks to him!" },
  { id: 2, market: 'DZ', name: 'Mohamed A.', location: 'Developer, Algiers', quote: "كنت حاصل في الإنجليزية، بصح مع شهاب كلش تبدل. الدورة تاعو عاونتni بزاف." },
  { id: 3, market: 'INTL', name: 'Amira B.', location: 'Student, Montreal', quote: "Finally, a course for *us*. The community is amazing and the live classes are so much fun. I feel so much more confident speaking English in Montreal." },
  { id: 4, market: 'DZ', name: 'Yacine K.', location: 'Engineer, Constantine', quote: "The Tier 2 recorded course is perfect for my busy schedule. I study after work and have already seen a huge improvement in my professional emails." },
];
const COMMUNITY_MESSAGES = [
  { id: 1, user: 'Chiheb Aimeur', role: 'Instructor', time: '5m ago', message: 'Welcome to the Phase 2 launch! The first T1 live class is this Monday. T2 students, your first module is unlocked. Let\'s get started!' },
  { id: 2, user: 'Amira B.', role: 'Student', time: '1h ago', message: 'Hello from Montreal! So excited to be here. Just finished the first lesson of the B2-C2 track.' },
  { id: 3, user: 'Mohamed A.', role: 'Student', time: '3h ago', message: 'Question for the group: What\'s the best way to practice past participle? I always mix them up.' },
];

//================================================================================
// 5. PRODUCTION-READY HOOKS & CONTEXT
//================================================================================

const AppContext = createContext();

// NEW: `useProjectPhase` hook. This is our live timeline logic.
// It automatically determines the phase based on the current date.
const useProjectPhase = () => {
  const [now, setNow] = useState(new Date()); // Oct 28, 2025

  return useMemo(() => {
    // Phase 0: Pre-Launch (Now -> Dec 31, 2025)
    if (now < new Date('2026-01-01')) {
      return 'PHASE_0_PRELAUNCH';
    }
    // Phase 1: Pilot (Jan 1, 2026 -> Jun 30, 2026)
    if (now < new Date('2026-07-01')) {
      return 'PHASE_1_PILOT';
    }
    // Summer Break (Jul 1, 2026 -> Aug 31, 2026)
    if (now < new Date('2026-09-01')) {
      return 'PHASE_Z_BREAK'; // Special phase for "coming soon"
    }
    // Phase 2: Scaling (Sep 1, 2026 -> Jun 30, 2027)
    if (now <= new Date('2027-06-30')) {
      return 'PHASE_2_SCALING';
    }
    // Project Complete
    return 'PHASE_X_COMPLETE';

  }, [now]); // This will re-calculate if the app is open for a long time
};

// NEW: `useGeoLocation` hook.
// In production, this runs once and sets the location.
// For the prototype, we default to 'DZ'.
const useGeoLocation = () => {
  const [location, setLocation] = useState('DZ'); // 'DZ', 'FR', 'US', 'CA'

  useEffect(() => {
    // PRODUCTION LOGIC:
    // const fetchGeoLocation = async () => {
    //   try {
    //     const response = await fetch('https://ip-api.com/json/?fields=countryCode');
    //     const data = await response.json();
    //     if (data.countryCode === 'DZ') setLocation('DZ');
    //     else if (data.countryCode === 'FR') setLocation('FR'); // France (EUR)
    //     else if (data.countryCode === 'CA') setLocation('CA'); // Canada (CAD)
    //     else if (data.countryCode === 'US') setLocation('US'); // USA (USD)
    //     else setLocation('FR'); // Default all other INTL to EUR
    //   } catch (error) {
    //     console.error("Geo-location failed, defaulting to EUR/FR", error);
    //     setLocation('FR'); // Default to EUR
    //   }
    // };
    // fetchGeoLocation();

    // PROTOTYPE LOGIC:
    setLocation('DZ'); // Default to Algeria for simulation
  }, []);

  return [location, setLocation];
};

/**
 * Formats a number into currency.
 * @param {number} amount - The number to format.
 ** @param {string} currency - 'DZD', 'EUR', 'USD', 'CAD'.
 * @returns {string} - Formatted currency string.
 */
const formatCurrency = (amount, currency) => {
  // FIX: Using string concatenation to be 100% safe from build errors.
  try {
    if (currency === 'DZD') {
      return Math.ceil(amount).toLocaleString('fr-FR') + ' DZD';
    }
    if (currency === 'EUR') {
      return '€' + amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (currency === 'USD') {
      return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' USD';
    }
    if (currency === 'CAD') {
      return '$' + amount.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' CAD';
    }
    return amount + ' ' + currency;
  } catch (e) {
    return amount + ' ' + currency;
  }
};

/**
 * NEW: Updated Price Calculator Hook for new Matrix
 */
const usePriceCalculator = (course, location, installments) => {
  return useMemo(() => {
    if (!course) return {};

    const isAlgeria = location === 'DZ';
    const installmentsNum = parseInt(installments, 10);

    // 1. Determine currency and base price
    let currency = 'EUR'; // Default
    let basePrice = course.priceEUR;

    if (location === 'DZ') {
      currency = 'DZD';
      basePrice = course.priceDZD;
    } else if (location === 'US') {
      currency = 'USD';
      basePrice = course.priceUSD;
    } else if (location === 'CA') {
      currency = 'CAD';
      basePrice = course.priceCAD;
    } else {
      // Default INTL to EUR (e.g., 'FR' or any other code)
      currency = 'EUR';
      basePrice = course.priceEUR;
    }

    // 2. Calculate prices
    const installmentPrice = basePrice / installmentsNum;
    const isSubscription = course.id === 'speaking-club';
    const duration = course.duration || 10;
    const monthlyPrice = basePrice / duration;

    // 3. Format strings
    const installmentPriceFormatted = formatCurrency(installmentPrice, currency);
    const totalPriceFormatted = formatCurrency(basePrice, currency);
    const monthlyPriceFormatted = formatCurrency(monthlyPrice, currency);

    const installmentText = isSubscription ? 'Per month' : (installmentsNum > 1 ? installmentsNum + ' payments of' : '1 single payment of');
    const perMonthText = isSubscription ? 'Billed monthly' : '(equiv. ' + monthlyPriceFormatted + ' / mo)';

    return {
      currency,
      basePrice,
      installmentPrice,
      installmentPriceFormatted,
      totalPriceFormatted,
      monthlyPriceFormatted,
      installmentText,
      perMonthText
    };
  }, [course, location, installments]);
};


//================================================================================
// 6. CORE APPLICATION COMPONENT (Firebase Ready)
//================================================================================
function App() {
  // --- Production-Ready State ---
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null); // Firebase user object
  const [isAuthReady, setIsAuthReady] = useState(false);

  // --- SPA State ---
  const [page, setPage] = useState('home'); // 'home', 'dashboard', 'masterclass', 'wallOfLove'

  // --- Production Hooks ---
  const [autoLocation, setAutoLocation] = useGeoLocation();
  const autoPhase = useProjectPhase();

  // --- Dev Tool Simulators ---
  const [devLocation, setDevLocation] = useState(null);
  const [devPhase, setDevPhase] = useState(null);
  const [showDevTools, setShowDevTools] = useState(false);

  // --- Effective State (Production OR Simulated) ---
  const location = devLocation || autoLocation;
  const projectPhase = devPhase || autoPhase;

  // --- Modal State ---
  const [modalData, setModalData] = useState(null); // { course, initialInstallments }

  // --- Firebase Initialization (Production) ---
  useEffect(() => {
    // This is where you connect your live backend
    // const firebaseConfig = JSON.parse(window.__firebase_config || '{}');
    // if (firebaseConfig.apiKey) {
    //   const app = initializeApp(firebaseConfig);
    //   const authInstance = getAuth(app);
    //   const dbInstance = getFirestore(app);
    //   setAuth(authInstance);
    //   setDb(dbInstance);

    //   // Auth listener
    //   const unsubscribe = onAuthStateChanged(authInstance, (user) => {
    //     setUser(user);
    //     setIsAuthReady(true);
    //   });
    //   return () => unsubscribe(); // Cleanup on unmount

    // } else {
    //   console.warn("Firebase config not found. Running in prototype mode.");
    //   setIsAuthReady(true); // Run in prototype mode
    // }

    // Prototype Mode:
    setIsAuthReady(true);

  }, []);

  // --- App Logic ---
  const openEnrollModal = (course, initialInstallments = '2') => {
    // CRITICAL: If we are in the Pilot Phase, force location to DZ.
    const effectiveLocation = projectPhase === 'PHASE_1_PILOT' ? 'DZ' : location;

    setModalData({
      course,
      initialInstallments,
      modalLocation: effectiveLocation,
      modalProjectPhase: projectPhase
    });
  };

  const closeEnrollModal = () => setModalData(null);

  const handleLogin = async (email, password) => {
    // PRODUCTION:
    // try {
    //   await signInWithEmailAndPassword(auth, email, password);
    //   setPage('dashboard');
    // } catch (error) {
    //   alert("Failed to login: " + error.message);
    // }

    // PROTOTYPE:
    setUser({ email: 'bassem.b@chih-efl.com', uid: 'mock-uid-bassem' });
    setPage('dashboard');
  };

  const handleLogout = async () => {
    // PRODUCTION:
    // await signOut(auth);
    // setPage('home');

    // PROTOTYPE:
    setUser(null);
    setPage('home');
  };

  const handleMasterclassSignup = () => setPage('masterclass');

  const contextValue = {
    page, setPage,
    projectPhase, setProjectPhase: setDevPhase, // Dev tool controls sim
    location, setLocation: setDevLocation, // Dev tool controls sim
    user,
    handleLogin, handleLogout,
    openEnrollModal,
    handleMasterclassSignup,
    db, auth,
    showDevTools, setShowDevTools,
  };

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage />;
      case 'dashboard': return <DashboardPage />;
      case 'masterclass': return <MasterclassPage />;
      case 'wallOfLove': return <WallOfLovePage />;
      default: return <HomePage />;
    }
  };

  const showUrgencyBanner = projectPhase === 'PHASE_2_SCALING' && page === 'home';

  // Wait for auth to be ready before rendering
  if (!isAuthReady) {
    return <div className="w-full h-screen flex items-center justify-center font-brand text-2xl">Loading Platform...</div>;
  }

  return (
    <AppContext.Provider value={contextValue}>
      <StyleInjector />
      <div className="flex flex-col min-h-screen">

        {showUrgencyBanner && (
          <div className="bg-stone-900 text-white p-2 text-center font-semibold text-sm">
            <IconClock className="w-4 h-4 inline-block mr-2" />
            Phase 2 Enrollment Closes Soon
          </div>
        )}

        <Header />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />

        {modalData && (
          <EnrollmentModal
            course={modalData.course}
            initialInstallments={modalData.initialInstallments}
            location={modalData.modalLocation}
            projectPhase={modalData.modalProjectPhase}
            onClose={closeEnrollModal}
          />
        )}

        {showDevTools && <DevToolsPanel />}
      </div>
    </AppContext.Provider>
  );
}

//================================================================================
// 7. HEADER (Minimalistic)
//================================================================================
const Header = () => {
  const { page, setPage, user, handleLogin } = useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // More subtle, linear nav link style
  const navLinkClass = "font-semibold text-stone-500 hover:text-stone-900 transition-colors py-2";

  return (
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-stone-200">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* Slightly shorter */}
          <a href="#" onClick={() => setPage('home')} className="font-brand text-3xl font-bold text-stone-900">
            <img 
              src="/Stellar by Chiheb (1).png" 
              alt="Stellar by Chiheb logo" 
              className="h-10" 
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center h-full">
            <div className="flex items-center space-x-8 h-full">
              <a href="#home" onClick={() => setPage('home')} className={navLinkClass + ` ${page === 'home' ? 'text-stone-900 border-b-2 border-stone-900' : ''}`}>Home</a>
              <a href="#about" className={navLinkClass}>About</a>
              <a href="#courses" className={navLinkClass}>Courses</a>
              <a href="#" onClick={() => setPage('wallOfLove')} className={navLinkClass + ` ${page === 'wallOfLove' ? 'text-stone-900 border-b-2 border-stone-900' : ''}`}>Testimonials</a>
              <a href="#faq" className={navLinkClass}>FAQ</a>
            </div>

            <div className="ml-8 border-l border-stone-200 pl-8">
              {user ? (
                <button onClick={() => setPage('dashboard')} className="px-5 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-stone-700 transition-all">
                  My Dashboard
                </button>
              ) : (
                <button onClick={handleLogin} className="px-5 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-stone-700 transition-all">
                  Student Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-stone-700 hover:text-stone-900">
              {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-stone-200 p-4 z-40">
          <a href="#home" onClick={() => { setPage('home'); setIsMobileMenuOpen(false); }} className="block py-2 px-3 text-base font-semibold text-stone-600 hover:bg-stone-100 rounded-md">Home</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 text-base font-semibold text-stone-600 hover:bg-stone-100 rounded-md">About</a>
          <a href="#courses" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 text-base font-semibold text-stone-600 hover:bg-stone-100 rounded-md">Courses</a>
          <a href="#" onClick={() => { setPage('wallOfLove'); setIsMobileMenuOpen(false); }} className="block py-2 px-3 text-base font-semibold text-stone-600 hover:bg-stone-100 rounded-md">Testimonials</a>
          <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-3 text-base font-semibold text-stone-600 hover:bg-stone-100 rounded-md">FAQ</a>

          <div className="border-t border-stone-200 mt-4 pt-4">
            {user ? (
              <button onClick={() => { setPage('dashboard'); setIsMobileMenuOpen(false); }} className="block w-full text-center px-5 py-3 bg-stone-900 text-white font-semibold rounded-lg shadow-sm hover:bg-stone-700">
                My Dashboard
              </button>
            ) : (
              <button onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }} className="block w-full text-center px-5 py-3 bg-stone-900 text-white font-semibold rounded-lg shadow-sm hover:bg-stone-700">
                Student Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

//================================================================================
// 8. HOME PAGE (Container for all landing page sections)
//================================================================================
const HomePage = () => (
  <>
    <HeroSection />
    <AboutSection />
    <CoursesSection />
    <TestimonialsSection />
    <LeadMagnetSection />
    <FaqSection />
  </>
);

//================================================================================
// 8a. HERO SECTION (Minimalistic & "Timeline-Aware")
//================================================================================
const HeroSection = () => {
  const { location, projectPhase } = useContext(AppContext);

  const isDiaspora = projectPhase === 'PHASE_2_SCALING' && location !== 'DZ';

  const heroContent = useMemo(() => {
    switch(projectPhase) {
      case 'PHASE_0_PRELAUNCH':
        return {
          subheading: "Launching January 2026",
          heading: "Premium English.",
          headingSpan: "Authentic Connection.",
          darija: "طور الإنجليزية تاعك مع شهاب.",
          description: "The #1 online English school for the Maghreb & Diaspora is coming. Join the free masterclass and get on the waitlist for our pilot program.",
          ctaPrimary: null,
          ctaSecondary: "Get Free Masterclass",
          showImage: false,
        };
      case 'PHASE_1_PILOT':
        return {
          subheading: "Pilot Program: Jan - Jun 2026",
          heading: "The Pilot Program is Live.",
          headingSpan: "Enrollment is Open.",
          darija: "سجل الآن في البرنامج التجريبي",
          description: "Be one of the first 60 students to join the Stellar Pilot Program. This is a DZD-only launch for the Algerian market. Help us build the future!",
          ctaPrimary: "Enroll in Pilot",
          ctaSecondary: "Get Free Masterclass",
          showImage: true,
        };
      case 'PHASE_Z_BREAK': // Summer Break
        return {
          subheading: "Rentrée Septembre 2026",
          heading: "New Programs Coming.",
          headingSpan: "Sign Up for Launch.",
          darija: "البرامج الجديدة في سبتمبر",
          description: "Our full 10-month programs for the Maghreb & Diaspora are launching in September. Sign up for the free masterclass to get launch-day alerts.",
          ctaPrimary: null,
          ctaSecondary: "Get Free Masterclass",
          showImage: false,
        };
      case 'PHASE_2_SCALING':
      default:
        return {
          subheading: isDiaspora ? "Pour la Diaspora Maghrébine" : "For the Maghreb & Diaspora",
          heading: isDiaspora ? "L'Anglais Premium." : "Premium English,",
          headingSpan: isDiaspora ? "Connexion Authentique." : "Authentic Connection.",
          darija: isDiaspora ? "طور لغتك الإنجليزية مع شهاب" : "طور الإنجليزية تاعك مع شهاب.",
          description: isDiaspora
            ? "Rejoignez la première école d'anglais en ligne conçue par et pour la communauté maghrébine. Atteignez la fluidité avec un professeur qui comprend votre culture."
            : "Join the #1 online English school designed by and for the Maghrebi community. Achieve fluency with a teacher who understands your culture and language.",
          ctaPrimary: isDiaspora ? "Voir les Cours" : "View Our Courses",
          ctaSecondary: isDiaspora ? "Masterclass Gratuite" : "Get Free Masterclass",
          showImage: true,
        };
    }
  }, [projectPhase, isDiaspora]);

  return (
    <section id="home" className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40">
        <div className={`grid grid-cols-1 ${heroContent.showImage ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-16 items-center`}>
          <div className={`${heroContent.showImage ? 'text-center md:text-left' : 'text-center max-w-3xl mx-auto'}`}>
            <span className="inline-block px-4 py-1 bg-stone-100 text-stone-700 text-sm font-medium rounded-full mb-5">
              {heroContent.subheading}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 leading-tight">
              {heroContent.heading}
              <span className="block">{heroContent.headingSpan}</span>
            </h1>
            <p className={`font-darija mt-5 ${heroContent.showImage ? 'text-center md:text-right' : 'text-center'}`}>
              {heroContent.darija}
            </p>
            <p className={`mt-6 text-lg text-stone-600 ${heroContent.showImage ? 'max-w-lg mx-auto md:mx-0' : 'max-w-xl mx-auto'}`}>
              {heroContent.description}
            </p>
            <div className={`mt-10 flex flex-col sm:flex-row gap-4 ${heroContent.showImage ? 'justify-center md:justify-start' : 'justify-center'}`}>
              {heroContent.ctaPrimary && (
                <a href="#courses" className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 text-white text-lg font-semibold rounded-lg shadow-sm hover:bg-stone-700 transition-all transform hover:-translate-y-0.5">
                  {heroContent.ctaPrimary}
                </a>
              )}
              <a href="#lead-magnet" className="w-full sm:w-auto px-8 py-3.5 bg-white text-stone-900 border border-stone-300 text-lg font-semibold rounded-lg shadow-sm hover:bg-stone-50 transition-all transform hover:-translate-y-0.5">
                {heroContent.ctaSecondary}
              </a>
            </div>
          </div>

          {heroContent.showImage && (
            <div className="flex justify-center">
              <img
                src="https://placehold.co/500x500/292524/FFFFFF?text=Chiheb+Aimeur\nTeaching&font=eb+garamond"
                alt="Chiheb Aimeur teaching English online"
                className="rounded-3xl shadow-2xl w-full max-w-md h-auto object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

//================================================================================
// 8b. ABOUT SECTION (Minimalistic)
//================================================================================
const AboutSection = () => (
  <section id="about" className="py-24 md:py-32 bg-stone-50 border-y border-stone-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="flex justify-center">
          <img
            src="https://placehold.co/450x550/1c1917/FFFFFF?text=Chiheb+Aimeur&font=eb+garamond"
            alt="Profile photo of Chiheb Aimeur"
            className="rounded-2xl shadow-xl w-full max-w-sm h-auto object-cover"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">
            Meet Your Instructor, <span className="block">Chiheb Aimeur</span>
          </h2>
          <p className="text-lg text-stone-600 mb-4">
            Chiheb isn't just an English teacher. He's a fellow Maghrebi who has mastered the language and understands the exact challenges you face.
          </p>
          <p className="text-lg text-stone-600 mb-8">
            His unique, results-driven method combines modern teaching techniques with a deep understanding of our culture and linguistic background (Darija, French, Arabic).
          </p>
          <div className="border-t border-stone-200 pt-8 space-y-4">
            <li className="flex items-center text-base"><IconCheck className="w-5 h-5 text-stone-700 mr-3 flex-shrink-0" /> Expert in Maghrebi linguistic challenges.</li>
            <li className="flex items-center text-base"><IconCheck className="w-5 h-5 text-stone-700 mr-3 flex-shrink-0" /> Proven track record of student success.</li>
            <li className="flex items-center text-base"><IconCheck className="w-5 h-5 text-stone-700 mr-3 flex-shrink-0" /> Authentic, relatable, and dedicated.</li>
          </div>
        </div>
      </div>
    </div>
  </section>
);

//================================================================================
// 8c. COURSES SECTION (Firebase Ready)
//================================================================================
const CoursesSection = () => {
  const { projectPhase, db } = useContext(AppContext);
  const [courses, setCourses] = useState(null); // Will hold data from Firebase

  // This is where you fetch live data from Firestore
  useEffect(() => {
    // Determine which collection to listen to
    let collectionName = null;
    if (projectPhase === 'PHASE_1_PILOT') collectionName = 'pilot_courses';
    if (projectPhase === 'PHASE_2_SCALING') collectionName = 'phase2_courses';

    if (db && collectionName) {
      // PRODUCTION:
      // const collRef = collection(db, collectionName);
      // const unsubscribe = onSnapshot(collRef, (snapshot) => {
      //   const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      //   setCourses(data);
      // });
      // return () => unsubscribe();
    } else {
      // PROTOTYPE:
      if (projectPhase === 'PHASE_1_PILOT') setCourses(PILOT_COURSES_DATA);
      else if (projectPhase === 'PHASE_2_SCALING') setCourses(PHASE_2_COURSES_DATA);
      else setCourses(null); // No courses for prelaunch/break
    }
  }, [projectPhase, db]);

  // This component now acts as a router, rendering the correct
  // course offering based on the project's timeline.

  const renderCourseContent = () => {
    switch(projectPhase) {
      case 'PHASE_0_PRELAUNCH':
      case 'PHASE_Z_BREAK':
        return <CoursePhasePreLaunch />;
      case 'PHASE_1_PILOT':
        return <CoursePhasePilot courses={courses || PILOT_COURSES_DATA} />;
      case 'PHASE_2_SCALING':
        return <CoursePhaseScaling courses={courses || PHASE_2_COURSES_DATA} />;
      default: // 'PHASE_X_COMPLETE'
        return <div className="text-center"><p>Our 2026-2027 programs are complete. Thank you!</p></div>;
    }
  };

  return (
    <section id="courses" className="py-24 md:py-32 bg-white">
      {renderCourseContent()}
    </section>
  );
};

// --- Sub-component for Phase 0/Break (Pre-Launch) ---
const CoursePhasePreLaunch = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
        Our Programs Are Coming Soon
      </h2>
      <p className="text-lg text-stone-600 mb-8">
        Sign up for the free masterclass to get notified when enrollment opens.
      </p>
      <a href="#lead-magnet" className="px-8 py-3.5 bg-stone-900 text-white text-lg font-semibold rounded-lg shadow-sm hover:bg-stone-700 transition-all">
        Get the Free Masterclass
      </a>
    </div>
  </div>
);

// --- Sub-component for Phase 1 (Pilot Launch) ---
const CoursePhasePilot = ({ courses }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
          The Pilot Program (Jan - Jun 2026)
        </h2>
        <p className="text-lg text-stone-600">
          Enrollment is now open for our 6-month Pilot Program. This launch is for the Algerian market only (DZD payments).
        </p>
      </div>

      {/* Visualized Pilot Phase (Linear) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

// --- Sub-component for Phase 2 (Scaling) ---
const CoursePhaseScaling = ({ courses }) => {
  const mainCourses = courses.filter(c => c.id !== 'speaking-club');
  const speakingClub = courses.find(c => c.id === 'speaking-club');
  const scrollContainerRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
          Find Your Perfect Program
        </h2>
        <p className="text-lg text-stone-600">
          Choose your learning track: Premium Live Access (Tier 1) or self-paced Recorded Access (Tier 2). All programs are 10 months.
        </p>
      </div>

      {/* Horizontal Swipe Section */}
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 p-2 rounded-full shadow-md border border-stone-200 hover:bg-white backdrop-blur-sm hidden lg:flex"
        >
          <IconChevronLeft className="w-8 h-8 text-stone-800" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/70 p-2 rounded-full shadow-md border border-stone-200 hover:bg-white backdrop-blur-sm hidden lg:flex"
        >
          <IconChevronRight className="w-8 h-8 text-stone-800" />
        </button>

        <div ref={scrollContainerRef} className="horizontal-scroll-container flex overflow-x-auto gap-8 pb-8 -mx-4 px-4">
          {mainCourses.map(course => (
            <div key={course.id} className="min-w-[90%] sm:min-w-[70%] md:min-w-[48%] lg:min-w-[40%]">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>

      {/* Speaking Club Section (Linear & Minimal) */}
      {speakingClub && (
        <div className="max-w-5xl mx-auto mt-16 border-t border-stone-200 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <span className="inline-block px-3 py-1 bg-stone-100 text-stone-700 text-xs font-bold rounded-full mb-4 tracking-wider">{speakingClub.tier}</span>
              <h3 className="text-3xl font-bold text-stone-900 mb-2 font-brand">
                {speakingClub.name}
              </h3>
              <p className="text-stone-600 text-lg">
                {speakingClub.description}
              </p>
              <ul className="space-y-2 text-stone-600 mt-4">
                {speakingClub.features.map(feature => (
                  <li key={feature} className="flex items-start"><IconCheck className="w-5 h-5 text-stone-600 mr-2 flex-shrink-0 mt-1" />{feature}</li>
                ))}
              </ul>
            </div>
            <div className="text-center bg-stone-50 rounded-lg p-6 border border-stone-200">
              <CourseCardPrice course={speakingClub} />
              <CourseCardEnrollButton course={speakingClub} defaultInstallments="1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-components for Courses (Minimalistic) ---

const CourseCard = ({ course }) => {
  return (
    // NEW: Minimalistic card design
    <div className="course-card bg-white border border-stone-200 rounded-2xl flex flex-col h-full transition-all duration-300 hover:border-stone-400">
      <div className="p-8 flex-grow">
        <span className="inline-block px-3 py-1 bg-stone-100 text-stone-700 text-xs font-bold rounded-full mb-4 tracking-wider">{course.tier}</span>
        <h3 className="text-3xl font-bold text-stone-900 mb-2 font-brand">
          {course.name}
        </h3>
        <p className="text-stone-600 mb-6 h-12">{course.description}</p>

        {course.seats && (
          <div className="mb-4 text-sm font-semibold text-stone-700">
            Seats Left: <span className="text-lg text-stone-900">{course.seats - 3} / {course.seats}</span>
          </div>
        )}

        <CourseCardPrice course={course} />

        <ul className="space-y-3 text-stone-600 mb-8">
          {course.features.map(feature => (
            <li key={feature} className="flex items-start"><IconCheck className="w-5 h-5 text-stone-600 mr-2 flex-shrink-0 mt-1" />{feature}</li>
          ))}
        </ul>
      </div>
      <div className="mt-auto p-6 bg-stone-50 border-t border-stone-200 flex-shrink-0">
        <CourseCardEnrollButton course={course} />
      </div>
    </div>
  );
};

const CourseCardPrice = ({ course }) => {
  const defaultInstallment = course.installments[0] || '1';
  const [installments, setInstallments] =useState(course.installments.includes('2') ? '2' : defaultInstallment);

  const { location, projectPhase } = useContext(AppContext);
  const effectiveLocation = projectPhase === 'PHASE_1_PILOT' ? 'DZ' : location;

  const { installmentPriceFormatted, totalPriceFormatted, perMonthText, installmentText } = usePriceCalculator(course, effectiveLocation, installments);

  const isSubscription = course.id === 'speaking-club';

  return (
    <>
      {!isSubscription && course.installments.length > 1 && (
        <div className="mb-4">
          <label className="text-xs font-medium text-stone-500">Payment Plan</label>
          <div className={`mt-2 grid grid-cols-${course.installments.length} gap-1 rounded-lg bg-stone-100 p-1 installment-chooser`}>
            {course.installments.includes('1') && <button data-installments="1" onClick={() => setInstallments('1')} className={`installment-tab rounded-md py-2 text-sm font-medium text-stone-700 hover:bg-stone-200 ${installments === '1' && 'active-tab'}`}>1 Payment</button>}
            {course.installments.includes('2') && <button data-installments="2" onClick={() => setInstallments('2')} className={`installment-tab rounded-md py-2 text-sm font-medium text-stone-700 hover:bg-stone-200 ${installments === '2' && 'active-tab'}`}>2 Payments</button>}
            {course.installments.includes('3') && <button data-installments="3" onClick={() => setInstallments('3')} className={`installment-tab rounded-md py-2 text-sm font-medium text-stone-700 hover:bg-stone-200 ${installments === '3' && 'active-tab'}`}>3 Payments</button>}
          </div>
        </div>
      )}

      <div className="mb-6">
        <p className="text-stone-600 text-sm">
          <span className="installment-count-display font-semibold text-stone-900">{installmentText.split(' ')[0]}</span> {isSubscription ? 'payment' : 'payments of'}
        </p>
        <span className="price-display text-4xl font-extrabold text-stone-900">{installmentPriceFormatted}</span>
        <p className="mt-1 text-sm text-stone-500">
          {isSubscription ? perMonthText : `(Total ${totalPriceFormatted} / ${perMonthText})`}
        </p>
      </div>
    </>
  );
};

const CourseCardEnrollButton = ({ course }) => {
  const { openEnrollModal } = useContext(AppContext);

  const handleClick = (e) => {
    const card = e.target.closest('.course-card, .text-center');
    let selectedInstallments = course.installments[0] || '1';

    if (card && course.installments.length > 1) {
      const activeTab = card.querySelector('.installment-tab.active-tab');
      if (activeTab) {
        selectedInstallments = activeTab.dataset.installments;
      } else {
        selectedInstallments = course.installments.includes('2') ? '2' : course.installments[0];
      }
    }
    openEnrollModal(course, selectedInstallments);
  };

  return (
    <button
      onClick={handleClick}
      className="enroll-button w-full px-6 py-3 text-base font-semibold rounded-lg shadow-sm transition-all bg-stone-900 text-white hover:bg-stone-700"
    >
      {course.id === 'speaking-club' ? 'Subscribe Now' : 'Enroll Now'}
    </button>
  );
};

//================================================================================
// 8d. TESTIMONIALS SECTION (Minimalistic)
//================================================================================
const TestimonialsSection = () => {
  const { location, setPage, projectPhase } = useContext(AppContext);

  const isDiaspora = projectPhase === 'PHASE_2_SCALING' && location !== 'DZ';

  const filteredTestimonials = useMemo(() => {
    if (projectPhase === 'PHASE_0_PRELAUNCH') return TESTIMONIALS_DATA.filter(t => t.market === 'INTL').slice(0, 2);
    if (projectPhase === 'PHASE_1_PILOT') return TESTIMONIALS_DATA.filter(t => t.market === 'DZ').slice(0, 2);
    const market = isDiaspora ? 'INTL' : 'DZ';
    return TESTIMONIALS_DATA.filter(t => t.market === market).slice(0, 2); // Show 2 matching
  }, [location, projectPhase, isDiaspora]);

  const heading = useMemo(() => {
    if (projectPhase === 'PHASE_0_PRELAUNCH') return "See What Early Students Say";
    if (projectPhase === 'PHASE_1_PILOT') return "Why Algerians Trust Chiheb";
    return "Don't Just Take Our Word For It";
  }, [projectPhase]);

  // Don't show if no testimonials for this phase
  if (filteredTestimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-stone-50 border-y border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            {heading}
          </h2>
          <p className="text-lg text-stone-600">
            {isDiaspora
              ? "Voyez ce que disent nos étudiants de la diaspora à propos de Stellar."
              : "Hear from real students who transformed their English with Stellar."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredTestimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => setPage('wallOfLove')}
            className="px-8 py-3.5 bg-white text-stone-900 border border-stone-300 text-lg font-semibold rounded-lg shadow-sm hover:bg-stone-50 transition-all"
          >
            See All Testimonials
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Sub-component for Testimonials (Minimalistic) ---
const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-2xl border border-stone-200 p-8 h-full flex flex-col">
    <p className="text-lg text-stone-700 mb-6 flex-grow font-serif italic">
      "{testimonial.quote}"
    </p>
    <div className="flex items-center flex-shrink-0 pt-6 border-t border-stone-200">
      <img
        src={`https://placehold.co/40x40/57534E/FFFFFF?text=${testimonial.name.charAt(0)}&font=eb+garamond`}
        alt={testimonial.name}
        className="w-10 h-10 rounded-full object-cover mr-4"
      />
      <div>
        <p className="font-bold text-stone-900">{testimonial.name}</p>
        <p className="text-sm text-stone-500">{testimonial.location}</p>
      </div>
    </div>
  </div>
);

//================================================================================
// 8e. LEAD MAGNET SECTION (Minimalistic)
//================================================================================
const LeadMagnetSection = () => {
  const { handleMasterclassSignup, projectPhase } = useContext(AppContext);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Lead Magnet Email:', email);
    handleMasterclassSignup();
  };

  const content = useMemo(() => {
    if (projectPhase === 'PHASE_0_PRELAUNCH' || projectPhase === 'PHASE_Z_BREAK') {
      return {
        heading: "Start Learning for FREE",
        subheading: "Sign up for Chiheb's free masterclass and be the first to know when enrollment opens.",
        button: "Get Masterclass & Join Waitlist"
      };
    }
    return {
      heading: "Start Learning for FREE",
      subheading: "Sign up for Chiheb's free masterclass: \"The 5 Biggest Mistakes Maghrebis Make in English (And How to Fix Them)\".",
      button: "Watch Now"
    };
  }, [projectPhase]);

  return (
    <section id="lead-magnet" className="py-24 md:py-32 bg-stone-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-brand">
            {content.heading}
          </h2>
          <p className="text-xl text-stone-300 mb-8">
            {content.subheading}
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-lg text-stone-900 placeholder-stone-500 border-2 border-stone-900 focus:border-white"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-stone-900 text-lg font-semibold rounded-lg shadow-sm hover:bg-stone-100 transition-all"
            >
              {content.button}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

//================================================================================
// 8f. FAQ SECTION (Minimalistic)
//================================================================================
const FaqItem = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    // Minimalistic border-b
    <div className="border-b border-stone-200">
      <button onClick={() => setIsOpen(!isOpen)} className="faq-toggle flex justify-between items-center w-full py-6 text-left">
        <span className="text-lg font-semibold text-stone-900">{question}</span>
        {isOpen ? <IconMinus className="w-5 h-5 text-stone-700" /> : <IconPlus className="w-5 h-5 text-stone-700" />}
      </button>
      {isOpen && (
        <div className="faq-content pb-6 text-stone-600 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
};

const FaqSection = () => {
  const { projectPhase } = useContext(AppContext);

  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 text-center mb-16 font-brand">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            <FaqItem question="What's the difference between Tier 1 and Tier 2?">
              <p><strong>Tier 1 (Premium Live Access)</strong> gives you direct, live access to Chiheb in small, capped group classes. You get personalized feedback, can ask questions in real-time, and join an exclusive community. It includes everything from Tier 2.</p>
              <p><strong>Tier 2 (Scalable Recorded Access)</strong> gives you access to all the recordings of the Tier 1 live lessons. It's the same great curriculum, but you learn at your own pace. This is our most scalable and affordable option.</p>
            </FaqItem>

            {projectPhase === 'PHASE_1_PILOT' && (
              <FaqItem question="What is the Pilot Program?">
                <p>The Pilot Program is our 6-month launch program. It is offered *only* to the Algerian market and is priced in DZD. By joining, you get a massive discount and will help us shape the future of the full 10-month programs launching in September 2026.</p>
              </FaqItem>
            )}

            <FaqItem question="What are the installment plans?">
              <p>You can choose to pay for your course in multiple installments. The Pilot Program is offered in 2 installments. The full Phase 2 programs are offered in 1, 2, or 3 installments. You can select your plan at checkout.</p>
            </FaqItem>

            <FaqItem question="What payment methods do you accept?">
              <p>This depends on the project phase and your location:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>Phase 1 (Pilot):</strong> We only accept DZD payments via SlickPay/Chargily.</li>
                <li><strong>Phase 2 (Scaling):</strong>
                  <ul className="list-disc list-inside ml-4">
                    <li><strong>In Algeria:</strong> Pay in DZD (SlickPay/Chargily) OR in FX (Stripe).</li>
                    <li><strong>Outside Algeria:</strong> Pay in your currency (EUR, USD, CAD) via Stripe.</li>
                  </ul>
                </li>
              </ul>
            </FaqItem>
          </div>
        </div>
      </div>
    </section>
  );
};

//================================================================================
// 9. FOOTER & DEV TOOLS
//================================================================================
const Footer = () => {
  const { showDevTools, setShowDevTools } = useContext(AppContext);
  return (
    <footer className="bg-stone-950 text-stone-400 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <a href="#" className="font-brand text-3xl font-bold text-white">
              <img 
                src="/Stellar by Chiheb (1).png" 
                alt="Stellar by Chiheb logo" 
                className="h-10" 
                style={{ filter: 'invert(1)' }} 
              />
            </a>
            <p className="mt-4 text-stone-400 text-sm">
              The premium online English school for the Maghreb region and its global diaspora.
            </p>
          </div>
          <div>
            <h5 className="text-base font-semibold text-white mb-4 font-brand">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white">About Chiheb</a></li>
              <li><a href="#courses" className="hover:text-white">All Courses</a></li>
              <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-base font-semibold text-white mb-4 font-brand">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Payment Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Stellar by Chiheb. All rights reserved.</p>
          <p className="mt-1">A project by Chiheb Aimeur & Bassem Imrane Ben Hamama.</p>
          <button onClick={() => setShowDevTools(!showDevTools)} className="mt-4 text-stone-600 hover:text-white text-xs font-mono">
            [Toggle Dev Tools]
          </button>
        </div>
      </div>
    </footer>
  );
};

// --- Developer Tools Panel ---
const DevToolsPanel = () => {
  const {
    location, setLocation,
    projectPhase, setProjectPhase,
    setShowDevTools // Get the setter function
  } = useContext(AppContext);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-stone-900 text-white p-4 z-[200] border-t-2 border-stone-500 shadow-lg relative"> {/* Added relative */}
      
      {/* Close Button */}
      <button 
        onClick={() => setShowDevTools(false)} 
        className="absolute top-3 right-3 text-stone-400 hover:text-white p-1" // Added padding for easier click
      >
        <IconClose className="w-5 h-5" /> {/* Made icon slightly smaller to fit */}
      </button>

      <div className="container mx-auto grid grid-cols-3 gap-4 items-center">
        <div className="font-bold text-lg font-brand">
          <IconCode className="inline-block mr-2" />
          Developer Tools
        </div>

        {/* Phase Simulator */}
        <div>
          <label className="text-xs font-medium text-stone-400">Simulate Project Phase:</label>
          <select
            className="w-full text-sm rounded-md border-stone-600 bg-stone-800 text-white shadow-sm focus:border-stone-500 focus:ring-stone-500"
            value={projectPhase || 'PHASE_0_PRELAUNCH'}
            onChange={(e) => setProjectPhase(e.target.value)}
          >
            <option value="PHASE_0_PRELAUNCH">Phase 0: Pre-Launch (Now)</option>
            <option value="PHASE_1_PILOT">Phase 1: Pilot (Jan '26)</option>
            <option value="PHASE_Z_BREAK">Phase Z: Summer Break (Jul '26)</option>
            <option value="PHASE_2_SCALING">Phase 2: Scaling (Sep '26)</option>
            <option value="PHASE_X_COMPLETE">Phase X: Complete (Jul '27)</option>
          </select>
        </div>

        {/* Location Simulator */}
        <div>
          <label className="text-xs font-medium text-stone-400">Simulate Location:</label>
          <select
            className="w-full text-sm rounded-md border-stone-600 bg-stone-800 text-white shadow-sm focus:border-stone-500 focus:ring-stone-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={projectPhase === 'PHASE_1_PILOT'}
          >
            <option value="DZ">Algeria (DZD)</option>
            <option value="FR">France (EUR)</option>
            <option value="US">USA (USD)</option>
            <option value="CA">Canada (CAD)</option>
          </select>
        </div>
      </div>
    </div>
  );
};


//================================================================================
// 10. ENROLLMENT MODAL (Final FX Logic)
//================================================================================
const EnrollmentModal = ({ course, initialInstallments, onClose, location, projectPhase }) => {

  const [installments, setInstallments] = useState(initialInstallments);

  const {
    currency,
    installmentPriceFormatted,
    totalPriceFormatted,
    perMonthText,
    installmentText
  } = usePriceCalculator(course, location, installments);

  const isAlgeria = location === 'DZ';
  const isSubscription = course.id === 'speaking-club';

  const handleDZD_Payment = () => {
    alert("PRODUCTION: Init SlickPay/Chargily SDK for " + installmentPriceFormatted);
    onClose();
  };

  const handleFX_Payment = () => {
    alert("PRODUCTION: Init Stripe SDK for " + installmentPriceFormatted + ". Routing to US LLC account.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="modal-fade-in bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-stone-200">
          <h3 className="text-2xl font-bold text-stone-900 font-brand">
            {course.name}
          </h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
            <IconClose />
          </button>
        </div>

        <div className="p-8">
          <p className="text-base text-stone-600 mb-6">Confirm your enrollment and payment plan:</p>

          {!isSubscription && course.installments.length > 1 && (
            <div className="mb-4">
              <label className="text-xs font-medium text-stone-600">Select Payment Plan</label>
              <div className={`mt-2 grid grid-cols-${course.installments.length} gap-2 rounded-lg bg-stone-100 p-1`}>
                {course.installments.includes('1') && <button onClick={() => setInstallments('1')} className={`installment-tab rounded-md py-2.5 text-sm font-medium ${installments === '1' && 'active-tab'}`}>1 Payment</button>}
                {course.installments.includes('2') && <button onClick={() => setInstallments('2')} className={`installment-tab rounded-md py-2.5 text-sm font-medium ${installments === '2' && 'active-tab'}`}>2 Payments</button>}
                {course.installments.includes('3') && <button onClick={() => setInstallments('3')} className={`installment-tab rounded-md py-2.5 text-sm font-medium ${installments === '3' && 'active-tab'}`}>3 Payments</button>}
              </div>
            </div>
          )}

          <div className="bg-stone-50 rounded-lg p-6 mb-6 border border-stone-200">
            <p className="text-stone-600 text-sm font-medium">{installmentText}</p>
            <div className="flex justify-between items-baseline">
              <span className="text-4xl font-extrabold text-stone-900">{installmentPriceFormatted}</span>
              {!isSubscription && (
                <span className="text-base font-semibold text-stone-600">(Total {totalPriceFormatted})</span>
              )}
            </div>
            <p className="text-sm text-stone-500 mt-2">{perMonthText}</p>
          </div>

          <h4 className="text-base font-semibold text-stone-900 mb-4">
            Select Your Payment Method:
          </h4>

          <div className="space-y-4">
            {/* DZD Payment Button */}
            {isAlgeria && (
              <button
                onClick={handleDZD_Payment}
                className="w-full flex items-center justify-between p-4 bg-stone-900 text-white rounded-lg shadow-sm hover:bg-stone-700 transition-all"
              >
                <div className="text-left">
                  <span className="font-bold text-base">Pay {installmentPriceFormatted} Now</span>
                  <span className="block text-sm text-stone-300">via SlickPay / Chargily (Local)</span>
                </div>
                <IconArrowRight className="w-5 h-5 text-white" />
              </button>
            )}

            {/* FX Payment Button (Stripe) - CRITICAL FX LOGIC */}
            { !isAlgeria || (isAlgeria && projectPhase === 'PHASE_2_SCALING') ? (
              <button
                onClick={handleFX_Payment}
                className="w-full flex items-center justify-between p-4 bg-white text-stone-900 border border-stone-300 rounded-lg shadow-sm hover:bg-stone-50 transition-all"
              >
                <div className="text-left">
                  <span className="font-bold text-base">Pay {installmentPriceFormatted} Now</span>
                  <span className="block text-sm text-stone-500">
                    {isAlgeria ? 'via Stripe (EUR/USD/CAD) (Optional)' : 'via Stripe (' + currency + ')'}
                  </span>
                </div>
                <IconArrowRight className="w-5 h-5 text-stone-700" />
              </button>
            ) : null }

          </div>
        </div>
      </div>
    </div>
  );
};

//================================================================================
// 11. MASTERCLASS FUNNEL PAGE (Minimalistic)
//================================================================================
const MasterclassPage = () => {
  const { openEnrollModal, projectPhase } = useContext(AppContext);

  const ctaCourse = useMemo(() => {
    if (projectPhase === 'PHASE_1_PILOT') {
      return PILOT_COURSES_DATA.find(c => c.id === 'pilot-t2');
    }
    return PHASE_2_COURSES_DATA.find(c => c.id === 'p2a-t2');
  }, [projectPhase]);

  if (!ctaCourse) return <HomePage />; // Failsafe

  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Free Masterclass: Watch Now
        </h1>
        <p className="text-xl text-stone-600 text-center mb-12">
          The 5 Biggest Mistakes Maghrebis Make in English (And How to Fix Them)
        </p>

        <div className="relative w-full h-0 pb-[56.25%] bg-stone-900 rounded-2xl shadow-xl mb-12 flex items-center justify-center">
          <IconPlay className="w-24 h-24 text-white opacity-50" />
          <span className="absolute text-white text-2xl font-brand">Masterclass Video</span>
        </div>

        <div className="bg-stone-50 rounded-2xl p-8 text-center border border-stone-200">
          <IconSparkles className="w-8 h-8 text-stone-700 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-stone-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-stone-600 mb-8 max-w-xl mx-auto">
            {projectPhase === 'PHASE_1_PILOT'
              ? "Enroll in the 6-month Pilot Program (Recorded) and get lifetime access."
              : "Get the full, self-paced 10-month A1-B1 Foundations (Recorded) course."
            }
          </p>
          <button
            onClick={() => openEnrollModal(ctaCourse, ctaCourse.installments.includes('2') ? '2' : '1')}
            className="px-10 py-4 bg-stone-900 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-stone-700 transition-all transform hover:-translate-y-0.5"
          >
            Enroll in {projectPhase === 'PHASE_1_PILOT' ? 'Pilot T2' : 'Tier 2'} Now
          </button>
        </div>
      </div>
    </div>
  );
};

//================================================================================
// 12. WALL OF LOVE PAGE (Firebase Ready)
//================================================================================
const WallOfLovePage = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'DZ', 'INTL'
  const { projectPhase, db } = useContext(AppContext);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS_DATA); // Default

  // PRODUCTION: Fetch testimonials from Firestore
  useEffect(() => {
    // if (db) {
    //   const collRef = collection(db, 'testimonials');
    //   const unsubscribe = onSnapshot(collRef, (snapshot) => {
    //     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //     setTestimonials(data);
    //   });
    //   return () => unsubscribe();
    // }
  }, [db]);

  const filteredTestimonials = useMemo(() => {
    if (projectPhase === 'PHASE_1_PILOT') return testimonials.filter(t => t.market === 'DZ');
    if (filter === 'all') return testimonials;
    return testimonials.filter(t => t.market === filter);
  }, [filter, projectPhase, testimonials]);

  const TabButton = ({ market, label }) => (
    <button
      onClick={() => setFilter(market)}
      className={`px-6 py-2 rounded-lg font-semibold text-sm ${filter === market ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Wall of Love
        </h1>
        <p className="text-xl text-stone-600 text-center mb-12 max-w-2xl mx-auto">
          See what every student—from Algiers to Montreal—is saying about Stellar.
        </p>

        {projectPhase !== 'PHASE_1_PILOT' && (
          <div className="flex justify-center gap-4 mb-12">
            <TabButton market="all" label="All Students" />
            <TabButton market="DZ" label="Algeria" />
            <TabButton market="INTL" label="Diaspora (INTL)" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

//================================================================================
// 13. STUDENT DASHBOARD (Firebase Ready)
//================================================================================
const DashboardPage = () => {
  const [tab, setTab] = useState('courses'); // 'courses', 'community', 'affiliate'
  const { handleLogout, user } = useContext(AppContext);

  const DashboardTab = ({ id, label, icon }) => (
    <button
      onClick={() => setTab(id)}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold w-full text-left text-sm ${
        tab === id
        ? 'bg-stone-100 text-stone-900'
        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const userEmail = user ? user.email : 'Student';

  return (
    <div className="bg-stone-50 min-h-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Welcome Back
            </h1>
            <p className="text-lg text-stone-600">{userEmail}</p>
          </div>
          <button onClick={handleLogout} className="text-sm font-semibold text-stone-600 hover:text-stone-900">
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2">
              <DashboardTab id="courses" label="My Courses" icon={<IconBookOpen className="w-5 h-5" />} />
              <DashboardTab id="community" label="Community Feed" icon={<IconUsers className="w-5 h-5" />} />
              <DashboardTab id="affiliate" label="Affiliate Portal" icon={<IconPercent className="w-5 h-5" />} />
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl border border-stone-200 p-8 min-h-[600px]">
              {tab === 'courses' && <MyCoursesTab />}
              {tab === 'community' && <CommunityTab />}
              {/* FIX: Corrected typo '===f' to '===' */}
              {tab === 'affiliate' && <AffiliateTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Tab: My Courses (Firebase Ready) ---
const MyCoursesTab = () => {
  const [viewingLesson, setViewingLesson] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { db, user } = useContext(AppContext);

  // PRODUCTION: Fetch user's enrolled courses from Firestore
  useEffect(() => {
    // if (db && user) {
    //   const collRef = collection(db, 'users', user.uid, 'enrolled_courses');
    //   const unsubscribe = onSnapshot(collRef, (snapshot) => {
    //     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //     // Here you would merge `data` with the full course info from a 'courses' collection
    //     // For now, we'll just use mock data.
    //   });
    // }

    // PROTOTYPE:
    setEnrolledCourses([
      { ...PHASE_2_COURSES_DATA.find(c => c.id === 'p2b-t1'), progress: 80, lessons: [
        { id: 1, title: 'Module 1: Advanced Conditionals Review' },
        { id: 2, title: 'Module 2: Mastering Nuance (Inversion)' },
      ]},
      { ...PHASE_2_COURSES_DATA.find(c => c.id === 'speaking-club'), progress: 0, lessons: [
        { id: 1, title: 'This Week\'s Session: Job Interviews' },
      ]},
    ]);
  }, [db, user]);


  if (viewingLesson) {
    return (
      <LessonViewer lesson={viewingLesson} onBack={() => setViewingLesson(null)} />
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 font-brand">My Courses</h2>
      <div className="space-y-6">
        {enrolledCourses.map(course => (
          <div key={course.id} className="border border-stone-200 rounded-lg p-6">
            <h3 className="text-2xl font-bold font-brand">{course.name}</h3>
            {course.progress > 0 && (
              <div className="mt-4">
                <span className="text-sm font-medium text-stone-600">Progress: {course.progress}%</span>
                <div className="w-full bg-stone-100 rounded-full h-2.5 mt-1">
                  <div className="bg-stone-800 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            )}
            <div className="mt-6">
              <h4 className="font-semibold text-stone-800 mb-3">Course Content:</h4>
              <div className="space-y-2">
                {course.lessons.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => setViewingLesson(lesson)}
                    className="flex items-center space-x-3 text-stone-600 hover:text-stone-900 w-full p-2 rounded-md hover:bg-stone-50"
                  >
                    <IconPlay className="w-6 h-6 text-stone-500" />
                    <span className="text-lg">{lesson.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Mock Lesson Viewer (Minimalistic) ---
const LessonViewer = ({ lesson, onBack }) => (
  <div>
    <button onClick={onBack} className="flex items-center space-x-2 font-semibold text-stone-600 hover:text-stone-900 mb-6">
      <IconArrowRight className="w-5 h-5 transform rotate-180" />
      <span>Back to Courses</span>
    </button>
    <h2 className="text-3xl font-bold mb-8 font-brand">{lesson.title}</h2>

    <div className="relative w-full h-0 pb-[56.25%] bg-stone-900 rounded-2xl shadow-xl mb-8 flex items-center justify-center">
      <IconPlay className="w-24 h-24 text-white opacity-50" />
      <span className="absolute text-white text-2xl font-brand">Lesson Video Player</span>
    </div>
    <p className="text-stone-600">This is where the lesson content, downloads, and text would go.</p>
  </div>
);


// --- Dashboard Tab: Community (Firebase Ready) ---
const CommunityTab = () => {
  const [messages, setMessages] = useState(COMMUNITY_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const { db, user } = useContext(AppContext);

  // PRODUCTION: Listen for new messages
  useEffect(() => {
    // if (db) {
    //   const collRef = collection(db, 'community_feed'); // Add orderBy('timestamp', 'desc')
    //   const unsubscribe = onSnapshot(collRef, (snapshot) => {
    //     const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //     setMessages(data);
    //   });
    //   return () => unsubscribe();
    // }
  }, [db]);

  const handlePostMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    // PRODUCTION:
    // await addDoc(collection(db, 'community_feed'), {
    //   text: newMessage,
    //   timestamp: serverTimestamp(),
    //   user: user.email,
    //   uid: user.uid,
    //   role: 'Student' // Could check for admin UID
    // });

    // PROTOTYPE:
    setMessages([
      { id: Date.now(), user: 'Bassem B.', role: 'Student', time: '1m ago', message: newMessage },
      ...messages
    ]);
    setNewMessage("");
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 font-brand">Community Feed</h2>
      <form onSubmit={handlePostMessage} className="bg-stone-50 rounded-lg p-4 mb-8 border border-stone-200">
        <textarea
          className="w-full p-3 border border-stone-200 rounded-md"
          rows="3"
          placeholder="Share a win or ask a question..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button type="submit" className="mt-2 px-6 py-2 bg-stone-900 text-white font-semibold rounded-lg shadow-sm hover:bg-stone-700">
          Post
        </button>
      </form>

      <div className="space-y-5">
        {messages.map(msg => (
          <div key={msg.id} className="flex space-x-4">
            <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg bg-stone-200 text-stone-700 flex-shrink-0">
              {msg.user.charAt(0)}
            </span>
            <div className="flex-grow">
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-stone-900">{msg.user}</span>
                {msg.role === 'Instructor' && <span className="text-xs font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">INSTRUCTOR</span>}
                <span className="text-sm text-stone-400">{msg.time}</span>
              </div>
              <p className="text-stone-700 mt-1">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Dashboard Tab: Affiliate Portal (Firebase Ready) ---
const AffiliateTab = () => {
  const { user } = useContext(AppContext);
  const referralLink = `https://chih-efl.com/ref?id=${user ? user.uid : '...'}`;

  const StatCard = ({ value, label }) => (
    <div className="bg-stone-50 rounded-lg p-6 border border-stone-200">
      <span className="text-4xl font-extrabold text-stone-900">{value}</span>
      <p className="text-sm font-semibold text-stone-600 mt-1">{label}</p>
    </div>
  );

  const copyToClipboard = () => {
    try {
      const el = document.createElement('textarea');
      el.value = referralLink;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      alert('Referral link copied to clipboard!'); // Use custom modal
    } catch (err) {
      alert('Failed to copy.');
    }
  };

  // PRODUCTION: You would fetch these stats from Firestore

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 font-brand">Affiliate Portal</h2>

      <div className="mb-8">
        <label className="text-sm font-medium text-stone-600">Your Unique Referral Link</label>
        <div className="mt-2 flex">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-grow p-3 bg-stone-100 border border-stone-200 rounded-l-lg text-stone-700"
          />
          <button
            onClick={copyToClipboard}
            className="flex-shrink-0 px-5 py-3 bg-stone-800 text-white font-semibold rounded-r-lg hover:bg-stone-700 flex items-center space-x-2"
          >
            <IconLink className="w-5 h-5" />
            <span>Copy</span>
          </button>
        </div>
      </div>

      <h3 className="text-2xl font-bold font-brand mb-4">Your Statistics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard value="€0.00" label="Pending Commission (FX)" />
        <StatCard value="0" label="Total Clicks" />
        <StatCard value="0" label="Total Referrals" />
      </div>
    </div>
  );
};

//================================================================================
// 14. DEFAULT EXPORT
//================================================================================
export default App;
