
export interface UserData {
  id: string;
  username: string;
  email: string;
  password: string; // Em produção, seria hash
  createdAt: string;
  lastLogin: string;
}

export interface UserProgress {
  userId: string;
  level: number;
  xp: number;
  completedLessons: number[];
  completedModules: number[];
  achievements: string[];
  currentStreak: number;
  lastStudyDate: string;
  lessonProgress: { [lessonId: number]: { completed: boolean; score: number; attempts: number } };
}

export class LocalStorageManager {
  private static USERS_KEY = 'electroguitar_users';
  private static PROGRESS_KEY = 'electroguitar_progress';
  private static CURRENT_USER_KEY = 'electroguitar_current_user';

  // User Management
  static saveUser(user: UserData): boolean {
    try {
      const users = this.getAllUsers();
      const existingUser = users.find(u => u.email === user.email || u.username === user.username);
      
      if (existingUser) {
        return false; // User already exists
      }

      users.push(user);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error saving user:', error);
      return false;
    }
  }

  static getAllUsers(): UserData[] {
    try {
      const users = localStorage.getItem(this.USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  static authenticateUser(email: string, password: string): UserData | null {
    try {
      const users = this.getAllUsers();
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Update last login
        user.lastLogin = new Date().toISOString();
        this.updateUser(user);
        this.setCurrentUser(user);
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error authenticating user:', error);
      return null;
    }
  }

  static updateUser(user: UserData): void {
    try {
      const users = this.getAllUsers();
      const index = users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users[index] = user;
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  static setCurrentUser(user: UserData): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  static getCurrentUser(): UserData | null {
    try {
      const user = localStorage.getItem(this.CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  static logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  // Progress Management
  static saveProgress(progress: UserProgress): void {
    try {
      const allProgress = this.getAllProgress();
      const index = allProgress.findIndex(p => p.userId === progress.userId);
      
      if (index !== -1) {
        allProgress[index] = progress;
      } else {
        allProgress.push(progress);
      }
      
      localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  static getUserProgress(userId: string): UserProgress {
    try {
      const allProgress = this.getAllProgress();
      const userProgress = allProgress.find(p => p.userId === userId);
      
      if (userProgress) {
        return userProgress;
      }

      // Create new progress for user
      const newProgress: UserProgress = {
        userId,
        level: 1,
        xp: 0,
        completedLessons: [],
        completedModules: [],
        achievements: [],
        currentStreak: 0,
        lastStudyDate: '',
        lessonProgress: {}
      };

      this.saveProgress(newProgress);
      return newProgress;
    } catch (error) {
      console.error('Error getting user progress:', error);
      return {
        userId,
        level: 1,
        xp: 0,
        completedLessons: [],
        completedModules: [],
        achievements: [],
        currentStreak: 0,
        lastStudyDate: '',
        lessonProgress: {}
      };
    }
  }

  private static getAllProgress(): UserProgress[] {
    try {
      const progress = localStorage.getItem(this.PROGRESS_KEY);
      return progress ? JSON.parse(progress) : [];
    } catch (error) {
      console.error('Error getting all progress:', error);
      return [];
    }
  }

  // Utility methods
  static calculateLevel(xp: number): number {
    return Math.floor(xp / 200) + 1;
  }

  static getXpForNextLevel(currentLevel: number): number {
    return currentLevel * 200;
  }

  static updateStreak(userId: string): void {
    const progress = this.getUserProgress(userId);
    const today = new Date().toDateString();
    const lastStudy = new Date(progress.lastStudyDate).toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (lastStudy === today) {
      // Already studied today
      return;
    }

    if (lastStudy === yesterday) {
      // Consecutive day
      progress.currentStreak += 1;
    } else {
      // Streak broken
      progress.currentStreak = 1;
    }

    progress.lastStudyDate = new Date().toISOString();
    this.saveProgress(progress);
  }
}
