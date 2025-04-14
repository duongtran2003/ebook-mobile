import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from 'src/screens/HomeScreen'
import ShowDetailBookScreen from 'src/screens/ShowDetailBookScreen'

export type HomeStackParamList = {
  Home: undefined
  BookDetail: { bookId: string }
}

export default function HomeNavigator() {
  const Stack = createStackNavigator<HomeStackParamList>()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Stack.Screen options={{ title: 'Trang chủ' }} name="Home" component={HomeScreen} />
      <Stack.Screen
        options={{ title: 'Chi tiết sách' }}
        name="BookDetail"
        component={ShowDetailBookScreen}
      />
    </Stack.Navigator>
  )
}
