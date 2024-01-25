import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Animated, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking } from 'react-native';
import { fonts, windowWidth, colors, windowHeight, MyDimensi } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';

export default function Login({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    email: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});

  const card = new Animated.Value(-30);
  const img = new Animated.Value(-20);




  const masuk = () => {


    if (kirim.email == null && kirim.password == null) {
      Alert.alert(MYAPP, 'email dan Password tidak boleh kosong !');
    } else if (kirim.email == null) {
      Alert.alert(MYAPP, 'email tidak boleh kosong !');
    } else if (kirim.password == null) {
      Alert.alert(MYAPP, 'Password tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('MainApp')
          }
        });



    }




  }

  useEffect(() => {
    Animated.timing(card, {
      toValue: 1,
      duration: 850,
      useNativeDriver: false,
    }).start();
    Animated.timing(img, {
      toValue: 0,
      duration: 850,
      useNativeDriver: false,
    }).start();
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })

  }, []);

  return (

    <ScrollView style={{ flex: 1, backgroundColor: colors.tertiary, position: 'relative' }}>




      <View style={{
        justifyContent: 'center',
        alignItems: 'center',

      }}>
        <Animated.Image source={require('../../assets/icon.png')} style={{
          marginTop: 10,
          width: windowWidth / 1.9,
          height: windowWidth / 1.9,
          resizeMode: 'contain'
        }} />

      </View>


      <Animated.View style={{
        padding: 20,
        flex: 1, margin: 10,
        bottom: card,
        borderRadius: 10,
      }}>
        <Text style={{
          fontSize: MyDimensi / 2,
          fontFamily: fonts.primary[800],
          color: colors.primary,
        }}>Selamat Datang</Text>
        <Text style={{
          fontSize: MyDimensi / 4,
          fontFamily: fonts.primary[400],
          color: colors.primary,
          marginBottom: 10,
        }}>Silahkan login terlebih dahulu</Text>


        {/* USERNAME INPUT */}

        <MyInput label="Email" onChangeText={x => {
          setKirim({
            ...kirim,
            email: x
          })
        }} iconname="mail" placeholder="Masukan email" />


        <MyGap jarak={20} />
        {/* PASSWORD INPUT */}


        <MyInput label="Password" onChangeText={x => {
          setKirim({
            ...kirim,
            password: x
          })
        }} iconname="key" placeholder="Masukan password" secureTextEntry={true} />


        {/* BUTTON LOGIN */}
        <TouchableOpacity onPress={() => {
          let urlWA = 'https://wa.me/' + comp.tlp + `?text=Hallo admin saya lupa password . . .`;
          Linking.openURL(urlWA)
        }} style={{
          marginTop: 0,
        }}>
          <Text style={{
            textAlign: 'right',
            fontFamily: fonts.secondary[600],
            color: colors.tertiary,
            fontSize: MyDimensi / 4
          }}>Lupa password ?</Text>
        </TouchableOpacity>
        <MyGap jarak={0} />
        {!loading &&




          <MyButton
            onPress={masuk}
            title="Login"


            Icons="log-in-outline"
          />


        }

        {!loading && <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
          <View style={{
            marginTop: 10,
            backgroundColor: colors.tertiary,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: MyDimensi / 4,
              fontFamily: fonts.primary[400],
              textAlign: 'center',
              color: colors.primary
            }}>Belum memiliki Akun ? <Text style={{
              fontSize: MyDimensi / 4,
              fontFamily: fonts.primary[600],
              textAlign: 'center',
              color: colors.foourty
            }}>Daftar disini</Text></Text>
          </View>
        </TouchableWithoutFeedback>}

      </Animated.View>


      {loading && <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator color={colors.secondary} size="large" />
      </View>}
    </ScrollView>




  );
}

const styles = StyleSheet.create({});
