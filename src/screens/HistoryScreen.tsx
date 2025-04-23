import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from 'src/environment';
import { getAccessToken } from 'src/utils/storage';
const ITEMS_PER_PAGE = 5;

const HistoryScreen = () => {
  const [selectedTab, setSelectedTab] = useState<'reading' | 'finished'>('finished');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Hàm gọi API để lấy danh sách sách
  const fetchBooksData = async (tab: 'reading' | 'finished') => {
    console.log("Đã vào được hàm fetchBooksData");

    setLoading(true);
    const token = await getAccessToken();
    try {
      const response = await fetch(`${API_URL}/api/users/history?status=${tab}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Gửi token trong header
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.error('Lỗi khi lấy dữ liệu lịch sử:', response.statusText);  // In thông báo lỗi
        throw new Error('Lỗi khi lấy dữ liệu lịch sử');
      }
  
      const json = await response.json();
      console.log('Dữ liệu nhận được từ API:', json); // Kiểm tra dữ liệu nhận được từ API
      
      // Kiểm tra nếu dữ liệu hợp lệ
      if (json.history && Array.isArray(json.history)) {
        setTotalPages(Math.ceil(json.history.length / ITEMS_PER_PAGE));
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        setData(json.history.slice(start, start + ITEMS_PER_PAGE));
      } else {
        console.error('Dữ liệu không hợp lệ:', json);
      }
    } catch (error) {
      console.error('Error fetching books data:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchBooksData(selectedTab);
  }, [selectedTab, currentPage]);

  const handleTabChange = (tab: 'finished' | 'reading') => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    const pages = [];
    if (currentPage > 1) {
      pages.push(
        <TouchableOpacity key="prev" onPress={() => handlePageChange(currentPage - 1)}>
          <Text style={styles.footerText}>{'<'}</Text>
        </TouchableOpacity>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <TouchableOpacity key={i} onPress={() => handlePageChange(i)}>
          <Text style={[styles.footerText, i === currentPage && styles.currentPage]}>{i}</Text>
        </TouchableOpacity>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <TouchableOpacity key="next" onPress={() => handlePageChange(currentPage + 1)}>
          <Text style={styles.footerText}>{'>'}</Text>
        </TouchableOpacity>
      );
    }

    return pages;
  };

  const navigation = useNavigation();
  
  const handleNavigateHome = () => {
    navigation.navigate('Trang chủ'); // Đảm bảo "Home" đúng tên route của màn hình chính
  };

  // const renderItem = ({ item }: { item: any }) => (
  //   <View style={styles.itemContainer}>
  //     <Image source={{ uri: item.bookId.coverImage }} style={styles.image} />
  //     <View style={styles.itemDetails}>
  //       <Text style={styles.title}>{item.bookId.title}</Text>
  //       <Text style={styles.author}>Tác giả: {item.bookId.author}</Text>
  //       <Text style={styles.rating}>Đánh giá: {item.bookId.rating}</Text>
  //       <Text style={styles.price}>Số chương: {item.bookId.totalChapters}</Text>
  //       {selectedTab === 'reading' && (
  //         <Text style={styles.chapter}>Chương hiện tại: {item.chapterId.chapterNumber}</Text>
  //       )}
  //     </View>
  //   </View>
  // );

  const renderItem = ({ item }: { item: any }) => {
    const book = item?.bookId;
    const chapter = item?.chapterId;
  
    // Nếu không có thông tin sách thì bỏ qua không hiển thị
    if (!book) return null;
  
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: book.coverImage }} style={styles.image}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.title}>{book.title || 'Không có tiêu đề'}</Text>
          <Text style={styles.author}>Tác giả: {book.author.name || 'Không rõ'}</Text>
          <Text style={styles.rating}>Đánh giá: {book.rating ?? 'Chưa có'}</Text>
          <Text style={styles.price}>Số chương: {book.totalChapters ?? 0}</Text>
          {selectedTab === 'reading' && chapter && (
            <Text style={styles.chapter}>Chương hiện tại: {chapter.chapterNumber}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.breadcrumb}>
        <TouchableOpacity onPress={() => navigation.navigate('Trang chủ')}>
          <Text style={styles.breadcrumbLink}>Trang chủ</Text>
        </TouchableOpacity>
        <Text style={styles.breadcrumbArrow}> → </Text>
        <TouchableOpacity disabled>
          <Text style={styles.breadcrumbCurrent}>Lịch sử</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => handleTabChange('finished')}
          style={styles.tabButton}>
          <Text style={selectedTab === 'finished' ? styles.activeTab : styles.inactiveTab}>Đã đọc</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleTabChange('reading')}
          style={styles.tabButton}>
          <Text style={selectedTab === 'reading' ? styles.activeTab : styles.inactiveTab}>Đang đọc</Text>
        </TouchableOpacity>
      </View>

      {/* {loading ? (
        <Text>Đang tải dữ liệu...</Text>
      ) : ( */}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.bookId._id.toString()}
          style={styles.flatList}
        />
      {/* )} */}

      <View style={styles.footer}>
          {renderPagination()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    marginTop:10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 18,
    color: '#007bff',
  },
  breadcrumb: {
    fontSize:15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  breadcrumbLink: {
    fontSize:15,
    color: '#333',
    fontWeight: '500',
    marginLeft:10,
  },
  breadcrumbArrow: {
    fontSize:15,
    marginHorizontal: 5,
    color: '#888',
  },
  breadcrumbCurrent: {
    fontSize:15,
    color: '#007bff',
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
  tabButton: {
    padding: 10,
  },
  activeTab: {
    fontSize: 18,
    color: '#007bff',
    fontWeight: 'bold',
  },
  inactiveTab: {
    fontSize: 18,
    color: '#888',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginHorizontal: 10,
    width: 'auto',
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  itemDetails: {
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: '#f39c12',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  chapter: {
    fontSize: 14,
    color: '#666',
  },

  flatList: {
    paddingHorizontal: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  footerText: {
    fontSize: 18,
    color: '#007bff',
    marginHorizontal: 10,
  },
});
export default HistoryScreen;
