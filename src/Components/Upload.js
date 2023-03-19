import React from 'react'
import { View, Text, Image, Button } from 'react-native'
// import ImagePicker from 'react-native-image-picker'
import * as ImagePicker from 'react-native-image-picker';
import Global from '../Global';
import axios from 'axios';

export default class Upload extends React.Component {

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
                                        console.log(this.state.photo[0].uri);
                              }
                    })
          }

          createFormData(photo_, body) {
                    const data = new FormData();

                    data.append("photo", {
                              name: photo.fileName,
                              type: photo.type,
                              uri:
                                        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
                    });

                    Object.keys(body).forEach(key => {
                              data.append(key, body[key]);
                    });

                    return data;
          };

          checkFileSize = async (
                    fileURI,
                    maxSize = 2
          ) => {
                    const fileInfo = await FileSystem.getInfoAsync(fileURI);
                    if (!fileInfo.size) return false;
                    const sizeInMb = fileInfo.size / 1024 / 1024;
                    return sizeInMb < maxSize;
          };

          handleUploadPhoto = async () => {



                    let fromData = new FormData();

                    let body = {
                              UserId: parseInt(Global.userId),
                              WoNo: 4
                    }
                    Object.keys(body).forEach(key => {
                              fromData.append(key, body[key]);
                    });

                    console.log('Platform.OS',Platform.OS);
                    fromData.append("formFile", {
                              uri: Platform.OS === "android" ? this.state.photo[0].uri : this.state.photo[0].uri.replace("file://", "") ,
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
                                        {this.state.photo && (
                                                  <Image
                                                            source={{ uri: this.state.photo[0].uri }}
                                                            style={{ width: 300, height: 300 }}
                                                  />
                                        )}
                                        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
                                        <Button title="Upload Photo" onPress={this.handleUploadPhoto} />
                              </View>
                    )
          }
}