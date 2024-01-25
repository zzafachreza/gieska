import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData, webURL } from '../../utils/localStorage';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import RenderHtml from 'react-native-render-html';

export default function Hasil({ navigation, route }) {
    const item = route.params;
    console.log(item);
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="Hasil Diagnosa" onPress={() => navigation.goBack()} />
            <ScrollView style={{
                padding: 20,
            }} showsVerticalScrollIndicator={false}>
                <View style={{
                    paddingVertical: 10,
                    flexDirection: 'row',
                    marginVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: MyDimensi / 4.2
                    }}>Apakah gigi kamu ada lubang?</Text>
                    <Text style={{
                        left: 10,
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 4.2
                    }}>{item.diagnosa1}</Text>
                </View>
                <View style={{
                    paddingVertical: 10,
                    flexDirection: 'row',
                    marginVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: MyDimensi / 4.2
                    }}>Apakah gigi kamu ada sakit?</Text>
                    <Text style={{
                        left: 10,
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 4.2
                    }}>{item.diagnosa2}</Text>
                </View>
                <View style={{
                    marginVertical: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 2,
                        textAlign: 'center'
                    }}>{item.diagnosa_status}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: MyDimensi / 3.5,
                        textAlign: 'center'
                    }}>{item.diagnosa_hasil}</Text>
                </View>

                <View style={{
                    marginVertical: 10,
                }}>

                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 2,
                        textAlign: 'center'
                    }}>{item.kelas}</Text>

                    <Image style={{
                        width: 120,
                        height: 120,
                        alignSelf: 'center',
                        resizeMode: 'contain'
                    }} source={{
                        uri: item.image
                    }} />
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: MyDimensi / 3.5,
                        textAlign: 'center'

                    }}>{item.info}</Text>
                    <RenderHtml
                        contentWidth={windowWidth}
                        source={{
                            html: item.keterangan
                        }}
                    />

                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 2,
                        textAlign: 'center'
                    }}>Edukasi</Text>
                    <RenderHtml
                        contentWidth={windowWidth}
                        source={{
                            html: item.edukasi
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})