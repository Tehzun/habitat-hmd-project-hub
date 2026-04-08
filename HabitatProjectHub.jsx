import { useState, useEffect, useCallback, useRef } from "react";

// ─── ICONS ───
const Icons = {
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  X: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Folder: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Task: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>,
  Chat: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Link: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  Star: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Log: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Board: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>,
  Home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Menu: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Search: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  House: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
};

// ─── HABITAT BRAND CONSTANTS ───
const PRIORITY = { urgent: "#A4343A", high: "#FF671F", medium: "#00AFD7", low: "#43B02A" };
const STATUS_COLS = ["backlog", "todo", "in_progress", "review", "done"];
const STATUS_LABELS = { backlog: "Backlog", todo: "To Do", in_progress: "In Progress", review: "Review", done: "Done" };
const STATUS_COLORS = { backlog: "#888B8D", todo: "#00AFD7", in_progress: "#FF671F", review: "#002F6C", done: "#43B02A" };

const TEAM_COLORS = ["#00AFD7","#43B02A","#002F6C","#FF671F","#A4343A","#C4D600","#888B8D","#FFD100"];

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";

// ─── EMPTY DEFAULT DATA ───
const DEFAULT_DATA = {
  currentUser: "owner",
  members: [
    { id: "owner", name: "You (Admin)", role: "admin", color: TEAM_COLORS[0] },
  ],
  teams: [],
  projects: [],
  tasks: [],
  resources: [],
  feedback: [],
  changelog: [],
  messages: [],
};

// ─── STORAGE HOOK ───
function useStorage(key, defaultVal) {
  const [data, setData] = useState(defaultVal);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(key);
        if (result && result.value) setData(JSON.parse(result.value));
      } catch (e) {}
      setLoaded(true);
    })();
  }, [key]);
  const save = useCallback(async (newData) => {
    const d = typeof newData === "function" ? newData(data) : newData;
    setData(d);
    try { await window.storage.set(key, JSON.stringify(d)); } catch (e) {}
    return d;
  }, [key, data]);
  return [data, save, loaded];
}

// ─── AVATAR ───
function Avatar({ member, size = 28 }) {
  if (!member) return null;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: member.color || "#888B8D",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontSize: size * 0.42, fontWeight: 700, flexShrink: 0,
    }}>
      {member.name.charAt(0).toUpperCase()}
    </div>
  );
}

// ─── MODAL ───
function Modal({ open, onClose, title, children, width = 480 }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,47,108,0.35)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16, animation: "fadeIn .15s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 14,
        width: "100%", maxWidth: width, maxHeight: "85vh",
        overflow: "auto", boxShadow: "0 24px 64px rgba(0,47,108,.18)",
        border: "1px solid #e2e6ea",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 20px", borderBottom: "1px solid #e8ebee",
        }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#002F6C" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#888B8D", padding: 4 }}><Icons.X /></button>
        </div>
        <div style={{ padding: "16px 20px" }}>{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 13 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#002F6C", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "9px 12px", borderRadius: 7,
  border: "1px solid #d0d5db", background: "#fafbfc",
  color: "#1a2332", fontSize: 13, outline: "none",
  fontFamily: "inherit", boxSizing: "border-box",
};
const selectStyle = { ...inputStyle, cursor: "pointer" };
const btnPrimary = {
  padding: "9px 18px", borderRadius: 7, border: "none",
  background: "#00AFD7", color: "#fff", fontWeight: 600,
  fontSize: 13, cursor: "pointer", fontFamily: "inherit",
  display: "inline-flex", alignItems: "center", gap: 6,
};
const btnGreen = { ...btnPrimary, background: "#43B02A" };
const btnSecondary = {
  ...btnPrimary, background: "transparent",
  border: "1px solid #d0d5db", color: "#002F6C",
};

function PriorityBadge({ priority }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 8px", borderRadius: 5, fontSize: 11, fontWeight: 600,
      background: PRIORITY[priority] + "14", color: PRIORITY[priority],
      textTransform: "capitalize",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: PRIORITY[priority] }} />
      {priority}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 8px", borderRadius: 5, fontSize: 11, fontWeight: 600,
      background: STATUS_COLORS[status] + "14", color: STATUS_COLORS[status],
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_COLORS[status] }} />
      {STATUS_LABELS[status]}
    </span>
  );
}

