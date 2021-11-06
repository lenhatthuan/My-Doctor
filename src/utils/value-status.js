export const statusHA = (diastole, systole) => {
    if (diastole < 80 && systole < 120)
        return "HA tối ưu";
    if (systole < 130 && diastole < 85)
        return "HA bình thường";
    if (systole >= 130 && systole <= 135 && diastole >= 85 && diastole <= 89)
        return "HA BT nhẹ";
    if (systole >= 140 && systole <= 159 && diastole >= 90 && diastole <= 99)
        return "THA độ 1";
    if (systole >= 160 && systole <= 179 && diastole >= 100 && diastole <= 109)
        return "THA độ 2";
    if (systole >= 180 && diastole >= 110)
        return "THA độ 3";
    if (systole >= 140 && diastole < 90)
        return "THA tâm thu đơn độc";
    return "Bất thường";
}