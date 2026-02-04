import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import "./DailyInsight.css";

export default function DailyInsight({ insight }) {
  return (
    <motion.section
      className="daily-insight"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
    >
      <div className="insight-header">
        <div className="insight-label-group">
          <Sparkles size={14} className="insight-icon" />
          <span className="insight-label">TODAY&apos;S OVERVIEW</span>
        </div>
        <span className="insight-date">{insight.date}</span>
      </div>
      <motion.p
        className="insight-text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
      >
        &ldquo;{insight.text}&rdquo;
      </motion.p>
    </motion.section>
  );
}
