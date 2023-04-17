import { StyleSheet } from "react-native";
import { COLOURS,COLORS } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:COLOURS.white,
        paddingHorizontal:20,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    headerText:{
        color:'#383838',
        fontSize:20,
        fontWeight:'bold'
    },
    logout:{
        marginTop:10,
        padding:10,
        backgroundColor:COLORS.primary,
        borderRadius:4,
    },
    text:{
        color:COLORS.secondary,
        textAlign:'center',
        fontSize:16,
        fontWeight:600   
    },
    inputItem:{
        marginVertical:10,
    },
    input:{
        padding:10,
        borderWidth:1,
        borderColor:COLOURS.secondary,
        borderRadius:4,
        fontSize:16,
        color:COLOURS.secondary
    },
    update:{
        marginTop:20,
        padding:10,
        borderWidth:1,
        borderColor:COLORS.primary,
        borderRadius:4,
    },
    avatar:{
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:COLORS.primary,
    }
});

export default styles;