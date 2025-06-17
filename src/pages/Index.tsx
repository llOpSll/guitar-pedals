
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Dashboard } from '../components/Dashboard';
import { ModuleView } from '../components/ModuleView';
import { LessonView } from '../components/LessonView';

export type ViewType = 'dashboard' | 'module' | 'lesson';

export interface AppState {
  currentView: ViewType;
  selectedModule?: number;
  selectedLesson?: number;
  userProgress: {
    level: number;
    xp: number;
    completedLessons: number[];
    achievements: string[];
  };
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>({
    currentView: 'dashboard',
    selectedModule: undefined,
    selectedLesson: undefined,
    userProgress: {
      level: 1,
      xp: 150,
      completedLessons: [1, 2, 3],
      achievements: ['first_lesson', 'week_streak']
    }
  });

  const updateView = (view: ViewType, moduleId?: number, lessonId?: number) => {
    setAppState(prev => ({
      ...prev,
      currentView: view,
      selectedModule: moduleId,
      selectedLesson: lessonId
    }));
  };

  const renderCurrentView = () => {
    switch (appState.currentView) {
      case 'module':
        return (
          <ModuleView 
            moduleId={appState.selectedModule!}
            onBack={() => updateView('dashboard')}
            onLessonSelect={(lessonId) => updateView('lesson', appState.selectedModule, lessonId)}
            userProgress={appState.userProgress}
          />
        );
      case 'lesson':
        return (
          <LessonView 
            moduleId={appState.selectedModule!}
            lessonId={appState.selectedLesson!}
            onBack={() => updateView('module', appState.selectedModule)}
            userProgress={appState.userProgress}
          />
        );
      default:
        return (
          <Dashboard 
            onModuleSelect={(moduleId) => updateView('module', moduleId)}
            userProgress={appState.userProgress}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/20">
      <Header userProgress={appState.userProgress} />
      <main className="container mx-auto px-4 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;
