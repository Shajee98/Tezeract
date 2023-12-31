import responseCodes from "../constants/ResponseCodes";
import responses from "../constants/Responses";

const responeObject = (status: number, success: boolean, data: any, error: any) => {
  return {
    status: {
      code: status,
      success: success,
    },
    data: data,
    error: error,
  };
};

export const serverErrorResponse = (res: any, message: string) => {
  res.status(responseCodes.SERVER_ERROR).send(
    responeObject(responseCodes.SERVER_ERROR, false, null, {
      message: message ? message : responses.FAILURE,
    })
  );
};

export const successResponse = (res: any, dataObj: any) => {
  res
    .status(responseCodes.SUCCESS)
    .send(responeObject(responseCodes.SUCCESS, true, dataObj, null));
};

export const genericResponseByData=(data: any,msg: any) => {
  if(data){
    const success=msg && typeof msg.success != "undefined" ? msg.success :"success";
    return  {status:{code:200,success:true},data:data,error:false,msg:success};
  }else{
    const error=msg && typeof msg.error != "undefined" ? msg.error :"something went wrong";
    return {status: {code:500,success:false},error:{message:error },data:null,code:500};
  }
}
