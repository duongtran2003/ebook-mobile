import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient' // dùng expo-linear-gradient
import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const { width, height } = Dimensions.get('window')

const BookReadingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header với gradient */}
      <LinearGradient
        colors={['rgba(245, 130, 32, 0.5)', 'rgba(255, 255, 255, 0.8)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>The Arsonist</Text>
      </LinearGradient>

      {/* Nội dung sách */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.content}>
          Lorem ipsum dolor sit amet, consectetu ryguu adipiscing elit, sed do eiusmodiuiuiuij
          temporuiuiuq incididunt ut labore et dolores magna aliqua. Ut enim ad minim veniam, its
          quis nostrudjj poo exercitation ullamcomoum laboris nisi ut aliquip ex ea commodookolom
          consequat. Duis aute irure dolor inputsoii lwil reprehenderit in voluptate velit esse
          cillumss dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt inputs culpa qui officia deserunt mollit anim idestim laborum. {'\n\n'}
          Lorem ipsum dolor sit amet, consectetu ryguu adipiscing elit, sed do eiusmodiuiuiuij
          temporuiuiuq incididunt ut labore et dolores magna aliqua.
        </Text>
      </ScrollView>

      {/* Thanh tiến độ + nút tiếp */}
      <View style={styles.footer}>
        <Text style={styles.pageNumber}>155/200</Text>
        <TouchableOpacity style={styles.nextBtn}>
          <Text style={styles.nextText}>Tiếp</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BookReadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    height: height * 0.15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  backIcon: {
    position: 'absolute',
    top: 30,
    left: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 50
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 100
  },
  content: {
    textAlign: 'justify',
    fontSize: 14,
    lineHeight: 22
  },
  footer: {
    height: 60,
    position: 'relative',
    justifyContent: 'center'
  },

  pageNumber: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 14,
    color: '#000'
  },

  nextBtn: {
    position: 'absolute',
    right: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#188ae8',
    borderRadius: 16
  },

  nextText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})
