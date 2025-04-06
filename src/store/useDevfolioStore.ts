import { create } from 'zustand';

type Project = {
  title: string;
  description: string;
};

type DevfolioState = {
    name: string;
    email: string;
    bio: string;
    skills: string[];
    projects: Project[];
    loading: boolean; // <-- new
    setLoading: (loading: boolean) => void; // <-- new
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
    loading: false, // <-- new
    setLoading: (loading) => set({ loading }), // <-- new
    setName: (name) => set({ name }),
    setEmail: (email) => set({ email }),
    setBio: (bio) => set({ bio }),
    setSkills: (skills) => set({ skills }),
    addProject: (project) =>
      set((state) => ({
        projects: [...state.projects, project],
      })),
    resetProjects: () => set({ projects: [{ title: '', description: '' }] }),
  }));
  