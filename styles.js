const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fff0f6; }
  .app { min-height: 100vh; background: linear-gradient(135deg, #fff0f6 0%, #ffe4f0 50%, #ffd6e7 100%); }

  /* ── Top bar ── */
  .topbar {
    background: linear-gradient(90deg, #c41d7f 0%, #eb2f96 60%, #f759ab 100%);
    padding: 14px 28px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 4px 20px rgba(196,29,127,0.3);
  }
  .logo { color: white; font-weight: 800; font-size: 20px; display: flex; align-items: center; gap: 10px; }
  .logo-icon { background: rgba(255,255,255,0.2); border-radius: 10px; padding: 6px 10px; font-size: 18px; }
  .tagline { color: rgba(255,255,255,0.75); font-size: 12px; font-weight: 500; }
  .live-badge { background: rgba(255,255,255,0.2); color: white; border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
  .live-dot { width: 7px; height: 7px; background: #b7eb8f; border-radius: 50%; animation: pulse 1.5s infinite; }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }

  /* ── Tab bar ── */
  .tab-bar { display: flex; background: white; border-bottom: 2px solid #ffd6e7; padding: 0 28px; gap: 4px; box-shadow: 0 2px 8px rgba(196,29,127,0.08); }
  .tab { padding: 14px 22px; cursor: pointer; font-weight: 600; font-size: 14px; color: #999; border-bottom: 3px solid transparent; transition: all 0.2s; margin-bottom: -2px; display: flex; align-items: center; gap: 8px; }
  .tab:hover { color: #eb2f96; }
  .tab.active { color: #c41d7f; border-bottom-color: #c41d7f; }
  .tab-badge { background: #eb2f96; color: white; border-radius: 12px; padding: 1px 7px; font-size: 11px; }

  /* ── Layout ── */
  .content { padding: 28px; max-width: 1200px; margin: 0 auto; }
  .two-col   { display: grid; grid-template-columns: 1fr 1fr;         gap: 20px; }
  .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr;     gap: 16px; }

  /* ── Cards ── */
  .card { background: white; border-radius: 16px; box-shadow: 0 2px 16px rgba(196,29,127,0.08); border: 1px solid #ffd6e7; padding: 24px; margin-bottom: 20px; }
  .card-title { font-weight: 700; font-size: 16px; color: #333; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }

  /* ── Stat cards ── */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
  .stat-card  { background: white; border-radius: 14px; padding: 20px; border: 1px solid #ffd6e7; box-shadow: 0 2px 12px rgba(196,29,127,0.07); }
  .stat-label { font-size: 12px; color: #999; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
  .stat-val   { font-size: 32px; font-weight: 800; color: #c41d7f; line-height: 1; }
  .stat-sub   { font-size: 12px; color: #bbb; margin-top: 6px; }
  .stat-icon  { font-size: 22px; float: right; margin-top: -4px; }

  /* ── Queue list ── */
  .queue-item { display: flex; align-items: center; gap: 16px; padding: 14px 16px; border-radius: 12px; border: 1px solid #ffeef7; background: #fff9fc; margin-bottom: 10px; transition: all 0.2s; }
  .queue-item:hover { border-color: #ffadd2; background: #fff0f6; }
  .queue-num  { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #eb2f96, #f759ab); color: white; font-weight: 800; font-size: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .queue-num.active { background: linear-gradient(135deg, #52c41a, #73d13d); animation: glow 2s infinite; }
  @keyframes glow { 0%,100%{box-shadow:0 0 0 0 rgba(82,196,26,0.4)} 50%{box-shadow:0 0 0 8px rgba(82,196,26,0)} }
  .queue-info { flex: 1; }
  .queue-name { font-weight: 700; font-size: 14px; color: #222; }
  .queue-detail { font-size: 12px; color: #888; margin-top: 2px; }
  .queue-wait { text-align: right; }
  .wait-time  { font-size: 18px; font-weight: 800; color: #eb2f96; }
  .wait-label { font-size: 11px; color: #bbb; }

  /* ── Badges ── */
  .badge        { display: inline-flex; align-items: center; gap: 5px; border-radius: 20px; padding: 3px 10px; font-size: 11px; font-weight: 600; }
  .badge-green  { background: #f6ffed; color: #52c41a;  border: 1px solid #b7eb8f; }
  .badge-pink   { background: #fff0f6; color: #c41d7f;  border: 1px solid #ffadd2; }
  .badge-orange { background: #fff7e6; color: #fa8c16;  border: 1px solid #ffd591; }
  .badge-blue   { background: #e6f7ff; color: #1890ff;  border: 1px solid #91d5ff; }

  /* ── Buttons ── */
  .btn         { padding: 10px 20px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; border: none; transition: all 0.2s; }
  .btn-primary { background: linear-gradient(135deg, #eb2f96, #c41d7f); color: white; box-shadow: 0 4px 12px rgba(196,29,127,0.3); }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(196,29,127,0.4); }
  .btn-outline { background: white; color: #eb2f96; border: 2px solid #eb2f96; }
  .btn-outline:hover { background: #fff0f6; }
  .btn-sm      { padding: 6px 14px; font-size: 12px; border-radius: 8px; }
  .btn-green   { background: linear-gradient(135deg, #52c41a, #389e0d); color: white; }
  .btn-gray    { background: #f5f5f5; color: #666; border: 1px solid #ddd; }

  /* ── Form inputs ── */
  .form-group  { margin-bottom: 16px; }
  .form-label  { font-size: 13px; font-weight: 600; color: #555; margin-bottom: 6px; display: block; }
  .form-input  { width: 100%; padding: 10px 14px; border: 2px solid #ffd6e7; border-radius: 10px; font-size: 14px; font-family: inherit; outline: none; transition: border 0.2s; }
  .form-input:focus  { border-color: #eb2f96; }
  .form-select { width: 100%; padding: 10px 14px; border: 2px solid #ffd6e7; border-radius: 10px; font-size: 14px; font-family: inherit; outline: none; background: white; }
  .form-select:focus { border-color: #eb2f96; }
  .form-row    { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  /* ── Notification feed ── */
  .sms-item          { padding: 12px 14px; border-radius: 10px; background: #f9f0ff; border-left: 4px solid #9254de; margin-bottom: 10px; font-size: 13px; }
  .sms-item.whatsapp { background: #f6ffed; border-left-color: #52c41a; }
  .sms-phone         { font-weight: 700; color: #555; }

  /* ── Patient tracking hero ── */
  .track-hero       { background: linear-gradient(135deg, #c41d7f 0%, #f759ab 100%); border-radius: 20px; padding: 32px; color: white; text-align: center; margin-bottom: 24px; }
  .track-num        { font-size: 72px; font-weight: 800; line-height: 1; }
  .track-label      { font-size: 14px; opacity: 0.8; margin-top: 6px; }
  .track-wait       { font-size: 28px; font-weight: 700; margin-top: 16px; }
  .track-wait-label { font-size: 13px; opacity: 0.75; }

  /* ── Progress bar ── */
  .progress-bar-wrap { background: #ffd6e7; border-radius: 8px; height: 10px; margin: 8px 0; }
  .progress-bar-fill { background: linear-gradient(90deg, #eb2f96, #f759ab); border-radius: 8px; height: 100%; transition: width 0.5s; }

  /* ── Capacity bars ── */
  .capacity-bar { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .cap-label    { font-size: 13px; font-weight: 600; color: #444; width: 160px; flex-shrink: 0; }
  .cap-track    { flex: 1; background: #ffd6e7; border-radius: 6px; height: 12px; }
  .cap-fill     { height: 100%; border-radius: 6px; background: linear-gradient(90deg, #eb2f96, #f759ab); }
  .cap-fill.warn { background: linear-gradient(90deg, #fa8c16, #ffa940); }
  .cap-fill.ok   { background: linear-gradient(90deg, #52c41a, #73d13d); }
  .cap-pct      { font-size: 13px; font-weight: 700; color: #c41d7f; width: 40px; text-align: right; flex-shrink: 0; }

  /* ── Scrollable list ── */
  .scroll-list { max-height: 380px; overflow-y: auto; }
  .scroll-list::-webkit-scrollbar       { width: 6px; }
  .scroll-list::-webkit-scrollbar-track { background: #ffd6e7; border-radius: 3px; }
  .scroll-list::-webkit-scrollbar-thumb { background: #eb2f96; border-radius: 3px; }

  /* ── Toast ── */
  .toast { position: fixed; bottom: 24px; right: 24px; background: linear-gradient(135deg, #eb2f96, #c41d7f); color: white; padding: 14px 20px; border-radius: 12px; font-size: 14px; font-weight: 600; box-shadow: 0 8px 24px rgba(196,29,127,0.4); z-index: 9999; animation: slideIn 0.3s ease; max-width: 320px; }
  @keyframes slideIn { from { transform: translateX(100px); opacity:0; } to { transform: translateX(0); opacity:1; } }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .stats-grid              { grid-template-columns: repeat(2, 1fr); }
    .two-col, .form-row      { grid-template-columns: 1fr; }
    .content                 { padding: 16px; }
    .three-col               { grid-template-columns: 1fr; }
  }
`;

export default styles;
