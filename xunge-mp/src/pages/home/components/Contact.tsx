import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./Contact.scss";

const Contact: React.FC = () => {
  return (
    <View className='contact-us'>
      <View className='contact-us-title'>联系我们</View>
      <View className='contact-us-content'>
        <View className='contact-us-content-item'>
          <Image
            mode='aspectFit'
            className='contact-us-content-item-icon'
            src={require("@/assets/images/icon/address.png")}
          />
          <View className='contact-us-content-item-value'>
            深圳市南山区科技园东方科技大厦2532室
          </View>
        </View>
        <View className='contact-us-content-item'>
          <Image
            mode='aspectFit'
            className='contact-us-content-item-icon'
            src={require("@/assets/images/icon/phone.png")}
          />
          <View
            className='contact-us-content-item-value'
            // onTap={() => {
            //   Taro.makePhoneCall({
            //     phoneNumber: "15818597169",
            //   });
            // }}
          >
            李先生：15818597169
          </View>
        </View>
        <View className='contact-us-content-item'>
          <Image
            mode='aspectFit'
            className='contact-us-content-item-icon'
            src={require("@/assets/images/icon/email.png")}
          />
          <View className='contact-us-content-item-value'>
            lixiaolin@xungecloud.com
          </View>
        </View>
      </View>
    </View>
  );
};
export default Contact;
