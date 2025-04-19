import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from 'src/screens/HomeScreen'
import PreviewScreen from 'src/screens/PreviewScreen'
import ShowDetailBookScreen from 'src/screens/ShowDetailBookScreen'

export type HomeStackParamList = {
  Home: undefined
  BookDetail: { bookId: string }
  Preview: undefined
}

export default function HomeNavigator() {
  const Stack = createStackNavigator<HomeStackParamList>()

  return (
    <Stack.Navigator>
      <Stack.Screen options={{ title: 'Trang chủ' }} name="Home" component={HomeScreen} />
      <Stack.Screen
        options={{ title: 'Chi tiết sách', headerShown: false }}
        name="BookDetail"
        component={ShowDetailBookScreen}
      />
      <Stack.Screen
        options={{ title: 'Giới thiệu', headerShown: false }}
        name="Preview"
        component={PreviewScreen}
      />
    </Stack.Navigator>
  )
}
