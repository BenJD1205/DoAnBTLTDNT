import React, {useRef, useState} from 'react'
import { View, Animated, StyleSheet, Text} from 'react-native'
import { TextButton } from '../../components';
import { COLORS, SIZES, constants, FONTS } from '../../constants';
import Walkthrough1 from './components/walkthrough1';
import Walkthrough2 from './components/walkthrough2';
import Walkthrough3 from './components/walkthrough3';
import Walkthrough4 from './components/walkthrough4';

const Walkthrough = ({navigation}) => {


  const [walkthrough2Animate, setWalkthrough2Animate] = useState(false);
  const [walkthrough3Animate, setWalkthrough3Animate] = useState(false);
  const [walkthrough4Animate, setWalkthrough4Animate] = useState(false);
  const onViewChangeRef = useRef(({viewableItems,changed}) => {
    if(viewableItems[0].index == 1){
        setWalkthrough2Animate(true);
    }
    if (viewableItems[0].index == 2) {
        setWalkthrough3Animate(true);
    }
    if (viewableItems[0].index == 3) {
        setWalkthrough4Animate(true);
    }
})
  const scrollX = useRef(new Animated.Value(0)).current;

  const Dots = () => {
    
    const dotPosition = Animated.divide(scrollX,SIZES.width)

    return (
      <View style={styles.dots}>
        {constants.walkthrough.map((item, index) =>{
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.dark08, COLORS.primary, COLORS.dark08],
            extrapolate:'clamp'
          })
          return (
            <Animated.View
              key={`dot-${index}`}
              style={[styles.itemDot,{backgroundColor:dotColor}]}
            />
          )
        })}
      </View>
    )
  }

  function renderFooter() {
    return (
      <View style={styles.footer}>
        <Dots />
        {/* Buttons */}
        <View style={styles.buttons}>
          <TextButton
            label='Join now'
            contentContainerStyle={{
              flex: 1,
              borderRadius: SIZES.radius,
              backgroundColor:COLORS.lightGrey
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3
            }}
            onPress={() => navigation.navigate('Login')}
          />
          <TextButton
            label='Log In'
            contentContainerStyle={{
              flex: 1,
              marginLeft:SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor:COLORS.primary
            }}
            labelStyle={{
              ...FONTS.h3
            }}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={constants.walkthrough}
        keyExtractor={(item) => item.id}
        horizontal
        snapToInterval={SIZES.width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewChangeRef.current}
        scrollEventThrottle={16}
        onScroll={Animated.event([{
          nativeEvent: { contentOffset: { x:scrollX}}
        }], { useNativeDriver: false })}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.animatedList} key={index}>
              {/* Walkthrouhg images */}
              <View style={{ flex: 1, justifyContent:'center' }}>
                {index == 0 && <Walkthrough1 />}
                {index == 1 && <Walkthrough2 animate={walkthrough2Animate} />}
                {index == 2 && <Walkthrough3 animate={walkthrough3Animate} />}
                {index == 3 && <Walkthrough4 animate={walkthrough4Animate} />}
              </View>

              {/* Title && Descriptions */}
              <View style={styles.info}>
                <Text style={{...FONTS.h1}}>{item.title}</Text>
                <Text>{item.sub_title}</Text>
              </View>
            </View>
          )
        }}
      />
      {renderFooter()}
    </View>
  )
}

export default Walkthrough

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.light
  },
  animatedList: {
    width: SIZES.width,
    justifyContent:'center'
  },
  info: {
    height: SIZES.height * 0.35,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:SIZES.padding,
  },
  subTitle: {
    marginTop: SIZES.radius,
    textAlign: 'center',
    fontFamily: "Poppins-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
    color:COLORS.grey60,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left:0,
    right: 0,
    height: SIZES.height * 0.2,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingVertical:SIZES.height > 700 ? SIZES.padding : 20,
  },
  dots: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent:'center'
  },
  itemDot: {
    borderRadius: 5,
    marginHorizontal: 6,
    width: 10,
    height: 10,
  },
  buttons: {
    flexDirection: 'row',
    height:55,
  }
})