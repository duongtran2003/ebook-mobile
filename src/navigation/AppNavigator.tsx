import React, { useState } from 'react';
import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';

import HomeScreen from 'src/screens/HomeScreen';
import HistoryScreen from 'src/screens/HistoryScreen';
import LogoutScreen from 'src/screens/LogoutScreen';
import RankingView from 'src/screens/RankingView';
import HomeNavigator from './HomeNavigator';
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigationRef = React.useRef();

  // Header Right with Avatar + Modal
  const HeaderRight = () => (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.username}>Long</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={require('../../assets/anh1.jpg')}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Modal menu hiển thị khi click ảnh */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigationRef.current?.navigate('Logout');
              }}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator
        initialRouteName="Trang chủ"
        screenOptions={{
          headerTitle: '',
          headerRight: () => <HeaderRight />,
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      >
        <Drawer.Screen name="Trang chủ" component={HomeNavigator} />
        <Drawer.Screen name="Bảng xếp hạng" component={RankingView} />
        <Drawer.Screen name="Lịch sử" component={HistoryScreen} />
        <Drawer.Screen name="Logout" component={LogoutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  logoutButton: {
    paddingVertical: 10,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});

