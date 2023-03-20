import {
          SafeAreaView,
          View,
          FlatList,
          StyleSheet,
          Text,
          StatusBar,
          TouchableOpacity,
          Dimensions,
          ScrollView,
          RefreshControl,
          Button,
          Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { GetNoticationHistoryByuserid_Action, updateReadNotication_action } from '../Model/Action';
import Global from '../Global';
import moment from 'moment';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const Upload = ({ navigation }) => {

          useEffect(() => {
                    const unsubscribe = navigation.addListener('focus', () => {
                              GetNoticationHistoryByuserid();
                    });
                    return unsubscribe;
          }, [navigation]);

          [getnoti, setgetnoti] = useState({
                    "id": 0,
                    "createTime": null,
                    "isDelete": false,
                    "isRead": false,
                    "deleteTime": null,
                    "nthTitle": null,
                    "nthDetail": null,
                    "nthTime": null,
                    "nthStatus": null,
                    "nthLocationId": null,
                    "nthTyp": null,
                    "nthLinkAddress": null
          })

          let [data, setData] = useState([]);

          const GetNoticationHistoryByuserid = async () => {

                    GetNoticationHistoryByuserid_Action(Global.userId)
                              .then(response => response.Result)
                              .then(json => setData(json))
                              .catch(error => console.error(error))

                    //console.log('response.Result ', data);
          };

          setSelectedId_ = (id) => {

                    updateReadNotication(id);
          }

          const updateReadNotication = async (id) => {
                    console.log(id);
                    updateReadNotication_action(id)
                              .then(response => response.Result)
                              .then(GetNoticationHistoryByuserid())
                              .catch(error => console.error(error))

          };

          const [refreshing, setRefreshing] = useState(false);
          const onRefresh = () => {
                    setRefreshing(true);
                    GetNoticationHistoryByuserid();
                    setRefreshing(false)
          };
          const [state, setState] = useState([]);
          source = null;
          handleChoosePhoto = () => {
                    const options = {
                              noData: true,
                    }
                    ImagePicker.launchImageLibrary(options, response => {
                              if (response.assets[0].uri) {
                                        //console.log(state.lenght);

                                        setState(oldArray => [response.assets[0], ...oldArray]);
                                        //if(state == [])  setState(oldArray => [response.assets, ...oldArray]);
                                        //Photo_List.push(state.photo[0])
                                        console.log('response.assets', state);
                              }
                    })
          }

          handleClearPhoto = () => {
                    setState([]);
          }



          handleUploadPhoto = async () => {



                    let fromData = new FormData();

                    let body = {
                              UserId: parseInt(Global.userId),
                              WoNo: 4
                    }
                    Object.keys(body).forEach(key => {
                              fromData.append(key, body[key]);
                    });

                    let value = []
                    state.forEach((_state, index) => {
                              value.push({
                                        uri: Platform.OS === "android" ? _state.uri : _state.uri.replace("file://", ""),
                                        type: _state.type,
                                        name: _state.fileName
                              }
                              )
                    });

                    value.forEach(element => {
                              fromData.append("formFile", element);
                    });



                    const config = {
                              headers: {
                                        'content-type': 'multipart/form-data',
                              },
                    };


                    console.log('createFormData', JSON.stringify(fromData));


                    try {
                              let res = await axios.post("http://183.90.170.87:3000/api/FileUpload/UploadFile"
                                        , fromData, config)
                              console.log('Success Status : ', res.status, res);

                    } catch (error) {
                              console.log('error', error);
                    }

          };



          let [selectedId, setSelectedId] = useState(null);
          const renderItem = ({ item }) => {
                    const backgroundColor = item.id === selectedId ? '#FFFFFF' : '#FFFFFF';
                    //const backgroundColor = item.isRead === true ? '#000000' : '#FFFFFF';
                    // datetime string in ISO format
                    const datetimeString = item.createTime;
                    // parse datetime string with moment
                    const datetime = moment(datetimeString);
                    // format datetime with moment
                    const formattedDatetime = datetime.format('DD/MM/YYYY HH:mm');
                    return (

                              <View style={{
                                        flex: 1,
                                        flexDirection: 'row'
                              }}>

                                        <Image
                                                  source={{ uri: item.uri }}
                                                  style={{ height: 300,  flex: 1 }}
                                        />
                              </View>
                    );
          };


          return (



                    <View style={styles.container}
                    >
                              <Button title="Clear Photo" onPress={this.handleClearPhoto} />
                              <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
                              <Button title="Upload Photo" onPress={this.handleUploadPhoto} />
                              <FlatList
                                        data={state}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => item.fileName}
                                        extraData={selectedId}
                                        refreshControl={
                                                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                        }

                              />
                    </View>
          )
}

const { width } = Dimensions.get('window');
const isSmallScreen = width <= 375;
const styles = StyleSheet.create({
          container: {
                    backgroundColor: '#F6F6F6',
                    flex: 1,
          },
          title_box: {
                    backgroundColor: '#FFFFFF',
                    marginTop: 5,
                    paddingBottom: 15,
                    borderRadius: 5,
                    flex: 1,
                    flexDirection: 'row'
          },
          title_header: {
                    color: '#00008B',
                    fontSize: isSmallScreen ? 14 : 18,
                    marginLeft: 20,
                    marginRight: 20,
                    textAlign: 'right',
                    fontWeight: 'bold'
          },
});

export default Upload