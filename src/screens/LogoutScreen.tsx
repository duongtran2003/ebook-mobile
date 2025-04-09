import React from 'react';
import { View, Text, Button } from 'react-native';

export default function LogoutScreen({ navigation }: any) {
  const handleLogout = () => {
    // Xử lý đăng xuất tại đây
    alert('Đã đăng xuất!');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🚪 Đăng xuất</Text>
      <Button title="Xác nhận đăng xuất" onPress={handleLogout} />
    </View>
  );
}
