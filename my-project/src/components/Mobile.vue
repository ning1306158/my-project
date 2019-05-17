<template>
	<div class="hello">
		<el-form :inline="true" :model="formInline" class="demo-form-inline" @submit.native.prevent>
			<el-form-item label="搜索">
				<el-input v-model="formInline.key" placeholder="请输入关键字" @keyup.enter.native="onSubmit" @current-change="onSubmit"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<el-form :inline="true" :model="color" class="demo-form-inline" @submit.native.prevent>
			<el-form-item label="红">
				<el-input v-model="color.red" placeholder="请输入关键字" @keyup.enter.native="onSubmit" @current-change="selectColor"></el-input>
			</el-form-item>
			<el-form-item label="绿">
				<el-input v-model="color.green" placeholder="请输入关键字" @keyup.enter.native="onSubmit" @current-change="selectColor"></el-input>
			</el-form-item>
			<el-form-item label="蓝">
				<el-input v-model="color.blue" placeholder="请输入关键字" @keyup.enter.native="onSubmit" @current-change="selectColor"></el-input>
			</el-form-item>
			<el-form-item label="黄">
				<el-input v-model="color.yellow" placeholder="请输入关键字" @keyup.enter.native="onSubmit" @current-change="selectColor"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="selectColor">筛选</el-button>
			</el-form-item>
		</el-form>

		<el-table :data="tableData" class="tb-edit" highlight-current-row @row-click="handleCurrentChange">
			<el-table-column label="武将名"> <template scope="scope">
					<span>{{scope.row.hero.name}}</span> </template> </el-table-column>
			<el-table-column prop="address" label="技能名"> <template scope="scope">
					<span @click="showDesc(scope.$index,scope.row.skill.skill_desc)">{{scope.row.skill.skill_name}}</span> </template>
			</el-table-column>
			<!-- <el-table-column prop="address" label="技能描述"> <template scope="scope"> <span>{{scope.row.skill.skill_desc}}</span>
				</template> </el-table-column> -->
			<el-table-column prop="address" label="红" width="40px"> <template scope="scope"> <span>{{scope.row.skill.red}}</span>
				</template> </el-table-column>
			<el-table-column prop="address" label="绿" width="40px"> <template scope="scope"> <span>{{scope.row.skill.green}}</span>
				</template> </el-table-column>
			<el-table-column prop="address" label="蓝" width="40px"> <template scope="scope"> <span>{{scope.row.skill.blue}}</span>
				</template> </el-table-column>
			<el-table-column prop="address" label="黄" width="40px"> <template scope="scope"> <span>{{scope.row.skill.yellow}}</span>
				</template> </el-table-column>
			<!-- 			<el-table-column label="操作"> <template scope="scope">
					<el-button size="small" type="success" @click="handleCopy(scope.$index, scope.row)">复制</el-button>
				</template> </el-table-column> -->
		</el-table>
		<div class="block">
			<el-pagination background :current-page="currentPage" layout="prev, pager, next" :total="totelEle" @current-change="skipPage">
			</el-pagination>
		</div>

	</div>
</template>
<script>
	import axios from 'axios'
	export default {
		name: 'H',
		data() {
			return {
				tableData: [],
				formInline: {
					page_num: 1,
					page_size: 10,
					key: ''
				},
				color: {
					red: '',
					green: '',
					blue: '',
					yellow: ''
				},
				currentPage: 1,
				totelPageNum: 100,
				totelEle: 100
			}
		},
		created: function() {
			this.getSkill()
		},
		methods: {
			findData(url) {
				console.log("yes");
				alert("请求数据")
				axios.post('api/Hero/findAll', this.searchForm).then(res => {
					console.log(res.data)
				})
			},
			async getSkill() {
				try {
					axios.post('api/Hero/findAllSkill', this.formInline).then(res => {
						this.tableData = res.data.content
						this.totelPageNum = res.data.totalPages
						this.totelEle = res.data.totalElements
						this.currentPage = res.data.number + 1
						console.log(res);
					})
				} catch (error) {
					console.error(error);
				}
			},
			async nextPage(mi) {
				try {
					const response = await axios.post('api/Hero/findSkill', this.formInline);
					this.tableData = response.data.content
					this.totelPageNum = response.data.totalPages
					this.totelEle = response.data.totalElements
					this.currentPage = response.data.number + 1
					console.log(response);
				} catch (error) {
					console.error(error);
				}
			},
			async skipPage(n) {
				try {
					this.formInline.page_num = n
					const response = await axios.post('api/Hero/findSkill', this.formInline);
					this.tableData = response.data.content
					this.totelPageNum = response.data.totalPages
					this.totelEle = response.data.totalElements
					this.currentPage = response.data.number + 1
					console.log(response);
				} catch (error) {
					console.error(error);
				}
			},
			onSubmit(n) {
				try {
					this.formInline.page_num = 1
					axios.post('api/Hero/findSkill', this.formInline).then(res => {
						this.tableData = res.data.content
						this.totelPageNum = res.data.totalPages
						this.totelEle = res.data.totalElements
						this.currentPage = res.data.number + 1
						console.log(res);
					})
				} catch (error) {
					console.error(error);
				}
			},
			selectColor() {
				axios.post('api/Hero/findSkillColor', this.color).then(res => {
					this.tableData = res.data.content
					this.totelPageNum = 1
					this.totelEle = 1
					this.currentPage = 1
					console.log(res);
				})
			},
			handleCopy(row, event, column) {
				var hero = this.tableData[row].hero
				var skill = this.tableData[row].skill
				var str = hero.name;
				str += '   \n';
				str += skill.skill_name + '   ';
				if (skill.red != 0 && skill.red < 7) {
					str += '红' + skill.red
				}
				if (skill.green != 0 && skill.green < 7) {
					str += '绿' + skill.green
				}
				if (skill.blue != 0 && skill.blue < 7) {
					str += '蓝' + skill.blue
				}
				if (skill.yellow != 0 && skill.yellow < 7) {
					str += '黄' + skill.yellow
				}
				str += '   \n'
				str += skill.skill_desc



				const input = document.createElement('textarea');
				document.body.appendChild(input);
				input.value = str;
				input.select();
				if (document.execCommand('copy')) {
					document.execCommand('copy');
					console.log('复制成功');
				}
				document.body.removeChild(input);

			},
			handleCurrentChange(row, event, column) {

			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			showDesc(row,skill_desc) {
				alert(skill_desc)
				var hero = this.tableData[row].hero
				var skill = this.tableData[row].skill
				var str = hero.name;
				str += '   \n';
				str += skill.skill_name + '   ';
				if (skill.red != 0 && skill.red < 7) {
					str += '红' + skill.red
				}
				if (skill.green != 0 && skill.green < 7) {
					str += '绿' + skill.green
				}
				if (skill.blue != 0 && skill.blue < 7) {
					str += '蓝' + skill.blue
				}
				if (skill.yellow != 0 && skill.yellow < 7) {
					str += '黄' + skill.yellow
				}
				str += '   \n'
				str += skill.skill_desc
				const input = document.createElement('textarea');
				document.body.appendChild(input);
				input.value = str;
				input.select();
				if (document.execCommand('copy')) {
					document.execCommand('copy');
					console.log('复制成功');
				}
				document.body.removeChild(input);
			}
		}
	}
</script>
