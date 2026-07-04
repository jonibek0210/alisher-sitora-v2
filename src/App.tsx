import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Calendar from "./components/Calendar";
import Counter from "./components/Counter";
import Form from "./components/Form";
import Music from "./components/Music";
import TaklifyFooter from "./components/TaklifyFooter";
import BankCard from "./components/BankCard";

gsap.registerPlugin(ScrollTrigger);

function App() {
   useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);

      const animateElements = (
         selector: string,
         fromVars: gsap.TweenVars,
         toVars: gsap.TweenVars,
         triggerSelector?: string
      ) => {
         const elements = gsap.utils.toArray(selector) as HTMLElement[];
         elements.forEach((el) => {
            gsap.fromTo(el, fromVars, {
               ...toVars,
               scrollTrigger: {
                  trigger: triggerSelector || el,
                  start: "top 95%",
                  toggleActions: "play none none none",
               },
            });
         });
      };

      // Сдвиг справа налево
      animateElements(
         ".slide-in-right",
         { xPercent: 100, opacity: 0 },
         { xPercent: 0, opacity: 1, duration: 2, ease: "power3.out" }
      );

      // Сдвиг слева направо
      animateElements(
         ".slide-in-left",
         { x: "-100%", opacity: 0 },
         { x: 0, opacity: 1, duration: 2, ease: "power3.out", stagger: 0.2 }
      );

      // Увеличение изображения
      animateElements(
         ".zoom-in-fade",
         { scale: 0.5, opacity: 0 },
         { scale: 1, opacity: 1, duration: 2, ease: "power3.out", delay: 0.5 }
      );

      // Всплытие элементов снизу
      animateElements(
         ".fade-in-up",
         { y: 50, opacity: 0 },
         { y: 0, opacity: 1, duration: 2, ease: "power3.out", stagger: 0.2 }
      );

      setTimeout(() => {
         ScrollTrigger.refresh();
      }, 500);
   }, []);

   return (
      <>
         <main className="w-full overflow-hidden">
            <section className="relative w-full h-[85vh] flex flex-col justify-between m-auto bg-[#707070]">
               <div className="max-w-2xl w-full h-full absolute top-1/2 left-1/2 transform-center">
                  <img
                     className="w-full h-full object-cover brightness-50"
                     src={"/images/IMG_3084.webp"}
                     alt="img"
                  />
               </div>

               <div className="w-[200px] mx-auto mt- z-10 zoom-in-fade">
                  <img src={"/images/a-s.png"} alt="img" />
               </div>
               <Counter />
            </section>

            <section>
               <div className="w-1/2 h-0 flex justify-end items-center mt-5 border-t-2 border-dashed border-black slide-in-left">
                  <img
                     className="w-5 translate-x-2"
                     src="/images/heart.png"
                     alt="heart"
                  />
               </div>
               <div className="custom-container mb-10 mt-5">
                  <h2 className="text-4xl text-center uppercase fade-in-up">
                     Дорогие гости!
                  </h2>
                  <div className="w-fit flex flex-col items-center justify-center mx-auto mt-10 py-4 px-10 border border-dashed border-black fade-in-up">
                     <Music />

                     <p className="text-xs mt-2">ВКЛ.МУЗЫКУ</p>
                  </div>

                  <p className="w-80 mx-auto mt-7 text-lg text-center fade-in-up">
                     В нашей жизни произойдет очень важное событие – наша
                     свадьба! Мы верим и надеемся, что этот день станет красивым
                     началом долгой и счастливой жизни.
                  </p>
               </div>
               <Calendar />
               <div className="w-1/2 h-0 flex justify-start items-center ml-auto mt-14 border-t-2 border-dashed border-black slide-in-right">
                  <img
                     className="w-5 -translate-x-2"
                     src="/images/heart.png"
                     alt="heart"
                  />
               </div>
            </section>

            <section>
               <div className="my-10">
                  <h2 className="text-4xl text-center uppercase fade-in-up">
                     программа <br /> дня
                  </h2>

                  <div className="flex flex-col items-center justify-center">
                     <div className="text-center slide-in-left">
                        <img
                           className="w-36 translate-y-7"
                           src="/images/restaurant.png"
                           alt="img"
                        />
                        <p className="text-xl">19:00</p>
                        <p className="text-xl">Начало свадьбы</p>
                     </div>

                     <div className="text-center slide-in-right">
                        <img
                           className="w-36 translate-y-7"
                           src="/images/rings.png"
                           alt="img"
                        />
                        <p className="text-xl">20:00</p>
                        <p className="text-xl">Регистрация</p>
                     </div>

                     <div className="text-center slide-in-left">
                        <img
                           className="w-36 translate-y-7"
                           src="/images/cake.png"
                           alt="img"
                        />
                        <p className="text-xl">22:00</p>
                        <p className="text-xl">Торт</p>
                     </div>
                  </div>
                  <div className="w-1/2 h-0 flex justify-end items-center mt-10 border-t-2 border-dashed border-black slide-in-left">
                     <img
                        className="w-5 translate-x-2"
                        src="/images/heart.png"
                        alt="heart"
                     />
                  </div>
               </div>
            </section>

            <section>
               <div className="my-10 flex flex-col items-center">
                  <h2 className="text-4xl text-center uppercase fade-in-up">
                     место <br /> торжества
                  </h2>

                  <p className="w-60 mx-auto mt-7 text-lg text-center fade-in-up">
                     Г. Самарканд<br />Ресторан «Шохсарой»
                  </p>

                  <img
                     className="w-full max-w-sm mx-auto mt-8 object-cover fade-in-up"
                     src="/images/img.jpg"
                     alt="Ресторан Шохсарой"
                  />

                  <a
                     href={"https://yandex.uz/maps/-/CTerz2Mu"}
                     className="text-lg mx-auto mt-10 px-12 py-3 border border-dashed fade-in-up border-black"
                  >
                     Посмотреть локацию
                  </a>
               </div>
            </section>

            <section>
               <div className="relative py-10">
                  <img
                     className="w-full h-full object-cover absolute top-0 left-0 -z-10"
                     src="/images/bg-details.png"
                     alt="bg-img"
                  />

                  <h2 className="text-4xl text-center uppercase fade-in-up">
                     детали
                  </h2>
                  <img
                     className="w-5 mx-auto mt-8 fade-in-up"
                     src="/images/heart.png"
                     alt="heart"
                  />

                  <p className="w-80 mx-auto mt-3 text-lg text-center fade-in-up">
                     Дорогие гости, приносите с собой веселье и радость в душе,
                     а подарки - в конверте!
                  </p>

                  <BankCard />

                  <img
                     className="w-5 mx-auto mt-8 fade-in-up"
                     src="/images/heart.png"
                     alt="heart"
                  />

                  <p className="w-80 mx-auto mt-3 text-lg text-center fade-in-up">
                     Наш вечер — для взрослых. Мы будем рады видеть вас без детей,
                     чтобы вы могли полностью насладиться праздником.
                  </p>
               </div>
               <div className="w-1/2 h-0 flex justify-start items-center ml-auto mt-8 border-t-2 border-dashed border-black slide-in-right">
                  <img
                     className="w-5 -translate-x-2"
                     src="/images/heart.png"
                     alt="heart"
                  />
               </div>
            </section>

            <section>
               <Form />
            </section>

            <section>
               <div className="mb-10">
                  <h2 className="text-4xl text-center uppercase fade-in-up">
                     остались <br /> вопросы?
                  </h2>

                  <p className="text-xl text-center mt-7 slide-in-left">
                     Жених:{" "}
                     <a
                        className="underline underline-offset-4"
                        href="tel:+998937250170"
                     >
                        +998 (93) 725-01-70
                     </a>
                  </p>

                  <img
                     className="w-10 mx-auto mt-3 slide-in-left"
                     src="/images/phone.png"
                     alt="tel"
                  />

                  <p className="text-xl text-center mt-10 slide-in-right">
                     Невеста:{" "}
                     <a
                        className="underline underline-offset-4"
                        href="tel:+998906066943"
                     >
                       +998 (90) 606 69-43
                     </a>
                  </p>

                  <img
                     className="w-10 mx-auto mt-3 slide-in-right"
                     src="/images/phone.png"
                     alt="tel"
                  />
               </div>
            </section>

            <TaklifyFooter />
         </main>
      </>
   );
}

export default App;
