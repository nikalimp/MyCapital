import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CategorySelectScreen from '../screens/CategorySelectScreen';
import NewAssetScreen from '../screens/NewAssetScreen';
import AssetDetailsScreen from '../screens/AssetDetailsScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f6f7fb',
  },
};

const RootNavigator = () => (
  <NavigationContainer theme={navigationTheme}>
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: '#111827',
        headerStyle: { backgroundColor: '#f6f7fb' },
        contentStyle: { backgroundColor: '#f6f7fb' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'MyCapital',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen
        name="CategorySelect"
        component={CategorySelectScreen}
        options={{ title: 'Select Category' }}
      />
      <Stack.Screen
        name="NewAsset"
        component={NewAssetScreen}
        options={{ title: 'New Asset' }}
      />
      <Stack.Screen
        name="AssetDetails"
        component={AssetDetailsScreen}
        options={{ title: 'About Asset' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
