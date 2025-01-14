import request from "@/utils/request";
import downloadhandler from "@/utils/download-handler";

function saveData(data){
	return request.post('/erp/api/v1/purchase_form/saveData',data);
}
function getPriceBySupplier(data){
	return request.get('/erp/api/v1/purchase_form/getPriceBySupplier',{params:data});
}
function downExcelTemp(data){
	return request({url:"/erp/api/v1/purchase_form/downExcelTemp",
				                    responseType:"blob",
									params:data,
									method:'get'}).then(res => {
											downloadhandler.downloadSuccess(res,"purchaseFormTemplate.xlsx")
									}).catch(e=>{
											downloadhandler.downloadFail();
									}); 
}
function uploadExcel(FormData){
	return request({'method':'POST',
	                'url':"/erp/api/v1/purchase_form/uploadExcel",
				    'data':FormData,
					'headers':{'Content-Type':"multipart/form-data"},
				
	});
}

function getConsumableByMainSKU(data){
	return request.get('/erp/api/v1/purchase_form/getConsumableByMainSKU',{params:data});
}
function getBatchList(data){
	return request.get('/erp/api/v1/purchase/plan/item/getBatchList',{params:data});
}


export default{
	 saveData,getPriceBySupplier,downExcelTemp,uploadExcel,getConsumableByMainSKU,getBatchList,
}