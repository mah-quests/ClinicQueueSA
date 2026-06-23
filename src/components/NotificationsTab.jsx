import { useState } from "react";

export default function NotificationsTab({ notifications, patients, onSend, onToast }) {
  const [selectedId, setSelectedId]   = useState("");
  const [manualMsg,  setManualMsg]    = useState("Please proceed to the clinic. Your turn is coming up shortly.");

  const waitingPatients = patients.filter(p => p.status === "waiting");

  const handleSend = (type) => {
    const pid = parseInt(selectedId, 10);
    const p   = patients.find(x => x.id === pid);
    if (!p) { onToast("⚠️ Select a patient first."); return; }
    onSend({ patient: p, msg: manualMsg, type });
    onToast(type === "whatsapp" ? "📲 WhatsApp message sent!" : "📱 SMS sent!");
  };

  const whatsappCount = notifications.filter(n => n.type === "whatsapp").length;
  const smsCount      = notifications.filter(n => n.type === "sms").length;

  return (
    <div className="two-col">
      {/* ── Left: notification feed ── */}
      <div className="card">
        <div className="card-title">📲 Sent Notifications ({notifications.length})</div>
        <div className="scroll-list">
          {notifications.length === 0 && (
            <div style={{ color: "#bbb", fontSize: 13 }}>No notifications sent yet.</div>
          )}
          {notifications.map(n => (
            <div key={n.id} className={`sms-item ${n.type === "whatsapp" ? "whatsapp" : ""}`}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: n.type === "whatsapp" ? "#52c41a" : "#9254de" }}>
                  {n.type === "whatsapp" ? "💬 WhatsApp" : "📱 SMS"} → <span className="sms-phone">{n.phone}</span>
                </span>
                <span style={{ fontSize: 11, color: "#aaa" }}>{n.time}</span>
              </div>
              <div style={{ fontSize: 13, color: "#444" }}>{n.msg}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: manual send + stats ── */}
      <div>
        <div className="card">
          <div className="card-title">📡 Send Manual Update</div>

          <div className="form-group">
            <label className="form-label">Patient</label>
            <select className="form-select" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
              <option value="">Select a patient...</option>
              {waitingPatients.map(p => (
                <option key={p.id} value={p.id}>{p.name} (#{p.queueNum})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              className="form-input"
              rows={4}
              style={{ resize: "vertical" }}
              value={manualMsg}
              onChange={e => setManualMsg(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-primary btn-sm" onClick={() => handleSend("whatsapp")}>
              💬 Send WhatsApp
            </button>
            <button className="btn btn-outline btn-sm" onClick={() => handleSend("sms")}>
              📱 Send SMS
            </button>
          </div>
        </div>

        {/* ── Daily stats ── */}
        <div className="card">
          <div className="card-title">📈 Today's Stats</div>
          <div className="three-col">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#52c41a" }}>{whatsappCount}</div>
              <div style={{ fontSize: 12, color: "#888" }}>WhatsApp</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#9254de" }}>{smsCount}</div>
              <div style={{ fontSize: 12, color: "#888" }}>SMS</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#eb2f96" }}>{notifications.length}</div>
              <div style={{ fontSize: 12, color: "#888" }}>Total</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
