import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
  photo?: string;
  frequency: string;
  contributionAmount: number;
  color: string;
  progress: number;
  createdAt: Date;
}

interface GoalsContextType {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'current' | 'progress' | 'createdAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  getTotalSaved: () => number;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

const STORAGE_KEY = 'lovable-goals';

// Default goals for initial state
const defaultGoals: Goal[] = [
  {
    id: '1',
    name: "Emergency Fund",
    target: 5000,
    current: 3250,
    deadline: "Dec 2024",
    category: "Emergency",
    frequency: "monthly",
    contributionAmount: 500,
    color: "bg-primary",
    progress: 65,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: "Dream Vacation",
    target: 8000,
    current: 2100,
    deadline: "Jun 2025",
    category: "Travel",
    frequency: "monthly",
    contributionAmount: 400,
    color: "bg-accent",
    progress: 26,
    createdAt: new Date('2024-02-01')
  },
  {
    id: '3',
    name: "New Car",
    target: 25000,
    current: 8500,
    deadline: "Sep 2025",
    category: "Car",
    frequency: "monthly",
    contributionAmount: 800,
    color: "bg-warning",
    progress: 34,
    createdAt: new Date('2024-03-01')
  }
];

export const GoalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load goals from localStorage on mount
  useEffect(() => {
    const storedGoals = localStorage.getItem(STORAGE_KEY);
    if (storedGoals) {
      try {
        const parsedGoals = JSON.parse(storedGoals).map((goal: any) => ({
          ...goal,
          createdAt: new Date(goal.createdAt)
        }));
        setGoals(parsedGoals);
      } catch (error) {
        console.error('Error parsing stored goals:', error);
        setGoals(defaultGoals);
      }
    } else {
      setGoals(defaultGoals);
    }
  }, []);

  // Save goals to localStorage whenever goals change
  useEffect(() => {
    if (goals.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    }
  }, [goals]);

  const addGoal = (goalData: Omit<Goal, 'id' | 'current' | 'progress' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      current: 0,
      progress: 0,
      createdAt: new Date()
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => 
      prev.map(goal => 
        goal.id === id 
          ? { 
              ...goal, 
              ...updates,
              progress: updates.current !== undefined 
                ? Math.round((updates.current / goal.target) * 100)
                : goal.progress
            }
          : goal
      )
    );
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const getTotalSaved = () => {
    return goals.reduce((total, goal) => total + goal.current, 0);
  };

  return (
    <GoalsContext.Provider value={{ goals, addGoal, updateGoal, deleteGoal, getTotalSaved }}>
      {children}
    </GoalsContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
};