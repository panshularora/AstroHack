import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

interface PresentViewProps {
  currentDate?: Date;
  reflections?: any[];
  onAddIntention?: (content: string) => void;
}

interface MultilingualQuote {
  lang: 'Sanskrit' | 'Hindi' | 'English';
  text: string;
  transliteration?: string;
  translation?: string;
  source: string;
}

const MULTILINGUAL_QUOTES: MultilingualQuote[] = [
  // Sanskrit Quotes
  {
    lang: 'Sanskrit',
    text: 'यथा पिण्डे तथा ब्रह्माण्डे',
    transliteration: 'Yathā Piṇḍe Tathā Brahmāṇḍe',
    translation: 'As is the micro-atom within, so is the macro-universe without.',
    source: 'Yajurveda / Upanishadic Sutra',
  },
  {
    lang: 'Sanskrit',
    text: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
    transliteration: 'Karmaṇyevādhikāraste Mā Phaleṣu Kadācana',
    translation: 'Your right is to action alone, never to its fruits.',
    source: 'Bhagavad Gita 2.47',
  },
  {
    lang: 'Sanskrit',
    text: 'कालः सृजति भूतानि कालः संहरते प्रजाः',
    transliteration: 'Kālaḥ Sṛjati Bhūtāni Kālaḥ Saṁharate Prajāḥ',
    translation: 'Cosmic Time creates all beings, and Time gracefully guides them.',
    source: 'Mahabharata (Santi Parva)',
  },
  {
    lang: 'Sanskrit',
    text: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः',
    transliteration: 'Udyamena Hi Sidhyanti Kāryāṇi Na Manorathaiḥ',
    translation: 'True realization comes through focused present action, not idle wishful thinking.',
    source: 'Hitopadesha',
  },
  {
    lang: 'Sanskrit',
    text: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनंजय',
    transliteration: 'Yogasthaḥ Kuru Karmāṇi Saṅgaṁ Tyaktvā Dhanaṁjaya',
    translation: 'Perform your duty with inner poise, established in spiritual harmony.',
    source: 'Bhagavad Gita 2.48',
  },
  // Hindi Quotes
  {
    lang: 'Hindi',
    text: 'ग्रह दिशा दिखाते हैं, पर आपका वर्तमान कर्म आपकी नियति तय करता है।',
    translation: 'Planets indicate direction, but present karma defines your destiny.',
    source: 'Vedic Prashna Wisdom',
  },
  {
    lang: 'Hindi',
    text: 'समय ही सबसे बड़ा मार्गदर्शक है; वर्तमान क्षण में ही आंतरिक शांति है।',
    translation: 'Time is the greatest guide; inner peace resides in the present moment.',
    source: 'AstroLive Wisdom',
  },
  {
    lang: 'Hindi',
    text: 'शांत और स्थिर मन से ही ब्रह्मांड की दिव्य चेतना का बोध होता है।',
    translation: 'Only in a calm and still mind does cosmic awareness blossom.',
    source: 'Jyotish Veda',
  },
  // English Quotes
  {
    lang: 'English',
    text: 'The planets impel, they do not compel; present awareness unlocks your karmic free will.',
    source: 'Prashna Tantra',
  },
  {
    lang: 'English',
    text: 'Attune your spirit to the quiet rhythm of cosmic time; clarity emerges in present stillness.',
    source: 'AstroLive Synthesis',
  },
  {
    lang: 'English',
    text: 'Time is a continuous river of awareness; every moment is a sacred transit.',
    source: 'Vedic Philosophy',
  },
];

export const PresentView: React.FC<PresentViewProps> = () => {
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  // Pick a random quote every time the page/component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MULTILINGUAL_QUOTES.length);
    setQuoteIndex(randomIndex);
  }, []);

  const currentQuote = MULTILINGUAL_QUOTES[quoteIndex];

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % MULTILINGUAL_QUOTES.length);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 flex flex-col items-center justify-center animate-fadeIn text-neutral-300 font-sans">
      <div className="relative w-full p-6 sm:p-7 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex flex-col items-center text-center space-y-3 shadow-xl backdrop-blur-md hover:border-amber-500/30 transition-all group">
        {/* Language Badge & Refresh Button */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{currentQuote.lang} Wisdom</span>
          </div>

          <button
            onClick={handleNextQuote}
            className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 hover:text-white bg-black/40 hover:bg-neutral-800 px-2 py-1 rounded-full border border-neutral-800 transition-all cursor-pointer"
            title="Get another wisdom quote"
          >
            <RefreshCw className="w-3 h-3 text-neutral-400 group-hover:rotate-180 transition-transform duration-500" />
            <span>Next</span>
          </button>
        </div>

        {/* Primary Quote Text */}
        <p className="font-serif text-lg sm:text-xl text-neutral-100 font-normal leading-relaxed pt-1">
          "{currentQuote.text}"
        </p>

        {/* Transliteration for Sanskrit */}
        {currentQuote.transliteration && (
          <p className="text-xs font-serif text-amber-200/80 italic font-light">
            {currentQuote.transliteration}
          </p>
        )}

        {/* Translation for Sanskrit / Hindi */}
        {currentQuote.translation && (
          <p className="text-xs font-sans text-neutral-400 font-normal max-w-md">
            {currentQuote.translation}
          </p>
        )}

        {/* Source Attribution */}
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest pt-2 border-t border-neutral-800/40 w-full">
          — {currentQuote.source}
        </span>
      </div>
    </div>
  );
};
