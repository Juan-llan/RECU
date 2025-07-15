import React, { useState } from "react";
import "./ActivityForm.css";
const ActivityForm = ({ onAddActivity }) => {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim()) {
      alert("La descripción es obligatoria.");
      return;
    }

    const newActivity = {
      id: Date.now(),
      date: new Date().toISOString(),
      description: description.trim(),
      type: type || "Otro",
    };

    onAddActivity(newActivity);
    setDescription("");
    setType("");
  };

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <h2 className="activity-form-title">Registrar Actividad</h2>
      <div>
        <label className="activity-form-label" htmlFor="desc">
          Descripción
        </label>
        <input
          id="desc"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="activity-form-input"
          placeholder="Ej: Leer un libro, hacer ejercicio..."
          required
        />
      </div>
      <div>
        <label className="activity-form-label" htmlFor="type">
          Tipo / Categoría
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="activity-form-select"
        >
          <option value="">Selecciona una categoría</option>
          <option value="Trabajo">Trabajo</option>
          <option value="Estudio">Estudio</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <button type="submit" className="activity-form-btn">
        <span style={{ marginRight: 6 }}>➕</span>Agregar Actividad
      </button>
    </form>
  );
};

export default ActivityForm;
