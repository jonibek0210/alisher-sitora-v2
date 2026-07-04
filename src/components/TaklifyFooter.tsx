const CATALOG_URL =
   "https://taklify.netlify.app/ru?category=all#catalog";
const INSTAGRAM_URL = "https://www.instagram.com/taklify.invites";
const TELEGRAM_URL = "https://t.me/taklify_admin";

export default function TaklifyFooter() {
   return (
      <footer className="relative z-10 bg-white text-black border-t border-gray-300 font-sans [&_p]:font-sans [&_a]:font-sans [&_nav]:font-sans">
         <div className="custom-container flex flex-col items-center text-center pt-12 pb-10 px-6">
            <img
               src="/logo-white.png"
               alt="Taklify"
               className="w-20 h-20 object-contain rounded-full"
               width={56}
               height={56}
            />

            <p className="mt-8 text-xl font-medium tracking-[0.35em] uppercase">
               TAKLIFY
            </p>

            <p className="mt-6 text-base leading-relaxed text-black max-w-sm">
               Цифровые приглашения — удобно
               <br />
               делиться деталями дня с гостями
            </p>

            <nav
               className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-base"
               aria-label="Taklify"
            >
               <a
                  href={CATALOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline underline-offset-4 decoration-black hover:opacity-80"
               >
                  Каталог
               </a>
               <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline underline-offset-4 decoration-black hover:opacity-80"
               >
                  Instagram
               </a>
               <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline underline-offset-4 decoration-black hover:opacity-80"
               >
                  Telegram
               </a>
            </nav>

            <p className="mt-12 text-sm text-gray-400">
               © 2026 Taklify
            </p>
         </div>
      </footer>
   );
}
