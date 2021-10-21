import React,
{
    useState,
    useEffect
} from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from 'axios';
import { Data,UserData } from '../Data';
import { useNavigation } from '@react-navigation/core';

const UserAttendance = () => {
    // inc month 
    const [monthModifier, setMonthModifier] = useState(0)

    // time pickar
    const [timeEntry, setTimeEntry] = useState(new Date());
    const [timeExit, setTimeExit] = useState(new Date());
    const [EntryShow, setEntryShow] = useState(false);
    const [ExitShow, setExitShow] = useState(false);
    const [attendanceDay, setAttendanceDay] = useState([])
    const [selectedEntryTime, setSelectedEntryTime] = useState(null)
    const [selectedExitTime, setSelectedExitTime] = useState(null)
    const [User, setUser] = useState(null)
    const navigation = useNavigation();

    // columns
    const numColumns = 7;
    const weakName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    useEffect( () => {
            UserData().then(res => {
            if (typeof res !== 'undefined') {
                setUser(res)
                console.log("login")
                getAttendance()
            } else {
                navigation.navigate("Home");
            }
          
        })
    }, [])



    const getAttendance = () => {
        if (typeof User !== "undefined") {
            const data = {
                date: DateData().DayRef.toLocaleDateString(),
                id: User !== null ? User.id : ''
            }
            axios.post(`${Data.address}/attendance`, data)
                .then(res => {
                    setAttendanceDay(res.data)
                }).catch(err => {
                    alert(err)
                })
        }

    }

    const DateData = () => {
        let D = new Date()
        const year = D.getFullYear()
        const Month = new Date().getMonth()
        const DayRef = new Date(year, Month + monthModifier + 1, 0)
        const totalDay = DayRef.getDate();
        const PaddingDay = new Date(year, Month + monthModifier, 1).getDay() - 1;
        const monthName = DayRef.toLocaleString('default', { month: 'long' }).split(" ")[1];

        const returnDate = [];
        for (let i = 1; i <= totalDay + PaddingDay; i++) {
            returnDate.push({ day: i, month: DayRef.getMonth() + 1, year: DayRef.getFullYear() })
        }
        return { returnDate, PaddingDay, monthName, DayRef }
    }

    const renderItem = ({ item }) => {
        const { day, month, year } = item
        if (item.day <= DateData().PaddingDay) {
            return (
                <View style={styles.dayBlockPadd}>
                </View>
            )
        } else {
            if (
                attendanceDay.find(date => date.day == day - DateData().PaddingDay) &&
                attendanceDay.find(date => date.month == month) &&
                attendanceDay.find(date => date.year == String(year).substring(2.4))
            ) {
                return (
                    <View style={styles.presentDay}>
                        <Text style={styles.dayText}>{day - DateData().PaddingDay}</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles.dayBlock}>
                        <Text style={styles.dayText}>{day - DateData().PaddingDay}</Text>
                    </View>
                )
            }
        }
    }

    const entryExit12Hour = (time) => {
        return `${12 > time.substring(0, 2) ? time.substring(0, 2) : time.substring(0, 2) - 12}${time.substring(2)}`
    }

    const onChangeEntry = async (event, selectedDate) => {
        setEntryShow(false)
        setTimeEntry(selectedDate);
        setSelectedEntryTime(selectedDate.toLocaleTimeString());
        const data = {
            id: User !== null ? User.id : '',
            date: new Date().toLocaleDateString(),
            entry: selectedDate.toLocaleTimeString()
        }
        await axios.post(`${Data.address}/attendance/entry`, data).then(res => {
            getAttendance()
            alert(res.data)
        }).catch(err => {
            alert(err)
        })
    };
    const onChangeExit = async (event, selectedDate) => {
        setExitShow(false)
        setTimeExit(selectedDate);
        setSelectedExitTime(selectedDate.toLocaleTimeString());
        const data = {
            id: User !== null ? User.id : '',
            date: new Date().toLocaleDateString(),
            exit: selectedDate.toLocaleTimeString()
        }
        await axios.post(`${Data.address}/attendance/exit`, data).then(res => {
            getAttendance()
            alert(res.data)
        }).catch(err => {
            alert(err)
        })
    };

    return (
        <View style={{ marginTop: 10 }}>

            <View style={styles.ButtonContainer}>
                <TouchableOpacity
                    onPress={() => setMonthModifier(monthModifier - 1)}
                    style={styles.PreNexbutton}
                >
                    <Text style={styles.ButtonText}>pre</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.dayText}>{`${DateData().monthName} / ${DateData().DayRef.getFullYear()}`}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => setMonthModifier(monthModifier + 1)}
                    style={styles.PreNexbutton}
                >
                    <Text style={styles.ButtonText}>nex</Text>
                </TouchableOpacity>
            </View>
            < View style={styles.secondBlock} >
                {
                    weakName.map((weak, idx) => (
                        <View style={styles.dayBlock} key={idx}>
                            <Text style={styles.dayText}>{weak}</Text>
                        </View>
                    ))
                }
            </View >
            <View style={styles.dayMainContainer}>
                <FlatList
                    data={DateData().returnDate}
                    renderItem={renderItem}
                    keyExtractor={item => item.day}
                    numColumns={numColumns}
                />
            </View>
            <View style={styles.timeEntryExit}>
                <View style={styles.timeEntryContainer} >
                    <TouchableOpacity
                        onPress={() => { setEntryShow(true) }}
                        style={styles.EntryTimebutton}
                    >
                        <Text style={styles.EntryTimebuttonText}>{selectedEntryTime === null ? 'Entry Time' : entryExit12Hour(selectedEntryTime)} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setExitShow(true)}
                        style={styles.EntryTimebutton}
                    >
                        <Text style={styles.EntryTimebuttonText}>{selectedExitTime === null ? 'Exit Time' : entryExit12Hour(selectedExitTime)}</Text>
                    </TouchableOpacity>
                    {EntryShow && (<DateTimePicker
                        testID="dateTimePicker"
                        value={timeEntry}
                        mode='time'
                        is24Hour={true}
                        display="spinner"
                        onChange={(event, selectedDate)=>onChangeEntry(event, selectedDate)}
                        is24Hour={false}
                    />)}
                    {ExitShow && (<DateTimePicker
                        testID="dateTimePicker"
                        value={timeExit}
                        mode='time'
                        is24Hour={true}
                        display="spinner"
                        onChange={(event, selectedDate)=>onChangeExit(event, selectedDate)}
                        is24Hour={false}
                    />)}
                </View>
            </View>
            <View style={styles.totalDayDataView}>
                <View >
                    <Text style={styles.totalDayDataText}>{`Total Day = ${attendanceDay.length}`}</Text>
                </View>
                <View >
                    <Text style={styles.totalDayDataText}>Total Time = 200 Hour</Text>
                </View>
            </View>

        </View>
    )
}

