import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width, height } = Dimensions.get('window')

const PreviewScreen: React.FC = () => {
  const navigation = useNavigation()

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Gradient & Image */}
        <LinearGradient colors={['#F68545', '#C4C4C4']} style={styles.coverContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 18, marginLeft: 10 }}>Giới thiệu</Text>
          </TouchableOpacity>
          <Image
            source={require('../../assets/book-imgs/the-arsonist.png')}
            style={styles.bookImage}
            resizeMode="contain"
          />
        </LinearGradient>

        {/* Tiêu đề và tác giả */}
        <Text style={styles.title}>The Arsonist</Text>
        <Text style={styles.author}>Chloe Hooper</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Mô tả sách */}
        <Text style={styles.description}>
          "The Arsonist" của Chloe Hopper là một cuốn tiểu thuyết đầy kịch tính và bí ẩn, xoay quanh
          một người phụ nữ tên là Emma, người đang tìm kiếm sự thật về một vụ hỏa hoạn mà cô tin là
          do ai đó cố tình gây ra. Cuộc hành trình của Emma dần hé lộ những bí mật đen tối và những
          mối quan hệ phức tạp trong quá khứ, dẫn cô đến những sự thật khủng khiếp mà cô không thể
          ngờ tới. Tác phẩm khám phá những chủ đề về tội ác, sự phản bội, và những lựa chọn khó khăn
          mà con người phải đối mặt khi đứng trước sự thật. Với lối viết căng thẳng và những tình
          tiết đầy bất ngờ, "The Arsonist" hứa hẹn sẽ cuốn hút người đọc từ đầu đến cuối.
        </Text>

        {/* Nút Đọc sách */}
        <TouchableOpacity
          style={styles.readButton}
          onPress={() => navigation.navigate('BookReading')}
        >
          <Text style={styles.readButtonText}>Đọc sách</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 40
  },
  coverContainer: {
    width: '100%',
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 6,
    padding: 10,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  bookImage: {
    width: width * 0.5,
    height: '80%',
    borderRadius: 8,
    marginTop: 30
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginTop: 20
  },
  author: {
    fontSize: 16,
    color: '#4b5563',
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 10
  },
  divider: {
    height: 2,
    width: 50,
    backgroundColor: '#000',
    marginVertical: 20
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
    color: '#374151',
    marginHorizontal: 25,
    textAlign: 'justify'
  },
  readButton: {
    backgroundColor: '#188ae8',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  readButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default PreviewScreen
