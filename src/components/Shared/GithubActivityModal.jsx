import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiX,
  FiUsers,
  FiBook,
  FiArrowUpRight,
  FiGitCommit,
} from "react-icons/fi";

const LEVELS = [
  "bg-white/5 border border-white/[0.06]", // 0 – none
  "bg-[#0e4429]",                           // 1 – faint
  "bg-[#006d32]",                           // 2 – medium
  "bg-[#26a641]",                           // 3 – bright
  "bg-[#39d353]",                           // 4 – max
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function buildWeeks(contributions) {
  if (!contributions.length) return [];
  const weeks = [];
  let week = [];

  // pad start so Sunday = index 0
  const firstDay = new Date(contributions[0].date).getDay();
  for (let i = 0; i < firstDay; i++) week.push(null);

  for (const c of contributions) {
    week.push(c);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

function getMonthLabels(weeks) {
  const labels = [];
  const seen = new Set();
  weeks.forEach((week, wi) => {
    const first = week.find(Boolean);
    if (!first) return;
    const d = new Date(first.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!seen.has(key) && d.getDate() <= 7) {
      seen.add(key);
      labels.push({ wi, label: MONTHS[d.getMonth()] });
    }
  });
  return labels;
}

const GithubActivityModal = () => {
  const [open, setOpen] = useState(false);
  const [weeks, setWeeks] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);
  const [total, setTotal] = useState(null);
  const [ghStats, setGhStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || weeks.length) return;
    setLoading(true);

    Promise.all([
      fetch("https://github-contributions-api.jogruber.de/v4/gamandeepsingh?y=last").then((r) => r.json()),
      fetch("https://api.github.com/users/gamandeepsingh").then((r) => r.json()),
    ])
      .then(([contribData, userData]) => {
        const w = buildWeeks(contribData.contributions || []);
        setWeeks(w);
        setMonthLabels(getMonthLabels(w));
        setTotal(contribData.total?.lastYear ?? null);
        setGhStats({ repos: userData.public_repos, followers: userData.followers });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [open]);

  // close on Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ── Floating trigger button ── */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2
                   bg-[#0d1117]/90 backdrop-blur-xl
                   border border-white/10 rounded-full
                   px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                   cursor-pointer select-none"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.2)" }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open GitHub activity"
      >
        {/* live pulse dot */}
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <FiGithub className="w-[14px] h-[14px] text-white/60" />
        <span className="font-nohemi-thin text-white/60 text-xs tracking-wide">Activity</span>
      </motion.button>

      {/* ── Modal ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[10px]" />

            {/* card */}
            <motion.div
              className="relative w-full max-w-[720px] bg-[#0d1117]
                         border border-white/[0.09] rounded-2xl overflow-hidden
                         shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* top shimmer line */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg
                                  bg-white/[0.05] border border-white/[0.07]">
                    <FiGithub className="w-4 h-4 text-white/70" />
                  </div>
                  <div>
                    <p className="font-nohemi text-white/90 text-sm leading-none mb-0.5">
                      gamandeepsingh
                    </p>
                    <p className="font-nohemi-thin text-gray-500 text-[11px]">
                      {total !== null
                        ? `${total.toLocaleString()} contributions in the last year`
                        : "GitHub activity"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/gamandeepsingh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-1.5
                               font-nohemi-thin text-[11px] text-gray-400
                               hover:text-white transition-colors duration-200
                               px-3 py-1.5 rounded-lg
                               bg-white/[0.04] hover:bg-white/[0.08]
                               border border-white/[0.06]"
                  >
                    View Profile <FiArrowUpRight className="w-3 h-3" />
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg
                               text-gray-500 hover:text-white
                               hover:bg-white/[0.06] transition-all duration-200"
                    aria-label="Close"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* chart body */}
              <div className="px-5 pt-5 pb-4">
                {loading ? (
                  <div className="flex items-center justify-center h-36">
                    <div className="flex gap-1">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-5 bg-green-500/40 rounded-full"
                          animate={{ scaleY: [1, 1.9, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* day-labels + grid */}
                    <div className="flex gap-2">
                      {/* day label column */}
                      <div className="flex flex-col gap-[3px] pt-[20px] flex-shrink-0">
                        {DAY_LABELS.map((d, i) => (
                          <div
                            key={i}
                            className="h-[10px] flex items-center justify-end pr-1"
                          >
                            <span className="font-nohemi-thin text-[9px] text-gray-600 w-5 text-right leading-none">
                              {d}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* scrollable grid */}
                      <div className="flex-1 overflow-x-auto overflow-y-hidden hide-scrollbar">
                        {/* month labels row */}
                        <div className="flex gap-[3px] h-5 mb-0">
                          {weeks.map((_, wi) => {
                            const ml = monthLabels.find((m) => m.wi === wi);
                            return (
                              <div key={wi} className="w-[10px] flex-shrink-0 relative">
                                {ml && (
                                  <span className="absolute left-0 font-nohemi-thin text-[9px] text-gray-500 whitespace-nowrap leading-none">
                                    {ml.label}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* squares grid */}
                        <div className="flex gap-[3px]">
                          {weeks.map((week, wi) => (
                            <div key={wi} className="flex flex-col gap-[3px]">
                              {week.map((day, di) => (
                                <div
                                  key={di}
                                  title={
                                    day
                                      ? `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`
                                      : undefined
                                  }
                                  className={`w-[10px] h-[10px] rounded-[2px] flex-shrink-0
                                              transition-opacity duration-150
                                              ${day ? `${LEVELS[day.level]} hover:opacity-75` : "bg-transparent"}`}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* legend */}
                    <div className="flex items-center justify-end gap-1.5 mt-3">
                      <span className="font-nohemi-thin text-[9px] text-gray-600">Less</span>
                      {LEVELS.map((cls, i) => (
                        <div
                          key={i}
                          className={`w-[10px] h-[10px] rounded-[2px] flex-shrink-0 ${cls}`}
                        />
                      ))}
                      <span className="font-nohemi-thin text-[9px] text-gray-600">More</span>
                    </div>
                  </div>
                )}
              </div>

              {/* stats footer with floating bar at bottom-right */}
              <div className="relative px-5 pb-5">
                <div className="flex items-center justify-between
                                bg-white/[0.03] border border-white/[0.07]
                                rounded-xl px-4 py-3">
                  {/* left: quick stats */}
                  <div className="flex items-center gap-4">
                    {ghStats ? (
                      <>
                        <div className="flex items-center gap-1.5">
                          <FiBook className="w-3.5 h-3.5 text-green-500/60 flex-shrink-0" />
                          <span className="font-nohemi text-white/90 text-sm">{ghStats.repos}</span>
                          <span className="font-nohemi-thin text-gray-500 text-xs">repos</span>
                        </div>
                        <div className="w-px h-3.5 bg-white/10" />
                        <div className="flex items-center gap-1.5">
                          <FiUsers className="w-3.5 h-3.5 text-green-500/60 flex-shrink-0" />
                          <span className="font-nohemi text-white/90 text-sm">{ghStats.followers}</span>
                          <span className="font-nohemi-thin text-gray-500 text-xs">followers</span>
                        </div>
                        {total !== null && (
                          <>
                            <div className="hidden sm:block w-px h-3.5 bg-white/10" />
                            <div className="hidden sm:flex items-center gap-1.5">
                              <FiGitCommit className="w-3.5 h-3.5 text-green-500/60 flex-shrink-0" />
                              <span className="font-nohemi text-white/90 text-sm">{total.toLocaleString()}</span>
                              <span className="font-nohemi-thin text-gray-500 text-xs">contributions</span>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <span className="font-nohemi-thin text-gray-600 text-xs">—</span>
                    )}
                  </div>

                  
                </div>
              </div>

              {/* bottom shimmer */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GithubActivityModal;
