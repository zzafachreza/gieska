import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts, windowWidth } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker, MyCalendar } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';
import SweetAlert from 'react-native-sweet-alert';

export default function Register({ navigation }) {




    const [loading, setLoading] = useState(false);
    const [sama, setSama] = useState(true)
    const [data, setData] = useState({
        api_token: api_token,
        email: '',
        nama_lengkap: '',
        telepon: '',
        umur: '',
        jenis_kelamin: 'Laki-laki',
        password: '',
        repassword: '',


    });

    const simpan = () => {


        console.log(data);
        if (
            data.nama_lengkap.length === 0 &&
            data.telepon.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Formulir pendaftaran tidak boleh kosong !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Masukan nama lengkap ibu',
            });
        }

        else if (data.email.length === 0) {
            showMessage({
                message: 'Masukan email',
            });
        }
        else if (data.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else if (data.repassword.length === 0) {
            showMessage({
                message: 'Ulangi kata sandi kamu',
            });
        } else {



            setLoading(true);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    console.log(res.data);

                    if (res.data.status == 404) {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'error',
                            cancellable: true
                        },
                            callback => navigation.navigate('Login'));

                    } else {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'success',
                            cancellable: true
                        },
                            callback => navigation.navigate('Login'));

                    }


                }).finally(() => {
                    setLoading(false);
                });
        }
    };



    return (
        <>
            <ImageBackground
                style={{
                    flex: 1,
                    backgroundColor: colors.tertiary,
                    padding: 10,
                    position: 'relative'
                }}>

                {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
                <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>




                    <View style={{
                        paddingHorizontal: 0,
                    }}>
                        <Text style={{
                            fontSize: MyDimensi / 2,
                            fontFamily: fonts.primary[800],
                            color: colors.primary,
                        }}>Daftar</Text>
                        <Text style={{
                            fontSize: MyDimensi / 4,
                            fontFamily: fonts.primary[400],
                            color: colors.primary,
                            marginBottom: 10,
                        }}>Silahkan daftar agar bisa login</Text>


                        {/* INPUT NAMA */}
                        <MyInput label="Nama Lengkap" onChangeText={x => {
                            setData({
                                ...data,
                                nama_lengkap: x
                            })
                        }} iconname='person-outline' placeholder='Masukan nama lengkap' />

                        {/* INPUT USERNAME */}
                        <MyGap jarak={20} />
                        <MyInput label="Email" onChangeText={x => {
                            setData({
                                ...data,
                                email: x
                            })
                        }} iconname="mail-outline" placeholder='Masukan alamat email' />
                        <MyGap jarak={20} />
                        <MyInput label="Telepon" keyboardType='phone-pad' onChangeText={x => {
                            setData({
                                ...data,
                                telepon: x
                            })
                        }} iconname="call-outline" placeholder='Masukan nomor telepon' />


                        {/* MEMILIH JENIS KELAMIN */}
                        <MyGap jarak={20} />
                        <MyPicker label="Jenis Kelamin" onValueChange={x => {
                            setData({
                                ...data,
                                jenis_kelamin: x
                            })
                        }} iconname="male-female-outline" data={[
                            {
                                label: 'Laki-laki',
                                value: 'laki-laki',
                            },
                            {
                                label: 'Perempuan',
                                value: 'perempuan'
                            }
                        ]} />
                        <MyGap jarak={20} />
                        <MyInput label="Umur" keyboardType='number-pad' onChangeText={x => {
                            setData({
                                ...data,
                                umur: x
                            })
                        }} iconname="speedometer-outline" placeholder='Masukan umur' />
                        {/*INPUT KATA SANDI */}
                        <MyGap jarak={20} />
                        <MyInput
                            placeholder="Kata Sandi..."
                            label="Kata Sandi"
                            iconname="lock-closed-outline"
                            value={data.password}
                            secureTextEntry={true}
                            onChangeText={value =>
                                setData({
                                    ...data,
                                    password: value,
                                })
                            }
                        />


                        {/* INPUT KATA SANDI ULANG */}
                        <MyGap jarak={20} />
                        <MyInput
                            borderColor={sama ? colors.primary : colors.danger}
                            borderWidth={sama ? 1 : 1}
                            placeholder="Masukan ulang kata sandi"
                            label="Masukan ulang kata sandi"
                            iconname="lock-closed-outline"
                            secureTextEntry
                            value={data.repassword}
                            onChangeText={value => {

                                if (value !== data.password) {
                                    setSama(false)
                                } else {
                                    setSama(true)
                                }

                                setData({
                                    ...data,
                                    repassword: value,
                                })
                            }

                            }
                        />
                    </View>
                    <MyGap jarak={20} />




                    {!loading &&
                        <>
                            <MyButton


                                title="Daftar"
                                Icons="log-in"
                                onPress={simpan}
                            />

                            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
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
                                    }}>Sudah memiliki Akun ? <Text style={{
                                        fontSize: MyDimensi / 4,
                                        fontFamily: fonts.primary[600],
                                        textAlign: 'center',
                                        color: colors.foourty
                                    }}>Masuk disini</Text></Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </>
                    }

                    <MyGap jarak={10} />
                    {loading && <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator color={colors.primary} size="large" />
                    </View>}
                </ScrollView>

            </ImageBackground>

        </>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
