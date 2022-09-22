import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ToastAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        try {
            AsyncStorage.getItem('UserData')
                .then(value => {
                    if (value != null) {
                        navigation.navigate('CreateStudentForm');
                    }
                })
        } catch (error) {
            alert(error);
        }
    }

    const setData = async () => {
        if (email.length === 0 || password.length === 0) {
            Alert.alert('Warning!', 'please write your data')
        } else {
            var user = {
                Email: email,
                Password: password
            }
            console.log(user)
            await AsyncStorage.setItem('UserData', JSON.stringify(user));
            navigation.navigate('CreateStudentForm');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={{
                height: 140,
                width: '100%',
                resizeMode: 'contain',
            }}
            // source={require('../assets/logo.png')}
            />

            {/*header text*/}
            <View style={styles.header}>
                <Text style={styles.header__text__one}>Welcome Back !</Text>
            </View>

            {/*Inputs*/}
            <View style={styles.inputs}>
                <TextInput
                    style={styles.input}
                    placeholder={"Email"}
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder={"Password"}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
            </View>
            {/*LogIn*/}
            <TouchableOpacity
                onPress={setData}
                style={[styles.btn__sign, { backgroundColor: 'gray' }]}
            >
                <Text style={[styles.btn__text, { color: "#fff" }]}>Log In</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        backgroundColor: "#229954",
    },
    header: {
        marginTop: 30,
    },
    header__text__one: {
        fontSize: 24,
        fontWeight: "bold",
        color: 'white',
        textAlign: 'center'
    },
    inputs: {
        marginTop: 50,
        marginBottom: 30,
    },
    input: {
        height: 55,
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        borderRadius: 12,
        paddingLeft: 20,
        fontSize: 15,
    },
    btn__sign: {
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 12,
        marginTop: 10,
    },
    btn__text: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
});

export default LoginScreen