function TaskCard({ task, members, onEdit, onDrag }) {
  const assignee = members.find(m => m.id === task.assignee);
  const overdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done";
  return (
    <div draggable onDragStart={(e) => { e.dataTransfer.setData("taskId", task.id); }} onClick={() => onEdit(task)}
      style={{
        background: "#fff", borderRadius: 9, padding: "12px 14px", cursor: "grab",
        border: "1px solid #e2e6ea", marginBottom: 8, transition: "box-shadow .15s, transform .15s",
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,47,108,.08)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2332", marginBottom: 8, lineHeight: 1.4 }}>{task.title}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
        <PriorityBadge priority={task.priority} />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {task.dueDate && (
            <span style={{ fontSize: 11, color: overdue ? "#A4343A" : "#888B8D", fontWeight: overdue ? 600 : 400, display: "flex", alignItems: "center", gap: 3 }}>
              <Icons.Calendar /> {fmtDate(task.dueDate)}
            </span>
          )}
          {assignee && <Avatar member={assignee} size={22} />}
        </div>
      </div>
    </div>
  );
}

function KanbanCol({ status, tasks, members, onEdit, onDrop }) {
  const [over, setOver] = useState(false);
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); onDrop(e.dataTransfer.getData("taskId"), status); }}
      style={{
        flex: "1 1 200px", minWidth: 220, maxWidth: 320,
        background: over ? "#00AFD70a" : "#f4f6f8",
        borderRadius: 11, padding: 12,
        border: over ? "2px dashed #00AFD7" : "2px dashed transparent",
        transition: "all .15s",
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "0 4px" }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS_COLORS[status] }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#002F6C", textTransform: "uppercase", letterSpacing: "0.06em" }}>{STATUS_LABELS[status]}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#888B8D", background: "#fff", borderRadius: 5, padding: "1px 7px", marginLeft: "auto", border: "1px solid #e8ebee" }}>{tasks.length}</span>
      </div>
      {tasks.map(t => <TaskCard key={t.id} task={t} members={members} onEdit={onEdit} />)}
      {tasks.length === 0 && <div style={{ padding: "20px 0", textAlign: "center", fontSize: 12, color: "#b0b5bd" }}>No tasks</div>}
    </div>
  );
}

// ─── EMPTY STATE ───
function EmptyState({ icon, title, subtitle, action }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", textAlign: "center" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#00AFD710", display: "flex", alignItems: "center", justifyContent: "center", color: "#00AFD7", marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#002F6C", marginBottom: 6 }}>{title}</h3>
      <p style={{ fontSize: 13, color: "#888B8D", maxWidth: 320, lineHeight: 1.6, marginBottom: 18 }}>{subtitle}</p>
      {action}
    </div>
  );
}

