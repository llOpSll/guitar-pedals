
import { courseData, validateModuleCompletion } from '../data/courseData';
import { UserProgress } from './storage';

export const isModuleUnlocked = (moduleId: number, userProgress: UserProgress): boolean => {
  // Primeiro módulo sempre desbloqueado
  if (moduleId === 1) return true;
  
  // Verifica se o módulo anterior foi completado
  const previousModuleId = moduleId - 1;
  return userProgress.completedModules.includes(previousModuleId);
};

export const isLessonUnlocked = (moduleId: number, lessonId: number, userProgress: UserProgress): boolean => {
  const module = courseData.find(m => m.id === moduleId);
  if (!module) return false;
  
  const lesson = module.lessons.find(l => l.id === lessonId);
  if (!lesson) return false;
  
  // Primeira lição do módulo sempre desbloqueada (se módulo desbloqueado)
  if (lesson === module.lessons[0]) {
    return isModuleUnlocked(moduleId, userProgress);
  }
  
  // Verifica se todas as lições pré-requisito foram completadas
  return lesson.prerequisites.every(prereqId => 
    userProgress.completedLessons.includes(prereqId)
  );
};

export const calculateModuleProgress = (moduleId: number, userProgress: UserProgress): number => {
  const module = courseData.find(m => m.id === moduleId);
  if (!module) return 0;
  
  const completedCount = module.lessons.filter(lesson =>
    userProgress.completedLessons.includes(lesson.id)
  ).length;
  
  return (completedCount / module.lessons.length) * 100;
};

export const updateUserProgress = (
  userProgress: UserProgress,
  moduleId: number,
  lessonId: number
): UserProgress => {
  const newProgress = { ...userProgress };
  
  // Adiciona lição completada se não existe
  if (!newProgress.completedLessons.includes(lessonId)) {
    newProgress.completedLessons.push(lessonId);
    
    // Adiciona XP da lição
    const module = courseData.find(m => m.id === moduleId);
    const lesson = module?.lessons.find(l => l.id === lessonId);
    if (lesson) {
      newProgress.xp += lesson.xpReward;
      newProgress.level = Math.floor(newProgress.xp / 200) + 1;
    }
  }
  
  // Verifica se módulo foi completado
  if (validateModuleCompletion(moduleId, newProgress.completedLessons)) {
    if (!newProgress.completedModules.includes(moduleId)) {
      newProgress.completedModules.push(moduleId);
    }
  }
  
  // Atualiza streak
  const today = new Date().toDateString();
  if (newProgress.lastStudyDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (newProgress.lastStudyDate === yesterday.toDateString()) {
      newProgress.currentStreak += 1;
    } else {
      newProgress.currentStreak = 1;
    }
    
    newProgress.lastStudyDate = today;
  }
  
  return newProgress;
};
