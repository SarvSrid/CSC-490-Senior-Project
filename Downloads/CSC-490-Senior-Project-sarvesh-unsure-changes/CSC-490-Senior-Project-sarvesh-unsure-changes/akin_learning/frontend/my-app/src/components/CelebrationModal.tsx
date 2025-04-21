// components/CelebrationModal.tsx

import { useEffect } from "react";
import Lottie from "lottie-react";
import { Howl } from "howler";
import confettiAnimation from "@/public/assets/confetti.json"; // Make sure path is correct

interface CelebrationModalProps {
  show: boolean;
  onClose: () => void;
}

const CelebrationModal = ({ show, onClose }: CelebrationModalProps) => {
  useEffect(() => {
    if (show) {
      const sound = new Howl({
        src: ["/assets/celebration.mp3"], // Place this in public/assets
        volume: 0.5,
      });
      sound.play();

      // Auto-close after 4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gradient-to-br from-purple-700 via-indigo-900 to-black p-6 rounded-2xl shadow-2xl text-center border-2 border-white/10 max-w-sm w-full animate-fade-in">
        <Lottie
          animationData={confettiAnimation}
          loop={false}
          style={{ height: 250 }}
        />
        <h2 className="text-white text-2xl font-bold mt-4 animate-pulse">
          🎉 Level Up!
        </h2>
        <p className="text-gray-300 mt-2">You just unlocked a new badge! 🏆</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CelebrationModal;
