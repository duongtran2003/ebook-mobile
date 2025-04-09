import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Dữ liệu cho "Top tháng" (20 cuốn sách)
const booksDataRead = [
    { id: '1', title: 'Harry Potter', author: 'J.K. Rowling', image: require('../../assets/anh1.jpg'), rating: 5.0, price: '120K' },
    { id: '2', title: 'The Arsonist', author: 'Chloe Hooper', image: require('../../assets/anh1.jpg'), rating: 4.4, price: '120K' },
    { id: '3', title: '1984', author: 'George Orwell', image: require('../../assets/anh1.jpg'), rating: 4.8, price: '130K' },
    { id: '4', title: 'The Catcher in the Rye', author: 'J.D. Salinger', image: require('../../assets/anh1.jpg'), rating: 4.2, price: '110K' },
    { id: '5', title: 'To Kill a Mockingbird', author: 'Harper Lee', image: require('../../assets/anh1.jpg'), rating: 4.9, price: '140K' },
    { id: '6', title: 'Pride and Prejudice', author: 'Jane Austen', image: require('../../assets/anh1.jpg'), rating: 4.7, price: '130K' },
    { id: '7', title: 'Moby Dick', author: 'Herman Melville', image: require('../../assets/anh1.jpg'), rating: 4.1, price: '115K' },
    { id: '8', title: 'War and Peace', author: 'Leo Tolstoy', image: require('../../assets/anh1.jpg'), rating: 4.5, price: '135K' },
    { id: '9', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', image: require('../../assets/anh1.jpg'), rating: 4.6, price: '125K' },
    { id: '10', title: 'Brave New World', author: 'Aldous Huxley', image: require('../../assets/anh1.jpg'), rating: 4.7, price: '130K' },
    { id: '11', title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', image: require('../../assets/anh1.jpg'), rating: 4.4, price: '120K' },
    { id: '12', title: 'Wuthering Heights', author: 'Emily Brontë', image: require('../../assets/anh1.jpg'), rating: 4.5, price: '125K' },
    { id: '13', title: 'The Odyssey', author: 'Homer', image: require('../../assets/anh1.jpg'), rating: 4.8, price: '140K' },
    { id: '14', title: 'Jane Eyre', author: 'Charlotte Brontë', image: require('../../assets/anh1.jpg'), rating: 4.7, price: '135K' },
    { id: '15', title: 'Animal Farm', author: 'George Orwell', image: require('../../assets/anh1.jpg'), rating: 4.6, price: '130K' },
    { id: '16', title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', image: require('../../assets/anh1.jpg'), rating: 4.9, price: '150K' },
    { id: '17', title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', image: require('../../assets/anh1.jpg'), rating: 5.0, price: '160K' },
    { id: '18', title: 'Frankenstein', author: 'Mary Shelley', image: require('../../assets/anh1.jpg'), rating: 4.3, price: '110K' },
    { id: '19', title: 'Dracula', author: 'Bram Stoker', image: require('../../assets/anh1.jpg'), rating: 4.5, price: '120K' },
    { id: '20', title: 'Catch-22', author: 'Joseph Heller', image: require('../../assets/anh1.jpg'), rating: 4.4, price: '115K' },
  ];
  
  // Dữ liệu cho "Top tuần" (20 cuốn sách)
  const booksDataReading = [
    { id: '1', title: 'The Handmaid\'s Tale', author: 'Margaret Atwood', image: require('../../assets/anh1.jpg'), rating: 4.8, price: '140K', status: 'Reading', currentChapter: 5 },
    { id: '2', title: 'The Hobbit', author: 'J.R.R. Tolkien', image: require('../../assets/anh1.jpg'), rating: 5.0, price: '150K', status: 'Reading', currentChapter: 3 },
    { id: '3', title: 'Les Misérables', author: 'Victor Hugo', image: require('../../assets/anh1.jpg'), rating: 4.6, price: '130K', status: 'Reading', currentChapter: 8 },
    { id: '4', title: 'Don Quixote', author: 'Miguel de Cervantes', image: require('../../assets/anh1.jpg'), rating: 4.7, price: '135K', status: 'Reading', currentChapter: 6 },
    { id: '5', title: 'The Divine Comedy', author: 'Dante Alighieri', image: require('../../assets/anh1.jpg'), rating: 4.8, price: '140K', status: 'Reading', currentChapter: 4 },
    { id: '6', title: 'The Brothers Karamazoves', author: 'Fyodor Dostoevsky', image: require('../../assets/anh1.jpg'), rating: 4.9, price: '150K', status: 'Reading', currentChapter: 2 },
    { id: '7', title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', image: require('../../assets/anh1.jpg'), rating: 5.0, price: '160K', status: 'Reading', currentChapter: 7 },
    { id: '8', title: 'Frankenstein', author: 'Mary Shelley', image: require('../../assets/anh1.jpg'), rating: 4.3, price: '110K', status: 'Reading', currentChapter: 9 },
    { id: '9', title: 'Dracula', author: 'Bram Stoker', image: require('../../assets/anh1.jpg'), rating: 4.5, price: '120K', status: 'Reading', currentChapter: 5 },
    { id: '10', title: 'Catch-22', author: 'Joseph Heller', image: require('../../assets/anh1.jpg'), rating: 4.4, price: '115K', status: 'Reading', currentChapter: 3 },
    { id: '11', title: 'Harry Potter', author: 'J.K. Rowling', image: require('../../assets/anh1.jpg'), rating: 5.0, price: '120K', status: 'Reading', currentChapter: 11 },
    { id: '12', title: 'The Arsonist', author: 'Chloe Hooper', image: require('../../assets/anh1.jpg'), rating: 4.4, price: '120K', status: 'Reading', currentChapter: 6 },
    { id: '13', title: '1984', author: 'George Orwell', image: require('../../assets/anh1.jpg'), rating: 4.8, price: '130K', status: 'Reading', currentChapter: 4 },
    { id: '14', title: 'The Catcher in the Rye', author: 'J.D. Salinger', image: require('../../assets/anh1.jpg'), rating: 4.2, price: '110K', status: 'Reading', currentChapter: 5 },
    { id: '15', title: 'To Kill a Mockingbird', author: 'Harper Lee', image: require('../../assets/anh1.jpg'), rating: 4.9, price: '140K', status: 'Reading', currentChapter: 7 },
    { id: '16', title: 'Pride and Prejudice', author: 'Jane Austen', image: require('../../assets/anh1.jpg'), rating: 4.7, price: '130K', status: 'Reading', currentChapter: 2 },
    { id: '17', title: 'Moby Dick', author: 'Herman Melville', image: require('../../assets/anh1.jpg'), rating: 4.1, price: '115K', status: 'Reading', currentChapter: 3 },
    { id: '18', title: 'War and Peace', author: 'Leo Tolstoy', image: require('../../assets/anh1.jpg'), rating: 4.5, price: '135K', status: 'Reading', currentChapter: 6 },
    { id: '19', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', image: require('../../assets/anh1.jpg'), rating: 4.6, price: '125K', status: 'Reading', currentChapter: 8 },
    { id: '20', title: 'Brave New World', author: 'Aldous Huxley', image: require('../../assets/anh1.jpg'), rating: 4.7, price: '130K', status: 'Reading', currentChapter: 5 },
  ];
  
  
const ITEMS_PER_PAGE = 5;

const HistoryScreen = () => {
  const [selectedTab, setSelectedTab] = useState('read'); 
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(booksDataRead.slice(0, ITEMS_PER_PAGE)); // Default to "Top tháng" data
  const [totalPages, setTotalPages] = useState(Math.ceil(booksDataRead.length / ITEMS_PER_PAGE));

  // Cập nhật `totalPages` khi dữ liệu (data) thay đổi
  useEffect(() => {
    if (selectedTab === 'read') {
      setTotalPages(Math.ceil(booksDataRead.length / ITEMS_PER_PAGE));
      setData(booksDataRead.slice(0, ITEMS_PER_PAGE));
    } else if (selectedTab === 'reading') {
      setTotalPages(Math.ceil(booksDataReading.length / ITEMS_PER_PAGE));
      setData(booksDataReading.slice(0, ITEMS_PER_PAGE));
    }
  }, [selectedTab]);

  // Hàm để thay đổi tab
  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setCurrentPage(1); // Reset lại trang khi thay đổi tab
  };

  // Hàm phân trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    if (selectedTab === 'read') {
      setData(booksDataRead.slice(startIndex, endIndex));
    } else if (selectedTab === 'reading') {
      setData(booksDataReading.slice(startIndex, endIndex));
    }
  };

  // Hiển thị phân trang
  const renderPagination = () => {
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    const pages = [];
    if (currentPage > 1) {
      pages.push(
        <TouchableOpacity key="previous" onPress={() => handlePageChange(currentPage - 1)}>
          <Text style={styles.footerText}>{'<'}</Text>
        </TouchableOpacity>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <TouchableOpacity key={i} onPress={() => handlePageChange(i)}>
          <Text style={[styles.footerText, currentPage === i ? { fontWeight: 'bold' } : {}]}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <Text key="dots" style={styles.footerText}>
          ...
        </Text>
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


  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={handleNavigateHome}>
        <Image source={item.image} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>Tác giả:{item.author}</Text>
        <Text style={styles.rating}>Đánh giá: {item.rating}</Text>
        <Text style={styles.price}>Lượt xem: {item.price}</Text>
        {item.status === "Reading" && (
        <TouchableOpacity onPress={handleNavigateHome}>
        <Text style={styles.chapter}>Đọc đến: Chương {item.currentChapter}</Text>
      </TouchableOpacity>
      )}
      </View>
    </View>
  );

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
        <TouchableOpacity onPress={() => handleTabChange('read')} style={styles.tabButton}>
          <Text style={selectedTab === 'read' ? styles.activeTab : styles.inactiveTab}>Đã đọc</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange('reading')} style={styles.tabButton}>
          <Text style={selectedTab === 'reading' ? styles.activeTab : styles.inactiveTab}>Đang đọc</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />

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
