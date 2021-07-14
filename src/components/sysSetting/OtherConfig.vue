<template>
   <div class="other_config">
		<div class="config_content">
			<div class="moudel">
				<div class="version_info">
					<div class="left_top"></div>
					<div class="right_top"></div>
					<div class="left_bottom"></div>
					<div class="right_bottom"></div>
					<div class="moudel_title">同步设置</div>
					<div class="operation_area">
						<div class="backup_path">
							<div
								class=" button_common"
								@click="setSyncSop"
							>同步SOP</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="moudel">
				<div class="watchdog_config">
					<div class="left_top"></div>
					<div class="right_top"></div>
					<div class="left_bottom"></div>
					<div class="right_bottom"></div>
					<div class="moudel_title">配置管理</div>
					<div class="operation_area">
						<div
							class="button_common"
							style="margin-bottom:1rem;"
							@click="fileExport"
						><img src="../../../assets/images/export.png">配置导出</div>
						<div class="button_common">
							<input
								type="file"
								name="file"
								class="config_upload"
								title="点击此处选择上传文件"
								@change="uploadChange($event,0)"
								accept="application/zip"
								value=""
							>
							<img
								style="cursor: pointer;"
								src="../../../assets/images/import.png"
							>配置导入</div>
					</div>
				</div>
			</div>
			<div class="moudel">
				<div class="reset_config">
					<div class="left_top"></div>
					<div class="right_top"></div>
					<div class="left_bottom"></div>
					<div class="right_bottom"></div>
					<div class="moudel_title">复位设置</div>
					<div class="operation_area">
						<div style="display:flex;margin-bottom:1rem;width:17rem;justify-content: space-around;">
							<span
								class="button_common"
								@click="setMaintain('Reboot')"
							>重启板卡</span>
							<span
								class="button_common"
								@click="setMaintain('PowerReset')"
							>电源复位</span>
						</div>
						<div
							class="save_config button_common"
							@click="setMaintain('FactoryReset')"
						>恢复除网口配置外的出厂设置</div>
					</div>
				</div>
			</div>
			<div class="moudel">
				<div class="watchdog_config">
					<div class="left_top"></div>
					<div class="right_top"></div>
					<div class="left_bottom"></div>
					<div class="right_bottom"></div>
					<div class="moudel_title">看门狗设置</div>
					<div class="operation_area">
						<div class="checkbox_btn"><label><input
									type="checkbox"
									v-model="useWatchDog"
								><span>看门狗使能</span></label></div>
						<div class="watchdog_save">
							<div
								class="save_btn button_common"
								@click="setWatchDogConfig"
							>保存</div>
						</div>
					</div>
				</div>
			</div>
			<div class="moudel">
				<div class="watchdog_config">
					<div class="left_top"></div>
					<div class="right_top"></div>
					<div class="left_bottom"></div>
					<div class="right_bottom"></div>
					<div class="moudel_title">板卡工作模式设置</div>
					<div
						class="operation_area"
						style="height: calc(75% - 3rem);margin-top: 0;justify-content:flex-end;"
					>
						<div class="checkbox_btn">
							<span>板卡工作模式：</span>
							<el-switch
								class="switchStyle"
								v-model="switchBoardWorkMode"
								active-color="#0083D9"
								active-text="自动"
								inactive-text="手动"
								inactive-color="#FF8400"
							>
							</el-switch>
							//active-value="0"
                                    inactive-value="1" 
						</div>
						<div class="watchdog_save">
							<div
								class="save_btn button_common"
								@click="changeSwitchMode"
							>保存</div>
						</div>
					</div>
					<div
						class="notice"
						style="margin:0.8rem 1rem 0;height:20%;display:flex;align-items: center;"
					>*说明：双机热备时的板卡模式开关，自动模式下双板卡之间会协商输出。</div>
				</div>
			</div>
			<div class="moudel">
				<div class="watchdog_config">
					<div class="left_top"></div>
					<div class="right_top"></div>
					<div class="left_bottom"></div>
					<div class="right_bottom"></div>
					<div class="moudel_title">板卡输出设置</div>
					<div
						class="operation_area"
						style="height: calc(75% - 3rem);margin-top: 0;justify-content:flex-end;"
					>
						<div class="checkbox_btn"><label><input
									type="checkbox"
									v-model="useBoardOut"
								><span>板卡输出使能</span></label></div>
						<div class="watchdog_save">
							<div
								class="save_btn button_common"
								@click="setBoardOutConfig"
							>保存</div>
						</div>
					</div>
					<div
						class="notice"
						style="margin:0.8rem 1rem 0;height:20%;display:flex;align-items: center;"
					>*说明：使能关闭后，板卡无输出。</div>
				</div>
			</div>
			<div class="log_moudel">
				<div class="watchdog_config">
					<div class="left_top"></div>
					<div class="right_top"></div>
					<div class="left_bottom"></div>
					<div class="right_bottom"></div>
					<div class="moudel_title">日志配置</div>
					<div class="log_area">
						<div class="line_item">
							<div class="select_box">
								<span style="width:50%">日志输出等级：</span>
								<el-select
									style="width:45%"
									v-model="logLevel"
									placeholder="请选择"
								>
									<el-option
										v-for="item in options"
										:key="item.logLevel"
										:label="item.label"
										:value="item.logLevel"
									>
									</el-option>
								</el-select>
							</div>
							<div style="margin-right:1rem;"><label><input
										type="checkbox"
										v-model="logSwitch.comEn"
									><span>串口输出</span></label></div>
							<div class=""><label><input
										type="checkbox"
										v-model="logSwitch.telnetEn"
									><span>Telnet输出</span></label></div>
						</div>
						<div class="line_item">
							<div class="check_item"><label><input
										type="checkbox"
										v-model="logSwitch.netEn"
									><span>网络输出</span></label></div>
							<div class="check_item"><label><input
										type="checkbox"
										v-model="logSwitch.fileEn"
									><span>本地文件保存，路径：root/sda/log</span></label></div>
						</div>
						<div class="line_item"><label><input
									type="checkbox"
									v-model="logSwitch.logDetailShowEn"
								><span>日志内容展示文件、函数、行号</span></label></div>
						<div class="watchdog_save">
							<div
								class="save_btn button_common"
								@click="setSystemLogConfig"
							>保存</div>
						</div>
					</div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent,ref ,reactive,toRefs,onMounted} from 'vue'
