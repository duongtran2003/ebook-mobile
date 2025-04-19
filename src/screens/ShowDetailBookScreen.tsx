import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
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

const ShowDetailBookScreen: React.FC = () => {
  const navigation = useNavigation()
  // Khai báo biến isFavorited và phương thức setIsFavorited để theo dõi trạng thái yêu thích
  const [isFavorited, setIsFavorited] = useState(false)

  // Hàm thay đổi trạng thái khi nhấn vào tim
  const handleFavoritePress = () => {
    setIsFavorited((prev) => !prev)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Book Cover Section with Gradient */}
        <LinearGradient colors={['#F68545', '#C4C4C4']} style={styles.coverContainer}>
          {/* Nút back ở góc trên bên trái */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Ảnh bìa sách */}
          <Image
            source={require('../../assets/book-imgs/the-arsonist.png')}
            style={styles.bookImage}
            resizeMode="contain"
          />
        </LinearGradient>

        {/* Book Title and Author */}
        <Text style={styles.title}>The Arsonist</Text>
        <Text style={styles.author}>Chloe Hooper</Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.previewButton}>
            <Text style={styles.previewButtonText}>Giới thiệu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.readButton}>
            <Text style={styles.readButtonText}>Đọc sách</Text>
          </TouchableOpacity>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingContainer}>
          <View style={styles.ratingLeft}>
            <Icon name="star" size={20} color="#f4b400" />
            <Text style={styles.ratingText}>5.0/5</Text>
            <Text style={styles.reviewCountText}>(170.1k)</Text>
          </View>
          <View style={styles.iconContainer}>
            {/* Toggle the color of the heart icon */}
            <TouchableOpacity onPress={handleFavoritePress}>
              <Icon
                name={isFavorited ? 'favorite' : 'favorite-border'}
                size={20}
                color={isFavorited ? 'red' : '#888'}
              />
            </TouchableOpacity>
            <Icon name="file-download" size={20} color="#888" style={styles.downloadIcon} />
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          "The Arsonist" của Chloe Hooper là câu chuyện ly kỳ về Emma, người điều tra một vụ hỏa
          hoạn có dấu hiệu bị phóng hỏa. Cuộc tìm kiếm sự thật dẫn cô vào những bí mật và mối quan
          hệ phức tạp đầy bất ngờ.
        </Text>

        {/* Book Info and Reviews Button */}
        <View style={styles.infoAndReviewsContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Thông tin sách</Text>
            <Text style={styles.infoText}>Số trang: 156 trang</Text>
            <Text style={styles.infoText}>Ngày xuất bản: 08/04/2024</Text>
            <Text style={styles.infoText}>Nhà xuất bản: NXB Văn Học</Text>
          </View>
          <TouchableOpacity style={styles.reviewsButton}>
            <Text style={styles.reviewsButtonText}>Xem tất cả đánh giá</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 10,
    padding: 10,
    zIndex: 1
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20
  },
  coverContainer: {
    width: '100%',
    height: height * 0.45,
    justifyContent: 'center',
    alignItems: 'center'
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
    marginTop: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 20
  },
  previewButton: {
    backgroundColor: '#e8e8e8',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  previewButtonText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600'
  },
  readButton: {
    backgroundColor: '#188ae8',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  readButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600'
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '90%'
  },
  ratingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  reviewCountText: {
    fontSize: 14,
    color: '#4b5563'
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10
  },
  downloadIcon: {
    marginLeft: 10
  },
  description: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    fontStyle: 'italic',
    lineHeight: 20
  },
  infoAndReviewsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20
  },
  infoContainer: {
    flex: 1
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    opacity: 0.9
  },
  infoText: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
    opacity: 0.9
  },
  reviewsButton: {
    backgroundColor: '#e8e8e8',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start'
  },
  reviewsButtonText: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600'
  },
  socialContainer: {
    position: 'absolute',
    top: height * 0.35,
    right: 20,
    flexDirection: 'row',
    gap: 10
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  socialIconInner: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10
  }
})

export default ShowDetailBookScreen
