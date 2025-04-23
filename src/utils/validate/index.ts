export const validator = {
  validateEmail: (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      return { isValid: false, message: 'Vui lòng nhập email.' }
    }

    if (!regex.test(email)) {
      return { isValid: false, message: 'Email không hợp lệ.' }
    }

    // Kiểm tra xem email có đuôi @gmail.com không
    if (!email.endsWith('@gmail.com')) {
      return { isValid: false, message: 'Email phải có đuôi @gmail.com.' };
    }

    return { isValid: true, message: '' };
  },

  validatePassword: (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!password) {
      return { isValid: false, message: 'Vui lòng nhập mật khẩu.' };
    }

    if (!regex.test(password)) {
      return { isValid: false, message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái,số và ít nhất có 1 chữ cái in hoa.' };
    }

    return { isValid: true, message: '' };
  },
};
