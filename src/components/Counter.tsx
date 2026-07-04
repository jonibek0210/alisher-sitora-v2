import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Counter = () => {
   const counterRef = useRef(null);

   const [stop, setStop] = useState(false);
   const [days, setDays] = useState(0);
   const [hours, setHours] = useState(0);
   const [minutes, setMinutes] = useState(0);
   const [seconds, setSeconds] = useState(0);

   const totalSeconds = 60;
   const totalMinutes = 60;
   const totalHours = 24;
   const totalDays = 365;

   useEffect(() => {
      const date = new Date("07/10/2026 19:00:00");

      const interval = setInterval(() => {
         const now = new Date();
         const difference = date.getTime() - now.getTime();

         const d = Math.floor(difference / (1000 * 60 * 60 * 24));
         setDays(d);

         const h = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
         );
         setHours(h);

         const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
         setMinutes(m);

         const s = Math.floor((difference % (1000 * 60)) / 1000);
         setSeconds(s);

         if (d === 0 && h === 0 && m === 0 && s === 0) {
            setStop(true);
         }
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   useEffect(() => {
      if (!counterRef.current) return;

      gsap.fromTo(
         ".countdown-item",
         { opacity: 0, y: 20, duration: 0.6 },
         {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.2,
            delay: 1,
            scrollTrigger: {
               trigger: counterRef.current,
               start: "top 90%",
               toggleActions: "play none none none",
            },
         }
      );
   }, []);

   // Calculate progress percentages
   const getProgressPercentage = (current: number, total: number) => {
      return (current / total) * 100;
   };

   const blocks = [
      { value: days, label: "Дней", total: totalDays },
      { value: hours, label: "Часов", total: totalHours },
      { value: minutes, label: "Минут", total: totalMinutes },
      { value: seconds, label: "Секунд", total: totalSeconds },
   ];

   return (
      <div className="custom-container z-10">
         <div ref={counterRef} className="flex justify-center gap-4 px-5 py-10">
            {blocks.map(({ value, label, total }, index) => {
               const percentage = getProgressPercentage(value, total);
               // Повернем круг на 90 градусов, чтобы прогресс начинался сверху
               const strokeDashoffset = (440 * percentage) / 100; // Circle circumference = 440

               return (
                  <div
                     key={index}
                     className="countdown-item relative flex flex-col items-center justify-center w-20 h-20 text-white"
                  >
                     <svg
                        className="absolute -z-10 w-full h-full transform rotate"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 160 160"
                     >
                        <circle
                           cx="80"
                           cy="80"
                           r="70"
                           stroke="#ffffff00"
                           strokeWidth="5"
                           fill="none"
                        />
                        <circle
                           cx="80"
                           cy="80"
                           r="70"
                           stroke={!stop ? "#fff" : "#ffffff00"}
                           strokeWidth="5"
                           fill="none"
                           strokeDasharray="440"
                           strokeDashoffset={strokeDashoffset}
                           strokeLinecap="round"
                        />
                     </svg>
                     <p className="text-xl max-sm:text-lg leading-6">{!stop ? value : "0"}</p>
                     <p className="text-xs">{label}</p>
                  </div>
               );
            })}
         </div>
         <div className="">
            {stop && (
               <div className="w-full flex items-center justify-center mb-10">
                  <div className="text-center">
                     <h1 className="text-3xl font-bold mb-4">
                        Ожидание окончено!
                     </h1>
                     <p className="">
                        Спасибо, что разделили этот момент с нами. Давайте
                        сделаем этот день незабываемым!
                     </p>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default Counter;
