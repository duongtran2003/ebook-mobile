import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width } = Dimensions.get('window')

const BookFeedBackScreen = () => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const navigation = useNavigation()

  return (
    <LinearGradient
      colors={['rgba(246,133,69,0.35)', 'rgba(196,196,196,0.7)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Đánh giá và nhận xét</Text>

        {/* Book Info */}
        <View style={styles.bookInfo}>
          <Image
            source={require('../../assets/book-imgs/the-arsonist.png')} // Thay bằng đường dẫn ảnh bạn có
            style={styles.bookImage}
          />
          <View>
            <Text style={styles.bookTitle}>The Arsonist</Text>
            <Text style={styles.bookAuthor}>Chloe Hooper</Text>
          </View>
        </View>

        {/* Star Rating */}
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
              <Icon
                name={i <= rating ? 'star' : 'star-border'}
                size={36}
                color="#f9b409"
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Comment Box */}
        <Text style={styles.label}>Nhận xét</Text>
        <TextInput
          style={styles.input}
          placeholder="Hãy nhận xét và đóng góp ý kiến nhé"
          placeholderTextColor="#666"
          multiline
          numberOfLines={5}
          value={comment}
          onChangeText={setComment}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Gửi đánh giá</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: 'linear-gradient(90deg, #F68545, #C4C4C4)' // Bạn có thể dùng Expo LinearGradient cho gradient thật
  },
  backButton: {
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 50
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  bookImage: {
    width: 60,
    height: 80,
    resizeMode: 'cover',
    marginRight: 16,
    borderRadius: 4
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  bookAuthor: {
    fontSize: 14,
    color: '#777'
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  star: {
    marginHorizontal: 4
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    height: 180,
    textAlignVertical: 'top',
    backgroundColor: '#f5f5f5',
    marginBottom: 24
  },
  button: {
    backgroundColor: '#188ae8',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  }
})

export default BookFeedBackScreen
