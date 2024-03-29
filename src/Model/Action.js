import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, StatusBar } from 'react-native';

Base_url = 'http://183.90.170.87:3000';


export const send_OTP_Action = async (send_OTP) => {
    var response = (await axios.post(Base_url + '/api/sms/SendOTP', send_OTP))
    if (response.status == 200) {
        return {
            Result: response.data.value,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        };
    }
};

export const send_VartifyOTP_Action = async (input) => {
    var response = (await axios.post(Base_url + '/api/sms/SendVertifyOTP', input))
    if (response.status == 200) {
        return {
            Result: response.data.value,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        };
    }
};

export const Check_Olduser_Action = async (input) => {
    var response = (await axios.get(Base_url + '/api/User/RegisterCheckLogin/' + input))
    if (response.status == 200) {
        return {
            Result: response.data.value,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        };
    }
};



export const RegisterUser_Action = async (input) => {

    var response = (await axios.post(Base_url + '/api/User/RegisterUser', input))
    if (response.status == 200) {
        return {
            Result: response.data.value,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        };
    }
};

export const GetUserByid_Action = async (input) => {
    var response = (await axios.get(Base_url + '/api/User/GetByid/' + input))
    if (response.status == 200) {
        return {
            Result: response.data.value,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        };
    }
};

export const UpdateUser_Action = async (input) => {
    var response = (await axios.post(Base_url + '/api/User/UpdateUser/', input))
    if (response.status == 200) {
        return {
            Result: response.data.value,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        };
    }
};

export const updateFCMToken_Action = async (input) => {
    var response = (await axios.post(Base_url + '/api/User/updateFCMToken/', input))
    if (response.status == 200) {
        return {
            Result: response.data.value,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        };
    }
};


export const SendNotificationSingleUser_Action = async (input) => {
    var response = (await axios.post(Base_url + '/api/NoticationHistory/SendNotificationSingleUser/', input))
    if (response.status == 200) {
        return {
            Result: response.data.value,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        };
    }
};


export const GetNoticationHistoryByuserid_Action = async (id) => {
    var response = (await axios.get(Base_url + '/api/NoticationHistory/GetNoticationHistoryByuserid/' + id))
    if (response.status == 200) {
        return {
            Result: response.data.value,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        };
    }
};


export const updateReadNotication_action = async (id) => {
    var response = (await axios.post(Base_url + '/api/NoticationHistory/updateReadNotication?id=' + id))
    if (response.status == 200) {
        return {
            Result: response.data.value,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        };
    }
};

export const updatePhoneReg1 = async (id, phoneNumber) => {
    var response = (await axios.post(Base_url + '/api/User/updatePhoneReg1?id=' + id + '&phoneNumber=' + phoneNumber))
    if (response.status == 200) {
        return {
            Result: response.data.value,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        };
    }
};

export const updatePhoneReg2 = async (id, phoneNumber) => {
    var response = (await axios.post(Base_url + '/api/User/updatePhoneReg2?id=' + id + '&phoneNumber=' + phoneNumber))
    if (response.status == 200) {
        return {
            Result: response.data.value,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        };
    }
};

export const updateNotiStatus = async (id) => {
    var response = (await axios.get(Base_url + '/api/User/updateNotiStatus?id=' + id))
    if (response.status == 200) {
        return {
            Result: response.data.value,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
            ResultStatus: response.data.statusCode,
            StatusCode: response.status
        };
    }
};

export const getuser_Equipment_Action = async (id) => {
    var response = (await axios.get(Base_url + '/api/Equipment/user/' + id))
    if (response.status == 200) {
        return {
            Result: response,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response,
            StatusCode: response.status
        };
    }
};

export const get_Equipment_ฺbyID_Action = async (id) => {
    var response = (await axios.get(Base_url + '/api/Equipment/All/' + id))
    if (response.status == 200) {
        return {
            Result: response,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response,
            StatusCode: response.status
        };
    }
};


export const Create_Equipment = async (input) => {
    var response = (await axios.post(Base_url + '/api/Equipment/', input))
    if (response.status == 200) {
        return {
            Result: response,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response,
            StatusCode: response.status 
        };
    }
};


export const GetWorkOrderLog_Action = async (id) => {
    var response = (await axios.get(Base_url + '/api/WorkOrder/GetWorkOrderLog/' + id))

    if (response.status == 200) {

        return {
            Result: response,
            StatusCode: response.status
        }
    } else {
        return {
            Result: response,
            StatusCode: response.status
        };
    }
};

export const GetWorkOrder_Action = async (id) => {
    var response = (await axios.get(Base_url + '/api/WorkOrder/GetWorkOrder/USER/' + id))

    if (response.status == 200) {

        return {
            Result: response,
            StatusCode: response.status
        }
    } else {
        return {
            Result: response,
            StatusCode: response.status
        };
    }
};

export const create_WorkOrder = async (EQ_ID, ERR_DESC, REPORTED_BY_ID) => {
    var response = (await axios.post(Base_url + '/api/WorkOrder?EQ_ID=' + EQ_ID + '&ERR_DESC=' + ERR_DESC + '&REPORTED_BY_ID=' + REPORTED_BY_ID))
    if (response.status == 200) {
        return {
            Result: response.data,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status
        };
    } 
};
export const deleteImage = async (id) => {
    var response = (await axios.get(Base_url + '/api/FileUpload/DeleteFile/' + id ))
    if (response.status == 200) {
        return {
        //    Result: response.data.value,
           // ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            StatusCode: response.status,
          //  ResultStatus: response.data.statusCode,
           // StatusCode: response.status
        };
    }
};
 
export const UpdateStatusWorkOrders = async (tWoNo,nStatus) => { 
    
    var response = (await axios.get(Base_url +'/api/WorkOrder/UpdateStatusWorkOrder/'+tWoNo+'/'+nStatus))
    if (response.status == 200) {
        return {
            Result: response,
        //    Result: response.data.value,
           // ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            Result: response,
            StatusCode: response.status,
          //  ResultStatus: response.data.statusCode,
           // StatusCode: response.status
        };
    }
};

export const GetEqType = async () => { 
    
    var response = (await axios.get(Base_url +'/api/Equipment/GetEqType'))
    if (response.status == 200) {
        return {
           Result: response.data,
           // ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            Result: response.data,
            StatusCode: response.status,
          //  ResultStatus: response.data.statusCode,
           // StatusCode: response.status
        };
    }
    
};

export const GetProductAll = async (nPage,nItemPerPage,nType,tName) => { 
    
    var response = (await axios.get(Base_url +'/api/Promotion/GetProductAll?Page='+nPage+'&ItemPerPage='+nItemPerPage+'&type='+nType+'&name='+tName))
    if (response.status == 200) {
        return {
           Result: response.data,
           // ResultStatus: response.data.statusCode,
            StatusCode: response.status
        }
    } else {
        return {
            Result: response.data,
            StatusCode: response.status,
          //  ResultStatus: response.data.statusCode,
           // StatusCode: response.status
        };
    }
    
};