import { SysAjax } from '@/utils/ajaxUtil'
import { ElMessage } from 'element-plus'
import { useRoute,useRouter} from 'vue-router'
export default defineComponent({
   name:'',
   components:{},
   setup(props,context){
       const state = reactive({

       })
       onMounted(() => {

       })
       const methods = {
           setSyncSop(){
               //暂缓设置
            //    SysAjax.setSysUpdate()
           }
       }
       return {
           ...toRefs(state),
           ...methods
        }
   }
})
</script>
<style scope lang="less">
.other_config {
	width: 100%;
	height: calc(100% - 2rem);
	padding-top: 2rem;
	display: flex;
	justify-content: center;

	.config_content {
		width: 90%;
		height: 80%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.operation_area {
		height: calc(85% - 3rem);
		margin-top: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		img {
			width: 1.3rem;
			height: 1.3rem;
			margin-right: 0.2rem;
		}
	}

	.moudel {
		width: calc(33% - 2rem);
		height: 35%;
		margin: 0 1rem;
	}
	.log_moudel {
		width: calc(33% - 2rem);
		height: 50%;
		margin: 0 1rem;
	}

	.moudel_title {
		color: #ffa800;
		padding: 0.5rem 1rem;
		font-size: 1.1rem;
		border-bottom: 1px solid #12659b;
	}

	.watchdog_config,
	.reset_config,
	.version_info {
		font-size: 1rem;
		position: relative;
		width: 100%;
		height: calc(100% - 2rem);
		background: rgba(0, 84, 160, 0.24);
		margin: 0.5rem 0 1rem;
	}

	.checkbox_btn {
		height: calc(50% - 3rem);
		padding: 0 0 3rem 0;
	}

	.version_info {
		.el-input {
			width: 70%;
			display: flex;
			align-items: center;
			margin: 0 2rem 0 1rem;
		}

		.el-input__inner {
			&:hover {
				border: 1px solid #0084ff !important;
			}
			border-radius: 0.5rem;
			height: 50% !important;
		}
	}

	.upload_box {
		width: calc(100% - 1rem);
		margin-left: 1rem;
		position: relative;
		display: flex;
		align-items: center;
		margin-bottom: 1rem;

		.upload__input {
			width: 30rem;
			cursor: pointer;
			opacity: 0;
			z-index: 99;
			position: absolute;
			top: 0.5rem;
			right: 1rem;
		}
		.el-input {
			input {
				cursor: pointer;
			}
		}
	}

	.config_upload {
		cursor: pointer;
		height: 2rem;
		width: 12rem;
		opacity: 0;
		z-index: 99;
		position: absolute;
		top: 0;
		right: 0;
	}

	.save_btn {
		padding: 0.3rem 2rem;
	}

	.save_config {
		width: 15rem;
	}

	.watchdog_save {
		height: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.backup_path {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.notice {
		color: #83cafa;
		margin-left: 1rem;
	}

	.log_area {
		height: 90%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.line_item {
		margin: 1rem 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: calc(100% - 2rem);
	}

	.select_box {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 50%;
	}

	.check_item {
		margin-right: 1.5rem;
	}
	@media (max-height: 700px) {
		.moudel {
			height: 38%;
		}
		.line_item {
			margin: 0.6rem 1rem;
		}
	}
	.switchStyle .el-switch__label--left {
		z-index: 9;
		left: 20px;
		top: 0;
	}
	.switchStyle .el-switch__label--right {
		z-index: 9;
		top: 0;
		left: 0;
	}
}
</style>