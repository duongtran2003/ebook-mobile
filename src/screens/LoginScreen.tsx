import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'
import { API_URL } from 'src/environment'
import { colors, font } from 'src/styles'
import { validator } from 'src/utils/validate'

interface props {
  onLogin: (st: string) => Promise<void>
}

type TView = 'Login' | 'Register'

const LoginScreen = ({ onLogin }: props) => {
  const [view, setView] = useState<TView>('Login')

  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleViewChange = () => {
    if (view === 'Login') {
      setView('Register')
    } else {
      setView('Login')
    }

    setErrors({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    setCredentials({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: '' }))
    setCredentials((prev) => ({ ...prev, [field]: value }))
  }

  const validateEmail = () => {
    const validateEmailRes = validator.validateEmail(credentials.email)
    if (!validateEmailRes.isValid) {
      setErrors((prev) => ({ ...prev, email: validateEmailRes.message }))
    }
    return validateEmailRes.isValid;
  }

  const validateUsername = () => {
    if (!credentials.username.trim()) {
      setErrors((prev) => ({ ...prev, username: 'Nhập tên đăng nhập' }))
      return false;
    }
    return true;
  }

  const validatePassword = () => {
    const validatePasswordRes = validator.validatePassword(credentials.password)
    if (!validatePasswordRes.isValid) {
      setErrors((prev) => ({ ...prev, password:validatePasswordRes.message}))
      return false;
    }

    if (view === 'Register') {
      if (credentials.confirmPassword !== credentials.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Mật khẩu xác nhận không khớp' }))
        return false;
      }
    }

    return true;
  }

  const onRegister = async () => {
    const isValid = validateEmail() && validatePassword() && validateUsername();
    if (!isValid) {
      console.log('not valid');
      return;
    }

    const res = await fetch(`${API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
        email: credentials.email
      })
    })

    const data = await res.json()
    const isOK = res.ok
    if (!isOK) {
      Toast.show({
        type: 'error',
        text1: data.message
      })
    } else {
      Toast.show({
        type: 'success',
        text1: data.message
      })
      setView('Login')
    }
  }

  const handleLogin = async () => {
    const res = await fetch(`${API_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: credentials.password,
        email: credentials.email
      })
    })

    const data = await res.json();
    const isOK = res.ok
    if (!isOK) {
      Toast.show({
        type: 'error',
        text1: data.message,
      })
    } else {
      Toast.show({
        type: 'success',
        text1: "Đăng nhập thành công"
      })
      onLogin(data.token);
    }
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
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.inputField}
                value={credentials.email}
                onChangeText={(text) => handleInputChange('email', text)}
              />
            </View>
            <Text style={styles.errorMessage}>{errors.email}</Text>

            {view === 'Register' && (
              <View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Tên đăng nhập</Text>
                  <TextInput
                    value={credentials.username}
                    style={styles.inputField}
                    onChangeText={(text) => handleInputChange('username', text)}
                  />
                </View>
                <Text style={styles.errorMessage}>{errors.username}</Text>
              </View>
            )}

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Mật khẩu</Text>
              <TextInput
                secureTextEntry={true}
                value={credentials.password}
                style={styles.inputField}
                onChangeText={(text) => handleInputChange('password', text)}
              />
            </View>
            <Text style={styles.errorMessage}>{errors.password}</Text>

            {view === 'Register' && (
              <View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Xác nhận mật khẩu</Text>
                  <TextInput
                    style={styles.inputField}
                    value={credentials.confirmPassword}
                    onChangeText={(text) => handleInputChange('confirmPassword', text)}
                    secureTextEntry
                  />
                </View>
                <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
              </View>
            )}
          </View>
          {view === 'Login' ? (
            <View>
              <TouchableOpacity style={styles.actionButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleViewChange}>
                <Text style={styles.buttonText}>Tạo tài khoản</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity style={styles.actionButton} onPress={onRegister}>
                <Text style={styles.buttonText}>Tạo tài khoản</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleViewChange}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* <View style={styles.socialContainer}> */}
          {/*   <TouchableOpacity style={styles.facebookButton} onPress={onLogin}> */}
          {/*     <Text style={styles.buttonText}>Facebook</Text> */}
          {/*   </TouchableOpacity> */}
          {/*   <TouchableOpacity style={styles.googleButton} onPress={onLogin}> */}
          {/*     <Text style={styles.buttonText}>Google</Text> */}
          {/*   </TouchableOpacity> */}
          {/* </View> */}
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
    marginBottom: 16
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
    fontSize: font.size.extraSmall,
    color: colors.orange03
  },

  inputField: {
    padding: 0,
    fontSize: font.size.small
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
  },

  errorMessage: {
    color: colors.orange02,
    fontSize: font.size.extraSmall,
    marginTop: -8
  }
})
