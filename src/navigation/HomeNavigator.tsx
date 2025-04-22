import { createStackNavigator } from '@react-navigation/stack'
import BookFeedBackScreen from 'src/screens/BookFeedBackScreen'
import BookReadingScreen from 'src/screens/BookReadingScreen'
import BookReviewScreen from 'src/screens/BookReviewScreen'
import HomeScreen from 'src/screens/HomeScreen'
import NoteScreen from 'src/screens/NoteScreen'
import PreviewScreen from 'src/screens/PreviewScreen'
import ShowDetailBookScreen from 'src/screens/ShowDetailBookScreen'

export type HomeStackParamList = {
  Home: undefined
  BookDetail: { bookId: string }
  Preview: undefined
  Review: undefined
  Feedback: undefined
  BookReading: undefined
  NoteScreen: undefined
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

      <Stack.Screen
        options={{ title: 'Đánh giá', headerShown: false }}
        name="Feedback"
        component={BookFeedBackScreen}
      />

      <Stack.Screen
        options={{ title: 'Đọc sách', headerShown: false }}
        name="BookReading"
        component={BookReadingScreen}
      />

      <Stack.Screen
        options={{ title: 'Ghi chú', headerShown: false }}
        name="NoteScreen"
        component={NoteScreen}
      />
    </Stack.Navigator>
  )
}
