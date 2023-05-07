import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { publicAPI } from '../../utils/api';
import { COLOURS } from '../../constants';
import styles from './checkout.styles';

const Order = ({ navigation }) => {
    const { user } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            const getDataFromDB = async () => {
                try {
                    const res = await publicAPI.get(`/bill/orders/${user.id}`);
                    setOrders(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getDataFromDB();
        }
    }, [navigation, user.id]);

    function renderHeader() {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Entypo
                        name="menu"
                        style={{
                            fontSize: 18,
                            color: COLOURS.backgroundMedium,
                            padding: 12,
                            borderRadius: 10,
                            backgroundColor: COLOURS.backgroundLight,
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>Order</Text>
                <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
                    <MaterialCommunityIcons
                        name="cart"
                        style={{
                            fontSize: 18,
                            color: COLOURS.backgroundMedium,
                            padding: 12,
                            borderRadius: 10,
                            backgroundColor: COLOURS.backgroundLight,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function renderContent() {
        return (
            <View style={styles.content}>
                {orders.length > 0 ? (
                    <View style={styles.contain}>
                        {orders.map((item, index) => (
                            <View style={styles.card} key={index}>
                                <Text style={styles.total}>${item.total}</Text>
                                <Text style={styles.date}>
                                    {item.createdAt ? moment(item.createdAt).calendar() : moment()}
                                </Text>
                                <Text
                                    style={
                                        item.statusOrder === 0
                                            ? styles.handle
                                            : item.statusOrder === 1
                                            ? styles.transport
                                            : styles.done
                                    }
                                >
                                    {item.statusOrder === 0
                                        ? 'Đang xử lí'
                                        : item.statusOrder === 1
                                        ? 'Đang giao'
                                        : 'Đã giao'}
                                </Text>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.empty}>
                        <Text stlye={styles.emptyText}>
                            You have no bill. Please checout your cart
                        </Text>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text style={styles.btnText}>Back to home</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView>{renderContent()}</ScrollView>
        </View>
    );
};

export default Order;
