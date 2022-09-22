import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid, Alert, Button } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import DatePicker from 'react-native-datepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const db = openDatabase({
    name: "student_db",
});

const CreateStudentForm = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [parentName, setParentName] = useState('');
    const [email, setEmail] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [parentPhoneNo, setParentPhoneNo] = useState('');
    const [qualification, setQualification] = useState('');
    const [instituteName, setInstituteName] = useState('');
    const [startedDate, setStartedDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [grade, setGrade] = useState('');
    const [data, setData] = useState([]);
    const [emailValidError, setEmailValidError] = useState('');

    useEffect(() => {
        createTables()
    }, []);


    //validate email
    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (reg.test(val) === false) {
            setEmailValidError('enter valid email address');
        } else if (reg.test(val) === true) {
            setEmailValidError('');
        }
    };

    const createTables = () => {
        db.transaction(txn => {
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName VARCHAR(20), lastName VARCHAR(20),
                phoneNo INTEGER(12), email VARCHAR(50), parentEmail VARCHAR(50), parentPhoneNo INTEGER(12), parentName VARCHAR(30))`,
                [],
                (sqlTxn, res) => {
                    console.log("table created successfully");
                },
                error => {
                    console.log("error on creating table " + error.message);
                },
            );
        });
    };

    const addStudents = () => {
        if (!firstName) {
            alert("Enter first name");
            return false;
        }
        if (!lastName) {
            alert("Enter last name");
            return false;
        }
        if (!phoneNo) {
            alert("Enter phnoe number");
            return false;
        }
        if (!email) {
            alert("Enter email");
            return false;
        }
        if (!parentName) {
            alert("Enter parent name");
            return false;
        }
        if (!parentPhoneNo) {
            alert("Enter parent phone no");
            return false;
        }

        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO students (firstName, lastName,phoneNo,email,parentName,parentPhoneNo,parentEmail) VALUES (?,?,?,?,?,?,?)`,
                [firstName, lastName, phoneNo, email, parentName, parentPhoneNo, parentEmail,],
                (sqlTxn, res) => {
                    alert(`student added successfully`);
                    setFirstName('');
                    setLastName('');
                    setPhoneNo('');
                    setEmail('');
                    setParentName('');
                    setParentEmail('');
                    setParentPhoneNo('')
                    navigation.navigate("ViewData", data)
                },
                error => {
                    console.log("error on adding students " + error.message);
                },
            );
        });
    };


    // const openDatePickHandler = () => {
    //     DateTimePickerAndroid.open({
    //         mode: 'date',
    //         value: startedDate,
    //         onChange: (event, newDate) => {
    //             if (newDate) {
    //                 DateTimePickerAndroid.open({
    //                     mode: 'time',
    //                     value: newDate,
    //                     onChange: (_, newDateTime) => {
    //                         if (newDateTime) {
    //                             setStartedDate(newDateTime);
    //                         }
    //                     },
    //                 });
    //             }
    //         },
    //     });
    // };

    const removeValue = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            // remove error
        }
        console.log('Cleared Done.')
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View style={styles.input_view}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ViewData')}
                            style={styles.view_btn}
                        >
                            <Text style={[styles.btn__text_header, { color: "#fff" }]}>View</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                removeValue()
                                navigation.navigate('LoginScreen')
                            }}
                            style={styles.view_btn}
                        >
                            <Text style={[styles.btn__text_header, { color: "#fff" }]}>Logout</Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={styles.input_text}>Student Details</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"First Name"}
                        value={firstName}
                        onChangeText={newText => setFirstName(newText)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={"Last Name"}
                        value={lastName}
                        onChangeText={newText => setLastName(newText)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={"Mobile No"}
                        value={phoneNo}
                        onChangeText={newText => setPhoneNo(newText)}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={"Email"}
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={value => {
                            setEmail(value);
                            handleValidEmail(value);
                        }}
                    />
                    {emailValidError ? <Text style={{ color: 'red', fontSize: 13, marginBottom: 5 }}>{emailValidError}</Text> : null}

                    <TextInput
                        style={styles.input}
                        placeholder={"Parent Name"}
                        value={parentName}
                        onChangeText={newText => setParentName(newText)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={"Parent Mobile No"}
                        value={parentPhoneNo}
                        onChangeText={newText => setParentPhoneNo(newText)}
                        keyboardType="numeric"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder={"Parent Email"}
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={parentEmail}
                        onChangeText={value => {
                            setParentEmail(value);
                            handleValidEmail(value);
                        }}
                    />
                    {emailValidError ? <Text style={{ color: 'red', fontSize: 13, marginBottom: 5 }}>{emailValidError}</Text> : null}

                    <Text style={styles.input_text}>Educational Details</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"Qualifications"}
                        value={qualification}
                        onChangeText={newText => setQualification(newText)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={"Institute Name"}
                        value={instituteName}
                        onChangeText={newText => setInstituteName(newText)}
                    />

                    <View style={styles.input}>
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={startedDate}
                            mode="date"
                            placeholder="Started Date"
                            format="DD/MM/YYYY"
                            minDate="01-01-2000"
                            maxDate="01-01-2040"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: -40,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    borderColor: "gray",
                                    alignItems: "flex-start",
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                },
                                placeholderText: {
                                    fontSize: 17,
                                    color: "gray"
                                },
                                dateText: {
                                    fontSize: 17,
                                }
                            }}
                            onDateChange={(startedDate) => {
                                setStartedDate(startedDate);
                            }}
                        />
                    </View>
                    <View style={styles.input}>
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={endDate}
                            mode="date"
                            placeholder="End Date"
                            format="DD/MM/YYYY"
                            minDate="01-01-2000"
                            maxDate="01-01-2040"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: -40,
                                    top: 4,
                                    marginLeft: 0,
                                },
                                dateInput: {
                                    borderColor: "gray",
                                    alignItems: "flex-start",
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                },
                                placeholderText: {
                                    fontSize: 17,
                                    color: "gray"
                                },
                                dateText: {
                                    fontSize: 17,
                                }
                            }}
                            onDateChange={(endDate) => {
                                setEndDate(endDate);
                            }}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder={"Grade"}
                        value={grade}
                        onChangeText={newText => setGrade(newText)}
                    />
                    <TouchableOpacity
                        onPress={addStudents}
                        style={styles.btn__start}
                    >
                        <Text style={[styles.btn__text, { color: "#fff" }]}>Create Student Form</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    datePickerStyle: {
        width: '90%',
        marginTop: -10
    },
    input_text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    input_view: {
        padding: 30,
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        paddingLeft: 20,
        fontSize: 15,
    },
    txt: {
        height: 55,
        borderWidth: 1,
        marginBottom: 15,
        padding: 15,
        borderRadius: 30,
        paddingLeft: 20,
        fontSize: 16,
    },
    btn__start: {
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#229954'
    },
    view_btn: {
        borderWidth: 1,
        backgroundColor: '#229954',
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 10,
        marginTop: 10,
        width: 100
    },
    btn__text: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
    btn__text_header: {
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        alignItems: 'center'
    },
});

export default CreateStudentForm;
