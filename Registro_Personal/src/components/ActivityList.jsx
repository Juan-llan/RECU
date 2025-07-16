import React, { useState } from "react";
import "./ActivityList.css";
const ActivityList = ({ activities, onDeleteActivity, onEditActivity, onImportActivities }) => {
  const [editId, setEditId] = useState(null);
  const [editDesc, setEditDesc] = useState("");
  const [editType, setEditType] = useState("");

  // Confirmación antes de eliminar
  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta actividad?")) {
      onDeleteActivity(id);
    }
  };

  // Iniciar edición
  const startEdit = (activity) => {
    setEditId(activity.id);
    setEditDesc(activity.description);
    setEditType(activity.type || "");
  };

  // Guardar edición
  const saveEdit = (id) => {
    if (!editDesc.trim()) return;
    onEditActivity(id, editDesc.trim(), editType);
    setEditId(null);
    setEditDesc("");
    setEditType("");
  };

  // Exportar JSON
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(activities, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "actividades.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Exportar CSV
  const exportCSV = () => {
    const header = "Descripción,Tipo,Fecha\n";
    const rows = activities.map(a => `"${a.description.replace(/"/g, '""')}","${a.type}","${a.date}"`).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "actividades.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Importar JSON
  const importJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (Array.isArray(data)) {
          onImportActivities(data);
        } else {
          alert("El archivo no tiene el formato correcto.");
        }
      } catch {
        alert("Error al leer el archivo JSON.");
      }
    };
    reader.readAsText(file);
  };

  if (!activities || activities.length === 0) {
    return (
      <div>
        <div style={{display:'flex', gap:8, marginBottom:16}}>
          <button onClick={exportJSON} className="activity-list-export-btn">
            <span className="activity-list-export-icon">⬇️</span> Exportar JSON
          </button>
          <button onClick={exportCSV} className="activity-list-export-btn">
            <span className="activity-list-export-icon">📄</span> Exportar CSV
          </button>
          <label className="activity-list-export-btn" style={{cursor:'pointer'}}>
            <span className="activity-list-export-icon">⬆️</span> Importar JSON
            <input type="file" accept="application/json" style={{display:'none'}} onChange={importJSON} />
          </label>
        </div>
        <p className="activity-list-empty">No hay actividades registradas.</p>
      </div>
    );
  }

  return (
    <div className="activity-list-horizontal-wrapper">
      <div style={{display:'flex', gap:8, marginBottom:16}}>
        <button onClick={exportJSON} className="activity-list-export-btn">
          <span className="activity-list-export-icon">⬇️</span> Exportar JSON
        </button>
        <button onClick={exportCSV} className="activity-list-export-btn">
          <span className="activity-list-export-icon">📄</span> Exportar CSV
        </button>
        <label className="activity-list-export-btn" style={{cursor:'pointer'}}>
          <span className="activity-list-export-icon">⬆️</span> Importar JSON
          <input type="file" accept="application/json" style={{display:'none'}} onChange={importJSON} />
        </label>
      </div>
      <ul className="activity-list-horizontal">
        {activities.map((activity) => (
          <li key={activity.id} className="activity-list-horizontal-item">
            <div className="activity-list-horizontal-content">
              {editId === activity.id ? (
                <>
                  <input
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)}
                    className="activity-form-input"
                    style={{marginBottom:8}}
                  />
                  <select
                    value={editType}
                    onChange={e => setEditType(e.target.value)}
                    className="activity-form-select"
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="Trabajo">Trabajo</option>
                    <option value="Estudio">Estudio</option>
                    <option value="Otro">Otro</option>
                  </select>
                  <button onClick={() => saveEdit(activity.id)} className="activity-list-delete" style={{marginRight:8}}>Guardar</button>
                  <button onClick={() => setEditId(null)} className="activity-list-delete">Cancelar</button>
                </>
              ) : (
                <>
                  <p className="activity-list-desc">{activity.description}</p>
                  <p className="activity-list-date">
                    {new Date(activity.date).toLocaleDateString("es-CL", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {activity.type && (
                    <span className="activity-list-type">{activity.type}</span>
                  )}
                </>
              )}
            </div>
            {editId !== activity.id && (
              <div style={{display:'flex', gap:8}}>
                <button onClick={() => startEdit(activity)} className="activity-list-delete">Editar</button>
                <button onClick={() => handleDelete(activity.id)} className="activity-list-delete">Eliminar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
