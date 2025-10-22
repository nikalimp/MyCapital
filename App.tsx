import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { SettingsProvider } from './src/state/SettingsContext';
import { AssetsProvider } from './src/state/AssetsContext';

const App = () => (
  <SettingsProvider>
    <AssetsProvider>
      <StatusBar style="dark" />
      <RootNavigator />
    </AssetsProvider>
  </SettingsProvider>
);

export default App;