export default UserAttendance

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    firstBlock: {
        marginTop: 15
    },
    ButtonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: "space-around",
        height: 50,
    },

    PreNexbutton: {
        padding: 5,
        width: 100,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center'
    },
    secondBlock: {
        marginTop: 20,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },
    dayBlockPadding: {
        width: 50,
        height: 50,
        margin: 2,
        borderWidth: 0,
        justifyContent: 'center'
    },
    dayBlockPadd: {
        width: 50,
        height: 50,
        margin: 2,
        borderWidth: 0,
        justifyContent: 'center'
    },
    presentDay: {
        width: 50,
        height: 50,
        margin: 2,
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#5c6cff',
        elevation: 5,
    },
    dayBlock: {
        width: 50,
        height: 50,
        margin: 2,
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
    },
    ButtonText: {
        marginBottom: 5,
        fontSize: 20,
        fontWeight: '900',
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    dayText: {
        fontSize: 20,
        fontWeight: '900',
        textAlign: 'center',
    },
    dayMainContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    dayBlockPadding: {
        borderWidth: 0
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }, EntryTimebutton: {
        padding: 5,
        flex: 1
    },
    timeEntryContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10
    },
    EntryTimebuttonText: {
        padding: 5,
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 5
    },
    timeEntryExit: {
        marginTop: 30
    },
    totalDayDataView: {
        marginTop: 30
    },
    totalDayDataText: {
        fontSize: 20,
        fontWeight: "900",
        textTransform: 'capitalize',
        marginLeft: 20
    }
})


//  entryTime == null  => exit time
//  exitTime == null  => entry time