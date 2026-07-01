import { useEffect, useState } from "react";

// Department color map for badges
const DEPT_COLORS = {
  IT: { bg: "#dbeafe", color: "#1d4ed8" },
  HR: { bg: "#fce7f3", color: "#be185d" },
  Finance: { bg: "#d1fae5", color: "#065f46" },
  Marketing: { bg: "#fef9c3", color: "#854d0e" },
  Sales: { bg: "#ede9fe", color: "#5b21b6" },
  Operations: { bg: "#ffedd5", color: "#9a3412" },
};

function getDeptStyle(dept) {
  return DEPT_COLORS[dept] || { bg: "#f1f5f9", color: "#475569" };
}

function App() {
  const [employees, setEmployees] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    salary: "",
  });

  const API_URL = "http://localhost:5100/employees" || import.meta.env.VITE_API_URL;

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const getEmployees = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setEmployees(data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ name: "", department: "", salary: "" });
    getEmployees();
    showToast("Employee added successfully");
  };

  const deleteEmployee = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    getEmployees();
    showToast("Employee removed", "danger");
  };

  const startEdit = (employee) => {
    setEditingId(employee._id);
    setFormData({
      name: employee.name,
      department: employee.department,
      salary: employee.salary,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setEditingId(null);
    setFormData({ name: "", department: "", salary: "" });
    getEmployees();
    showToast("Changes saved");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", department: "", salary: "" });
  };

  const departments = ["All", ...new Set(employees.map((e) => e.department).filter(Boolean))];

  const visibleEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = filterDept === "All" || emp.department === filterDept;
    return matchesSearch && matchesDept;
  });

  // Stats
  const totalSalary = employees.reduce((sum, e) => sum + Number(e.salary), 0);
  const avgSalary = employees.length ? Math.round(totalSalary / employees.length) : 0;

  return (
    <div className="app-wrapper">

      {/* TOAST */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="sidebar-icon">👥</span>
          <span className="sidebar-brand">EMS</span>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-label">Overview</span>
          <div className="nav-item active">
            <span>🏠</span> Dashboard
          </div>
        </nav>

        <div className="sidebar-stats">
          <div className="stat-card">
            <p className="stat-value">{employees.length}</p>
            <p className="stat-label">Total Employees</p>
          </div>
          <div className="stat-card">
            <p className="stat-value">₹{avgSalary.toLocaleString("en-IN")}</p>
            <p className="stat-label">Avg. Salary</p>
          </div>
          <div className="stat-card">
            <p className="stat-value">{departments.length - 1}</p>
            <p className="stat-label">Departments</p>
          </div>
        </div>

        <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "☾ Dark Mode"}
        </button>
      </aside>

      {/* MAIN */}
      <main className="main-content">

        {/* TOP BAR */}
        <div className="topbar">
          <div>
            <h1 className="page-title">Employee Directory</h1>
            <p className="page-subtitle">
              {visibleEmployees.length} of {employees.length} employee{employees.length !== 1 ? "s" : ""}
              {filterDept !== "All" ? ` · ${filterDept}` : ""}
            </p>
          </div>
        </div>

        {/* FORM CARD */}
        <div className={`form-card ${editingId ? "form-editing" : ""}`}>
          <h2 className="form-title">
            {editingId ? "✏️ Edit Employee" : "➕ Add New Employee"}
          </h2>
          <form onSubmit={editingId ? saveEdit : addEmployee} className="form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="salary"
              placeholder="Salary (₹)"
              value={formData.salary}
              onChange={handleChange}
              required
            />
            <div className="form-actions">
              <button type="submit" className={editingId ? "btn btn-save" : "btn btn-add"}>
                {editingId ? "Save Changes" : "Add Employee"}
              </button>
              {editingId && (
                <button type="button" className="btn btn-cancel" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* SEARCH + FILTER */}
        <div className="controls">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search name or department…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept === "All" ? "All Departments" : dept}</option>
            ))}
          </select>
        </div>

        {/* GRID */}
        {visibleEmployees.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">🔎</p>
            <p className="empty-title">No results found</p>
            <p className="empty-sub">Try a different name or department</p>
          </div>
        ) : (
          <div className="employee-grid">
            {visibleEmployees.map((employee) => {
              const deptStyle = getDeptStyle(employee.department);
              return (
                <div
                  key={employee.id}
                  className={`card ${editingId === employee.id ? "card-editing" : ""}`}
                >
                  {/* Avatar */}
                  <div className="card-avatar">
                    {employee.name.charAt(0).toUpperCase()}
                  </div>

                  <h3 className="card-name">{employee.name}</h3>

                  <span
                    className="dept-badge"
                    style={{ background: deptStyle.bg, color: deptStyle.color }}
                  >
                    {employee.department}
                  </span>

                  <div className="card-salary">
                    <span className="salary-label">Salary</span>
                    <span className="salary-value">
                      ₹{Number(employee.salary).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="card-actions">
                    <button className="btn-icon btn-edit" onClick={() => startEdit(employee)} title="Edit">
                      ✏️ Edit
                    </button>
                    <button className="btn-icon btn-delete" onClick={() => deleteEmployee(employee._id)} title="Delete">
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;