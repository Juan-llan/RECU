import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import WeeklySummary from "./components/WeeklySummary";
import Navbar from "./components/Navbar";

const App = () => {
  // Usar useRef para evitar guardar en localStorage en el primer render
  const isFirstRender = useRef(true);
  const [activities, setActivities] = useState(() => {
    try {
      const stored = localStorage.getItem("activities");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      localStorage.removeItem("activities");
    }
    return [];
  });

  // Guardar cuando cambia, pero no en el primer render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const handleAddActivity = (newActivity) => {
    setActivities((prev) => [newActivity, ...prev]);
  };

  const handleDeleteActivity = (id) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route
            path="/"
            element={<ActivityForm onAddActivity={handleAddActivity} />}
          />
          <Route
            path="/lista"
            element={
              <ActivityList
                activities={activities}
                onDeleteActivity={handleDeleteActivity}
              />
            }
          />
          <Route
            path="/resumen"
            element={<WeeklySummary activities={activities} />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
