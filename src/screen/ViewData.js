import React, { useState, useContext, useEffect } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid, Alert } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
    name: "student_db",
});

const ViewData = ({ navigation }) => {
    const [data, setData] = useState('')
    useEffect(() => {
        getSudentData()
    }, [])
    const getSudentData = () => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM students ORDER BY id DESC`,
                [],
                (sqlTxn, res) => {
                    console.log("student data retrieved successfully");
                    let len = res.rows.length;

                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({
                                id: item.id,
                                firstName: item.firstName,
                                lastName: item.lastName,
                                email: item.email,
                                phoneNo: item.phoneNo,
                                parentName: item.parentName,
                                parentPhoneNo: item.parentPhoneNo,
                                parentEmail: item.parentEmail,
                                qualification: item.qualification,
                                instituteName: item.instituteName,
                                // startedDate: item.startedDate,
                                // endDate: item.endDate,
                                grade: item.grade
                            });
                        }
                        setData(results);
                    }
                },
                error => {
                    console.log("error on getting students" + error.message);
                },
            );
        });
    };

    const renderStudentData = ({ item }) => {
        return (
            <View style={{
                // flexDirection: "row",
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderColor: "#ddd",
            }}>
                <Text style={{ marginRight: 9 }}>{item.id}</Text>
                <Text>First Name : {item.firstName}</Text>
                <Text>Last Name : {item.lastName}</Text>
                <Text>Contact No : {item.phoneNo}</Text>
                <Text>Email : {item.email}</Text>
                <Text>Parent Name : {item.parentName}</Text>
                <Text>Parent Contact No : {item.parentPhoneNo}</Text>
                <Text>Parent Email : {item.parentEmail}</Text>
                <Text>Qualification : {item.qualification}</Text>
                <Text>Institiute Name : {item.instituteName}</Text>
                {/* <Text>Started Date : {item.startedDate}</Text>
                <Text>End Date : {item.endDate}</Text> */}
                <Text>Grade : {item.grade}</Text>
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <FlatList
                    data={data}
                    renderItem={renderStudentData}
                    key={st => st.id}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
});


export default ViewData