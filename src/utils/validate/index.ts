export const validator = {
  validateEmail: (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      return { isValid: false, message: 'Vui lòng nhập email.' }
    }

    if (!regex.test(email)) {
      return { isValid: false, message: 'Email không hợp lệ.' }
    }

    return { isValid: true, message: '' }
  }
}
