import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import "./ZodiacHeader.css";

export default function ZodiacHeader({ zodiac }) {
  const constellationDots = [
    { x: 20, y: 15, size: 2, delay: 0 },
    { x: 80, y: 10, size: 1.5, delay: 0.5 },
    { x: 90, y: 45, size: 2, delay: 1 },
    { x: 75, y: 85, size: 1.5, delay: 1.5 },
    { x: 25, y: 80, size: 2, delay: 2 },
    { x: 10, y: 50, size: 1.5, delay: 0.8 },
    { x: 50, y: 5, size: 1, delay: 1.2 },
    { x: 95, y: 70, size: 1, delay: 0.3 },
    { x: 5, y: 30, size: 1, delay: 1.8 },
    { x: 55, y: 90, size: 1.5, delay: 0.6 },
  ];

  return (
    <section className="zodiac-header">
      <motion.button
        className="edit-button"
        whileTap={{ scale: 0.95 }}
        aria-label="Edit zodiac sign"
      >
        <Pencil size={16} />
        <span>Edit</span>
      </motion.button>

      <div className="zodiac-illustration-container">
        <div className="constellation-dots">
          {constellationDots.map((dot, i) => (
            <motion.div
              key={i}
              className="constellation-dot"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: dot.size * 2,
                height: dot.size * 2,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: dot.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          className="zodiac-icon"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <AriesIllustration />
        </motion.div>
      </div>

      <motion.div
        className="zodiac-symbol"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {zodiac.symbol}
      </motion.div>

      <motion.h1
        className="zodiac-name"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {zodiac.sign}
      </motion.h1>

      <motion.p
        className="zodiac-dates"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {zodiac.dateRange}
      </motion.p>
    </section>
  );
}

function AriesIllustration() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ariesGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4A9FFF" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B9DC3" />
        </linearGradient>
        <filter id="ariesGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Ram head - stylized illustration */}
      <g filter="url(#ariesGlow)">
        {/* Left horn spiral */}
        <path
          d="M35 55 C30 35, 20 25, 25 18 C30 10, 40 12, 42 22 C44 30, 40 40, 38 48"
          stroke="url(#ariesGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right horn spiral */}
        <path
          d="M85 55 C90 35, 100 25, 95 18 C90 10, 80 12, 78 22 C76 30, 80 40, 82 48"
          stroke="url(#ariesGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Face outline */}
        <ellipse
          cx="60"
          cy="62"
          rx="22"
          ry="26"
          stroke="url(#ariesGrad)"
          strokeWidth="2.5"
          fill="rgba(74, 159, 255, 0.05)"
        />
        {/* Inner face details - eyes */}
        <circle cx="52" cy="56" r="2.5" fill="#4A9FFF" opacity="0.8" />
        <circle cx="68" cy="56" r="2.5" fill="#4A9FFF" opacity="0.8" />
        {/* Nose bridge */}
        <path
          d="M60 52 L60 66"
          stroke="url(#ariesGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Nose/mouth */}
        <path
          d="M55 70 Q60 74, 65 70"
          stroke="url(#ariesGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        {/* Ears */}
        <path
          d="M38 52 C32 48, 30 55, 36 58"
          stroke="url(#ariesGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M82 52 C88 48, 90 55, 84 58"
          stroke="url(#ariesGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Decorative lines between horns */}
        <path
          d="M42 40 Q60 32, 78 40"
          stroke="url(#ariesGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
        {/* Bottom decorative element */}
        <path
          d="M48 88 Q60 95, 72 88"
          stroke="url(#ariesGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
      </g>
      {/* Small decorative stars */}
      <circle cx="15" cy="30" r="1" fill="#4A9FFF" opacity="0.5" />
      <circle cx="105" cy="28" r="1" fill="#6366F1" opacity="0.5" />
      <circle cx="60" cy="8" r="1.5" fill="#8B5CF6" opacity="0.4" />
      <circle cx="20" cy="90" r="1" fill="#4A9FFF" opacity="0.3" />
      <circle cx="100" cy="85" r="1" fill="#6366F1" opacity="0.3" />
    </svg>
  );
}
