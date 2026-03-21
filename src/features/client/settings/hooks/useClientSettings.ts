'use client';

import React from 'react';

import { CLIENT_SETTINGS_CONSTANTS } from '../constants';
import type { TabItem } from '../types';

export type { TabItem };

export interface ClientSettingsState {
  activeTab: (typeof CLIENT_SETTINGS_CONSTANTS.TABS)[keyof typeof CLIENT_SETTINGS_CONSTANTS.TABS];
  tabs: TabItem[];
}

export default function useClientSettings(initialTabs: TabItem[]) {
  const [state, setState] = React.useState<ClientSettingsState>({
    activeTab: CLIENT_SETTINGS_CONSTANTS.DEFAULT_ACTIVE_TAB,
    tabs: initialTabs,
  });

  const setActiveTab = React.useCallback((tabValue: string) => {
    setState(prev => ({
      ...prev,
      activeTab: tabValue as ClientSettingsState['activeTab'],
    }));
  }, []);

  const resetToDefaultTab = React.useCallback(() => {
    setState(prev => ({
      ...prev,
      activeTab: CLIENT_SETTINGS_CONSTANTS.DEFAULT_ACTIVE_TAB,
    }));
  }, []);

  const updateTabs = React.useCallback((newTabs: TabItem[]) => {
    setState(prev => ({ ...prev, tabs: newTabs }));
  }, []);

  const getCurrentTab = React.useCallback(() => {
    return state.tabs.find(tab => tab.value === state.activeTab);
  }, [state.tabs, state.activeTab]);

  const isTabActive = React.useCallback(
    (tabValue: string) => state.activeTab === tabValue,
    [state.activeTab]
  );

  return {
    ...state,
    setActiveTab,
    resetToDefaultTab,
    updateTabs,
    getCurrentTab,
    isTabActive,
  };
}
