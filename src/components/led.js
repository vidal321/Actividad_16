import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import db from './../../src/firebase/config';
import {ref, set} from "firebase/database";

const Led = (props) => {
  return (
     <View style={styles.listItem}>
         <TouchableOpacity   onPress={ () => {
                      set(ref(db, 'devices/' + props.item.id), {
                          area: props.item.area,
                          status: !props.item.status,
                          pin : props.item.pin
                        });
                    }}>
      <Image source={ 
                        props.item.status ?  require('../../img/imagen_on.png') 
                                  : require('../../img/imagen_off.png') } 
                        style={{width:60, height:60,borderRadius:30}}
                    />
    </TouchableOpacity>
      <View style={{alignItems:"center",flex:1}}>
        <Text style={{fontWeight:"bold"}}>{props.item.area}</Text>
        <Text>Pin: {props.item.pin}</Text>
      </View>
      <TouchableOpacity 
        onPress={

                    () => {
                      props.navigation.navigate('Detail',{ item: props.item })
                    }

                  }
      style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"green"}}>Detalle</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:60
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"80%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  }
});

export default Led