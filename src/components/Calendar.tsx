import gsap from "gsap";
import { useEffect, useRef } from "react";
import { BsHeart } from "react-icons/bs";

const Calendar = () => {
   const calendarRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (!calendarRef.current) return;

      const items = calendarRef.current.querySelectorAll("li");

      gsap.fromTo(
         items,
         { opacity: 0, y: 20 },
         {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
               trigger: calendarRef.current,
               start: "top 80%",
               end: "bottom top",
               toggleActions: "play none none none",
            },
         }
      );

      gsap.to(".animate-heart", {
         scale: 1.2,
         repeat: -1,
         yoyo: true,
         duration: 0.8,
         ease: "power1.inOut",
      });
   }, []);

   return (
      <div className="custom-container my-10 px-5">
         <div className="mt-2">
            <div className="">
               <h2 className="text-4xl text-center fade-in-up">Июль 2026</h2>
            </div>
            <div ref={calendarRef} className="w-[340px] mx-auto px-10 mt-5">
               <ul className="grid grid-cols-7 gap-y-1 gap-x-0 mt-1">
                  <li className="text-sm font-medium text-center">ПН</li>
                  <li className="text-sm font-medium text-center">ВТ</li>
                  <li className="text-sm font-medium text-center">СР</li>
                  <li className="text-sm font-medium text-center">ЧТ</li>
                  <li className="text-sm font-medium text-center">ПТ</li>
                  <li className="text-sm font-medium text-center">СБ</li>
                  <li className="text-sm font-medium text-center">ВС</li>
                  {/* Июль 2026 начинается в среду — 2 пустых ячейки (пн, вт) */}
                  <li></li>
                  <li></li>
                  {[
                     0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                     17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
                  ].map((item: number, idx: number) => {
                     return (
                        <li key={item} className="text-center relative">
                           {idx === 9 ? (
                              <div className="animate-heart w-7 h-7 absolute -top-[1px] left-[4.5px]">
                                 <BsHeart className="w-full h-full" />
                              </div>
                           ) : null}
                           {item + 1}
                        </li>
                     );
                  })}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Calendar;
