import React from "react";
import "./ActivityList.css";
const ActivityList = ({ activities, onDeleteActivity }) => {
  if (!activities || activities.length === 0) {
    return (
      <p className="activity-list-empty">No hay actividades registradas.</p>
    );
  }

  return (
    <div className="activity-list-horizontal-wrapper">
      <ul className="activity-list-horizontal">
        {activities.map((activity) => (
          <li key={activity.id} className="activity-list-horizontal-item">
            <div className="activity-list-horizontal-content">
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
            </div>
            <button
              onClick={() => onDeleteActivity(activity.id)}
              className="activity-list-delete"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
