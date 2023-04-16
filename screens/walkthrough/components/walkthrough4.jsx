import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import { SIZES, images } from '../../../constants';

const Walkthrough4 = () => {

    return (
        <View style={{flex:1,overflow:'hidden'}}>
            <Image
                source={images.walkthrough_04_01}
                style={{
                    ...styles.image,
                    top: "25%",
                    left: "30%",
                    width: 150,
                    height: 250,
                    zIndex:1,
                }}
            />

            <Image
                source={images.walkthrough_04_02}
                style={{
                    ...styles.image,
                    top: "20%",
                    left:-5,
                }}
            />

            <Image
                source={images.walkthrough_04_03}
                style={{
                    ...styles.image,
                    top: "30%",
                    left:"80%"
                }}
            />

            <Image
                source={images.walkthrough_04_04}
                style={{
                    ...styles.image,
                    top: "62%",
                    left:"85%"
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        position:'absolute',
        width:86,
        height:112,
        zIndex:2,
        borderRadius: SIZES.radius
    }
})

export default Walkthrough4;