import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AppNavigator from './navigation/AppNavigator'
import { useState } from 'react'
import LoginScreen from './screens/LoginScreen'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        {isLoggedIn ? (
          <AppNavigator onLogout={() => setIsLoggedIn(false)} />
        ) : (
          <LoginScreen onLogin={() => setIsLoggedIn(true)} />
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
