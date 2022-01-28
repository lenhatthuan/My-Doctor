const ROLES = {
  DOCTOR: "doctor",
  PATIENT: "patient",
  NURSE: "nurse",
};

const GENDER = {
  MALE: "nam",
  FEMALE: "nữ",
};

const DEPARTMENT = {
  Pediatrics: "Khoa Nhi",
  Otorhinolaryngology: "Khoa Tai-Mũi-Họng",
  Obstetric: "Khoa Sản",
  Ophthalmology: "Khoa Mắt",
  Dental: "Khoa Răng-Hàm-Mặt",
  Cardiology: "Khoa Tim mạch",
  Dermatology: "Khoa Da liễu",
  Laboratory: "Khoa Xét nghiệm",
  Gastroenterology: "Khoa Tiêu hóa",
  Musculoskeletal: "Khoa Cơ-Xương-Khớp",
  Endocrinology: "Khoa Nội tiết",
};

const NUMBER_STATE = {
  USED: "đã khám",
  NOT_USE: "chưa khám",
  EXPIRED: "quá hạn",
  CANCEL: "hủy",
};

//ENUM ('pending', 'confirmed', 'denied', 'cancel', 'transported','completed'),
const ONLINE_BILL_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  DENIED: "denied",
  CANCEL: "cancel",
  TRANSPORTED: "transported",
  COMPLETED: "completed",
};

const MEDICAL_BILL_STATUS = {
  PAID: "đã thanh toán",
  UNPAID: "chưa thanh toán",
};

const SESSION = {
  AM: "Sáng",
  PM: "Chiều",
};

const EMOTION = {
  GREAT: {
    icon: "lol",
    color: "limegreen",
    background: "palegreen",
    text: "Rất vui",
    title: "Hôm nay bạn rất vui phải không?",
    content: "Bạn vui vì điều gì nè...",
    value: 2,
  },
  FUN: {
    icon: "excited",
    color: "gold",
    background: "lightgoldenrodyellow",
    text: "Vui",
    title: "Hôm nay bạn có vui không?",
    content: "Hôm nay tôi...",
    value: 1,
  },
  NORMAL: {
    icon: "neutral",
    color: "darkturquoise",
    background: "paleturquoise",
    text: "Tạm ổn",
    title: "Hôm nay của bạn diễn ra thế nào?",
    content: "Viết vài dòng đi nào...",
    value: 0,
  },
  SAD: {
    icon: "cry",
    color: "gray",
    background: "lightgray",
    text: "Buồn",
    title: "Kể cho mình nghe đi!",
    content: "Hehe, mình sẽ nghe hết mà...",
    value: -1,
  },
  ANDRY: {
    icon: "angry",
    color: "red",
    background: "pink",
    text: "Giận dữ",
    title: "Bình tĩnh, giận là hết đẹp à nha!",
    content: "Viết hết nỗi lòng của bạn vào đây...",
    value: -2,
  },
};

module.exports = {
  ROLES,
  GENDER,
  DEPARTMENT,
  NUMBER_STATE,
  EMOTION,
  ONLINE_BILL_STATUS,
  MEDICAL_BILL_STATUS,
  SESSION,
  EMOTION,
};
