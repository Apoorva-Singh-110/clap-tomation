import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Activity,
  Briefcase,
  Brain,
  Compass,
  Clover,
  Check,
  X,
} from "lucide-react";
import "./HoroscopeCarousel.css";

const iconMap = {
  "heart-people": Heart,
  wellness: Activity,
  briefcase: Briefcase,
  "mind-heart": Brain,
  compass: Compass,
  "four-leaf-clover": Clover,
};

export default function HoroscopeCarousel({ cards }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardWidthRef = useRef(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    function handleScroll() {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.firstElementChild?.offsetWidth || 0;
      const gap = 14;
      cardWidthRef.current = cardWidth;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.max(0, Math.min(index, cards.length - 1)));
    }

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [cards.length]);

  return (
    <motion.section
      className="horoscope-carousel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
    >
      <div className="carousel-track" ref={scrollRef}>
        {cards.map((card, i) => (
          <HoroscopeCard
            key={card.category}
            card={card}
            index={i}
            isActive={activeIndex === i}
          />
        ))}
      </div>

      <div className="carousel-dots">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`carousel-dot ${activeIndex === i ? "active" : ""}`}
          />
        ))}
      </div>
    </motion.section>
  );
}

function HoroscopeCard({ card, index, isActive }) {
  const IconComponent = iconMap[card.icon] || Heart;

  return (
    <motion.article
      className={`horoscope-card ${isActive ? "is-active" : ""}`}
      style={{
        "--card-color": card.color,
        "--card-color-10": `${card.color}1A`,
        "--card-color-20": `${card.color}33`,
      }}
      animate={{ y: [0, -3, 0] }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.3,
      }}
    >
      <div className="card-header">
        <div
          className="card-icon"
          style={{
            background: `${card.color}1A`,
            border: `1px solid ${card.color}33`,
          }}
        >
          <IconComponent size={20} color={card.color} />
        </div>
        <span className="card-category">{card.category}</span>
      </div>

      <p className="card-insight">{card.insight}</p>

      <div className="card-divider" />

      <div className="card-actions">
        <div className="action-box do-box">
          <div className="action-label do-label">
            <Check size={12} />
            <span>DO</span>
          </div>
          <span className="action-text">{card.do}</span>
        </div>
        <div className="action-box dont-box">
          <div className="action-label dont-label">
            <X size={12} />
            <span>DON&apos;T</span>
          </div>
          <span className="action-text">{card.dont}</span>
        </div>
      </div>
    </motion.article>
  );
}
