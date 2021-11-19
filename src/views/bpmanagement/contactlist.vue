<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="searchQuery.type" placeholder="沟通类别" clearable style="width: 200px" class="filter-item">
        <el-option v-for="comp in cnttTypeOptions" :key="comp.key" :label="comp.value" :value="comp.key" />
      </el-select>
      <el-select v-model="searchQuery.company" placeholder="协力公司" clearable style="width: 200px;margin-left: 10px;" class="filter-item">
        <el-option v-for="comp in companyOptions" :key="comp.key" :label="comp.value" :value="comp.key" />
      </el-select>
      <el-select v-model="searchQuery.prj" placeholder="项目名称" clearable style="width: 200px;margin-left: 10px;" class="filter-item">
        <el-option v-for="comp in prjNameOptions" :key="comp.key" :label="comp.value" :value="comp.key" />
      </el-select>
      <el-select v-model="searchQuery.custpsn" placeholder="客户人员" clearable style="width: 200px;margin-left: 10px;" class="filter-item">
        <el-option v-for="comp in custpsnOptions" :key="comp.key" :label="comp.value" :value="comp.key" />
      </el-select></br>
      <el-select v-model="searchQuery.person" placeholder="技术人员" clearable style="width: 200px;" class="filter-item">
        <el-option v-for="comp in personOptions" :key="comp.key" :label="comp.value" :value="comp.key" />
      </el-select>
      <el-select v-model="searchQuery.sales" placeholder="营业负责" clearable class="filter-item" style="width: 200px;margin-left: 10px;white-space: pre-wrap;">
        <el-option v-for="item in salesOptions" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-date-picker v-model="searchQuery.startime" type="date"clearable class="filter-item" style="margin-left: 10px;" placeholder="沟通记录开始时间" />
      <span> - </span>
      <el-date-picker v-model="searchQuery.endtime" type="date" class="filter-item" style="white-space: pre-wrap;" placeholder="沟通记录结束时间" /></br>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 20px;" @click="search">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button> -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" align="center" width="50" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提醒" class-name="status-col" width="150">
        <template slot-scope="{row}">
          <!-- <el-tag v-if="row.contactflg" :title="row.contactflg=1?'该联系了':null" style="background-color: #99CC33">
            <svg-icon icon-class="email" />
          </el-tag>
          <el-tag v-if="row.prjflg" :title="row.prjflg=1?'有在谈项目':null" style="background-color: #FFCC33">
            <svg-icon icon-class="form" />
          </el-tag>
          <el-tag v-if="row.wngtext" :title="row.wngtext" style="background-color: #FF6633">
            <svg-icon icon-class="star" />
          </el-tag> -->
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.prjName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户人员" width="200px">
        <template slot-scope="{row}">
          <span>{{ row.bpName }} | {{ row.custpsnName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="营业负责" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.salesName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="沟通日期" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contactdate | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="沟通类别" width="100px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.cnttType == '00'">录入</span>
          <span v-if="row.cnttType == '01'">短信</span>
          <span v-if="row.cnttType == '02'">通话</span>
          <span v-if="row.cnttType == '03'">见面</span>
          <span v-if="row.cnttType == '04'">餐饮</span>
          <span v-if="row.cnttType == '05'">出游</span>
          <span v-if="row.cnttType == '20'">要人</span>
          <span v-if="row.cnttType == '21'">提案</span>
          <span v-if="row.cnttType == '31'">客面</span>
        </template>
      </el-table-column>
      <el-table-column label="技术人员" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.psnName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提案价格" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提案面试结果" width="100px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.result == '0'">NG</span>
          <span v-if="row.result == '1'">OK</span>
          <span v-if="row.result == '2'">中止</span>
          <!-- <span>{{ row.result== 0?'NG':(row.result== 1?'OK':(row.result== 2?'中止':null)) }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="简历可信度" width="100px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.resumelvl == '1'">不可信</span>
          <span v-if="row.resumelvl == '2'">有疑点</span>
          <span v-if="row.resumelvl == '3'">一般</span>
          <span v-if="row.resumelvl == '4'">较可靠</span>
          <span v-if="row.resumelvl == '5'">可信赖</span>
        </template>
      </el-table-column>
      <el-table-column label="地点" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cnntime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="耗时分钟" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.workhours }}</span>
        </template>
      </el-table-column>
      <el-table-column label="摘要" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.psncnttmemo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登记日时" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登记人员" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createuser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新/删除" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row.custcnttId)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="项目名称" prop="prjName">
          <el-select v-model="temp.prjName" class="filter-item" placeholder="请选择项目名称">
            <el-option v-for="item in prjNameOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户人员" prop="custpsnName">
          <el-select v-model="temp.custpsnName" class="filter-item" placeholder="请选择客户人员">
            <el-option v-for="item in custpsnOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="营业负责" prop="salesName">
          <el-select v-model="temp.salesName" class="filter-item" placeholder="请选择营业负责人">
            <el-option v-for="item in salesOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="沟通日期" prop="contactdate">
          <el-date-picker v-model="temp.contactdate" type="date" placeholder="请选择沟通日期" />
        </el-form-item>
        <el-form-item label="沟通类别" prop="cnttType">
          <el-select v-model="temp.cnttType" class="filter-item" placeholder="请选择沟通类别">
            <el-option v-for="item in cnttTypeOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="技术人员" prop="psnName">
          <el-select v-model="temp.psnName" class="filter-item" placeholder="请选择技术人员">
            <el-option v-for="item in personOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="提案价格" prop="price">
          <el-input v-model="temp.price" />
        </el-form-item>
        <el-form-item label="提案面试结果" prop="result">
          <el-select v-model="temp.result" class="filter-item" placeholder="请选择面试结果">
            <el-option v-for="item in resultOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="简历可信度" prop="resumelvl">
          <el-select v-model="temp.resumelvl" class="filter-item" placeholder="请选择简历可信度">
            <el-option v-for="item in resumelvlOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="地点" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="时间" prop="cnntime">
          <el-input v-model="temp.cnntime" />
        </el-form-item>
        <el-form-item label="耗时分钟" prop="workhours">
          <el-input v-model="temp.workhours" />
        </el-form-item>
        <el-form-item label="摘要" prop="psncnttmemo">
          <el-input v-model="temp.psncnttmemo" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="登记日时" prop="createtime">
          <el-date-picker v-model="temp.createtime" type="datetime" placeholder="请选择创建时间" />
        </el-form-item>
        <el-form-item label="登记人" prop="createuser">
          <el-input v-model="temp.createuser" />
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

    <el-dialog :visible.sync="dialogPvVisible" title="近期沟通记录">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="沟通方式" />
        <el-table-column prop="pv" label="沟通日时" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, contactInitList, getSalesList, getPrjList, getCustpsnList, getPersonList, contactSearch, DeleteContact, updateContact, fetchPv, createContact } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination


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
          prjName: 'mock项目01',
          bpName: 'mock客户01',
          custpsnName: 'mock客户人员01',
          sales: 'mock销售01',
          contactdate: 20211201111201,
          cnttType: 1,
          psnName: 1,
          price: 1,
          result: '01',
          resumelvl: '1',
          address: 'mock地址01',
          cnntime: 1,
          workhours: 1,
          psncnttmemo: '有在谈项目！',
          createtime: 20211101210912,
          createuser: '操作员Y'
        }
      ],
      total: 0,
      listLoading: false,
      listQuery: { userId: 'yxf' },
      searchQuery:{
        type: '',
        company: '',
        prj: '',
        custpsn: '',
        person: '',
        sales: '',
        stardate: '',
        enddate: '',
        },
        cnttTypeOptions:  [
          { key: '00', value: '录入' },
          { key: '01', value: '短信' },
          { key: '02', value: '通话' },
          { key: '03', value: '见面' },
          { key: '04', value: '餐饮' },
          { key: '05', value: '出游' },
          { key: '20', value: '要人' },
          { key: '21', value: '提案' },
          { key: '31', value: '客面' },
        ],
        resumelvlOptions:  [
          { key: 1, value: '不可信' },
          { key: 2, value: '有疑点' },
          { key: 3, value: '一般' },
          { key: 4, value: '较可靠' },
          { key: 5, value: '可信赖' },
          ],
        resultOptions:  [
          { key: '0', value: 'NG' },
          { key: '1', value: 'OK' },
          { key: '2', value: '中止' },
          ],
        workhoursOptions:  [
          { key: '1', value: '15' },
          { key: '2', value: '30' },
          { key: '3', value: '45' },
          { key: '4', value: '60' },
          { key: '5', value: '90' },
          ],
      companyOptions:  [
        { key: '', value: '' }
      ],
      prjNameOptions: [
        { key: '', value: '' }
      ],
      custpsnOptions:  [
        { key: '', value: '' }
      ],
      personOptions:  [
        { key: '', value: '' }
      ],
      salesOptions: [
        { key: '', value: '' }
      ],
      SuperiorityOptions: ['不急', '可缓', '一般', '优先', '紧急', '特急'],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['需要联系', '在谈项目', '提醒事项'],
      temp: {
        id: undefined,
        company : 1,
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
      dialogPvVisible: false,
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
    /* let self = this
    self.getParams() */
    if(this.$route.query){
      this.searchQuery.company = this.$route.query.company
      this.searchQuery.custpsn = this.$route.query.custpsn
      console.log(this.searchQuery)
       console.log('跳转调用search方法')
      this.search()
    }else{
    this.getList()
    }
    this.getMasterList()
  },
  methods: {
    /* getParams () {
      let bpid = this.$route.query.Id
      if(bpid !==null && bpid !==''){
      this.listLoading = true
      //TODO 带参查询
      }else{
        this.getList()
      }
      }, */
    getList() {
      this.listLoading = true
      contactInitList().then(response => {
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
        console.log('返回营业负责人list')
        /* this.salesOptions = response.data */
        console.log(this.salesOptions)
      })
    //获取BPList(检索用)
      fetchList(this.listQuery).then(response => {
        for(var i=0;i<response.data.length;i++){
          var obj = {
            key: response.data[i].bpid,
            value: response.data[i].bpShort + ' | ' +response.data[i].bpName}
          this.companyOptions.push(obj)
        }
      })
      //获取prjList(检索用)
      getPrjList().then(response => {
        this.prjNameOptions = response.data
      })
      //获取custpsnList(检索用)
      getCustpsnList().then(response => {
        this.custpsnOptions = response.data
      })
      //获取personList(检索用)
      getPersonList().then(response => {
        this.personOptions = response.data
      })
    },
    jumpUrl(e){
     /* this.$router.push({path:e}) */
     //跳转到客户公司HP
     window.open(e,'_blank')
    },
    search() {
      if(this.searchQuery.startime != null){
        this.searchQuery.stardate= this.dateFormat(this.searchQuery.startime.getTime()-24*60*60*1000)
      }else{
        this.searchQuery.stardate = null
      }
      if(this.searchQuery.endtime != null){
        this.searchQuery.enddate= this.dateFormat(this.searchQuery.endtime.getTime()+24*60*60*1000)
      }else{
        this.searchQuery.enddate = null
      }
      console.log('检索时传参内容')
      console.log(this.searchQuery)
      contactSearch(this.searchQuery).then(response => {
        this.list = response.data
        this.total = response.total
        console.log('返回查询结果')
        console.log(response.data)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
          tempData.createuser = 'tempAccount'
          tempData.contactdate = this.dateFormat(tempData.contactdate)
          tempData.sales = tempData.salesName
          tempData.prjId = tempData.prjName
          tempData.psnId = tempData.psnName
          tempData.custpsnId = tempData.custpsnName
          createContact(tempData).then(() => {
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
      this.temp.tempPrj = this.temp.prjName
      this.temp.tempCustpsn = this.temp.custpsnName
      this.temp.tempSales = this.temp.salesName
      this.temp.tempPerson = this.temp.psnName
      this.temp.timestamp = new Date(this.temp.timestamp)
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
          //返回prjId
          if(tempData.tempPrj !== tempData.prjName){
            tempData.prjId = tempData.prjName
          }
          //返回custpsnId
          if(tempData.tempCustpsn !== tempData.custpsnName){
            tempData.custpsnId = tempData.custpsnName
          }
          //返回salesId
            if(tempData.tempSales !== tempData.salesName){
              tempData.sales = tempData.salesName
            }
          //返回psnId
            if(tempData.tempPerson !== tempData.psnName){
              tempData.psnId = tempData.psnName
            }
          //沟通日时格式化
          tempData.contactdate = this.dateFormat(tempData.contactdate)
          updateContact(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.getList()
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
    handleDelete(id) {
      DeleteContact(id).then(response => {
        this.getList()
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp']
        const filterVal = ['timestamp']
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
<style>
  .suspenspan{
    width: 100px;
    height: 100px;
    display: none;
    position: absolute;
    border: 1px solid #CCCCCC;
  }
</style>
