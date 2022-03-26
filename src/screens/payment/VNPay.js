import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  NativeEventEmitter,
} from 'react-native';
import VnpayMerchant, {
  VnpayMerchantModule,
} from '../../../react-native-vnpay-merchant';
const eventEmitter = new NativeEventEmitter(VnpayMerchantModule);

const VNPay = () => {
  const [text, setText] = useState('OpenSDK');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 24,
            paddingVertical: 10,
            backgroundColor: "blue",
            borderRadius: 10,
          }}
          onPress={() => {
            // mở sdk
            eventEmitter.addListener('PaymentBack', e => {
              console.log('Sdk back!');
              if (e) {
                console.log('e.resultCode = ' + e.resultCode);
                switch (
                  e.resultCode
                  //resultCode == -1
                  //vi: Người dùng nhấn back từ sdk để quay lại
                  //en: back from sdk (user press back in button title or button back in hardware android)

                  //resultCode == 10
                  //vi: Người dùng nhấn chọn thanh toán qua VNPay thanh toán (Mobile Banking, Ví...) lúc này VNPay tích hợp sẽ cần lưu lại cái PNR, khi nào người dùng mở lại VNPay tích hợp thì sẽ gọi kiểm tra trạng thái thanh toán của PNR Đó xem đã thanh toán hay chưa.
                  //en: user select VNPay to payment (Mobile banking, wallet ...) you need save your PNR code. because we don't know when VNPay banking payment successfully. so when user re-open your VNPay. you need call api check your PNR code (is paid or unpaid). PNR: it's vnp_TxnRef. Reference code of transaction at Merchant system

                  //resultCode == 99
                  //vi: Người dùng nhấn back từ trang thanh toán thành công khi thanh toán qua thẻ khi gọi đến http://sdk.merchantbackVNPay
                  //en: back from button (button: done, ) in the webview when payment success. (incase payment with card, atm card, visa ...)

                  //resultCode == 98
                  //vi: giao dịch thanh toán bị failed
                  //en: payment failed

                  //resultCode == 97
                  //vi: thanh toán thành công trên webview
                  //en: payment success
                ) {
                }

                // khi tắt sdk
                eventEmitter.removeAllListeners('PaymentBack');
              }
            });

            // VnpayMerchant.show({
            //   iconBackName: 'ic_back',
            //   paymentUrl: 'https://sandbox.vnpayment.vn/testsdk',
            //   scheme: 'sampleVNPay',
            //   tmn_code: 'FAHASA03',
            // })
            VnpayMerchant.show({
              iconBackName: 'ic_back',
              paymentUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=15000000&vnp_Command=pay&vnp_CreateDate=20210225130220&vnp_CurrCode=VND&vnp_Locale=vn&vnp_OrderInfo=TEST%20BAEMIN%20ORDER&vnp_TmnCode=BAEMIN01&vnp_TxnRef=130220&vnp_Version=2.0.0&vnp_SecureHashType=SHA256&vnp_SecureHash=c7d9dedc25b304c961bd9a5c6ae21cb604700193ecb6b67ed871c1d084a462f4',
              scheme: 'swing',
              tmn_code: 'BAEMIN01',
              title: 'payment'
            })
            // VnpayMerchant.show({
            //   iconBackName: 'ic_back',
            //   // paymentUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=15000000&vnp_BankCode=MBVNPay&vnp_Command=pay&vnp_CreateDate=20210225130220&vnp_CurrCode=VND&vnp_Locale=vn&vnp_OrderInfo=TEST%20BAEMIN%20ORDER&vnp_TmnCode=BAEMIN01&vnp_TxnRef=130220&vnp_Version=2.0.0&vnp_SecureHashType=SHA256&vnp_SecureHash=129664d02f0852765c8ade75b3fcca644bd0bfb26ceeb64b576e672c17f2cba1',
            //   paymentUrl: 'https://sandbox.vnpayment.vn/testsdk/',
            //   scheme: 'swing',
            //   tmn_code: 'BAEMIN01',
            //   title: 'tittlelelelel',
            //   beginColor: '#ffffff',
            //   endColor: '#ffffff', //6 ký tự.
            //   titleColor: '#000000'
            // })

            // VnpayMerchant.show({
            //   isSandbox: true,
            //   paymentUrl: 'https://sandbox.vnpayment.vn/testsdk',
            //   tmn_code: 'FAHASA03',
            //   backAlert: 'Bạn có chắc chắn trở lại ko?',
            //   title: 'VNPAY',
            //   iconBackName: 'ic_close',
            //   beginColor: 'ffffff',
            //   endColor: 'ffffff',
            //   titleColor: '000000',
            //   scheme: 'swing'
            // });

            // VnpayMerchant.show({
            //   isSandbox: true,
            //   scheme: 'vn.abahaglobal',
            //   title: 'Thanh toán VNPAY',
            //   titleColor: '#333333',
            //   beginColor: '#ffffff',
            //   endColor: '#ffffff',
            //   // iconBackName: 'close',
            //   tmn_code: 'GOGREEN1',
            //   paymentUrl:
            //     'http://testproduct2851.abaha.click/payment/order/916?token=eyJhcHBfa2V5IjoicGF5bWVudHNlcnZpY2VrZXkiLCJkZWxpdmVyeV91bml0Ijoidm5wYXkiLCJ0eG5faWQiOiI5MTYifQ==',
            // });

            setText('Sdk opened');
          }}>
          <Text style={{color: "white"}}>{text}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default VNPay;
