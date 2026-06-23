// ─────────────────────────────────────────────
//  OWNER: Ofentse
//  FILE:  src/components/TrackTab.jsx
//  DESC:  "Track My Queue" tab — patients search for their position
//         and see live status, wait time, and notification status.
//         Props: { patients, onToast }
// ─────────────────────────────────────────────

import { useState } from "react";

export default function TrackTab({ patients, onToast }) {
  const [query,   setQuery]   = useState("");
  const [tracked, setTracked] = useState(null);

  const handleTrack = () => {
    const q = query.trim().toLowerCase();
    const found = patients.find(p =>
      p.name.toLowerCase().includes(q) ||
      `QUE-${p.queueNum}00${p.queueNum}`.toLowerCase() === q
    );
    if (found) {
      setTracked(found);
    } else {
      onToast("No booking found.");
      setTracked(null);
    }
  };

  const waiting = patients.filter(p => p.status === "waiting");

  return (
    <div>
      {/* ── Search box ── */}
      <div className="card" style={{ maxWidth: 500 }}>
        <div className="card-title">Track Your Position</div>
        <div className="form-group">
          <label className="form-label">Enter your name or booking reference</label>
          <input
            className="form-input"
            placeholder="e.g. Nomsa  or  QUE-200200"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleTrack()}
          />
        </div>
        <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleTrack}>
          Track My Queue
        </button>
      </div>

      {/* ── Tracked result ── */}
      {tracked && <TrackedResult patient={tracked} allWaiting={waiting} />}

      {/* ── Fallback: show full active queue ── */}
      {!tracked && (
        <div className="card">
          <div className="card-title">Active Queue Today</div>
          <div className="scroll-list">
            {patients.filter(p => p.status !== "done").map(p => (
              <div className="queue-item" key={p.id}>
                <div className={`queue-num ${p.status === "in-progress" ? "active" : ""}`}>{p.queueNum}</div>
                <div className="queue-info">
                  <div className="queue-name">{p.name}</div>
                  <div className="queue-detail">{p.service}</div>
                </div>
                <div className="queue-wait">
                  {p.status === "in-progress"
                    ? <div style={{ color: "#52c41a", fontWeight: 700, fontSize: 14 }}>🟢 Now</div>
                    : <><div className="wait-time">{p.estimatedWait}m</div><div className="wait-label">est. wait</div></>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TrackedResult({ patient, allWaiting }) {
  const position = allWaiting.findIndex(p => p.id === patient.id) + 1;

  return (
    <div>
      {/* ── Hero banner ── */}
      <div className="track-hero">
        <div style={{ fontSize: 13, opacity: 0.8 }}>Your Queue Number</div>
        <div className="track-num">#{patient.queueNum}</div>
        <div className="track-label">{patient.service}</div>

        {patient.status === "in-progress" && <div className="track-wait">🟢 It's Your Turn!</div>}
        {patient.status === "done"        && <div className="track-wait">✅ Visit Complete</div>}
        {patient.status === "waiting"     && (
          <>
            <div className="track-wait">~{patient.estimatedWait} min wait</div>
            <div className="track-wait-label">{position} {position === 1 ? "person" : "people"} ahead of you</div>
          </>
        )}
      </div>

      <div className="two-col">
        {/* ── Booking details ── */}
        <div className="card">
          <div className="card-title">📋 Your Booking Details</div>
          <div style={{ fontSize: 14, lineHeight: 2.2, color: "#555" }}>
            <div><strong>{patient.name}</strong></div>
            <div>{patient.service}</div>
            <div>{patient.phone}</div>
            <div>Booked: {patient.bookedTime}</div>
            <div style={{ marginTop: 8 }}>
              <span className={`badge ${
                patient.status === "in-progress" ? "badge-green"
                : patient.status === "done"      ? "badge-blue"
                : "badge-pink"
              }`}>
                {patient.status === "in-progress" ? "In Progress"
                 : patient.status === "done"      ? "Done"
                 : "Waiting"}
              </span>
            </div>
          </div>
        </div>

        {/* ── Notification status ── */}
        <div className="card">
          <div className="card-title">📲 SMS / WhatsApp Updates</div>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 2 }}>
            <div>Booking confirmation sent</div>
            <div>
              {patient.notified
                ? "Queue position update sent"
                : "Update will be sent 15 min before your turn"}
            </div>
          </div>
          <div style={{ marginTop: 14, background: "#fff0f6", padding: 14, borderRadius: 10, fontSize: 12, color: "#888", lineHeight: 1.6 }}>
            You'll receive a WhatsApp or SMS when you're next. No need to wait at the clinic!
          </div>
        </div>
      </div>
    </div>
  );
}
