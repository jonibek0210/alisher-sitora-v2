import { useState } from "react";
import confetti from "canvas-confetti";

const CARD_NUMBER = "9860 3401 0382 5220";
const BANK_INFO = [
   { label: "Получатель", value: "Алишер Мардиев" },
   { label: "Банк",       value: "Tengebank"     },
   { label: "Карта",      value: CARD_NUMBER        },
];

const BankCard = () => {
   const [open,   setOpen]   = useState(false);
   const [copied, setCopied] = useState(false);

   const shoot = () => {
      const opts = { particleCount: 70, spread: 60, startVelocity: 45 };
      confetti({ ...opts, angle: 60,  origin: { x: 0, y: 0.7 } });
      confetti({ ...opts, angle: 120, origin: { x: 1, y: 0.7 } });
   };

   const handleCopy = async () => {
      await navigator.clipboard.writeText(CARD_NUMBER.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <div className="w-80 mx-auto mt-6 fade-in-up">
         {!open ? (
            <button
               onClick={() => { setOpen(true); shoot(); }}
               className="w-full py-3 border border-dashed border-black text-base tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-300"
            >
               Реквизиты карты
            </button>
         ) : (
            <div className="border border-black">
               {/* Info rows */}
               <div className="px-5 pt-5 pb-3 flex flex-col gap-1">
                  {BANK_INFO.map((row) => (
                     <p key={row.label} className="text-sm">
                        <span className="text-gray-500">{row.label}: </span>
                        <strong>{row.value}</strong>
                     </p>
                  ))}
               </div>

               {/* Divider */}
               <div className="border-t border-dashed border-black mx-4" />

               {/* Actions */}
               <div className="px-5 py-3 flex gap-6">
                  <button
                     onClick={handleCopy}
                     className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                  >
                     <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.1">
                        <rect x="4.5" y="4.5" width="7" height="7" rx="1" />
                        <path d="M8.5 4.5V2.5a1 1 0 00-1-1h-5a1 1 0 00-1 1v5a1 1 0 001 1h2" />
                     </svg>
                     {copied ? "Скопировано!" : "Копировать"}
                  </button>

                  <button
                     onClick={() => setOpen(false)}
                     className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                  >
                     Скрыть
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default BankCard;
