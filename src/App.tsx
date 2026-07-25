import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "@/pages/Home";
import { Exercises } from "@/pages/Exercises";
import { ExerciseDetail } from "@/pages/ExerciseDetail";
import { Meals } from "@/pages/Meals";
import { MealDetail } from "@/pages/MealDetail";
import { Profile } from "@/pages/Profile";
import { BottomNav } from "@/components/BottomNav";

function AppContent() {
  const location = useLocation();
  const hideBottomNav = location.pathname.includes('/exercises/') || location.pathname.includes('/meals/');

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercises/:id" element={<ExerciseDetail />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/meals/:id" element={<MealDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
