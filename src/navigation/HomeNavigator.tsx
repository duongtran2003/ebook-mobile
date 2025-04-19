import { createStackNavigator } from '@react-navigation/stack'
import BookReviewScreen from 'src/screens/BookReviewScreen'
import HomeScreen from 'src/screens/HomeScreen'
import PreviewScreen from 'src/screens/PreviewScreen'
import ShowDetailBookScreen from 'src/screens/ShowDetailBookScreen'

export type HomeStackParamList = {
  Home: undefined
  BookDetail: { bookId: string }
  Preview: undefined
  Review: undefined
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

      <Stack.Screen
        options={{ title: 'Đánh giá sách', headerShown: false }}
        name="Review"
        component={BookReviewScreen}
      />
    </Stack.Navigator>
  )
}