// ────────────────────────── MAIN APP ──────────────────────────
export default function HabitatProjectHub() {
  const [db, setDb, loaded] = useStorage("habitat-hmd-pm-v2", DEFAULT_DATA);
  const [view, setView] = useState("dashboard");
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState("board");
  const [modal, setModal] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQ, setSearchQ] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterAssignee, setFilterAssignee] = useState("all");
  const chatRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  useEffect(() => { if (isMobile) setSidebarOpen(false); }, [isMobile]);

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#fff", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#002F6C", marginBottom: 4 }}>Habitat for Humanity</div>
        <div style={{ fontSize: 12, color: "#888B8D" }}>Loading workspace...</div>
      </div>
    </div>
  );

  const { members, teams, projects, tasks, resources, feedback, changelog, messages, currentUser } = db;
  const me = members.find(m => m.id === currentUser);

  const update = (key, fn) => setDb(prev => ({ ...prev, [key]: fn(prev[key]) }));
  const projectTasks = (pid) => tasks.filter(t => t.projectId === pid);
  const getMember = (id) => members.find(m => m.id === id);

  const filterTasks = (tks) => {
    let f = tks;
    if (searchQ) f = f.filter(t => t.title.toLowerCase().includes(searchQ.toLowerCase()));
    if (filterPriority !== "all") f = f.filter(t => t.priority === filterPriority);
    if (filterAssignee !== "all") f = f.filter(t => t.assignee === filterAssignee);
    return f;
  };

  const addTask = (data) => update("tasks", ts => [...ts, { id: uid(), createdAt: new Date().toISOString(), ...data }]);
  const updateTask = (id, data) => update("tasks", ts => ts.map(t => t.id === id ? { ...t, ...data } : t));
  const deleteTask = (id) => update("tasks", ts => ts.filter(t => t.id !== id));
  const moveTask = (taskId, newStatus) => updateTask(taskId, { status: newStatus });

  const addProject = (data) => {
    const p = { id: uid(), createdAt: new Date().toISOString(), color: TEAM_COLORS[projects.length % TEAM_COLORS.length], ...data };
    update("projects", ps => [...ps, p]);
    return p;
  };
  const deleteProject = (id) => {
    update("projects", ps => ps.filter(p => p.id !== id));
    update("tasks", ts => ts.filter(t => t.projectId !== id));
    update("resources", rs => rs.filter(r => r.projectId !== id));
    update("feedback", fs => fs.filter(f => f.projectId !== id));
    update("changelog", cs => cs.filter(c => c.projectId !== id));
    update("messages", ms => ms.filter(m => m.projectId !== id));
    if (activeProject === id) { setActiveProject(null); setView("dashboard"); }
  };

  const addTeam = (data) => update("teams", ts => [...ts, { id: uid(), ...data }]);
  const addMember = (data) => update("members", ms => [...ms, { id: uid(), color: TEAM_COLORS[ms.length % TEAM_COLORS.length], ...data }]);
  const addResource = (data) => update("resources", rs => [...rs, { id: uid(), ...data }]);
  const addFeedback = (data) => update("feedback", fs => [...fs, { id: uid(), createdAt: new Date().toISOString(), status: "open", ...data }]);
  const addChangelog = (data) => update("changelog", cs => [...cs, { id: uid(), date: new Date().toISOString().slice(0,10), ...data }]);
  const sendMessage = (data) => {
    update("messages", ms => [...ms, { id: uid(), ts: new Date().toISOString(), ...data }]);
    setTimeout(() => chatRef.current?.scrollTo(0, chatRef.current.scrollHeight), 50);
  };
  const convertFeedbackToTask = (fb) => {
    const t = { id: uid(), projectId: fb.projectId, title: fb.text.slice(0, 80), status: "todo", priority: "medium", assignee: currentUser, dueDate: "", description: fb.text, createdAt: new Date().toISOString() };
    update("tasks", ts => [...ts, t]);
    update("feedback", fs => fs.map(f => f.id === fb.id ? { ...f, status: "converted", taskId: t.id } : f));
  };

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === "done").length;
  const overdueTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done").length;
  const myTasks = tasks.filter(t => t.assignee === currentUser && t.status !== "done").length;

  const resetData = () => { setDb(DEFAULT_DATA); setView("dashboard"); setActiveProject(null); };
  const curProject = projects.find(p => p.id === activeProject);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d0d5db; border-radius: 10px; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        input:focus, select:focus, textarea:focus { border-color: #00AFD7 !important; outline: none; }
      `}</style>

      <div style={{
        display: "flex", height: "100vh", fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
        background: "#f4f6f8", color: "#1a2332", overflow: "hidden",
      }}>

        {/* ─── SIDEBAR ─── */}
        {(sidebarOpen || !isMobile) && (
          <div style={{
            width: isMobile ? "100%" : 264, minWidth: isMobile ? "100%" : 264,
            background: "#002F6C", display: "flex", flexDirection: "column", height: "100vh",
            position: isMobile ? "fixed" : "relative", zIndex: isMobile ? 999 : 1,
            animation: isMobile ? "fadeIn .15s ease" : "none",
          }}>
            {/* Logo area */}
            <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#00AFD7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icons.House />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>Habitat HMD</div>
                    <div style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Project Hub</div>
                  </div>
                </div>
                {isMobile && (
                  <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}><Icons.X /></button>
                )}
              </div>
            </div>

            {/* User */}
            <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar member={me} size={32} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{me?.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "capitalize" }}>{me?.role}</div>
              </div>
            </div>

            {/* Nav */}
            <div style={{ flex: 1, overflow: "auto", padding: "12px 10px" }}>
              {[
                { icon: <Icons.Home />, label: "Dashboard", key: "dashboard" },
                { icon: <Icons.Users />, label: "Team Members", key: "members" },
              ].map(item => (
                <button key={item.key} onClick={() => { setView(item.key); setActiveProject(null); if (isMobile) setSidebarOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, width: "100%",
                    padding: "9px 12px", borderRadius: 7, border: "none",
                    background: view === item.key && !activeProject ? "rgba(0,175,215,0.15)" : "transparent",
                    color: view === item.key && !activeProject ? "#00AFD7" : "rgba(255,255,255,0.65)",
                    fontWeight: 500, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                    textAlign: "left", marginBottom: 2, transition: "all .1s",
                  }}>{item.icon} {item.label}</button>
              ))}

              {/* Teams & Projects */}
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 12px", marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Teams & Projects</span>
                  <button onClick={() => setModal({ type: "addTeam" })} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.45)", cursor: "pointer", padding: 2 }}><Icons.Plus /></button>
                </div>
                {teams.length === 0 && (
                  <div style={{ padding: "8px 12px", fontSize: 12, color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>No teams yet. Create one to get started.</div>
                )}
                {teams.map(team => (
                  <div key={team.id} style={{ marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>
                      <span style={{ width: 6, height: 6, borderRadius: 2, background: team.color, flexShrink: 0 }} />
                      {team.name}
                    </div>
                    {projects.filter(p => p.teamId === team.id).map(proj => (
                      <button key={proj.id}
                        onClick={() => { setActiveProject(proj.id); setView("project"); setActiveTab("board"); if (isMobile) setSidebarOpen(false); }}
                        style={{
                          display: "flex", alignItems: "center", gap: 8, width: "100%",
                          padding: "7px 12px 7px 28px", borderRadius: 7, border: "none",
                          background: activeProject === proj.id ? "rgba(0,175,215,0.15)" : "transparent",
                          color: activeProject === proj.id ? "#00AFD7" : "rgba(255,255,255,0.55)",
                          fontWeight: 500, fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                          textAlign: "left", transition: "all .1s",
                        }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: proj.color, flexShrink: 0 }} />
                        {proj.name}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 16, padding: "0 10px" }}>
                <button onClick={() => { if (teams.length === 0) { setModal({ type: "addTeam" }); } else { setModal({ type: "addProject" }); }}}
                  style={{
                    display: "flex", alignItems: "center", gap: 8, width: "100%",
                    padding: "9px 12px", borderRadius: 7,
                    border: "1px dashed rgba(255,255,255,0.2)", background: "transparent",
                    color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 500,
                    cursor: "pointer", fontFamily: "inherit",
                  }}><Icons.Plus /> {teams.length === 0 ? "New Team" : "New Project"}</button>
              </div>
            </div>

            {/* Habitat footer */}
            <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#43B02A" }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00AFD7" }} />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginLeft: 4 }}>Halton · Mississauga · Dufferin</span>
              </div>
              <button onClick={resetData} style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Reset workspace</button>
            </div>
          </div>
        )}

        {/* ─── MAIN CONTENT ─── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Top bar */}
          <div style={{
            padding: isMobile ? "12px 16px" : "14px 28px",
            borderBottom: "1px solid #e2e6ea",
            display: "flex", alignItems: "center", gap: 12,
            background: "#fff", flexShrink: 0,
          }}>
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", color: "#002F6C", cursor: "pointer", padding: 4, flexShrink: 0 }}><Icons.Menu /></button>
            )}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 700, color: "#002F6C", letterSpacing: "-0.02em" }}>
                {view === "dashboard" && "Dashboard"}
                {view === "members" && "Team Members"}
                {view === "project" && curProject?.name}
              </h2>
              {view === "project" && curProject?.description && (
                <p style={{ fontSize: 12, color: "#888B8D", marginTop: 2 }}>{curProject.description}</p>
              )}
            </div>
            {view === "project" && (
              <button onClick={() => { if(confirm("Delete this project and all its tasks?")) deleteProject(activeProject); }}
                style={{ ...btnSecondary, padding: "6px 12px", fontSize: 11, color: "#A4343A", borderColor: "#A4343A40" }}>
                <Icons.Trash /> Delete
              </button>
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: "auto", padding: isMobile ? 16 : 28 }}>

            {/* ─── DASHBOARD ─── */}
            {view === "dashboard" && (
              <div style={{ animation: "slideUp .2s ease" }}>
                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? 140 : 180}px, 1fr))`, gap: 12, marginBottom: 28 }}>
                  {[
                    { label: "Total Tasks", value: totalTasks, color: "#00AFD7" },
                    { label: "Completed", value: doneTasks, color: "#43B02A" },
                    { label: "Overdue", value: overdueTasks, color: "#A4343A" },
                    { label: "My Tasks", value: myTasks, color: "#002F6C" },
                  ].map((s, i) => (
                    <div key={i} style={{
                      background: "#fff", borderRadius: 11, padding: isMobile ? 16 : 20,
                      border: "1px solid #e2e6ea", borderTop: `3px solid ${s.color}`,
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#888B8D", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>{s.label}</div>
                      <div style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: "-0.03em" }}>{s.value}</div>
                    </div>
                  ))}
                </div>

                {projects.length > 0 && (
                  <div style={{ marginBottom: 28 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#002F6C" }}>Project Progress</h3>
                    <div style={{ display: "grid", gap: 10 }}>
                      {projects.map(p => {
                        const pt = projectTasks(p.id);
                        const done = pt.filter(t => t.status === "done").length;
                        const pct = pt.length ? Math.round(done / pt.length * 100) : 0;
                        return (
                          <div key={p.id} onClick={() => { setActiveProject(p.id); setView("project"); setActiveTab("board"); }}
                            style={{
                              background: "#fff", borderRadius: 11, padding: "16px 20px",
                              border: "1px solid #e2e6ea", cursor: "pointer", transition: "border-color .15s",
                            }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = p.color}
                            onMouseLeave={e => e.currentTarget.style.borderColor = "#e2e6ea"}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ width: 10, height: 10, borderRadius: "50%", background: p.color }} />
                                <span style={{ fontSize: 14, fontWeight: 600, color: "#002F6C" }}>{p.name}</span>
                              </div>
                              <span style={{ fontSize: 13, fontWeight: 700, color: p.color }}>{pct}%</span>
                            </div>
                            <div style={{ background: "#f0f2f5", borderRadius: 6, height: 6, overflow: "hidden" }}>
                              <div style={{ width: pct + "%", height: "100%", background: p.color, borderRadius: 6, transition: "width .3s" }} />
                            </div>
                            <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 11, color: "#888B8D" }}>
                              <span>{pt.length} tasks</span><span>{done} done</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {tasks.length > 0 && (
                  <>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: "#002F6C" }}>Recent Activity</h3>
                    <div style={{ background: "#fff", borderRadius: 11, border: "1px solid #e2e6ea", overflow: "hidden" }}>
                      {[...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6).map((t, i) => (
                        <div key={t.id} style={{
                          padding: "12px 18px", display: "flex", alignItems: "center", gap: 12,
                          borderBottom: i < 5 ? "1px solid #f0f2f5" : "none",
                        }}>
                          <StatusBadge status={t.status} />
                          <span style={{ fontSize: 13, fontWeight: 500, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#1a2332" }}>{t.title}</span>
                          <span style={{ fontSize: 11, color: "#888B8D", flexShrink: 0 }}>{fmtDate(t.createdAt)}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {projects.length === 0 && (
                  <EmptyState
                    icon={<Icons.Home />}
                    title="Welcome to Habitat HMD Project Hub"
                    subtitle="Start by creating a team, then add projects and tasks to manage your work. Your data persists across sessions."
                    action={<button onClick={() => setModal({ type: "addTeam" })} style={btnPrimary}><Icons.Plus /> Create Your First Team</button>}
                  />
                )}
              </div>
            )}

            {/* ─── MEMBERS ─── */}
            {view === "members" && (
              <div style={{ animation: "slideUp .2s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{ fontSize: 13, color: "#888B8D" }}>{members.length} member{members.length !== 1 ? "s" : ""}</span>
                  <button onClick={() => setModal({ type: "addMember" })} style={btnPrimary}><Icons.Plus /> Add Member</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? "100%" : "280px"}, 1fr))`, gap: 12 }}>
                  {members.map(m => (
                    <div key={m.id} style={{
                      background: "#fff", borderRadius: 11, padding: 20,
                      border: "1px solid #e2e6ea", display: "flex", alignItems: "center", gap: 14,
                    }}>
                      <Avatar member={m} size={42} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#002F6C", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: "#888B8D", textTransform: "capitalize" }}>{m.role}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 18, fontWeight: 700, color: "#00AFD7" }}>{tasks.filter(t => t.assignee === m.id && t.status !== "done").length}</div>
                        <div style={{ fontSize: 10, color: "#888B8D" }}>active</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── PROJECT VIEW ─── */}
            {view === "project" && curProject && (
              <div style={{ animation: "slideUp .2s ease" }}>
                {/* Tabs */}
                <div style={{ display: "flex", gap: 2, marginBottom: 20, borderBottom: "1px solid #e2e6ea", overflowX: "auto", flexShrink: 0 }}>
                  {[
                    { key: "board", icon: <Icons.Board />, label: "Board" },
                    { key: "list", icon: <Icons.Task />, label: "List" },
                    { key: "resources", icon: <Icons.Link />, label: "Resources" },
                    { key: "feedback", icon: <Icons.Star />, label: "Feedback" },
                    { key: "changelog", icon: <Icons.Log />, label: "Changelog" },
                    { key: "chat", icon: <Icons.Chat />, label: "Chat" },
                  ].map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                      style={{
                        display: "flex", alignItems: "center", gap: 6, padding: "10px 16px",
                        border: "none", borderBottom: activeTab === tab.key ? "2px solid #00AFD7" : "2px solid transparent",
                        background: "transparent",
                        color: activeTab === tab.key ? "#00AFD7" : "#888B8D",
                        fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                        whiteSpace: "nowrap",
                      }}>{tab.icon} {tab.label}</button>
                  ))}
                </div>

                {/* Board */}
                {activeTab === "board" && (
                  <>
                    <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
                      <button onClick={() => setModal({ type: "addTask", data: { projectId: activeProject } })} style={btnPrimary}><Icons.Plus /> New Task</button>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto", flexWrap: "wrap" }}>
                        <div style={{ position: "relative" }}>
                          <input placeholder="Search tasks..." value={searchQ} onChange={e => setSearchQ(e.target.value)} style={{ ...inputStyle, width: 150, paddingLeft: 30, fontSize: 12, background: "#fff" }} />
                          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#888B8D" }}><Icons.Search /></span>
                        </div>
                        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{ ...selectStyle, width: "auto", fontSize: 12, background: "#fff" }}>
                          <option value="all">All Priority</option>
                          {Object.keys(PRIORITY).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <select value={filterAssignee} onChange={e => setFilterAssignee(e.target.value)} style={{ ...selectStyle, width: "auto", fontSize: 12, background: "#fff" }}>
                          <option value="all">All Members</option>
                          {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 12 }}>
                      {STATUS_COLS.map(s => (
                        <KanbanCol key={s} status={s}
                          tasks={filterTasks(projectTasks(activeProject).filter(t => t.status === s))}
                          members={members} onEdit={(task) => setModal({ type: "editTask", data: task })} onDrop={moveTask} />
                      ))}
                    </div>
                  </>
                )}

                {/* List */}
                {activeTab === "list" && (
                  <>
                    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                      <button onClick={() => setModal({ type: "addTask", data: { projectId: activeProject } })} style={btnPrimary}><Icons.Plus /> New Task</button>
                    </div>
                    <div style={{ background: "#fff", borderRadius: 11, border: "1px solid #e2e6ea", overflow: "hidden" }}>
                      <div style={{
                        display: "grid", gridTemplateColumns: isMobile ? "1fr auto" : "2fr 1fr 1fr 1fr 1fr auto",
                        padding: "10px 16px", borderBottom: "1px solid #e8ebee",
                        fontSize: 11, fontWeight: 700, color: "#888B8D", textTransform: "uppercase", letterSpacing: "0.05em",
                      }}>
                        <span>Task</span>{!isMobile && <><span>Status</span><span>Priority</span><span>Assignee</span><span>Due</span></>}<span></span>
                      </div>
                      {filterTasks(projectTasks(activeProject)).map(t => {
                        const assignee = getMember(t.assignee);
                        return (
                          <div key={t.id} style={{
                            display: "grid", gridTemplateColumns: isMobile ? "1fr auto" : "2fr 1fr 1fr 1fr 1fr auto",
                            padding: "12px 16px", borderBottom: "1px solid #f0f2f5", alignItems: "center", fontSize: 13, cursor: "pointer",
                          }}
                            onClick={() => setModal({ type: "editTask", data: t })}
                            onMouseEnter={e => e.currentTarget.style.background = "#fafbfc"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                            <span style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</span>
                            {!isMobile && (
                              <>
                                <StatusBadge status={t.status} />
                                <PriorityBadge priority={t.priority} />
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  {assignee && <Avatar member={assignee} size={22} />}
                                  <span style={{ fontSize: 12, color: "#888B8D" }}>{assignee?.name?.split(" ")[0]}</span>
                                </div>
                                <span style={{ fontSize: 12, color: t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done" ? "#A4343A" : "#888B8D" }}>{fmtDate(t.dueDate)}</span>
                              </>
                            )}
                            <button onClick={(e) => { e.stopPropagation(); deleteTask(t.id); }} style={{ background: "none", border: "none", color: "#b0b5bd", cursor: "pointer", padding: 4 }}><Icons.Trash /></button>
                          </div>
                        );
                      })}
                      {filterTasks(projectTasks(activeProject)).length === 0 && (
                        <div style={{ padding: 40, textAlign: "center", color: "#888B8D", fontSize: 13 }}>No tasks yet. Create one to get started!</div>
                      )}
                    </div>
                  </>
                )}

                {/* Resources */}
                {activeTab === "resources" && (
                  <>
                    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                      <button onClick={() => setModal({ type: "addResource", data: { projectId: activeProject } })} style={btnPrimary}><Icons.Plus /> Add Resource</button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? "100%" : "260px"}, 1fr))`, gap: 12 }}>
                      {resources.filter(r => r.projectId === activeProject).map(r => (
                        <div key={r.id} style={{ background: "#fff", borderRadius: 11, padding: 16, border: "1px solid #e2e6ea", display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 38, height: 38, borderRadius: 9, background: r.type === "link" ? "#00AFD710" : "#43B02A10", display: "flex", alignItems: "center", justifyContent: "center", color: r.type === "link" ? "#00AFD7" : "#43B02A", flexShrink: 0 }}>
                            {r.type === "link" ? <Icons.Link /> : <Icons.Log />}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#002F6C", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
                            <div style={{ fontSize: 11, color: "#888B8D" }}>{r.type}</div>
                          </div>
                          <button onClick={() => update("resources", rs => rs.filter(x => x.id !== r.id))} style={{ background: "none", border: "none", color: "#b0b5bd", cursor: "pointer", padding: 4 }}><Icons.Trash /></button>
                        </div>
                      ))}
                    </div>
                    {resources.filter(r => r.projectId === activeProject).length === 0 && (
                      <EmptyState icon={<Icons.Link />} title="No Resources Yet" subtitle="Add links, files, and documents to keep everything organized in one place." />
                    )}
                  </>
                )}

                {/* Feedback */}
                {activeTab === "feedback" && (
                  <>
                    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                      <button onClick={() => setModal({ type: "addFeedback", data: { projectId: activeProject } })} style={btnPrimary}><Icons.Plus /> Add Feedback</button>
                    </div>
                    <div style={{ display: "grid", gap: 10 }}>
                      {feedback.filter(f => f.projectId === activeProject).map(fb => {
                        const author = getMember(fb.author);
                        return (
                          <div key={fb.id} style={{ background: "#fff", borderRadius: 11, padding: 16, border: "1px solid #e2e6ea" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                              {author && <Avatar member={author} size={24} />}
                              <span style={{ fontSize: 13, fontWeight: 600, color: "#002F6C" }}>{author?.name}</span>
                              <span style={{ fontSize: 11, color: "#888B8D", marginLeft: "auto" }}>{fmtDate(fb.createdAt)}</span>
                            </div>
                            <p style={{ fontSize: 13, color: "#1a2332", lineHeight: 1.6, marginBottom: 12 }}>{fb.text}</p>
                            {fb.status === "open" ? (
                              <button onClick={() => convertFeedbackToTask(fb)} style={{ ...btnSecondary, padding: "5px 12px", fontSize: 11 }}>Convert to Task</button>
                            ) : (
                              <span style={{ fontSize: 11, color: "#43B02A", fontWeight: 600 }}>✓ Converted to task</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {feedback.filter(f => f.projectId === activeProject).length === 0 && (
                      <EmptyState icon={<Icons.Star />} title="No Feedback Yet" subtitle="Gather feedback from your team and convert it into actionable tasks." />
                    )}
                  </>
                )}

                {/* Changelog */}
                {activeTab === "changelog" && (
                  <>
                    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                      <button onClick={() => setModal({ type: "addChangelog", data: { projectId: activeProject } })} style={btnPrimary}><Icons.Plus /> Add Entry</button>
                    </div>
                    <div style={{ position: "relative", paddingLeft: 24 }}>
                      <div style={{ position: "absolute", left: 7, top: 0, bottom: 0, width: 2, background: "#e2e6ea" }} />
                      {changelog.filter(c => c.projectId === activeProject).sort((a, b) => new Date(b.date) - new Date(a.date)).map(cl => {
                        const author = getMember(cl.author);
                        return (
                          <div key={cl.id} style={{ marginBottom: 20, position: "relative" }}>
                            <div style={{ position: "absolute", left: -20, top: 4, width: 12, height: 12, borderRadius: "50%", background: "#00AFD7", border: "2px solid #f4f6f8" }} />
                            <div style={{ background: "#fff", borderRadius: 9, padding: 14, border: "1px solid #e2e6ea" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                <span style={{ fontSize: 12, fontWeight: 600, color: "#00AFD7" }}>{fmtDate(cl.date)}</span>
                                <span style={{ fontSize: 11, color: "#888B8D" }}>{author?.name}</span>
                              </div>
                              <p style={{ fontSize: 13, color: "#1a2332", lineHeight: 1.5 }}>{cl.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {changelog.filter(c => c.projectId === activeProject).length === 0 && (
                      <EmptyState icon={<Icons.Log />} title="No Changelog Yet" subtitle="Track project milestones and changes here." />
                    )}
                  </>
                )}

                {/* Chat */}
                {activeTab === "chat" && (
                  <div style={{ display: "flex", flexDirection: "column", height: isMobile ? "60vh" : "65vh" }}>
                    <div ref={chatRef} style={{ flex: 1, overflow: "auto", padding: "12px 0", display: "flex", flexDirection: "column", gap: 8 }}>
                      {messages.filter(m => m.projectId === activeProject).map(msg => {
                        const author = getMember(msg.author);
                        const isMe = msg.author === currentUser;
                        return (
                          <div key={msg.id} style={{ display: "flex", gap: 10, flexDirection: isMe ? "row-reverse" : "row", alignItems: "flex-end" }}>
                            <Avatar member={author} size={28} />
                            <div style={{
                              maxWidth: "70%", background: isMe ? "#00AFD7" : "#fff",
                              borderRadius: 14, padding: "10px 14px",
                              border: isMe ? "none" : "1px solid #e2e6ea",
                            }}>
                              {!isMe && <div style={{ fontSize: 11, fontWeight: 600, color: "#888B8D", marginBottom: 3 }}>{author?.name}</div>}
                              <div style={{ fontSize: 13, color: isMe ? "#fff" : "#1a2332", lineHeight: 1.5 }}>{msg.text}</div>
                              <div style={{ fontSize: 10, color: isMe ? "rgba(255,255,255,0.6)" : "#b0b5bd", marginTop: 3, textAlign: "right" }}>
                                {new Date(msg.ts).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {messages.filter(m => m.projectId === activeProject).length === 0 && (
                        <div style={{ textAlign: "center", color: "#b0b5bd", fontSize: 13, padding: 40 }}>No messages yet. Start the conversation!</div>
                      )}
                    </div>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.target.elements.msg;
                      if (!input.value.trim()) return;
                      sendMessage({ projectId: activeProject, author: currentUser, text: input.value.trim() });
                      input.value = "";
                    }} style={{ display: "flex", gap: 8, paddingTop: 12, borderTop: "1px solid #e2e6ea" }}>
                      <input name="msg" placeholder="Type a message..." autoComplete="off" style={{ ...inputStyle, flex: 1, background: "#fff" }} />
                      <button type="submit" style={btnPrimary}>Send</button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── MODALS ─── */}
      <Modal open={modal?.type === "addTask"} onClose={() => setModal(null)} title="New Task">
        <form onSubmit={(e) => {
          e.preventDefault(); const fd = new FormData(e.target);
          addTask({ projectId: modal.data.projectId, title: fd.get("title"), description: fd.get("description"), status: fd.get("status"), priority: fd.get("priority"), assignee: fd.get("assignee"), dueDate: fd.get("dueDate") });
          setModal(null);
        }}>
          <Field label="Title"><input name="title" required style={inputStyle} placeholder="Task title" /></Field>
          <Field label="Description"><textarea name="description" rows={2} style={{ ...inputStyle, resize: "vertical" }} placeholder="Optional details..." /></Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Status"><select name="status" defaultValue="todo" style={selectStyle}>{STATUS_COLS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}</select></Field>
            <Field label="Priority"><select name="priority" defaultValue="medium" style={selectStyle}>{Object.keys(PRIORITY).map(p => <option key={p} value={p}>{p}</option>)}</select></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Assignee"><select name="assignee" defaultValue={currentUser} style={selectStyle}>{members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select></Field>
            <Field label="Due Date"><input name="dueDate" type="date" style={inputStyle} /></Field>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
            <button type="button" onClick={() => setModal(null)} style={btnSecondary}>Cancel</button>
            <button type="submit" style={btnPrimary}>Create Task</button>
          </div>
        </form>
      </Modal>

      <Modal open={modal?.type === "editTask"} onClose={() => setModal(null)} title="Edit Task">
        {modal?.data && (
          <form onSubmit={(e) => {
            e.preventDefault(); const fd = new FormData(e.target);
            updateTask(modal.data.id, { title: fd.get("title"), description: fd.get("description"), status: fd.get("status"), priority: fd.get("priority"), assignee: fd.get("assignee"), dueDate: fd.get("dueDate") });
            setModal(null);
          }}>
            <Field label="Title"><input name="title" required defaultValue={modal.data.title} style={inputStyle} /></Field>
            <Field label="Description"><textarea name="description" rows={2} defaultValue={modal.data.description} style={{ ...inputStyle, resize: "vertical" }} /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Status"><select name="status" defaultValue={modal.data.status} style={selectStyle}>{STATUS_COLS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}</select></Field>
              <Field label="Priority"><select name="priority" defaultValue={modal.data.priority} style={selectStyle}>{Object.keys(PRIORITY).map(p => <option key={p} value={p}>{p}</option>)}</select></Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field label="Assignee"><select name="assignee" defaultValue={modal.data.assignee} style={selectStyle}>{members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select></Field>
              <Field label="Due Date"><input name="dueDate" type="date" defaultValue={modal.data.dueDate} style={inputStyle} /></Field>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
              <button type="button" onClick={() => { deleteTask(modal.data.id); setModal(null); }} style={{ ...btnSecondary, color: "#A4343A", borderColor: "#A4343A40" }}>Delete</button>
              <button type="button" onClick={() => setModal(null)} style={btnSecondary}>Cancel</button>
              <button type="submit" style={btnPrimary}>Save</button>
            </div>
          </form>
        )}
      </Modal>

      <Modal open={modal?.type === "addProject"} onClose={() => setModal(null)} title="New Project">
        <form onSubmit={(e) => {
          e.preventDefault(); const fd = new FormData(e.target);
          addProject({ name: fd.get("name"), description: fd.get("description"), teamId: fd.get("teamId") });
          setModal(null);
        }}>
          <Field label="Name"><input name="name" required style={inputStyle} placeholder="Project name" /></Field>
          <Field label="Description"><textarea name="description" rows={2} style={{ ...inputStyle, resize: "vertical" }} placeholder="What's this project about?" /></Field>
          <Field label="Team"><select name="teamId" required style={selectStyle}>{teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></Field>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
            <button type="button" onClick={() => setModal(null)} style={btnSecondary}>Cancel</button>
            <button type="submit" style={btnPrimary}>Create Project</button>
          </div>
        </form>
      </Modal>

      <Modal open={modal?.type === "addTeam"} onClose={() => setModal(null)} title="New Team">
        <form onSubmit={(e) => {
          e.preventDefault(); const fd = new FormData(e.target);
          addTeam({ name: fd.get("name"), members: [currentUser], color: TEAM_COLORS[teams.length % TEAM_COLORS.length] });
          setModal(null);
        }}>
          <Field label="Team Name"><input name="name" required style={inputStyle} placeholder="e.g. Build Committee, ReStore Team" /></Field>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
            <button type="button" onClick={() => setModal(null)} style={btnSecondary}>Cancel</button>
            <button type="submit" style={btnGreen}>Create Team</button>
          </div>
        </form>
      </Modal>

      <Modal open={modal?.type === "addMember"} onClose={() => setModal(null)} title="Add Team Member">
        <form onSubmit={(e) => {
          e.preventDefault(); const fd = new FormData(e.target);
          addMember({ name: fd.get("name"), role: fd.get("role") });
          setModal(null);
        }}>
          <Field label="Name"><input name="name" required style={inputStyle} placeholder="Full name" /></Field>
          <Field label="Role"><select name="role" defaultValue="editor" style={selectStyle}><option value="admin">Admin</option><option value="editor">Editor</option><option value="viewer">Viewer</option></select></Field>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
            <button type="button" onClick={() => setModal(null)} style={btnSecondary}>Cancel</button>
            <button type="submit" style={btnPrimary}>Add Member</button>
          </div>
        </form>
      </Modal>

      <Modal open={modal?.type === "addResource"} onClose={() => setModal(null)} title="Add Resource">
        <form onSubmit={(e) => {
          e.preventDefault(); const fd = new FormData(e.target);
          addResource({ projectId: modal.data.projectId, type: fd.get("type"), name: fd.get("name"), url: fd.get("url") });
          setModal(null);
        }}>
          <Field label="Name"><input name="name" required style={inputStyle} placeholder="Resource name" /></Field>
          <Field label="Type"><select name="type" defaultValue="link" style={selectStyle}><option value="link">Link</option><option value="file">File</option></select></Field>
          <Field label="URL"><input name="url" style={inputStyle} placeholder="https://..." /></Field>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
            <button type="button" onClick={() => setModal(null)} style={btnSecondary}>Cancel</button>
            <button type="submit" style={btnPrimary}>Add Resource</button>
          </div>
        </form>
      </Modal>

      <Modal open={modal?.type === "addFeedback"} onClose={() => setModal(null)} title="Add Feedback">
        <form onSubmit={(e) => {
          e.preventDefault(); const fd = new FormData(e.target);
          addFeedback({ projectId: modal.data.projectId, author: currentUser, text: fd.get("text") });
          setModal(null);
        }}>
          <Field label="Feedback"><textarea name="text" required rows={3} style={{ ...inputStyle, resize: "vertical" }} placeholder="Share your feedback..." /></Field>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
            <button type="button" onClick={() => setModal(null)} style={btnSecondary}>Cancel</button>
            <button type="submit" style={btnPrimary}>Submit</button>
          </div>
        </form>
      </Modal>

      <Modal open={modal?.type === "addChangelog"} onClose={() => setModal(null)} title="Add Changelog Entry">
        <form onSubmit={(e) => {
          e.preventDefault(); const fd = new FormData(e.target);
          addChangelog({ projectId: modal.data.projectId, author: currentUser, text: fd.get("text") });
          setModal(null);
        }}>
          <Field label="What changed?"><textarea name="text" required rows={2} style={{ ...inputStyle, resize: "vertical" }} placeholder="Describe the change..." /></Field>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
            <button type="button" onClick={() => setModal(null)} style={btnSecondary}>Cancel</button>
            <button type="submit" style={btnPrimary}>Add Entry</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
