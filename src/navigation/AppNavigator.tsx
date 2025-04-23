import React, { useEffect, useRef, useState } from 'react';
import {
  NavigationContainer
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
import RankingView from 'src/screens/RankingView';
import HomeNavigator from './HomeNavigator';
import { getAccessToken } from 'src/utils/storage';
import { API_URL } from 'src/environment';

const Drawer = createDrawerNavigator();

interface Props {
  onLogout: () => void;
}

export default function AppNavigator({ onLogout }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('...');
  const navigationRef = useRef(null);

  // Gọi API lấy thông tin người dùng
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getAccessToken();
        if (!token) return;

        const response = await fetch(`${API_URL}/api/users/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUsername(data.username || 'Người dùng'); // fallback nếu API không có name
        } else {
          console.error('Không thể lấy thông tin người dùng');
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // Header hiển thị tên và avatar
  const HeaderRight = () => (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.username}>{username}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={require('../../assets/anh1.jpg')}
          style={styles.avatar}
        />
      </TouchableOpacity>

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
                onLogout();
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
        <Drawer.Screen name="Hồ sơ" component={HistoryScreen} />
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
