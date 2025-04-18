import { create } from 'zustand';

export type Project = {
  title: string;
  description: string;
};

type DevfolioState = {
    name: string;
    email: string;
    bio: string;
    skills: string[];
    projects: Project[];
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setBio: (bio: string) => void;
    setSkills: (skills: string[]) => void;
    addProject: (project: Project) => void;
    resetProjects: () => void;
  };
  
  export const useDevfolioStore = create<DevfolioState>((set) => ({
    name: '',
    email: '',
    bio: '',
    skills: [],
    projects: [],
    loading: false,
    setLoading: (loading) => set({ loading }),
    setName: (name) => set({ name }),
    setEmail: (email) => set({ email }),
    setBio: (bio) => set({ bio }),
    setSkills: (skills) => set({ skills }),
    addProject: (project) =>
      set((state) => ({
        projects: [...state.projects, project],
      })),
    resetProjects: () => set({ projects: [] }),
  }));
  