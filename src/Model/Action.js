import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, StatusBar } from 'react-native';

Base_url = 'http://183.90.170.87:3000';

export const send_OTP_Action = async (send_OTP) => {
          var response = (await axios.post(Base_url + '/api/sms/SendOTP', send_OTP))
          if (response.status == 200) {
                    return {
                              Result: response.data.value,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status 
                    }
          } else {
                    return {
                              StatusCode: response.status,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status
                    };
          }
};

export const send_VartifyOTP_Action = async (input) => {
          var response = (await axios.post(Base_url + '/api/sms/SendVertifyOTP', input))
          if (response.status == 200) {
                    return {
                              Result: response.data.value,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status 
                    }
          } else {
                    return {
                              StatusCode: response.status,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status
                    };
          }
};

export const Check_Olduser_Action = async (input) => {
          var response = (await axios.get(Base_url + '/api/User/RegisterCheckLogin/'+input))
          if (response.status == 200) {
                    return {
                              Result: response.data.value,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status 
                    }
          } else {
                    return {
                              StatusCode: response.status,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status
                    };
          }
};

export const RegisterUser_Action = async (input) => {
          var response = (await axios.post(Base_url + '/api/User/RegisterUser',input))
          if (response.status == 200) {
                    return {
                              Result: response.data.value,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status 
                    }
          } else {
                    return {
                              StatusCode: response.status,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status
                    };
          }
};

export const GetUserByid_Action = async (input) => {
          var response = (await axios.get(Base_url + '/api/User/GetByid/'+input))
          if (response.status == 200) {
                    return {
                              Result: response.data.value,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status 
                    }
          } else {
                    return {
                              StatusCode: response.status,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status
                    };
          }
};

export const UpdateUser_Action = async (input) => {
          var response = (await axios.post(Base_url + '/api/User/UpdateUser/',input))
          if (response.status == 200) {
                    return {
                              Result: response.data.value,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status 
                    }
          } else {
                    return {
                              StatusCode: response.status,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status
                    };
          }
};

export const updateFCMToken_Action = async (input) => {
          var response = (await axios.post(Base_url + '/api/User/updateFCMToken/',input))
          if (response.status == 200) {
                    return {
                              Result: response.data.value,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status 
                    }
          } else {
                    return {
                              StatusCode: response.status,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status
                    };
          }
};


export const SendNotificationSingleUser_Action = async (input) => {
          var response = (await axios.post(Base_url + '/api/NoticationHistory/SendNotificationSingleUser/',input))
          if (response.status == 200) {
                    return {
                              Result: response.data.value,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status 
                    }
          } else {
                    return {
                              StatusCode: response.status,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status
                    };
          }
};


export const GetNoticationHistoryByuserid_Action = async (id) => {
          var response = (await axios.get(Base_url + '/api/NoticationHistory/GetNoticationHistoryByuserid/'+id))
          if (response.status == 200) {
                    return {
                              Result: response.data.value,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status 
                    }
          } else {
                    return {
                              StatusCode: response.status,
                              ResultStatus : response.data.statusCode,
                              StatusCode : response.status
                    };
          }
};

