<template>
	<div class="gird-line-head el-white-bg">
		<div class="flex-center">
			<el-space>
		<Group @change="groupChange"   />
		<el-input v-model="queryParams.search"  @input="handleQuery"  placeholder="请输入" class="input-with-select">
			<template #prepend>
				<el-select v-model="queryParams.ftype" @change='handleQuery' style="width:100px;" placeholder="SKU">
					<el-option label="平台SKU" value="sku">平台SKU</el-option>
					<el-option label="ASIN" value="asin">ASIN</el-option>
					<el-option label="本地SKU" value="msku">本地SKU</el-option>
					<el-option label="商品名称" value="name">商品名称</el-option>
					<el-option label="子SKU" value="childsku">子SKU</el-option>
					<el-option label="子ASIN" value="childasin">子ASIN</el-option>
					<el-option label="父ASIN" value="parentasin">父ASIN</el-option>
				</el-select>
			</template>
			<template #append>
					<el-button @click="handleQuery">
						<el-icon class="font-base ic-cen">
							<search />
						</el-icon>
			 </el-button>
				</template>
			</el-input>
			</el-space>
		</div>
		<el-button class='ic-btn' title='帮助文档'>
			<help theme="outline" size="16" :strokeWidth="3" />
		</el-button>
		
	</div>
	<!--  -->
	<div class="grid-content">
	<div class="left-content el-white-bg ">
		<div class="con-header">
		<h4>SKU列表</h4>
		</div>
		 <el-scrollbar style="height:calc(100vh - 280px)">
			 <div  >
			<ul class="sku-list" v-infinite-scroll="load">
			 <li class="pointer" v-for="item in tableData" @click="selectSku(item.sku)" :class="{'active':item.active}">{{item.sku}}<div class="font-extraSmall">ASIN：{{item.asin}}</div></li>	
			</ul>
			</div>
		</el-scrollbar>
		<pagination
		  v-if="total > 0"
		  :total="total"
		  layout="total,prev,next"
		  v-model:page="queryParams.currentpage"
		  v-model:limit="queryParams.pagesize"
		  @pagination="handleQuery"
		/>
	</div>
	
	<div class="right-content">
		<el-scrollbar class="screen-height gary-bg">
			<DataDeatils ref="dataDeatilsRef"/>
		</el-scrollbar>
	</div>
	</div>
</template>

<script setup>
	import {Help} from '@icon-park/vue-next';
	import {Search,ArrowDown,} from '@element-plus/icons-vue';
	import DataDeatils from"./components/data_deatils"
	import Group from '@/components/header/group.vue';
	import {ref,reactive,toRefs,onMounted}from"vue";
	import productAnysApi from '@/api/amazon/product/productAnysApi.js';
	let dataDeatilsRef=ref();
	let state=reactive({
		tableData:[],
		total:10,
		queryParams:{
			pagesize:10,
			currentpage:1,
			ftype:'sku',
		}
	})
	let {tableData,total,queryParams} =toRefs(state);
	let load = () => {
	  console.log("滚动加载数据方法")
	}
	function selectSku(sku){
		state.tableData.forEach((item)=>{
			item.active = false;
			if(item.sku==sku){
				item.active=true;
				dataDeatilsRef.value.show(item);
			}
		})
	}
	function groupChange(obj){
				state.queryParams.groupid=obj.groupid;
				state.queryParams.marketplaceid=obj.marketplaceid;
				handleQuery();
	}
	function handleQuery(){
		productAnysApi.productAsinList(state.queryParams).then((res)=>{
			state.tableData=res.data.records;
			state.total=res.data.total;
			if(state.total>0){
				selectSku(res.data.records[0].sku);
			}
		});
	}
	 
</script>

<style scoped="scoped">
	.grid-content{
		display: flex;
	}
	.con-header{
		margin:16px 24px; 
	}
	.con-header h4{
		margin-top:16px;
	}
	.sku-list li{
		padding:16px 16px 16px 24px;
	}
	.sku-list li.active{
		background-color: var(--el-bg-color);
		border-left:3px solid var(--el-color-primary)
	}
  .right-content{
	  flex:1;
  }
 .screen-height{
	   height:calc(100vh - 108px); 
  }
  .left-content{
	  width: 200px;
  }
</style>
