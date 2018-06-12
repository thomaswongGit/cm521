/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,WebView,ScrollView,
  FlatList, 
  ActivityIndicator, 
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
//import Image from 'react-native-remote-svg';
import SVGImage from 'react-native-svg-image';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


class HomeScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => { this.props.navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
        />
      </View>
    );
  }  
}
class DetailsScreen extends React.Component {
  
  render() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home:  HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName:"Home",
  }
);

 
class FetchData extends React.Component{
  constructor(props){
    super(props);
    this.state ={ 
      isLoaded: false,
      name: this.props.name,
      items: [],
    }
  }

  getData(queryValue)
  {
    fetch("https://restcountries.eu/rest/v2/name/"+queryValue)  
    .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result[0]
          });
        }).catch((error) =>{
        console.error(error);
      });
   }
   roundNumber(number, decimals)
   {
     //return Number(Math.round(number+'e'+decimals)+'e'-decimals); // 1.01
     return Number(Math.round(number+"e+2")+"e-2");
   }
   getLanguage(languages)
   {
     let arys = [];
     for(let i=0;i<languages.length;i++)
     {
         let language = languages[i];
         if(language["nativeName"]!=language["name"])
         {
            arys.push(language["nativeName"]+"  / "+(language["name"]));
         }
         else
             arys.push(language["nativeName"]);
     }
     return "";//return this.renderItems(arys, 0, "Langs");
   }
   renderItems(datas,index,prefixName) {
      const resultArrays = [];
      for (var i=index; i < datas.length; i++) {
          resultArrays.push(<li key={prefixName+""+i}>{datas[i]}</li>);
      }
      return <ul>{resultArrays}</ul> ;
    }
   componentDidMount() {
    this.getData(this.state.name);
   } 
  render(){
        const { isLoaded, items } = this.state;
        if(!isLoaded){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          );
        }
        else if(items==null) return ( 
           <Text style={styles.textStyle}>找不到任何資料</Text>
        )
        else
        {
          return (
          <ScrollView style={{backgroundColor:'rgb(255, 255, 255)'}}>
          <Text style={styles.textStyle}>名稱：{items["nativeName"]}</Text>
          <Text style={styles.textStyle}>名稱（詳細資訊）：</Text>
          <Text style={styles.textStyle}>區碼：{items["callingCodes"]}</Text>
          <Text style={styles.textStyle}>語言：{this.getLanguage(items["languages"])}</Text>
          <Text style={styles.textStyle}>時區：</Text>
          <Text style={styles.textStyle}>人口：{items["population"].toLocaleString('en-us')}</Text>
          <Text style={styles.textStyle}>經緯度：{this.roundNumber(items["latlng"][0])}° N, {this.roundNumber(items["latlng"][1])}° E</Text>
          <Text style={styles.textStyle}>面積：{items["area"].toLocaleString('en-us')} 平方公里</Text>
          <Text style={styles.textStyle}>主要貨幣：{items["currencies"][0]["code"]}</Text>
          <Text style={styles.textStyle}>區旗／國旗：</Text>
          <SVGImage
            scalesPageToFit ={true}
            source={{ uri: items["flag"]}}
            style={{ width: 200, height: 150, padding: 0, flex:0 }}
          />
       </ScrollView>
        );
      }
  }
}

export default class FetchExample extends React.Component {
  
    constructor(props){
      super(props);
      this.state ={ isLoading: true}
    }
  
    componentDidMount(){
      return fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            dataSource: responseJson.movies,
          }, function(){
  
          });
  
        })
        .catch((error) =>{
          console.error(error);
        });
    }
  
   
    render(){
  
      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }
  
      return(
        <View style={styles.container}>
          <View style={styles.infoStyleSample}>
            <FlatList 
              data={this.state.dataSource}
              renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        
          <FetchData name="taiwan"/>
          
            
        </View>
      );
    }
  }



class App extends React.Component {
  render() {
    return <RootStack />;

  }
}
const styles = StyleSheet.create({
  container:
  {
    flex:1,
  },
  infoStyleSample:
  {
    flex:0,
    display:'none',
  },
  imageStyle:
  {
     //height:100,flex:0
  },
  textStyle:
  {
     lineHeight:30, //30
  }
});

const stylesTemplate = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  viewStyle:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatStyle:{
     display:"none",
  },
  imageStyle:{
 
    height: '10px', 
    width:'20px',
 
  }
});
