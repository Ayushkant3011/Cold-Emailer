import { motion } from "framer-motion";

function LiquidBlobs() {
  return (
    <div className="liquid-blobs">
      <motion.div
        className="blob blob-1"
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob blob-2"
        animate={{ x: [0, -100, 0], y: [0, 70, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob blob-3"
        animate={{ x: [0, 60, 0], y: [0, 90, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default LiquidBlobs;
