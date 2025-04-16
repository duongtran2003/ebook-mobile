import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const navigation = useNavigation();

  const searchHistory = ['Harry Potter', 'Kinh dị', 'J.K. Rowling', 'Truyện tranh'];

  const authors = ['J.K. Rowling', 'Virginia', 'Charles', 'James'];
  const books = [
    'https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/91HHqVTAJQL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/71UwSHSZRnS.jpg'
  ];
  const genres = ['Kì ảo', 'Hài hước', 'Kinh dị', 'Viễn tưởng', 'Hành động'];
  const trendingBooks = Array(6).fill({
    title: 'This Is How It Always Is',
    uri: 'https://images-na.ssl-images-amazon.com/images/I/71xLmdLOQ0L.jpg',
  });

  const handleNavigateBookDetail = (bookId: string) => {
    navigation.navigate('BookDetail', { bookId });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Overlay Search */}
      {searchFocused && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <View style={styles.searchRow}>
              <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
              <TextInput
                placeholder="Search by Title, Author, Genre"
                style={{ flex: 1 }}
                autoFocus
                onBlur={() => setSearchFocused(false)}
              />
            </View>
            <Text style={{ fontWeight: '600', marginBottom: 8 }}>Lịch sử tìm kiếm</Text>
            {searchHistory.map((item, idx) => (
              <TouchableOpacity key={idx} style={{ paddingVertical: 6 }}>
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Overlay Filter */}
      {filterVisible && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Text style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Bộ lọc</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <TouchableOpacity onPress={() => setFilterVisible(false)} style={{ paddingRight: 8 }}>
                <Ionicons name="arrow-back" size={20} color="#333" />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: '600', color: '#999' }}>thể loại</Text>
            </View>

            {genres.map((genre, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedGenre(genre)}
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
              >
                <Ionicons
                  name={selectedGenre === genre ? 'checkmark-circle' : 'ellipse-outline'}
                  size={20}
                  color="#888"
                  style={{ marginRight: 8 }}
                />
                <Text style={{ fontSize: 16 }}>{genre}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setFilterVisible(false)}
              style={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                backgroundColor: '#000',
                padding: 10,
                borderRadius: 20
              }}
            >
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Main UI */}
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} keyboardShouldPersistTaps="handled">
        <View style={{ padding: 16 }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Tìm kiếm</Text>
          </View>

          {/* SearchBar */}
          <View style={styles.searchBar}>
            <TouchableOpacity
              onPress={() => setSearchFocused(true)}
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
              activeOpacity={1}
            >
              <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
              <Text style={{ color: '#888' }}>Search by Title, Author, Genre</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilterVisible(true)}>
              <Ionicons name="filter-outline" size={20} color="#888" />
            </TouchableOpacity>
          </View>

          {/* Banner */}
          <Image
            source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg' }}
            style={{ width: '100%', height: 120, borderRadius: 8, marginBottom: 16 }}
            resizeMode="cover"
          />

          {/* Suggested Authors */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Đề xuất tác giả</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[...authors, ...authors].map((name, idx) => (
                <View key={idx} style={{ alignItems: 'center', marginRight: 16 }}>
                  <Image source={{ uri: 'https://i.pravatar.cc/60?img=' + ((idx % 10) + 1) }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                  <Text>{name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* New Books */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Sách mới</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[...books, ...books].map((uri, idx) => (
                <TouchableOpacity key={idx} onPress={() => handleNavigateBookDetail(String(idx))}>
                  <Image source={{ uri }} style={{ width: 100, height: 150, borderRadius: 8, marginRight: 16 }} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Reading Trends */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Xu hướng đọc</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
              {[...genres, ...genres].map((genre, idx) => (
                <TouchableOpacity key={idx} style={{ backgroundColor: '#e0e0e0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8 }}>
                  <Text>{genre}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {trendingBooks.map((book, idx) => (
                <TouchableOpacity key={idx} onPress={() => handleNavigateBookDetail(String(idx))}>
                  <View style={{ marginRight: 16 }}>
                    <Image source={{ uri: book.uri }} style={{ width: 100, height: 150, borderRadius: 8 }} />
                    <Text style={{ width: 100 }}>{book.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    width: width,
    padding: 16,
    zIndex: 10,
    backgroundColor: '#ffffffee'
  },
  overlayContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    paddingBottom: 60
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  }
});
