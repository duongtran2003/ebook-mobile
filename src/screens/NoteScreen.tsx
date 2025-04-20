import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const notes = new Array(5).fill(
  'Figma cho phép bạn tạo các prototypes (mẫu tương tác) để mô phỏng cách giao diện của bạn sẽ hoạt động khi sử dụng'
)

export default function NoteApp() {
  const notes = [
    'Figma cho phép bạn tạo các prototypes (mẫu tương tác) để mô phỏng cách giao diện của bạn sẽ hoạt động khi sử dụng',
    'Figma cho phép bạn tạo các prototypes (mẫu tương tác) để mô phỏng cách giao diện của bạn sẽ hoạt động khi sử dụng',
    'Figma cho phép bạn tạo các prototypes (mẫu tương tác) để mô phỏng cách giao diện của bạn sẽ hoạt động khi sử dụng',
    'Figma cho phép bạn tạo các prototypes (mẫu tương tác) để mô phỏng cách giao diện của bạn sẽ hoạt động khi sử dụng',
    'Figma cho phép bạn tạo các prototypes (mẫu tương tác) để mô phỏng cách giao diện của bạn sẽ hoạt động khi sử dụng'
  ]

  const [starredNotes, setStarredNotes] = useState(Array(notes.length).fill(false))
  const [checkedNotes, setCheckedNotes] = useState(Array(notes.length).fill(false))

  const toggleStar = (index) => {
    const updated = [...starredNotes]
    updated[index] = !updated[index]
    setStarredNotes(updated)
  }

  const toggleCheck = (index) => {
    const updated = [...checkedNotes]
    updated[index] = !updated[index]
    setCheckedNotes(updated)
  }

  return (
    <LinearGradient colors={['#85b9fd', '#ffffff']} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Ghi chú của Tôi</Text>
        <Text style={styles.subtitle}>Thứ 4, 5 tháng 3</Text>

        <ScrollView contentContainerStyle={styles.noteList}>
          {notes.map((text, index) => (
            <View key={index} style={styles.noteBox}>
              <TouchableOpacity onPress={() => toggleCheck(index)} style={styles.noteCircle}>
                {checkedNotes[index] && <Feather name="check" size={14} color="white" />}
              </TouchableOpacity>

              <Text style={styles.noteText}>{text}</Text>

              <TouchableOpacity style={styles.starIcon} onPress={() => toggleStar(index)}>
                <Feather name="star" size={20} color={starredNotes[index] ? '#FFD700' : 'white'} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333'
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20
  },
  noteList: {
    paddingBottom: 50
  },
  noteBox: {
    backgroundColor: '#4e4c4c',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  noteCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#a8a4a4',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noteText: {
    flex: 1,
    color: 'white',
    fontSize: 13
  },
  starIcon: {
    marginLeft: 10
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007bff',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
