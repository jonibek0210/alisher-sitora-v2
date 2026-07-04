import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const TG_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN as string;
const TG_CHAT  = import.meta.env.VITE_TG_CHAT_ID  as string;

const attendance = [
   { id: 0, attendance: "Я с удовольствием приду" },
   { id: 2, attendance: "К сожалению, не смогу присутствовать" },
   { id: 3, attendance: "Сообщу позже" },
];

const Form = () => {
   const formRef = useRef(null);

   const [name,       setName]       = useState("");
   const [attend,     setAttend]     = useState("");
   const [status,     setStatus]     = useState<"idle" | "sending" | "ok" | "err">("idle");

   useEffect(() => {
      const elements = gsap.utils.toArray(".animated");
      gsap.fromTo(
         elements,
         { opacity: 0, x: -50 },
         {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.2, ease: "power3.out",
            scrollTrigger: {
               trigger: formRef.current,
               start: "top 95%",
               toggleActions: "play none none none",
            },
         }
      );
   }, []);

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!name.trim() || !attend) return;

      setStatus("sending");

      const text =
         `🎊 *Новый ответ на приглашение*\n\n` +
         `👤 *ФИО:* ${name}\n` +
         `✅ *Присутствие:* ${attend}`;

      try {
         const res = await fetch(
            `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
            {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                  chat_id: TG_CHAT,
                  text,
                  parse_mode: "Markdown",
               }),
            }
         );
         if (!res.ok) throw new Error();
         setStatus("ok");
      } catch {
         setStatus("err");
      }
   };

   return (
      <div className="custom-container my-10">
         <h2 className="text-4xl text-center uppercase fade-in-up">Анкета</h2>

         <form ref={formRef} onSubmit={handleSubmit} className="px-10 mt-5">
            {/* ФИО */}
            <div className="relative max-w-[290px] w-full">
               <p className="text-lg text-start mb-1 animated">
                  Напишите, пожалуйста, Ваши ФИО
               </p>
               <input
                  required
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ваши ФИО"
                  disabled={status === "ok"}
                  className="w-full px-5 py-4 border border-black placeholder:text-gray-500 animated disabled:opacity-50"
               />
            </div>

            {/* Присутствие */}
            <div className="">
               <h2 className="text-[18px] mb-2 mt-7 animated">
                  Сможете ли присутствовать на нашем торжестве?
               </h2>
               <ul className="flex flex-col gap-2">
                  {attendance.map(item => (
                     <li key={item.id}>
                        <label className="flex items-center gap-4 cursor-pointer animated">
                           <input
                              required
                              className="radio cursor-pointer"
                              name="attendance"
                              type="radio"
                              value={item.attendance}
                              disabled={status === "ok"}
                              onChange={e => setAttend(e.target.value)}
                           />
                           <span className="text-sm">{item.attendance}</span>
                        </label>
                     </li>
                  ))}
               </ul>
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-7">
               {status === "ok" ? (
                  <div className="flex flex-col items-center gap-3 py-5">
                     <div className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M5 14l6 6L23 8" />
                        </svg>
                     </div>
                     <p className="text-xl uppercase tracking-widest">Спасибо!</p>
                     <p className="text-sm text-gray-500 text-center">Ваш ответ получен. До встречи 10 июля!</p>
                  </div>
               ) : (
                  <button
                     type="submit"
                     disabled={status === "sending"}
                     className="px-10 py-5 border border-black fade-in-up disabled:opacity-50 transition-opacity"
                  >
                     {status === "sending" ? "Отправка..." : "Отправить"}
                  </button>
               )}
            </div>

            {status === "err" && (
               <p className="text-center mt-3 text-red-500 text-sm">
                  Ошибка отправки. Попробуйте ещё раз.
               </p>
            )}
         </form>
      </div>
   );
};

export default Form;
