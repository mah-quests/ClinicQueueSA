 //  DESC:  All shared data, initial state, and config constants.
//         Edit this file to change clinics, services, seed patients, or colours.
// ─────────────────────────────────────────────

export const PINK = {
  50:  "#fff0f6",
  100: "#ffd6e7",
  200: "#ffadd2",
  300: "#ff85c2",
  400: "#f759ab",
  500: "#eb2f96",
  600: "#c41d7f",
  700: "#9e1068",
  800: "#780650",
  900: "#520339",
};

export const SERVICES = [
  "General Consultation",
  "Chronic Medication",
  "Maternal Health",
  "HIV/ARV Clinic",
  "Immunisation",
  "Mental Health",
];

export const CLINICS = [
  "Soweto Community Clinic",
  "Khayelitsha District Clinic",
  "Alexandra Health Centre",
  "Umlazi Gateway Clinic",
];

export const TIME_SLOTS = [
  "07:30","08:00","08:30","09:00","09:30",
  "10:00","10:30","11:00","11:30","12:00",
];

/** Seed patients shown on first load */
export const INITIAL_PATIENTS = [
  { id: 1, name: "Nomsa Dlamini",  phone: "0821234567", service: "General Consultation", status: "in-progress", queueNum: 1, bookedTime: "08:00", estimatedWait: 0,  notified: true  },
  { id: 2, name: "Thabo Mokoena",  phone: "0837654321", service: "Chronic Medication",   status: "waiting",     queueNum: 2, bookedTime: "08:30", estimatedWait: 15, notified: true  },
  { id: 3, name: "Zanele Khumalo", phone: "0849876543", service: "Maternal Health",       status: "waiting",     queueNum: 3, bookedTime: "09:00", estimatedWait: 30, notified: false },
  { id: 4, name: "Sipho Nkosi",    phone: "0765432109", service: "HIV/ARV Clinic",        status: "waiting",     queueNum: 4, bookedTime: "09:00", estimatedWait: 45, notified: false },
  { id: 5, name: "Lerato Sithole", phone: "0712345678", service: "General Consultation",  status: "waiting",     queueNum: 5, bookedTime: "09:30", estimatedWait: 60, notified: false },
];

/** Seed notifications shown on first load */
export const INITIAL_NOTIFICATIONS = [
  { id: 1, type: "sms",      phone: "082 123 4567", name: "Nomsa", msg: "You are next! Please proceed to Consultation Room 2. Ref: #Q001",                                          time: "09:14" },
  { id: 2, type: "whatsapp", phone: "083 765 4321", name: "Thabo", msg: "Hi Thabo 👋 Your queue number is #2. Est. wait: 15 min. Soweto Community Clinic.",                         time: "09:02" },
];

/** How many minutes per consultation slot (used for wait-time math) */
export const MINS_PER_SLOT = 15;
