import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors, font } from 'src/styles'

interface props {
  onLogin: () => void
}

type TView = 'Login' | 'Register'

const LoginScreen = ({ onLogin }: props) => {
  const [view, setView] = useState<TView>('Login')

  const onRegister = () => {
    alert('register')
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          {view === 'Login' ? (
            <Text style={styles.formTitle}> Đăng nhập </Text>
          ) : (
            <Text style={styles.formTitle}> Đăng kí </Text>
          )}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Tên đăng nhập</Text>
              <TextInput style={styles.inputField} />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Mật khẩu</Text>
              <TextInput secureTextEntry={true} style={styles.inputField} />
            </View>

            {view === 'Register' && (
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}> Xác nhận mật khẩu</Text>
                <TextInput style={styles.inputField} />
              </View>
            )}
          </View>
          {view === 'Login' ? (
            <View>
              <TouchableOpacity style={styles.actionButton} onPress={onLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={() => setView('Register')}>
                <Text style={styles.buttonText}>Tạo tài khoản</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity style={styles.actionButton} onPress={onRegister}>
                <Text style={styles.buttonText}>Tạo tài khoản</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={() => setView('Login')}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.facebookButton} onPress={onLogin}>
              <Text style={styles.buttonText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton} onPress={onLogin}>
              <Text style={styles.buttonText}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
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
    width: '65%',
    paddingVertical: 36,
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
    textAlign: 'center',
    marginBottom: 32
  },

  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 18
  },

  inputWrapper: {
    backgroundColor: colors.gray02,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingTop: 2,
    paddingHorizontal: 8,
    borderBottomWidth: 3,
    borderBottomColor: colors.orange03,
    marginBottom: 8
  },

  inputLabel: {
    fontSize: font.size.small,
    color: colors.orange03
  },

  inputField: {
    padding: 0,
    fontSize: font.size.normal
  },

  actionButton: {
    backgroundColor: colors.orange02,
    paddingVertical: 8,
    borderRadius: 2,
    alignItems: 'center',
    marginBottom: 4
  },

  googleButton: {
    backgroundColor: colors.green01,
    paddingVertical: 8,
    width: '49%',
    borderRadius: 2,
    alignItems: 'center',
    marginBottom: 4
  },

  facebookButton: {
    backgroundColor: colors.blue01,
    paddingVertical: 8,
    width: '49%',
    borderRadius: 2,
    alignItems: 'center',
    marginBottom: 4
  },

  buttonText: {
    color: colors.white,
    fontSize: font.size.small,
    fontWeight: '600'
  },

  socialContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
