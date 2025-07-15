import React from "react";
import "./WeeklySummary.css";
// Días en español (comenzando desde Domingo = 0)
const daysOfWeek = [
  "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
];

const WeeklySummary = ({ activities }) => {
  // Inicializar conteo por día (0-6)
  const summary = activities.reduce((acc, activity) => {
    const day = new Date(activity.date).getDay(); // 0 = Domingo
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  // Calcular el máximo para escalar las barras
  const maxCount = Math.max(...Object.values(summary), 1);

  return (
    <div className="weekly-summary-container">
      <h2 className="weekly-summary-title">Resumen Semanal</h2>
      <div className="weekly-summary-horizontal">
        {daysOfWeek.map((dayName, index) => {
          const count = summary[index] || 0;
          return (
            <div key={index} className="weekly-summary-col">
              <div className="weekly-summary-bar-bg-horizontal">
                <div
                  className="weekly-summary-bar-horizontal"
                  style={{ height: `${(count / maxCount) * 90 || 8}px` }}
                  title={`${dayName}: ${count} actividad${count === 1 ? '' : 'es'}`}
                />
              </div>
              <span className="weekly-summary-day-horizontal">{dayName.slice(0,3)}</span>
              <span className="weekly-summary-count-horizontal">{count}</span>
            </div>
          );
        })}
      </div>
      <div className="weekly-summary-details">
        <p>Total de actividades: <b>{activities.length}</b></p>
        <p>Día más activo: <b>{daysOfWeek[Object.keys(summary).reduce((a, b) => summary[a] > summary[b] ? a : b, 0)] || '-'}</b></p>
      </div>
    </div>
  );
};

export default WeeklySummary;
