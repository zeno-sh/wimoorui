<template>
	<div class="tree-content" :class="{'isHidden':!leftAside}">
	<div v-show="leftAside" >
	<div class="ad-tree el-white-bg" >
		<div class="ad-head">
			<AdGroup :border="false" @change="changeGroup"/>
		</div>
	  <div class="ad-body">
		  <div class="sw-tab">
			  <div class="sw-item "
			   :class="{'sw-active':item.value==adtype}" 
			   v-for="(item,index) in btnData"
			   @click="handleChangeAdtype(index)"
				>{{item.name}}</div>
		  </div>
		  <div class="m-16">
				 <el-input placeholder="搜索广告活动...">
					 <template #suffix>
					  <el-icon><Search /></el-icon>
					 </template>
				 </el-input>
		 </div>
		 <el-scrollbar height="calc(100vh - 247px)">
		<!-- 广告活动	 -->
		 <el-tree
		  v-if="adtype==0"
		  :data="treeData"
		  :props="defaultProps"
		   node-key="id"
		   :default-expanded-keys="[1]"
		  @node-click="handleNodeClick" >
		  <template #default="scope">
			  <div class="item-node">
				  <i v-if="scope.node.level>1" class="dot-state" 
				  :class="scope.data.status?'dot-green':'dot-red'"
				  ></i>
				  <span>{{scope.node.label}}</span>
			  </div>
		  </template>
		  </el-tree>
		 <!-- 广告组合 -->
		 <el-tree
		  v-else
		  :data="adGroupsData"
		  :props="defaultProps"
		   node-key="id"
		   :default-expanded-keys="[1]"
		  @node-click="handleNodeClick" >
		  <template #default="scope">
		 			  <div class="item-node flex-center-between">
		 				  <span>{{scope.node.label}}</span>
						  <span
						  @click.stop="visable=true"
						  v-if="scope.node.level==1">
						  <el-button size="small" text title="添加广告组合">
						  <el-icon class="font-medium"><Plus /></el-icon>
						  </el-button>
						  </span>
		 			  </div>
		  </template>
		  </el-tree>
		  </el-scrollbar>
	  </div>
	  </div>
	  </div>
	  <div class="expend-btn-tree" >
		 <el-icon
		 @click="leftAside=!leftAside"
		 ><ArrowLeftBold /></el-icon>
	  </div>
	  </div>
	  
	  <el-dialog
	  v-model="visable"
	  title="创建广告组合"
	  width="600px"
	  >
	  <el-form v-model="formData" label-position="top">
		  <el-form-item label="广告组合名称">
			  <el-input v-model="formData.name"></el-input>
		  </el-form-item>
		  <el-form-item label="预算类型">
			    <el-radio-group v-model="formData.radio" >
			        <el-radio label="1" >无预算上限</el-radio>
			        <el-radio label="2">日期范围预算上线</el-radio>
			      </el-radio-group>
		  </el-form-item>
	  </el-form>
	 <template #footer>
		 <el-button @click="visable=false">取消</el-button>
		 <el-button type="primary">确认</el-button>
	 </template>	  
	  </el-dialog>
</template>

<script setup>
	import {h, ref ,watch,reactive,onMounted,toRefs} from 'vue'
	import {Search,ArrowLeftBold,Plus} from '@element-plus/icons-vue'
	import AdGroup from '@/components/header/ad_group.vue';
	import '@/assets/css/switch_button.css';
	const emit = defineEmits(['change']);
	const state = reactive({
		adtype:0,
		leftAside:true,
		visable:false,
		queryParams:{},
		formData:{
			name:'',
		},
		btnData:[
			{name:'广告活动',value:0},
			{name:'广告组合',value:1},
		],
		adGroupsData:[
			{
				label: '广告组合',
				level:1,
				id:1,
				children:[
					{
					 label: 'Portfolio1',
					 level:2,	 
					},
					{
					 label: 'Portfolio2',
					 level:2,	 
					},
				]
			}
		],
		treeData:[
			{
				label: '已启动',
				level:1,
				id:1,
				children:[{
					label: 'campaign1',
					status:true,
					level:2,
					children:[
						{
							label: 'SBV_KW_B3043FPJJB_Acrylic Snowflake_PPT',
							status:false,
							level:3,
						}
					]
				},
				{
					label: 'campaign2',
					status:true,
					level:2,
					children:[
						{
							label: 'SBV_KW_B3043FPJJB_Acrylic Snowflake_PPT',
							status:false,
							level:3,
						}
					]
				}
				],
			},{
				label: '已暂停',
				level:1,
				children:[{
					label: 'campaign1',
					status:true,
					level:2,
					children:[
						{
							label: 'SBV_KW_B3043FPJJB_Acrylic Snowflake_PPT',
							status:true,
							level:3,
						}
					]
				}],
			},{
				label: '已归档',
				status:false,
				level:1,
				children:[{
					label: 'campaign1',
					status:false,
					level:2,
					children:[
						{
							label: 'SBV_KW_B3043FPJJB_Acrylic Snowflake_PPT',
							status:false,
							level:3,
						}
					]
				}],
			},
		],
	})
	
	const{
		btnData,
		adtype,
		treeData,
		leftAside,
		adGroupsData,
		visable,
		formData,
		queryParams,
	}=toRefs(state)
	function handleChangeAdtype(index){
		state.adtype = index
	}
	function changeGroup(data){
		state.queryParams.groupid=data.groupid;
		state.queryParams.profileid=data.profileid;
		emit("change",state.queryParams);
	}
</script>

<style>
	.el-tree-node__label{
		flex-grow:1;
	}
	.tree-content{
		position:relative;
		height:calc(100vh - 66px);
	}
	.ad-tree{
		width:248px;
		box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
		margin-left:16px;
	}
	.expend-btn-tree{
		position:absolute;
		right:-24px;
		top:49%;
		width:24px;
		height:24px;
	}
	.isHidden .expend-btn-tree{
		right:-24px;
	}
	.expend-btn-tree .el-icon{
		background: #fff;
		    height: 40px;
		    width: 21px;
		    border: 2px solid #eee;
		    border-left: none;
		    padding-right: 4px;
			font-size: 12px;
			color: #333;
			font-weight:700;
		    border-bottom-right-radius: 32px;
		    border-top-right-radius: 32px;
			cursor:pointer;
	}
	.expend-btn-tree .el-icon:hover{
		color: #ff6700;
	}
	.ad-head{
		padding:8px;
		border-bottom:1px solid #eee;
	}
	.ad-body{
		padding:16px;
	}
    .m-16{
		margin-top:16px;
		margin-bottom:16px;
	}
	.dot-state{
		width:8px;
		height:8px;
		display: inline-block;
		border-radius:4px;
		margin-right:8px;
	}
	.dot-green{
		background:#69d632;
	}
	.dot-red{
		background:#ff5f59;
	}
	.item-node{
		display:flex;
		align-items:center;
	}
	.ad-body .el-tree-node{
		padding-top:8px;
		padding--bottom:8px;
	}
</style>