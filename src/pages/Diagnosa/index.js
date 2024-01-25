import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { MyDimensi, colors, fonts } from '../../utils'
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components'
import SweetAlert from 'react-native-sweet-alert';

export default function Diagnosa({ navigation }) {
    const backPage = () => {
        navigation.goBack();
    }

    const [kirim, setKirim] = useState({
        diagnosa1: 'TIDAK',
        diagnosa2: 'TIDAK',
    })
    return (
        <View style={{ flex: 1, backgroundColor: colors.tertiary }}>
            {/* HEADER */}
            <MyHeader judul="Diagnosa" onPress={backPage} />


            {/* MAIN */}
            <View style={{ padding: 10, }}>

                <View>
                    <MyPicker value={kirim.diagnosa1} onValueChange={x => {
                        setKirim({
                            ...kirim,
                            diagnosa1: x
                        })
                    }} label="Apakah gigi kamu ada lubang?" data={[
                        {
                            label: 'TIDAK',
                            value: 'TIDAK',
                        },

                        {
                            label: 'YA',
                            value: 'YA',
                        },


                    ]} />

                </View>

                <MyGap jarak={20} />

                <View>

                    <MyPicker onValueChange={x => {
                        setKirim({
                            ...kirim,
                            diagnosa2: x
                        })
                    }} label="Apakah gigi kamu ada sakit?" data={[
                        {
                            label: 'TIDAK',
                            value: 'TIDAK',
                        },

                        {
                            label: 'YA',
                            value: 'YA',
                        },




                    ]} />

                </View>

                <MyGap jarak={20} />

                <MyButton title="Selanjutnya" onPress={async () => {

                    let diagnosa_status = '';
                    let diagnosa_hasil = '';
                    try {
                        if (kirim.diagnosa1 == 'TIDAK' && kirim.diagnosa2 == 'TIDAK') {

                            diagnosa_status = 'Sehat';
                            diagnosa_hasil = 'Hebat! Kondisi gigimu baik dan sehat! Jangan lupa untuk rutin periksakan kesehatan mulut dan gigimu setiap 6 bulan sekali ya';

                        } else if (kirim.diagnosa1 == 'YA' && kirim.diagnosa2 == 'TIDAK') {

                            diagnosa_status = 'Bermasalah';
                            diagnosa_hasil = 'Gigimu mengalami masalah, ayo segera konsultasi dan periksakan gigimu ke tenaga kesehatan';

                        } else if (kirim.diagnosa1 == 'TIDAK' && kirim.diagnosa2 == 'YA') {

                            diagnosa_status = 'Bermasalah';
                            diagnosa_hasil = 'Gigimu mengalami masalah, ayo segera konsultasi dan periksakan gigimu ke tenaga kesehatan';

                        } else if (kirim.diagnosa1 == 'YA' && kirim.diagnosa2 == 'YA') {

                            diagnosa_status = 'Bermasalah';
                            diagnosa_hasil = 'Gigimu mengalami masalah, ayo segera konsultasi dan periksakan gigimu ke tenaga kesehatan';

                        }


                        SweetAlert.showAlertWithOptions({
                            title: diagnosa_status,
                            subTitle: diagnosa_hasil,
                            style: 'warning',
                            cancellable: true
                        },
                            callback => {

                                if (kirim.diagnosa1 == 'TIDAK' && kirim.diagnosa2 == 'TIDAK') {
                                    navigation.goBack();
                                } else {
                                    navigation.navigate('Diagnosa2', {
                                        ...kirim,
                                        diagnosa_status: diagnosa_status,
                                        diagnosa_hasil: diagnosa_hasil
                                    })
                                }
                            }

                        );

                    } catch (error) {

                    }




                }} />
            </View>

        </View>

        // MAIN


    )
}

const styles = StyleSheet.create({})