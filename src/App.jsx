import { useState, useCallback } from "react";

import styles                from "./styles";
import { INITIAL_PATIENTS, INITIAL_NOTIFICATIONS, MINS_PER_SLOT } from "./constants";
import BookingTab            from "./components/BookingTab";
import TrackTab              from "./components/TrackTab";
import ClinicTab             from "./components/ClinicTab";
import NotificationsTab      from "./components/NotificationsTab";

// Simple incrementing IDs (fine for a demo)
let nextId    = INITIAL_PATIENTS.length + 1;
let nextQueue = INITIAL_PATIENTS.length + 1;

export default function App() {
  const [tab,           setTab]           = useState("patient");
  const [patients,      setPatients]      = useState(INITIAL_PATIENTS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [toast,         setToast]         = useState(null);

  // ── Helpers ───────────────────────────────────────────────────────────────

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }, []);

  const addNotification = useCallback((notif) => {
    setNotifications(prev => [notif, ...prev]);
  }, []);

  const recalcWaits = (list) => {
    let wait = 0;
    return list.map(p => {
      if (p.status === "waiting") { const updated = { ...p, estimatedWait: wait }; wait += MINS_PER_SLOT; return updated; }
      return p;
    });
  };

  // ── Shared actions (passed as props) ──────────────────────────────────────

  /** Called by BookingTab when the form is submitted */
  const handleBook = (form) => {
    const queueNum = nextQueue++;
    const ref      = `QUE-${queueNum}00${queueNum}`;
    const waiting  = patients.filter(p => p.status === "waiting");

    const newPatient = {
      id: nextId++,
      name:         form.name,
      phone:        form.phone,
      service:      form.service,
      status:       "waiting",
      queueNum,
      bookedTime:   form.time,
      estimatedWait: waiting.length * MINS_PER_SLOT,
      notified:     false,
    };

    setPatients(prev => [...prev, newPatient]);
    addNotification({
      id:   Date.now(),
      type: "whatsapp",
      phone: form.phone,
      name: form.name.split(" ")[0],
      msg:  `Booking confirmed ✅ Queue #${queueNum} | ${form.service} | ${form.clinic} | ${form.date} ${form.time}. Track: ${ref}`,
      time: now(),
    });
    showToast(`✅ Booking confirmed! Queue #${queueNum} assigned`);
    return { queueNum, ref };
  };

  /** Called by ClinicTab "Call Next" button */
  const handleCallNext = () => {
    setPatients(prev => {
      let updated = prev.map(p => p.status === "in-progress" ? { ...p, status: "done" } : p);
      const nextIdx = updated.findIndex(p => p.status === "waiting");
      if (nextIdx !== -1) {
        updated[nextIdx] = { ...updated[nextIdx], status: "in-progress" };
        const p = updated[nextIdx];
        addNotification({
          id:   Date.now(),
          type: Math.random() > 0.5 ? "whatsapp" : "sms",
          phone: p.phone,
          name: p.name.split(" ")[0],
          msg:  `You are next! Please proceed to the consultation area. Queue #${p.queueNum}`,
          time: now(),
        });
        showToast(`📲 ${p.name} notified — Queue #${p.queueNum} called`);
      }
      return recalcWaits(updated);
    });
  };

  /** Called by ClinicTab "Notify" per-patient button */
  const handleNotifyPatient = (p, position) => {
    setPatients(prev => prev.map(x => x.id === p.id ? { ...x, notified: true } : x));
    addNotification({
      id:   Date.now(),
      type: "whatsapp",
      phone: p.phone,
      name: p.name.split(" ")[0],
      msg:  `Hi ${p.name.split(" ")[0]} 👋 You're #${position} in queue. Est. wait: ${p.estimatedWait} min. Please make your way to the clinic.`,
      time: now(),
    });
    showToast(`📲 Notified ${p.name.split(" ")[0]}`);
  };

  /** Called by NotificationsTab manual send panel */
  const handleManualSend = ({ patient, msg, type }) => {
    addNotification({
      id: Date.now(),
      type,
      phone: patient.phone,
      name:  patient.name.split(" ")[0],
      msg,
      time: now(),
    });
  };

  // ── Derived counts for tab badges ─────────────────────────────────────────

  const waitingCount = patients.filter(p => p.status === "waiting").length;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* Top bar */}
        <div className="topbar">
          <div>
            <div className="logo">
              <span className="logo-icon">🏥</span> QueHealth SA
            </div>
            <div className="tagline">Smart clinic queue management for South Africa</div>
          </div>
          <div className="live-badge">
            <div className="live-dot" /> Live System
          </div>
        </div>

        {/* Tab navigation */}
        <div className="tab-bar">
          <div className={`tab ${tab === "patient"       ? "active" : ""}`} onClick={() => setTab("patient")}>🙋 Book Appointment</div>
          <div className={`tab ${tab === "track"         ? "active" : ""}`} onClick={() => setTab("track")}>🔍 Track My Queue</div>
          <div className={`tab ${tab === "clinic"        ? "active" : ""}`} onClick={() => setTab("clinic")}>
            🏥 Clinic Dashboard <span className="tab-badge">{waitingCount}</span>
          </div>
          <div className={`tab ${tab === "notifications" ? "active" : ""}`} onClick={() => setTab("notifications")}>
            📲 Notifications <span className="tab-badge">{notifications.length}</span>
          </div>
        </div>

        {/* Tab content */}
        <div className="content">
          {tab === "patient"       && <BookingTab       patients={patients}       onBook={handleBook} />}
          {tab === "track"         && <TrackTab         patients={patients}       onToast={showToast} />}
          {tab === "clinic"        && <ClinicTab        patients={patients}       onCallNext={handleCallNext} onNotifyPatient={handleNotifyPatient} />}
          {tab === "notifications" && <NotificationsTab notifications={notifications} patients={patients} onSend={handleManualSend} onToast={showToast} />}
        </div>
      </div>

      {toast && <div className="toast">🌸 {toast}</div>}
    </>
  );
}

// ── Utility ───────────────────────────────────────────────────────────────────
function now() {
  return new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" });
}
