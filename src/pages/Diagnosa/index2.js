import { FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';

export default function Diagnosa2({ navigation, route }) {

  const [kirim, setKirim] = useState(route.params);

  const backPage = () => {
    navigation.goBack();
  }
  const [gigi, setGigi] = useState([]);

  useEffect(() => {
    axios.post(apiURL + 'gigi').then(res => {
      console.log(res.data);
      setGigi(res.data)
    });
  }, []);

  const [pilih, setPilih] = useState(0)
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* HEADER */}
      <MyHeader judul="Diagnosa" onPress={backPage} />


      {/* MAIN */}
      <View style={{ padding: 10, flex: 1, }}>

        <View>

          <FlatList showsVerticalScrollIndicator={false} data={gigi} renderItem={({ item, index }) => {
            return (
              <TouchableWithoutFeedback onPress={() => {
                setPilih(item.id)
              }}>
                <View style={{
                  backgroundColor: pilih == item.id ? colors.success : colors.white,
                  flexDirection: 'row',
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 8,
                  borderColor: pilih == item.id ? colors.success : colors.border,
                  marginVertical: 4,
                  alignItems: 'center'
                }}>
                  <Image style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'contain'
                  }} source={{
                    uri: item.image
                  }} />
                  <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4,
                    color: pilih == item.id ? colors.white : colors.black,
                  }}>{item.info}</Text>
                </View>
              </TouchableWithoutFeedback>
            )
          }} />

        </View>

        <MyGap jarak={20} />


      </View>
      <View style={{
        padding: 10,
      }}>
        <MyButton title="Lihat Hasil" onPress={() => {
          if (pilih == 0) {
            showMessage({
              message: 'Silahkan pilih area gigimu yang berlubang !'
            })
          } else {
            navigation.navigate('Hasil', {
              ...kirim,
              kelas: gigi[pilih - 1].kelas,
              info: gigi[pilih - 1].info,
              image: gigi[pilih - 1].image,
              keterangan: gigi[pilih - 1].keterangan,
              edukasi: gigi[pilih - 1].edukasi,
            })
          }
        }} />
      </View>
    </View>

    // MAIN


  )
}

const styles = StyleSheet.create({})