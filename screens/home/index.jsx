import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOURS, Items } from '../../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import jwtDecode from 'jwt-decode';
// import { getUserInfo } from '../../store/auth/auth.slice';
import { publicAPI } from '../../utils/api';
import { login } from '../../store/auth/auth.slice';
import { getCart } from '../../store/cart/cart.slice';

const Home = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    //get called on screen loads
    useEffect(() => {
        async function checkToken() {
            const token = await AsyncStorage.getItem('accessToken');

            if (!token) {
                navigation.navigate('Login');
            } else {
                // dispatch(getUserInfo());
                const userInfo = jwtDecode(token);
                dispatch(login(userInfo));
                navigation.navigate('Home');
            }
        }
        const getCarts = async () => {
            const carts = await AsyncStorage.getItem('cartItems');
            if (carts) {
                const cartsArray = JSON.parse(carts);
                dispatch(getCart(cartsArray));
            }
        };
        const unsubscribe = navigation.addListener('focus', () => {
            checkToken();
            getCarts();
            getDataFromDB();
        });

        return unsubscribe;
    }, [navigation]);

    //search data
    useEffect(() => {
        if (search.length) {
            const getDataSearch = async () => {
                const res = await publicAPI.get('/products', { params: { search: search } });
                setProducts(res.data);
            };
            getDataSearch();
        }
    }, [search]);

    //get data from DB

    const getDataFromDB = async () => {
        const res = await publicAPI.get('/products', { params: { search: search } });
        const filterProduct = search
            ? res.data.filter((product) =>
                  product.name.toLowerCase().includes(search.toLowerCase())
              )
            : res.data;
        setProducts(filterProduct);
    };

    //create an product reusable card

    const ProductCard = ({ data }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductInfo', { id: data._id })}
                style={{
                    width: '48%',
                    marginVertical: 14,
                }}
            >
                <View
                    style={{
                        width: '100%',
                        height: 100,
                        borderRadius: 10,
                        backgroundColor: COLOURS.backgroundLight,
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 8,
                    }}
                >
                    <Image
                        source={{ uri: data.img }}
                        style={{
                            width: '80%',
                            height: '80%',
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <Text
                    style={{
                        fontSize: 12,
                        color: COLOURS.black,
                        fontWeight: '600',
                        marginBottom: 2,
                    }}
                >
                    {data.name}
                </Text>
                <Text>&#8377; {data.price}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: COLOURS.white,
            }}
        >
            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 16,
                }}
            >
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
                <View>
                    <Text
                        style={{
                            color: '#383838',
                            fontSize: 20,
                            fontWeight: 500,
                        }}
                    >
                        YOUR'S
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MyCart')}
                    style={{
                        position: 'relative',
                    }}
                >
                    <MaterialCommunityIcons
                        name="cart"
                        style={{
                            fontSize: 18,
                            color: COLOURS.backgroundMedium,
                            padding: 12,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: COLOURS.backgroundLight,
                        }}
                    />
                    <Text
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: -12,
                            color: COLOURS.blue,
                            backgroundColor: COLOURS.red,
                            fontSize: 16,
                            fontWeight: 500,
                            borderRadius: 10,
                            padding: 4,
                        }}
                    >
                        {cartItems.length}
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    marginBottom: 10,
                    padding: 16,
                }}
            >
                <Text
                    style={{
                        fontSize: 26,
                        color: COLOURS.black,
                        fontWeight: '500',
                        letterSpacing: 1,
                        marginBottom: 10,
                    }}
                >
                    YOUR'S Shop &amp; Service
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: COLOURS.black,
                        fontWeight: '400',
                        letterSpacing: 1,
                        lineHeight: 24,
                    }}
                >
                    YOUR'S shop on 594 Nguyen Kiem.
                    {'\n'}This shop offers both products and services
                </Text>
            </View>
            <View style={{ padding: 10 }}>
                <TextInput
                    placeholder="Search"
                    name="search"
                    value={search}
                    onChangeText={(data) => setSearch(data)}
                    style={{
                        borderColor: '#9F9F9F',
                        borderWidth: 1,
                        borderRadius: 4,
                        padding: 10,
                    }}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        padding: 16,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: COLOURS.black,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                }}
                            >
                                Products
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: COLOURS.black,
                                    fontWeight: '400',
                                    opacity: 0.5,
                                    marginLeft: 10,
                                }}
                            >
                                {products.length}
                            </Text>
                        </View>
                        <Text
                            style={{
                                fontSize: 14,
                                color: COLOURS.blue,
                                fontWeight: '400',
                            }}
                        >
                            SeeAll
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                        }}
                    >
                        {products.map((data) => {
                            return <ProductCard data={data} key={data._id} />;
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;
