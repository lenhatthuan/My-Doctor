
# Đề tài tiểu luận chuyên ngành Công nghệ phần mềm (2021-2022)
# Xây dựng app đặt lịch khám bệnh và theo dõi sức khỏe
#### Sinh viên thực hiện (đại trà)
###### Lê Nhật Thu An - 18110245
###### Lê Thị Ngọc Yến - 18110402

### Cài đặt và sử dụng
#### App
###### Cài đặt môi trường
  * Node.js
Link download: https://nodejs.org/en/download/
  * Expo CLI
Dùng câu lệnh: 
```sh
npm install -g expo-cli
```

######  Project
Link github: https://github.com/lenhatthuan/My-Doctor
######  Cách run app
- Sau khi clone project từ github, thực hiện câu lệnh
```sh
npm install
``` 
- Sau đó run bằng câu lệnh 

```sh
npm start
```
- Xuất hiện mã QR của expo trên terminal, dùng máy ảo hoặc điện thoại để quét mã QR đó.
##### Web
Đã cài đặt môi trường node.js từ mục của app
Các bước thực hiện: 
- Clone project từ github: https://github.com/yenlee38/my-doctor-web
- Sau khi clone project từ github, thực hiện câu lệnh 
```sh
npm install
```
- Sau đó run bằng câu lệnh 
```sh
npm start
```
#### Cách Deploy cho app
- Hệ điều hành Android: Thực hiện câu lệnh ```expo build:android```và chọn loại build là ```apk```
- Hệ điều hành iOS: Thực hiện câu lệnh ```expo build:ios``` và chọn loại build là ```simular```
