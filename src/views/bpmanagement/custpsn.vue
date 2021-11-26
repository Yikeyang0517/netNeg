<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="searchQuery.company" placeholder="协力公司" clearable filterable style="width: 200px" class="filter-item">
        <el-option v-for="comp in companyOptions" :key="comp.key" :label="comp.value" :value="comp.key" />
      </el-select>
      <el-input placeholder="姓名" v-model="searchQuery.custpsnName" clearable style="width: 200px" class="filter-item"/>
      <el-select v-model="searchQuery.sales" placeholder="营业负责" clearable filterable class="filter-item" style="width: 200px">
        <el-option v-for="item in salesOptions" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 20px" @click="search">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button> -->
      <svg-icon class="link-type" style="margin-left: 10px;" icon-class="peoples" @click="goContactList(0)" />
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      style="width: 100%;"
      :row-style="tableRowStyle"
    >
      <el-table-column label="ID" prop="id" align="center" width="50" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="chk" width="50px">
      <template slot-scope="{row}">
        <el-checkbox v-model="row.checked" ></el-checkbox>
      </template>
      </el-table-column>
      <el-table-column label="提醒" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <el-tag v-if="row.contactflg" :title="row.contactflg=1?'该联系了':null" style="background-color: #99CC33">
            <svg-icon icon-class="email" />
          </el-tag>
          <el-tag v-if="row.prjflg" :title="'有在谈项目'" style="background-color: #FFCC33">
            <svg-icon icon-class="form" />
          </el-tag>
          <el-tag v-if="row.wngtext" :title="row.wngtext" style="background-color: #FF6633">
            <svg-icon icon-class="star" />
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.custpsnName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次沟通日期" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contactdate | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="BP" width="200px">
        <template slot-scope="{row}">
          <span>{{ row.bpName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="沟通记录" align="center" width="95">
        <template slot-scope="{row}">
          <svg-icon class="link-type" icon-class="peoples" @click="goContactList(row.custpsnId)" />
        </template>
      </el-table-column>
      <el-table-column label="公司职务" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名片" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cardfile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sexName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.old }}</span>
        </template>
      </el-table-column>
      <el-table-column label="国籍" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.countryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="BP负责" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.bpSalesName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="营业负责" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.salesName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="笔记" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.custpsnMemo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="受注案件" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.vPrjcnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="受注人次" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.vFzcnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="协力人次" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.vTgcnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客面人次" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.kmcnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提案人次" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.tTacnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="技术人数" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.psnCnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户人数" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.custpsnCnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近车站" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.psnStation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出生年月日" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.birthday | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.psnTel1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电子邮件" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="沟通次数" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contactcnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="沟通频率" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.maxcnttdays }}</span>
        </template>
      </el-table-column>
      <el-table-column label="在谈项目" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.prjflg == '1'?'Yes':(row.prjflg == '0'?'No':null) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优先提醒度" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.wnglvlName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提醒事项" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.wngtext }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登记日时" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登记人" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createuser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新日时" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新人" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateuser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新/删除" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row.custpsnId)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="姓名" prop="custpsnName">
          <el-input v-model="temp.custpsnName" />
        </el-form-item>
        <el-form-item label="BP" prop="bpName" >
          <el-select v-model="temp.bpName" :disabled="dialogStatus==='create'?false:true" class="filter-item" filterable placeholder="请选择BP" readonly="true">
            <el-option v-for="item in companyOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="公司职务" prop="position">
          <el-input v-model="temp.position" />
        </el-form-item>
        <el-form-item label="名片" prop="cardfile">
          <el-input v-model="temp.cardfile" />
        </el-form-item>
        <el-form-item label="性别" prop="sexName">
          <el-select v-model="temp.sexName" class="filter-item" filterable placeholder="请选择性别">
            <el-option v-for="item in sexNameOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="old">
          <el-input v-model="temp.old" />
        </el-form-item>
        <el-form-item label="国籍" prop="countryName">
          <el-select v-model="temp.countryName" class="filter-item" filterable placeholder="请选择国籍">
            <el-option v-for="item in countryNameOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="营业负责" prop="salesName">
          <el-select v-model="temp.salesName" class="filter-item" filterable placeholder="请选择营业负责人">
            <el-option v-for="item in salesOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="笔记" prop="custpsnMemo">
          <el-input v-model="temp.custpsnMemo" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入摘要内容" />
        </el-form-item>
        <el-form-item label="最近车站" prop="psnStation">
          <el-input v-model="temp.psnStation" />
        </el-form-item>
        <el-form-item label="出生年月日" prop="birthday">
          <el-date-picker v-model="temp.birthday" type="date" placeholder="请选择出生年月日" />
        </el-form-item>
        <el-form-item label="电话" prop="psnTel1">
          <el-input v-model="temp.psnTel1" />
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>
        <el-form-item label="沟通频率" prop="maxcnttdays">
          <el-input v-model="temp.maxcnttdays" />
        </el-form-item>
        <el-form-item label="在谈项目" prop="prjflg">
          <el-select v-model="temp.prjflg" class="filter-item" filterable placeholder="请选择项目状态">
            <el-option v-for="item in prjflgOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="优先提醒度" prop="wnglvlName">
          <el-select v-model="temp.wnglvlName" class="filter-item" filterable placeholder="请选择优先度">
            <el-option v-for="item in wnglvlNameOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="提醒事项" prop="wngtext">
          <el-input v-model="temp.wngtext" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMaster, getCustomList, getCompanyList, getSalesList, fetchList, DeleteCustom, searchItemSales, CustomSearch, createCustom, customUpdate } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      tipMessage: '该联系了',
      list: [
        {
          id: 1,
          checked : false,
        }
      ],
      total: 0,
      mbname: '',
      listLoading: false,
      listQuery: { userId: 'yxf' },
      searchQuery:{
        company: '',
        sales: '',
        custpsnName: '',
        },
      companyOptions:  [
        { key: '', value: '' }
      ],
      salesOptions: [
        { key: '', value: '' }
      ],
      sexNameOptions: [
        { key: '', value: '' }
      ],
      countryNameOptions: [
        { key: '', value: '' }
      ],
      wnglvlNameOptions: [
        { key: '', value: '' }
      ],
      prjflgOptions: [
        { key: '1', value: 'Yes' },
        { key: '0', value: 'No' },
        { key: null, value: null }
      ],
      SuperiorityOptions: ['不急', '可缓', '一般', '优先', '紧急', '特急'],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['需要联系', '在谈项目', '提醒事项'],
      temp: {
        id: undefined,
        company: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: '需要联系'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '更新',
        create: '新增'
      },
      pvData: [
      ],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    this.getMasterList()
  },
  methods: {
    tableRowStyle({row,rowIndex}){
      let stylejson={}
      if(row.checked){
        stylejson.background = '#ff9e81'
        return stylejson
      }

          },
    getList() {
      this.listLoading = true
      getCustomList().then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getMasterList(){
    //获取营业负责人List(检索用)
      getSalesList().then(response => {
        this.salesOptions = response.data
      })
    //获取BPList(检索用)
    getCompanyList().then(response => {
      this.companyOptions = response.data
    })

      //获取sexNameOptions
      getMaster('sex').then(response => {
        this.sexNameOptions = response.data
      })

      //获取countryNameOptions
      getMaster('country').then(response => {
        this.countryNameOptions = response.data
      })

      //获取wnglvlNameOptions
      getMaster('wnglvl').then(response => {
        this.wnglvlNameOptions = response.data
      })

    },
    jumpUrl(e){
     /* this.$router.push({path:e}) */
     //跳转到客户公司HP
     window.open(e,'_blank')
    },
    search() {
      console.log('检索时传参内容')
      console.log(this.searchQuery)
      CustomSearch(this.searchQuery).then(response => {
        this.list = response.data
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    goContactList(customId){
      if(customId!=0){
        this.$router.push({
          path:'/bpmanagement/contactlist',
          query:{
            custpsn:customId,
            }
          })
      }else{
        this.$router.push({path:'/bpmanagement/contactlist'})
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        company: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        contactflg: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.createtime = this.dateTimeFormat(new Date())
          tempData.birthday = this.dateTimeFormat(tempData.birthday)
          tempData.createuser = 'tempAccount'
          tempData.contactdate = this.dateFormat(new Date())
          tempData.sales = tempData.salesName
          tempData.bpid = tempData.bpName
          tempData.sex = tempData.sexName
          tempData.country = tempData.countryName
          tempData.wnglvl = tempData.wnglvlName
          createCustom(tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.temp.tempSales = this.temp.salesName
      this.temp.tempsexName = this.temp.sexName
      this.temp.tempcountryName = this.temp.countryName
      this.temp.tempwnglvlName = this.temp.wnglvlName
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.updatetime = this.dateTimeFormat(new Date()) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          tempData.birthday = this.dateFormat(tempData.birthday)
          //返回salesId
            if(tempData.tempSales !== tempData.salesName){
              tempData.sales = tempData.salesName
            }
            //返回sex
              if(tempData.tempsexName !== tempData.sexName){
                tempData.sex = tempData.sexName
              }
            //返回country
              if(tempData.tempcountryName !== tempData.countryName){
                tempData.country = tempData.countryName
              }
            //返回wnglvl
              if(tempData.tempwnglvlName !== tempData.wnglvlName){
                tempData.wnglvl = tempData.wnglvlName
              }
          customUpdate(tempData).then(() => {
            this.getList()
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    dateFormat:function(time) {
        var date=new Date(time);
        var year=date.getFullYear();
        /* 在日期格式中，月份是从0开始的，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate()
        // 拼接
        return year+''+month+day
    },
    dateTimeFormat:function(time) {
        var date=new Date(time);
        var year=date.getFullYear();
        /* 在日期格式中，月份是从0开始的，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        // 拼接
        return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    },
    handleDelete(id) {
      DeleteCustom(id).then(response => {
        this.getList()
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'company', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'company', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
