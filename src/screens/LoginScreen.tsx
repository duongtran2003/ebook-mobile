import { StackNavigationProp } from '@react-navigation/stack'
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RootStackParamList } from 'src/navigation/types'
import { colors, font } from 'src/styles'

type LoginViewNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>

interface props {
  onLogin: () => void
}

const LoginScreen = ({ onLogin }: props) => {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}> Đăng nhập </Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Tên đăng nhập</Text>
          <TextInput style={styles.inputField} />
        </View>

        <Button title="Login" onPress={onLogin} />
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray01,
    justifyContent: 'center',
    alignItems: 'center'
  },

  formContainer: {
    backgroundColor: colors.white,
    height: '65%',
    width: '60%',
    paddingVertical: 56,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },

  formTitle: {
    fontSize: font.size.large,
    fontWeight: 700,
    color: colors.orange02,
    textAlign: 'center'
  },

  inputWrapper: {
    backgroundColor: colors.gray02,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingTop: 2,
    paddingHorizontal: 8
  },

  inputLabel: {
    fontSize: font.size.small,
    color: colors.orange03
  },

  inputField: {
    backgroundColor: colors.white,
    padding: 0,
    fontSize: font.size.normal
  }
})
