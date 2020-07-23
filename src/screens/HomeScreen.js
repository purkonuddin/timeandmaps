import React, {useState} from 'react';
import { Header, Button, Card } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    AppRegistry,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    Alert
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const screenWidth = Math.round(Dimensions.get('window').width)-70;
var date = new Date().getDate();

const renderCard= (l)=>{
    return (
        <Card containerStyle={{ width: screenWidth-40, padding: 10, fontSize: 20, borderLeftWidth:5, borderLeftColor:'darkgrey'}} >
            <View style={{}}> 
                <Text style={{}}>
                    {`${l}${l <= 24 && l >= 13 ? 'pm' : 'am'} - ${l+1}${l <= 24 && l >= 13 ? 'pm' : 'am'}`}
                </Text>
            </View>
        </Card>
    )
  }


const HomeScreen = ({ navigation, backgroundColor, ...props }) => { 
    const [count, setCount] = useState(false);
    const onPress=(l)=> {setCount(l)};
    const time = [13,14,15,16,17,18,19,20,21,22,23,0,1,2,3,4,5,6,7,8,9,10,11,12];
    const days = [
            {date:19, text:"Sunday"},
            {date:20, text:"Monday"},
            {date:21, text:"Tuesday"},
            {date:22, text:"Wednesday"},
            {date:23, text:"Today"},
            {date:24, text:"Friday"},
            {date:25, text:"Saturday"}]; 

    const _keyExtractor = (item, index) => index.toString();

    return(
        <>
        <StatusBar backgroundColor="midnightblue"/>
        <View style={styles.mainContainer}>
        <LinearGradient 
            start={{x: 0.8, y: 0.2}} 
            end={{x: 1, y: 2.3}} 
            colors={['midnightblue', 'indigo']}
            style={{
                flex: 1,
                paddingLeft: 15,
                paddingRight: 15, 
                paddingBottom:10,
            }}>
            
            {/* <View style={{flex:1, backgroundColor: "red", paddingBottom:20, paddingVertical:20}}> */}
                <View style={{
                    flex: 1,
                    justifyContent: "space-between",
                    alignItems:"center",
                    paddingTop: 10,
                    flexDirection:'row',
                }}
                >
                    <View style={{backgroundColor:'transparent', alignItems:'center'}}>
                        <Icon name="home" color='#fff' size={23} style={{padding:5}} />
                    </View>
                    <View style={{backgroundColor:'transparent', flex: 1,alignItems:'flex-start'}}>
            <Text style={styles.logoText}>Pick A Time</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems:"center", 
                }}
                >
                    <ScrollView horizontal= {true} style={{height:35}}>
                    { days.map((d, i)=>(
                        <TouchableOpacity key={(d, idx) => idx.toString()}>
                            <View style={{flexDirection:'column', paddingHorizontal:15, paddingBottom:5}}>
                                <Text style={[styles.dateText, { color: d.date === date ? '#FFF' : '#999'}]}>{d.date === date ? 'Today' : d.text}</Text>    
                                <Text style={[styles.dateText, { color: d.date === date ? '#FFF' : '#999'}]}>July {d.date}</Text>    
                            </View>    
                        </TouchableOpacity>
                        ))
                    } 
                    </ScrollView>
                </View> 
            </LinearGradient>
            <View style={[styles.contentContainer, {paddingTop:10}]}>
            <ScrollView>
                { time.map((l, i) => (

                    <View key={(l, i) => i.toString()} style = {{flex: 1, flexDirection: "row", alignItems: "center", padding:5 }}>
                    <TouchableOpacity
                        onPress={()=>onPress(l)}
                        style={{alignItems: "center",
                        backgroundColor: "transparent",
                        padding: 10}} 
                    >
                        <View style= {{flex: 1, alignItems: "flex-start" }}>
                            <Text style={{position:"relative", top: -19, color: 'darkgrey' }}>{l}{l <= 24 && l >= 13 ? 'pm' : 'am'}</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <View style = {{flex: 6, justifyContent: "center", borderTopColor: "darkgrey", borderTopWidth: 1, paddingTop:0, marginBottom:3}}>
                        <View style={{flex: 1, alignItems: "center", flexDirection: "row"}}>
                            <View style={{alignItems: "flex-start", flex: 1}}> 
                                <View style={{height:40, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                    {count === l ? (renderCard(l)) : null}
                                </View>
                            </View> 
                        </View>
                    </View>
                    </View>

                ))}
                </ScrollView>
            </View>

            <View style={{flex:1, backgroundColor:'white'}}>
                <Button
                ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                    colors: ['midnightblue', 'indigo'],
                    start: { x: 0.9, y: 0.1 },
                    end: { x: 1, y: 0.3 },
                }}
                title="Choose Location"
                buttonStyle={{marginVertical:19, marginHorizontal:40, paddingVertical:15, borderRadius: 15}}
                onPress={() =>
                    navigation.navigate('MapsScreen')
                }
                />
            </View>
        </View> 
        </>
    ) 
}

const styles = StyleSheet.create({
    linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
    },
    buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        height: 24
     },
     headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        paddingRight: 5
     },
     leftHeaderContainer: {
        flexDirection: "row"
     }, 
     contentContainer: {
        flex: 6,
     },
     dateContainer: {
        flex: 6,
        alignItems: "center",
        flexDirection: "row"
     },
     logoText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        alignItems: "flex-start",
        marginLeft: 10
     },
     dateText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        alignItems: "flex-start",
        marginLeft: 10
     },
    scrollView: {
        backgroundColor: "gainsboro",
    }, 
});

export default HomeScreen;