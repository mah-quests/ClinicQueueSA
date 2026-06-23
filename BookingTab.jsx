import { useState } from "react";
import { SERVICES, CLINICS, TIME_SLOTS } from "../constants";

const EMPTY_FORM = { name: "", phone: "", service: "", clinic: "", date: "", time: "" };

export default function BookingTab({ patients, onBook }) {
  const [form, setForm]         = useState(EMPTY_FORM);
  const [success, setSuccess]   = useState(null);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onBook(form);    // parent assigns queueNum + ref
    setSuccess({ ...form, ...result });
    setForm(EMPTY_FORM);
  };

  if (success) {
    return (
      <div className="two-col">
        <div className="card" style={{ textAlign: "center", padding: "40px 24px" }}>
          <div style={{ fontSize: 52 }}>🎉</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#c41d7f", marginTop: 12 }}>Booking Confirmed!</div>
          <div style={{ marginTop: 16, background: "#fff0f6", borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#eb2f96" }}>Queue #{success.queueNum}</div>
            <div style={{ color: "#aaa", fontSize: 13, marginTop: 4 }}>Ref: {success.ref}</div>
            <div style={{ marginTop: 14, fontSize: 14, lineHeight: 2, color: "#555" }}>
              <div>📍 {success.clinic}</div>
              <div>🩺 {success.service}</div>
              <div>🕐 {success.date} at {success.time}</div>
              <div>📱 Confirmation sent to {success.phone}</div>
            </div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: 20, width: "100%" }} onClick={() => setSuccess(null)}>
            Book Another Appointment
          </button>
        </div>
        <WaitTimesPanel patients={patients} />
      </div>
    );
  }

  return (
    <div className="two-col">
      {/* ── Left: booking form ── */}
      <div className="card">
        <div className="card-title">📅 Book Your Appointment</div>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" placeholder="e.g. Nomsa Dlamini" required
                value={form.name} onChange={e => set("name", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone / WhatsApp</label>
              <input className="form-input" placeholder="e.g. 082 000 0000" required
                value={form.phone} onChange={e => set("phone", e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Select Clinic</label>
            <select className="form-select" required value={form.clinic} onChange={e => set("clinic", e.target.value)}>
              <option value="">Choose a clinic...</option>
              {CLINICS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Service Needed</label>
            <select className="form-select" required value={form.service} onChange={e => set("service", e.target.value)}>
              <option value="">Select service...</option>
              {SERVICES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input className="form-input" type="date" required
                value={form.date} onChange={e => set("date", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Preferred Time</label>
              <select className="form-select" required value={form.time} onChange={e => set("time", e.target.value)}>
                <option value="">Pick a slot...</option>
                {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 4 }}>
            Confirm Booking &amp; Join Queue
          </button>
        </form>
      </div>

      {/* ── Right: live wait times + how it works ── */}
      <WaitTimesPanel patients={patients} />
    </div>
  );
}

function WaitTimesPanel({ patients }) {
  return (
    <div>
      <div className="card">
        <div className="card-title">⏳ Today's Live Wait Times</div>
        {SERVICES.slice(0, 5).map(s => {
          const count = patients.filter(p => p.service === s && p.status === "waiting").length;
          const wait  = count * 15;
          return (
            <div key={s} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#444" }}>{s}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: wait > 45 ? "#fa8c16" : "#52c41a" }}>{wait} min</span>
              </div>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${Math.min((wait / 90) * 100, 100)}%`,
                    background: wait > 45 ? "linear-gradient(90deg,#fa8c16,#ffa940)" : undefined,
                  }}
                />
              </div>
              <div style={{ fontSize: 11, color: "#aaa" }}>{count} patient{count !== 1 ? "s" : ""} waiting</div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="card-title">📌 How It Works</div>
        {[
          ["1️⃣", "Book online — no need to queue early morning"],
          ["2️⃣", "Get your queue number via SMS or WhatsApp"],
          ["3️⃣", "Track live wait times from home"],
          ["4️⃣", "Arrive when your turn is near"],
        ].map(([num, text]) => (
          <div key={num} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 20 }}>{num}</span>
            <span style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
