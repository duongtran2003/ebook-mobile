import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AppNavigator from './navigation/AppNavigator'
import LoginScreen from './screens/LoginScreen'
import useAuth from './hooks/useAuth'
import Toast from 'react-native-toast-message'

export default function App() {
  const { isLoggedIn, login, logout } = useAuth()

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          {isLoggedIn ? <AppNavigator onLogout={logout} /> : <LoginScreen onLogin={login} />}
        </SafeAreaProvider>
      </GestureHandlerRootView>
      <Toast />
    </>
  )
}
