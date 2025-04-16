import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BookReadingScreen = () => {
  const currentPage = 155;
  const totalPages = 200;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đọc sách</Text>

        {/* Placeholder để căn giữa tiêu đề */}
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.contentContainer}>
        {/* Book Title */}
        <Text style={styles.bookTitle}>The Arsonist</Text>

        {/* Book Content */}
        <ScrollView style={styles.scrollArea}>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur rygu adipiscing elit, sed do eiusmodiuiuij temporuiuiq
            incididunt ut labore et dolores magna aliqua. Ut enim ad minim veniam, its quis nostrudjj poo
            exercitation ullamcomoum laboris nisi ut aliquip ex ea commodookolom consequat. Duis aute irure
            dolor inputs oili reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt inputs culpa qui officia deserunt mollit
            anim idestim laborum.
          </Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consecteturu rygu adipiscing elit, sed do eiusmodiuiuij temporuiuiq
            incididunt ut labore et dolores magna aliqua. Ut enim ad minim veniam, its quis nostrudjj poo
            exercitation ullamcomoum laboris nisi ut aliquip ex ea commodookolom consequat.
          </Text>
        </ScrollView>

        {/* Pagination + Next */}
        <View style={styles.bottomContainer}>
          <Text style={styles.pageCount}>{`${currentPage}/${totalPages}`}</Text>
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Tiếp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BookReadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  header: {
    height: 60,
    backgroundColor: '#f79433',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  scrollArea: {
    flex: 1,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
    textAlign: 'justify',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageCount: {
    color: '#888',
  },
  nextButton: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
