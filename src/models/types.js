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

const EMOTION = {
  GREAT: "tuyệt vời",
  HAPPY: "rất vui",
  NORMAL: "tạm ổn",
  SAD: "buồn",
  ANGRY: "giận dữ",
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

module.exports = {
  ROLES,
  GENDER,
  DEPARTMENT,
  NUMBER_STATE,
  EMOTION,
  ONLINE_BILL_STATUS,
  MEDICAL_BILL_STATUS,
  SESSION,
};
