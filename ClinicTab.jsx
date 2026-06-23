import React from "react";

function formatWaitTime(minutes) {
	if (minutes === null || minutes === undefined || Number.isNaN(Number(minutes))) {
		return "--";
	}

	const value = Number(minutes);
	if (value < 60) {
		return `${value} min`;
	}

	const hours = Math.floor(value / 60);
	const remainingMinutes = value % 60;
	return `${hours}h ${remainingMinutes}m`;
}

function formatClock(timeValue) {
	if (!timeValue) {
		return "--:--";
	}

	const parsed = new Date(timeValue);
	if (Number.isNaN(parsed.getTime())) {
		return String(timeValue);
	}

	return parsed.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
}

function getStatusLabel(status) {
	if (status === "in progress") {
		return "In progress";
	}

	if (status === "done") {
		return "Completed";
	}

	return "Waiting";
}

function getStatusTone(status) {
	if (status === "in progress") {
		return "active";
	}

	if (status === "done") {
		return "done";
	}

	return "waiting";
}

export default function ClinicTab({ patients = [], onCallNext, onNotifyPatient }) {
	const normalizedPatients = Array.isArray(patients) ? patients : [];

	const waitingPatients = normalizedPatients
		.filter((patient) => patient.status === "waiting")
		.sort((left, right) => Number(left.queueNum ?? 0) - Number(right.queueNum ?? 0));

	const inProgressPatients = normalizedPatients.filter((patient) => patient.status === "in progress");
	const completedPatients = normalizedPatients.filter((patient) => patient.status === "done");
	const notifiedCount = normalizedPatients.filter((patient) => patient.notified).length;

	const nextPatient = waitingPatients[0] || null;

	const serviceLoad = normalizedPatients.reduce((accumulator, patient) => {
		const serviceName = patient.service || "Unassigned";
		accumulator[serviceName] = (accumulator[serviceName] || 0) + 1;
		return accumulator;
	}, {});

	const busiestService = Object.entries(serviceLoad).sort((left, right) => right[1] - left[1])[0] || null;

	const dashboardCards = [
		{ label: "Waiting now", value: waitingPatients.length, hint: "Patients ready in queue" },
		{ label: "In progress", value: inProgressPatients.length, hint: "Currently being served" },
		{ label: "Completed today", value: completedPatients.length, hint: "Visits marked done" },
		{ label: "Notified", value: notifiedCount, hint: "Waiting patients informed" },
	];

	const styles = {
		root: {
			minHeight: "100%",
			padding: "24px",
			background:
				"radial-gradient(circle at top left, rgba(255, 204, 112, 0.28), transparent 38%), linear-gradient(180deg, #f8f4ed 0%, #f3ede4 100%)",
			color: "#1f2933",
			fontFamily:
				'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
		},
		shell: {
			maxWidth: "1200px",
			margin: "0 auto",
			display: "grid",
			gap: "20px",
		},
		hero: {
			display: "grid",
			gridTemplateColumns: "1.5fr 1fr",
			gap: "20px",
			alignItems: "stretch",
		},
		heroPanel: {
			background: "rgba(255, 255, 255, 0.88)",
			border: "1px solid rgba(31, 41, 51, 0.08)",
			borderRadius: "24px",
			padding: "24px",
			boxShadow: "0 20px 60px rgba(31, 41, 51, 0.08)",
			backdropFilter: "blur(10px)",
		},
		eyebrow: {
			textTransform: "uppercase",
			letterSpacing: "0.14em",
			fontSize: "12px",
			color: "#7a5c2e",
			fontWeight: 700,
			marginBottom: "10px",
		},
		title: {
			fontSize: "clamp(28px, 4vw, 42px)",
			lineHeight: 1.05,
			margin: 0,
			color: "#13212b",
		},
		subtitle: {
			marginTop: "12px",
			marginBottom: "0",
			fontSize: "15px",
			lineHeight: 1.65,
			color: "#52606d",
			maxWidth: "68ch",
		},
		actionRow: {
			display: "flex",
			flexWrap: "wrap",
			gap: "12px",
			marginTop: "20px",
		},
		primaryButton: {
			appearance: "none",
			border: "none",
			borderRadius: "999px",
			padding: "12px 18px",
			background: "#0f6b5c",
			color: "white",
			fontWeight: 700,
			cursor: "pointer",
			boxShadow: "0 10px 24px rgba(15, 107, 92, 0.24)",
		},
		secondaryButton: {
			appearance: "none",
			border: "1px solid rgba(15, 107, 92, 0.18)",
			borderRadius: "999px",
			padding: "12px 18px",
			background: "white",
			color: "#0f6b5c",
			fontWeight: 700,
			cursor: "pointer",
		},
		insightPanel: {
			background: "linear-gradient(180deg, #12343b 0%, #0f6b5c 100%)",
			color: "white",
			borderRadius: "24px",
			padding: "24px",
			boxShadow: "0 20px 60px rgba(15, 107, 92, 0.22)",
			display: "grid",
			gap: "16px",
			alignContent: "start",
		},
		insightLabel: {
			fontSize: "12px",
			textTransform: "uppercase",
			letterSpacing: "0.12em",
			opacity: 0.78,
			fontWeight: 700,
		},
		insightValue: {
			fontSize: "38px",
			lineHeight: 1,
			margin: 0,
			fontWeight: 800,
		},
		insightText: {
			margin: 0,
			color: "rgba(255, 255, 255, 0.8)",
			lineHeight: 1.6,
		},
		cardsGrid: {
			display: "grid",
			gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
			gap: "16px",
		},
		statCard: {
			background: "rgba(255, 255, 255, 0.9)",
			borderRadius: "20px",
			padding: "18px",
			border: "1px solid rgba(31, 41, 51, 0.06)",
			boxShadow: "0 14px 40px rgba(31, 41, 51, 0.06)",
		},
		statLabel: {
			margin: 0,
			color: "#52606d",
			fontSize: "13px",
			fontWeight: 600,
		},
		statValue: {
			margin: "10px 0 6px",
			fontSize: "30px",
			lineHeight: 1,
			color: "#13212b",
			fontWeight: 800,
		},
		statHint: {
			margin: 0,
			color: "#8293a3",
			fontSize: "13px",
		},
		mainGrid: {
			display: "grid",
			gridTemplateColumns: "1.2fr 0.8fr",
			gap: "20px",
			alignItems: "start",
		},
		panel: {
			background: "rgba(255, 255, 255, 0.9)",
			border: "1px solid rgba(31, 41, 51, 0.06)",
			borderRadius: "24px",
			padding: "22px",
			boxShadow: "0 18px 50px rgba(31, 41, 51, 0.06)",
		},
		panelHeader: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			gap: "12px",
			marginBottom: "16px",
		},
		panelTitle: {
			margin: 0,
			fontSize: "18px",
			color: "#13212b",
		},
		panelMeta: {
			margin: 0,
			color: "#6b7280",
			fontSize: "13px",
		},
		patientList: {
			display: "grid",
			gap: "12px",
		},
		patientRow: {
			display: "grid",
			gridTemplateColumns: "auto 1fr auto",
			gap: "14px",
			alignItems: "center",
			padding: "14px 16px",
			borderRadius: "18px",
			border: "1px solid rgba(31, 41, 51, 0.08)",
			background: "linear-gradient(180deg, #ffffff 0%, #fbfbf8 100%)",
		},
		queueBadge: {
			width: "46px",
			height: "46px",
			borderRadius: "14px",
			display: "grid",
			placeItems: "center",
			background: "#f4efe7",
			color: "#7a5c2e",
			fontWeight: 800,
			fontSize: "16px",
		},
		patientName: {
			margin: 0,
			fontSize: "16px",
			color: "#13212b",
			fontWeight: 700,
		},
		patientDetails: {
			margin: "4px 0 0",
			color: "#667085",
			fontSize: "13px",
			lineHeight: 1.5,
		},
		patientActions: {
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-end",
			gap: "8px",
		},
		statusPill: {
			display: "inline-flex",
			alignItems: "center",
			gap: "6px",
			borderRadius: "999px",
			padding: "6px 10px",
			fontSize: "12px",
			fontWeight: 700,
			textTransform: "uppercase",
			letterSpacing: "0.05em",
		},
		statusWaiting: {
			background: "#f8f0d8",
			color: "#8b5e00",
		},
		statusActive: {
			background: "#d8f3ea",
			color: "#0f6b5c",
		},
		statusDone: {
			background: "#e8edf2",
			color: "#4b5563",
		},
		miniButton: {
			appearance: "none",
			border: "1px solid rgba(15, 107, 92, 0.18)",
			background: "white",
			color: "#0f6b5c",
			borderRadius: "999px",
			padding: "8px 12px",
			fontWeight: 700,
			cursor: "pointer",
			fontSize: "13px",
		},
		loadList: {
			display: "grid",
			gap: "12px",
		},
		loadRow: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			gap: "12px",
			padding: "12px 14px",
			borderRadius: "16px",
			background: "#f8fafb",
		},
		loadName: {
			margin: 0,
			color: "#13212b",
			fontWeight: 600,
		},
		loadBarWrap: {
			flex: 1,
			height: "10px",
			borderRadius: "999px",
			background: "#e5e7eb",
			overflow: "hidden",
			maxWidth: "180px",
		},
		loadBar: {
			height: "100%",
			borderRadius: "inherit",
			background: "linear-gradient(90deg, #f59e0b 0%, #0f6b5c 100%)",
		},
		loadCount: {
			minWidth: "32px",
			textAlign: "right",
			color: "#52606d",
			fontWeight: 700,
		},
		emptyState: {
			padding: "22px",
			borderRadius: "18px",
			border: "1px dashed rgba(82, 96, 109, 0.22)",
			background: "#fcfcfa",
			color: "#667085",
			lineHeight: 1.6,
		},
	};

	const maxLoad = Math.max(...Object.values(serviceLoad), 1);

	return (
		<div style={styles.root}>
			<div style={styles.shell}>
				<section style={styles.hero}>
					<div style={styles.heroPanel}>
						<div style={styles.eyebrow}>Clinic staff dashboard</div>
						<h1 style={styles.title}>Keep the queue visible, calm, and moving.</h1>
						<p style={styles.subtitle}>
							A simple operations view for South African clinics where long waits and unclear appointment flow can
							make the day harder than it needs to be. Track who is waiting, call the next patient, notify people
							ahead of time, and watch service pressure in real time.
						</p>

						<div style={styles.actionRow}>
							<button
								type="button"
								style={styles.primaryButton}
								onClick={() => nextPatient && onCallNext?.(nextPatient)}
								disabled={!nextPatient}
							>
								Call next patient
							</button>
							<button
								type="button"
								style={styles.secondaryButton}
								onClick={() => nextPatient && onNotifyPatient?.(nextPatient)}
								disabled={!nextPatient}
							>
								Notify next patient
							</button>
						</div>
					</div>

					<aside style={styles.insightPanel}>
						<div>
							<div style={styles.insightLabel}>Next up</div>
							<p style={styles.insightValue}>{nextPatient ? `#${nextPatient.queueNum}` : "--"}</p>
						</div>
						<p style={styles.insightText}>
							{nextPatient
								? `${nextPatient.name} is next for ${nextPatient.service || "general care"}. Estimated wait ${formatWaitTime(
										nextPatient.estimatedWait,
									)}.`
								: "No waiting patients are available right now."}
						</p>
						<div style={{ display: "grid", gap: "8px" }}>
							<div style={{ fontSize: "13px", opacity: 0.78 }}>Busiest service</div>
							<div style={{ fontSize: "22px", fontWeight: 800 }}>
								{busiestService ? busiestService[0] : "N/A"}
							</div>
							<div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>
								{busiestService ? `${busiestService[1]} patient${busiestService[1] === 1 ? "" : "s"} queued` : "No service load yet"}
							</div>
						</div>
					</aside>
				</section>

				<section style={styles.cardsGrid}>
					{dashboardCards.map((card) => (
						<article key={card.label} style={styles.statCard}>
							<p style={styles.statLabel}>{card.label}</p>
							<div style={styles.statValue}>{card.value}</div>
							<p style={styles.statHint}>{card.hint}</p>
						</article>
					))}
				</section>

				<section style={styles.mainGrid}>
					<article style={styles.panel}>
						<div style={styles.panelHeader}>
							<div>
								<h2 style={styles.panelTitle}>Live queue</h2>
								<p style={styles.panelMeta}>Patients waiting and currently being served</p>
							</div>
							<div style={styles.panelMeta}>{normalizedPatients.length} total patients</div>
						</div>

						{normalizedPatients.length === 0 ? (
							<div style={styles.emptyState}>No patients have been loaded yet. Add queue data to see the live board.</div>
						) : (
							<div style={styles.patientList}>
								{normalizedPatients
									.slice()
									.sort((left, right) => {
										const statusOrder = { waiting: 0, "in progress": 1, done: 2 };
										const leftStatus = statusOrder[left.status] ?? 3;
										const rightStatus = statusOrder[right.status] ?? 3;
										if (leftStatus !== rightStatus) {
											return leftStatus - rightStatus;
										}
										return Number(left.queueNum ?? 0) - Number(right.queueNum ?? 0);
									})
									.map((patient) => {
										const tone = getStatusTone(patient.status);
										const statusStyles =
											tone === "active"
												? styles.statusActive
												: tone === "done"
													? styles.statusDone
													: styles.statusWaiting;

										return (
											<div key={patient.id ?? `${patient.name}-${patient.queueNum}`} style={styles.patientRow}>
												<div style={styles.queueBadge}>#{patient.queueNum ?? "-"}</div>
												<div>
													<h3 style={styles.patientName}>{patient.name || "Unnamed patient"}</h3>
													<p style={styles.patientDetails}>
														{patient.service || "Unknown service"} · Booked {formatClock(patient.bookedTime)} · Estimated wait {formatWaitTime(patient.estimatedWait)}
													</p>
												</div>
												<div style={styles.patientActions}>
													<span style={{ ...styles.statusPill, ...statusStyles }}>{getStatusLabel(patient.status)}</span>
													{patient.notified ? <span style={styles.panelMeta}>Notified</span> : null}
													{patient.status === "waiting" ? (
														<button
															type="button"
															style={styles.miniButton}
															onClick={() => onNotifyPatient?.(patient)}
														>
															Notify
														</button>
													) : null}
												</div>
											</div>
										);
									})}
							</div>
						)}
					</article>

					<article style={styles.panel}>
						<div style={styles.panelHeader}>
							<div>
								<h2 style={styles.panelTitle}>Service load</h2>
								<p style={styles.panelMeta}>Which clinics or service points are carrying the most demand</p>
							</div>
						</div>

						{Object.keys(serviceLoad).length === 0 ? (
							<div style={styles.emptyState}>No service load data is available yet.</div>
						) : (
							<div style={styles.loadList}>
								{Object.entries(serviceLoad)
									.sort((left, right) => right[1] - left[1])
									.map(([serviceName, count]) => (
										<div key={serviceName} style={styles.loadRow}>
											<div style={{ minWidth: 0 }}>
												<p style={styles.loadName}>{serviceName}</p>
												<p style={styles.panelMeta}>{count} patient{count === 1 ? "" : "s"}</p>
											</div>
											<div style={styles.loadBarWrap}>
												<div style={{ ...styles.loadBar, width: `${Math.max((count / maxLoad) * 100, 8)}%` }} />
											</div>
											<div style={styles.loadCount}>{count}</div>
										</div>
									))}
							</div>
						)}

						<div style={{ height: "20px" }} />

						<div style={styles.panelHeader}>
							<div>
								<h2 style={styles.panelTitle}>Completed visits</h2>
								<p style={styles.panelMeta}>Day-end progress at a glance</p>
							</div>
						</div>

						{completedPatients.length === 0 ? (
							<div style={styles.emptyState}>No visits have been completed yet today.</div>
						) : (
							<div style={styles.patientList}>
								{completedPatients.map((patient) => (
									<div key={patient.id ?? `${patient.name}-${patient.queueNum}`} style={styles.patientRow}>
										<div style={styles.queueBadge}>#{patient.queueNum ?? "-"}</div>
										<div>
											<h3 style={styles.patientName}>{patient.name || "Unnamed patient"}</h3>
											<p style={styles.patientDetails}>
												{patient.service || "Unknown service"} · Finished for the day
											</p>
										</div>
										<div style={styles.patientActions}>
											<span style={{ ...styles.statusPill, ...styles.statusDone }}>Done</span>
										</div>
									</div>
								))}
							</div>
						)}
					</article>
				</section>
			</div>
		</div>
	);
}
