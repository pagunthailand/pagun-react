import React from 'react'
import { View, Text, Image, Button, FlatList } from 'react-native'
// import ImagePicker from 'react-native-image-picker'
import * as ImagePicker from 'react-native-image-picker';
import Global from '../Global';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class UploadFrom extends React.Component {

          state = {
                    photo: null,
          }
          source = null;
          handleChoosePhoto = () => {
                    const options = {
                              noData: true,
                    }
                    ImagePicker.launchImageLibrary(options, response => {
                              if (response.assets[0].uri) {
                                        this.setState({ photo: response.assets })
                                        this.Photo_List.push(this.state.photo[0])
                                        console.log('state', this.state.photo[0].uri);
                                        console.log(this.Photo_List.length, 'Photo_List', this.Photo_List);
                              }
                    })
          }

          Photo_List = [];
          handleClearPhoto = () => {
                    this.Photo_List = [];
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

                    console.log('Platform.OS', Platform.OS);
                    fromData.append("formFile", {
                              uri: Platform.OS === "android" ? this.state.photo[0].uri : this.state.photo[0].uri.replace("file://", ""),
                              type: this.state.photo[0].type,
                              name: this.state.photo[0].fileName
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

          

          render() {
                    // const { photo } = this.state.photo[0]
                    return (
                              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <SafeAreaView>
                                                  <FlatList
                                                            data={[...new Array(10)].map((_, i) => i.toString())}
                                                            style={styles.list}
                                                            numColumns={2}
                                                            keyExtractor={(e) => e}
                                                            renderItem={({ item }) => (
                                                                      <Image
                                                                                source={{ uri: BASE_URI + item }}
                                                                                containerStyle={styles.item}
                                                                                PlaceholderContent={<ActivityIndicator />}
                                                                      />
                                                            )}
                                                  />
                                        </SafeAreaView>

                                        {this.state.photo && this.state.photo[0] ? (
                                                  <Image
                                                            source={{ uri: this.state.photo[0].uri }}
                                                            style={{ width: 300, height: 300 }}
                                                  />


                                        ) : ''}
                                        {this.state.photo && this.state.photo[1] ? (
                                                  <Image
                                                            source={{ uri: this.state.photo[1].uri }}
                                                            style={{ width: 300, height: 300 }}
                                                  />


                                        ) : ''}
                                        <Button title="Clear Photo" onPress={this.handleClearPhoto} />
                                        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
                                        <Button title="Upload Photo" onPress={this.handleUploadPhoto} />
                              </View>
                    )
          }
}