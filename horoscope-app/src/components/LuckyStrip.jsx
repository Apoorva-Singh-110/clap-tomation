import { motion } from "framer-motion";
import "./LuckyStrip.css";

export default function LuckyStrip({ data }) {
  return (
    <motion.section
      className="lucky-strip"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
    >
      <div className="lucky-column">
        <span className="lucky-label">LUCKY NUMBERS</span>
        <div className="lucky-numbers">
          {data.numbers.map((num, i) => (
            <span key={i} className="lucky-number-group">
              {i > 0 && <span className="number-dot">&middot;</span>}
              <motion.span
                className="lucky-number"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
              >
                {num}
              </motion.span>
            </span>
          ))}
        </div>
      </div>

      <div className="lucky-divider" />

      <div className="lucky-column">
        <span className="lucky-label">LUCKY COLORS</span>
        <div className="lucky-colors">
          {data.colors.map((color, i) => (
            <div key={i} className="color-item">
              <motion.div
                className="color-circle"
                style={{
                  background: color.hex,
                  boxShadow: `0 0 12px ${color.hex}60`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 8px ${color.hex}40`,
                    `0 0 16px ${color.hex}70`,
                    `0 0 8px ${color.hex}40`,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
              <span className="color-name">{color.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lucky-divider" />

      <div className="lucky-column">
        <span className="lucky-label">PEAK TIME</span>
        <motion.span
          className="peak-time"
          animate={{
            textShadow: [
              "0 0 8px rgba(52, 211, 153, 0.3)",
              "0 0 16px rgba(52, 211, 153, 0.5)",
              "0 0 8px rgba(52, 211, 153, 0.3)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {data.peakTime.range}
        </motion.span>
        <span className="peak-descriptor">{data.peakTime.descriptor}</span>
      </div>
    </motion.section>
  );
}
