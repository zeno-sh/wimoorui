import request from "@/utils/request";
import downloadhandler from "@/utils/download-handler";

 function downloadTraceuploadTemp(data,callback){
 	return request({url:"/amazon/api/v1/ship/shipInboundshipmentTraceupload/downloadTraceuploadTemp",
 				                    responseType:"blob",
 									params:data,
 									method:'get'}).then(res => {
 											downloadhandler.downloadSuccess(res,"downloadTraceuploadTemp.xlsx");
 											if(callback){
 												callback();
 											}
 									}).catch(e=>{
 											downloadhandler.downloadFail(e);
 											if(callback){
 												callback();
 											}
 									}); 
 }
function uploadTraceuploadFile(FormData){
 	return request({'method':'POST',
 	                 'url':"/amazon/api/v1/ship/shipInboundshipmentTraceupload/uploadTraceuploadFile",
 				    'data':FormData,
 					'headers':{'Content-Type':"multipart/form-data"},
 				
 	});
 	
 }
 
 function recordList(data){
	  return request.get('/amazon/api/v1/ship/shipInboundshipmentTraceupload/recordList',{params:data});
 }
 
 export default{
 	downloadTraceuploadTemp,uploadTraceuploadFile,recordList,
 }
