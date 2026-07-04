import { useEffect, useRef, useState } from "react";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

const Music = () => {
   const audioRef = useRef<HTMLAudioElement>(null);
   const [playing, setPlaying] = useState(true);
   const started  = useRef(false);

   const tryPlay = () => {
      if (started.current) return;
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = 18;
      audio.play().catch(() => {});
      started.current = true;
   };

   useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      // Синхронизируем иконку с реальным состоянием аудио
      const onPlay  = () => setPlaying(true);
      const onPause = () => setPlaying(false);
      audio.addEventListener("play",  onPlay);
      audio.addEventListener("pause", onPause);

      // Пробуем сразу (некоторые браузеры разрешают)
      tryPlay();

      // Запасной план — при первом клике где угодно на странице
      const onClick = () => { tryPlay(); document.removeEventListener("click", onClick); };
      document.addEventListener("click", onClick);

      return () => {
         audio.removeEventListener("play",  onPlay);
         audio.removeEventListener("pause", onPause);
         document.removeEventListener("click", onClick);
      };
   }, []);

   const toggle = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) {
         audio.play().catch(() => {});
      } else {
         audio.pause();
      }
   };

   return (
      <div>
         <button onClick={toggle}>
            {playing ? <IoVolumeHigh size={25} /> : <IoVolumeMute size={25} />}
         </button>
         <audio ref={audioRef} loop src="/music/music.mp3" />
      </div>
   );
};

export default Music;
