import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { Home } from './pages/Home';
import { Exercises } from './pages/Exercises';
import { ExerciseDetail } from './pages/ExerciseDetail';
import { Meals } from './pages/Meals';
import { MealDetail } from './pages/MealDetail';
import { IngredientRecipe } from './pages/IngredientRecipe';
import { Plans } from './pages/Plans';
import { PlanDetail } from './pages/PlanDetail';
import { WorkoutSession } from './pages/WorkoutSession';
import { Profile } from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import { History } from './pages/History';
import { Favorites } from './pages/Favorites';
import { Community } from './pages/Community';
import { CalorieTester } from './pages/CalorieTester';
import { WeeklyPlanPage } from './pages/WeeklyPlanPage';

type Page = 
  | 'home' 
  | 'exercises' 
  | `exercise/${string}` 
  | 'community'
  | 'meals' 
  | `meal/${string}` 
  | 'ingredient-recipe'
  | 'calorie-tester'
  | 'plans' 
  | `plan/${string}` 
  | 'weekly-plan'
  | 'workout' 
  | 'edit-profile'
  | 'profile'
  | 'history'
  | 'favorites';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const getActiveTab = () => {
    if (currentPage.startsWith('exercise/')) return 'exercises';
    if (currentPage.startsWith('meal/')) return 'meals';
    if (currentPage === 'ingredient-recipe') return 'meals';
    if (currentPage === 'calorie-tester') return 'meals';
    if (currentPage === 'weekly-plan') return 'plans';
    if (currentPage.startsWith('plan/')) return 'plans';
    return currentPage;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'exercises':
        return <Exercises onNavigate={handleNavigate} />;
      case 'community':
        return <Community />;
      case 'meals':
        return <Meals onNavigate={handleNavigate} />;
      case 'ingredient-recipe':
        return <IngredientRecipe onNavigate={handleNavigate} />;
      case 'calorie-tester':
        return <CalorieTester onNavigate={handleNavigate} />;
      case 'plans':
        return <Plans onNavigate={handleNavigate} />;
      case 'weekly-plan':
        return <WeeklyPlanPage onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} />;
      case 'edit-profile':
        return <EditProfile onBack={() => handleNavigate('profile')} />;
      case 'history':
        return <History onNavigate={handleNavigate} />;
      case 'favorites':
        return <Favorites onNavigate={handleNavigate} />;
      default:
        if (currentPage.startsWith('exercise/')) {
          const exerciseId = currentPage.split('/')[1];
          return <ExerciseDetail exerciseId={exerciseId} onNavigate={handleNavigate} />;
        }
        if (currentPage.startsWith('meal/')) {
          const mealId = currentPage.split('/')[1];
          return <MealDetail mealId={mealId} onNavigate={handleNavigate} />;
        }
        if (currentPage.startsWith('plan/')) {
          const planId = currentPage.split('/')[1];
          return <PlanDetail planId={planId} onNavigate={handleNavigate} />;
        }
        return <Home onNavigate={handleNavigate} />;
    }
  };

  const showBottomNav = currentPage !== 'edit-profile' &&
                        !currentPage.startsWith('exercise/') && 
                        !currentPage.startsWith('meal/') && 
                        !currentPage.startsWith('plan/') &&
                        currentPage !== 'weekly-plan' &&
                        currentPage !== 'workout' &&
                        currentPage !== 'history' &&
                        currentPage !== 'favorites';

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      {renderPage()}
      {showBottomNav && <BottomNav activeTab={getActiveTab()} onTabChange={handleNavigate} />}
    </div>
  );
}

export default App;