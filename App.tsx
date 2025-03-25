/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import {toastConfig} from './src/components/Toast';
import {RootStackParamList} from './src/types/navigation';
import colors from './src/constants/colors';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import ArrowSVG from './src/assets/svg/Arrow';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.white,
            },
            headerTintColor: colors.black,
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity 
                  style={styles.headerLeft}
                  onPress={() => navigation.goBack()}>
                  <ArrowSVG />
                  <Text style={styles.headerTitle}>Home</Text>
                </TouchableOpacity>
              ),
              headerTitle: () => null,
              gestureEnabled: false,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default App;
