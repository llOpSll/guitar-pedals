
import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Dashboard } from '../components/Dashboard';
import { ModuleView } from '../components/ModuleView';
import { LessonView } from '../components/LessonView';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { LocalStorageManager, UserData, UserProgress } from '../utils/storage';

export type ViewType = 'dashboard' | 'module' | 'lesson';
export type AuthView = 'login' | 'register';

export interface AppState {
  currentView: ViewType;
  selectedModule?: number;
  selectedLesson?: number;
  userProgress: UserProgress;
}

const Index = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [authView, setAuthView] = useState<AuthView>('login');
  const [appState, setAppState] = useState<AppState>({
    currentView: 'dashboard',
    selectedModule: undefined,
    selectedLesson: undefined,
    userProgress: {
      userId: '',
      level: 1,
      xp: 0,
      completedLessons: [],
      completedModules: [],
      achievements: [],
      currentStreak: 0,
      lastStudyDate: '',
      lessonProgress: {}
    }
  });

  // Check for existing user session on mount
  useEffect(() => {
    const currentUser = LocalStorageManager.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      const progress = LocalStorageManager.getUserProgress(currentUser.id);
      setAppState(prev => ({ ...prev, userProgress: progress }));
    }
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    const authenticatedUser = LocalStorageManager.authenticateUser(email, password);
    
    if (authenticatedUser) {
      setUser(authenticatedUser);
      const progress = LocalStorageManager.getUserProgress(authenticatedUser.id);
      setAppState(prev => ({ ...prev, userProgress: progress }));
      return true;
    }
    
    return false;
  };

  const handleRegister = async (username: string, email: string, password: string): Promise<boolean> => {
    const newUser: UserData = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      username,
      email,
      password, // Em produção seria hash
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    const success = LocalStorageManager.saveUser(newUser);
    
    if (success) {
      setUser(newUser);
      LocalStorageManager.setCurrentUser(newUser);
      const progress = LocalStorageManager.getUserProgress(newUser.id);
      setAppState(prev => ({ ...prev, userProgress: progress }));
      return true;
    }
    
    return false;
  };

  const handleLogout = () => {
    LocalStorageManager.logout();
    setUser(null);
    setAppState({
      currentView: 'dashboard',
      selectedModule: undefined,
      selectedLesson: undefined,
      userProgress: {
        userId: '',
        level: 1,
        xp: 0,
        completedLessons: [],
        completedModules: [],
        achievements: [],
        currentStreak: 0,
        lastStudyDate: '',
        lessonProgress: {}
      }
    });
  };

  const updateView = (view: ViewType, moduleId?: number, lessonId?: number) => {
    setAppState(prev => ({
      ...prev,
      currentView: view,
      selectedModule: moduleId,
      selectedLesson: lessonId
    }));
  };

  const updateProgress = (newProgress: UserProgress) => {
    LocalStorageManager.saveProgress(newProgress);
    setAppState(prev => ({ ...prev, userProgress: newProgress }));
  };

  // If user is not logged in, show auth forms
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/20 flex items-center justify-center p-4">
        {authView === 'login' ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthView('register')}
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthView('login')}
          />
        )}
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (appState.currentView) {
      case 'module':
        return (
          <ModuleView 
            moduleId={appState.selectedModule!}
            onBack={() => updateView('dashboard')}
            onLessonSelect={(lessonId) => updateView('lesson', appState.selectedModule, lessonId)}
            userProgress={appState.userProgress}
            onProgressUpdate={updateProgress}
          />
        );
      case 'lesson':
        return (
          <LessonView 
            moduleId={appState.selectedModule!}
            lessonId={appState.selectedLesson!}
            onBack={() => updateView('module', appState.selectedModule)}
            userProgress={appState.userProgress}
            onProgressUpdate={updateProgress}
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
      <Header 
        user={user} 
        userProgress={appState.userProgress} 
        onLogout={handleLogout} 
      />
      <main className="container mx-auto px-4 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;
