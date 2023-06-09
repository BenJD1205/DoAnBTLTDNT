import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

import { SIZES, images } from '../../../constants';

const Walkthrough3 = () => {

    return (
        <View style={{flex:1,overflow:'hidden'}}>
            <Image
                source={images.walkthrough_03_01}
                style={{
                    ...styles.image,
                    top: "30%",
                    left:"25%",
                    zIndex:1,
                }}
            />

            <Image
                source={images.walkthrough_01_01}
                style={{
                    ...styles.image,
                    top: "30%",
                    left:"12%"
                }}
            />

            <Image
                source={images.walkthrough_03_02}
                style={{
                    ...styles.image,
                    top: "65%",
                    left:"15%"
                }}
            />

            <Image
                source={images.walkthrough_01_02}
                style={{
                    ...styles.image,
                    top: "60%",
                    left:"60%"
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        position:'absolute',
        width:106,
        height:101,
        zIndex:0,
        borderRadius: SIZES.radius
    }
})

export default Walkthrough3;