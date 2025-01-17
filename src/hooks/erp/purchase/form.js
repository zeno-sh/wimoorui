import { ElMessage, ElMessageBox } from 'element-plus';
import purchaselistApi from '@/api/erp/purchase/form/listApi.js';
export	function updateItem(sub){
		purchaselistApi.updatePrice({"id":sub.id,"amount":sub.edit_amount,"price":sub.edit_itemprice,"totalprice":sub.edit_orderprice}).then((res)=>{
			if(res.data){
               sub.amount=sub.edit_amount;
			   sub.itemprice=sub.edit_itemprice;
			   sub.orderprice=sub.edit_orderprice;
				ElMessage({
				  type: 'success',
				  message: '操作成功！',
				})
			}
		});
		sub.withoutEdit = true;
	}
	
export	function changeItemAmount(sub){
		sub.edit_amount=CheckInputInt(sub.edit_amount);
		if(sub.edit_itemprice && sub.edit_itemprice>0 && sub.edit_amount){
			sub.edit_orderprice=formatFloat(sub.edit_itemprice*sub.edit_amount);
		}
	}
export	function changeItemOrderprice(sub){
		sub.edit_orderprice=CheckInputFloat(sub.edit_orderprice);
		if(sub.edit_orderprice && sub.edit_orderprice>0 && sub.edit_amount){
			sub.edit_itemprice=formatFloat(sub.edit_orderprice/sub.edit_amount);
		}
	}
export	function changeItemPrice(sub){
		sub.edit_itemprice=CheckInputFloat(sub.edit_itemprice);
		if(sub.edit_itemprice && sub.edit_itemprice>0 && sub.edit_amount){
			sub.edit_orderprice=formatFloat(sub.edit_itemprice*sub.edit_amount);
		}
	}
export	function handleChanges(row){
	console.log(row);
			if(row.paystatus==3){
				ElMessage({
				  type: 'error',
				  message: '单据正在请款中，暂不支持变更！',
				})
			}else{
				row.edit_amount=row.amount;
				row.edit_itemprice=row.itemprice;
				row.edit_orderprice=row.orderprice;
				row.withoutEdit=false;
			}
		}
export function handleDelete(row){ 	//单据作废
		if(row.paystatus==3){
			ElMessage({
			  type: 'error',
			  message: '单据正在请款中，暂不支持作废！',
			})
		}else{
			ElMessageBox.confirm(
			   '确定要作废该采购单吗？',
			   '单据作废',
			   {
			     confirmButtonText: '确认',
			     cancelButtonText: '取消',
			     type: 'warning',
			   }
			 )
			   .then(() => {
							purchaselistApi.deleteEntry({"id":row.id}).then((res)=>{
								if(res.data){
									row.auditstatus=0;
									ElMessage({
									  type: 'success',
									  message: '单据已作废',
									})
								}
							});
			     
			   })
		}
	}
export function updatenotice(id,notice,row){
 	purchaselistApi.updateNotice({"entryid":id,"notice":notice}).then((res)=>{
 		if(res.data){
 			row.remark= notice;
 			ElMessage({
 			  type: 'success',
 			  message: '备注修改成功！',
 			})
 		}
 	});
 }
export function updateCycleDate(id,cycle,row){
 	purchaselistApi.updateCycle({"id":id,"amount":cycle}).then((res)=>{
 		if(res.data){
 			row.delivery_cycle= cycle;
 			ElMessage({
 			  type: 'success',
 			  message: '供货周期修改成功！',
 			})
 		}
 	});
 }
export function changeDeliveryDate(id,changedate){
	 purchaselistApi.changeDeliveryDate({"id":id,"deliverydate":changedate}).then((res)=>{
	 	if(res.data=="ok"){
	 		ElMessage({
	 		  type: 'success',
	 		  message: '预计到货日期修改成功！',
	 		})
	 	}
	 });
 }
 
export function handleChangesub(row){
		ElMessageBox.confirm(
			   '确定要撤回该采购单吗？',
			   '单据撤回',
			   {
			     confirmButtonText: '确认',
			     cancelButtonText: '取消',
			     type: 'warning',
			   }
			 )
			   .then(() => {
							 purchaselistApi.recallEntry({"id":row.id}).then((res)=>{
							 	if(res.data){
							 		row.auditstatus=1;
							 		row.ischange=1;
							 		row.withoutEdit=true;
							 		ElMessage({
							 		  type: 'success',
							 		  message: '撤回成功！',
							 		})
							 	}
							 });
			     
			   })
		}