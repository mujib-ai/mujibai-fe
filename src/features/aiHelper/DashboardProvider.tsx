'use client';

import {
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

export type DashboardSubsection = {
  id: string;
  label: string;
};

type DashboardContextValue = {
  currentBrandId: string;
  setCurrentBrandId: (id: string) => void;

  composerOpen: boolean;
  openComposer: () => void;
  closeComposer: () => void;
  notificationsOpen: boolean;
  openNotifications: () => void;
  closeNotifications: () => void;
  toggleNotifications: () => void;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  assistantOpen: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
  toggleAssistant: () => void;
  subsection: DashboardSubsection | null;
  setSubsection: (subsection: DashboardSubsection | null) => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [currentBrandId, setCurrentBrandId] = useState('*');
  const [composerOpen, setComposerOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [subsection, setSubsection] = useState<DashboardSubsection | null>(
    null
  );

  const value = useMemo(
    () => ({
      currentBrandId,
      setCurrentBrandId,
      composerOpen,
      openComposer: () => {
        setNotificationsOpen(false);
        setAssistantOpen(false);
        setComposerOpen(true);
      },
      closeComposer: () => setComposerOpen(false),
      notificationsOpen,
      openNotifications: () => {
        setComposerOpen(false);
        setAssistantOpen(false);
        setNotificationsOpen(true);
      },
      closeNotifications: () => setNotificationsOpen(false),
      toggleNotifications: () => {
        setComposerOpen(false);
        setAssistantOpen(false);
        setNotificationsOpen(o => !o);
      },
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
      assistantOpen,
      openAssistant: () => {
        setComposerOpen(false);
        setNotificationsOpen(false);
        setAssistantOpen(true);
      },
      closeAssistant: () => setAssistantOpen(false),
      toggleAssistant: () => {
        setComposerOpen(false);
        setNotificationsOpen(false);
        setAssistantOpen(o => !o);
      },

      subsection,
      setSubsection,
    }),
    [
      currentBrandId,
      composerOpen,
      notificationsOpen,
      settingsOpen,
      assistantOpen,
      subsection,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return ctx;
}
