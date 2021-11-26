<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="searchQuery.type" placeholder="沟通类别" clearable filterable style="width: 200px" class="filter-item">
        <el-option v-for="comp in cnttTypeOptions" :key="comp.key" :label="comp.value" :value="comp.key" />
      </el-select>
      <el-select v-model="searchQuery.company" placeholder="协力公司" clearable filterable style="width: 200px;margin-left: 10px;" class="filter-item">
        <el-option v-for="comp in companyOptions" :key="comp.key" :label="comp.value" :value="comp.key" />
      </el-select>
      <el-select v-model="searchQuery.prj" placeholder="项目名称" clearable filterable style="width: 200px;margin-left: 10px;" class="filter-item">
        <el-option v-for="comp in prjNameOptions" :key="comp.key" :label="comp.value" :value="comp.key" />
      </el-select>
      <el-select v-model="searchQuery.custpsn" placeholder="客户人员" clearable filterable style="width: 200px;margin-left: 10px;" class="filter-item">
        <el-option v-for="comp in custpsnOptions" :key="comp.key" :label="comp.value" :value="comp.key" />
      </el-select></br>
      <el-select v-model="searchQuery.person" placeholder="技术人员" clearable filterable style="width: 200px;" class="filter-item">
        <el-option v-for="comp in personOptions" :key="comp.key" :label="comp.value" :value="comp.key" />
      </el-select>
      <el-select v-model="searchQuery.sales" placeholder="营业负责" clearable filterable class="filter-item" style="width: 200px;margin-left: 10px;white-space: pre-wrap;">
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
      <el-table-column label="项目名称" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.prjName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户人员" width="200px">
        <template slot-scope="{row}">
          <span>{{ row.custpsnName }}</span>
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
          <span>{{ row.cnttTypeName }}</span>
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
          <span>{{ row.resultName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="简历可信度" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.resumelvlName }}</span>
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
          <el-select v-model="temp.prjName" class="filter-item" filterable placeholder="请选择项目名称">
            <el-option v-for="item in prjNameOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="客户人员" prop="custpsnName">
          <el-select v-model="temp.custpsnName" class="filter-item" filterable placeholder="请选择客户人员">
            <el-option v-for="item in custpsnOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="营业负责" prop="salesName">
          <el-select v-model="temp.salesName" class="filter-item" filterable placeholder="请选择营业负责人">
            <el-option v-for="item in salesOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="沟通日期" prop="contactdate">
          <el-date-picker v-model="temp.contactdate" type="date" placeholder="请选择沟通日期" />
        </el-form-item>
        <el-form-item label="沟通类别" prop="cnttTypeName">
          <el-select v-model="temp.cnttTypeName" class="filter-item" filterable placeholder="请选择沟通类别">
            <el-option v-for="item in cnttTypeOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="技术人员" prop="psnName">
          <el-select v-model="temp.psnName" class="filter-item" filterable placeholder="请选择技术人员">
            <el-option v-for="item in personOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="提案价格" prop="price">
          <el-input v-model="temp.price" />
        </el-form-item>
        <el-form-item label="提案面试结果" prop="result">
          <el-select v-model="temp.result" class="filter-item" filterable placeholder="请选择面试结果">
            <el-option v-for="item in resultOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="简历可信度" prop="resumelvl">
          <el-select v-model="temp.resumelvl" class="filter-item" filterable placeholder="请选择简历可信度">
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
          <el-input v-model.number="temp.workhours" />
        </el-form-item>
        <el-form-item label="摘要" prop="psncnttmemo">
          <el-input v-model="temp.psncnttmemo" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入摘要内容" />
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
import { getMaster, fetchList, contactInitList, getCompanyList, getSalesList, getPrjList, getCustpsnList, getPersonList, contactSearch, DeleteContact, updateContact, fetchPv, createContact } from '@/api/article'
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
    var checkPsnName = (rule, value, callback) => {
         if ( this.temp.cnttTypeName == '03'||this.temp.cnttTypeName == '31'
         ||this.temp.cnttTypeName == '见面' || this.temp.cnttTypeName == '客面') {
           if(!value){
              return callback(new Error('请选择技术人员'));
           }
        } else {
          callback();
        }
      };
      var checkPrice = (rule, value, callback) => {
           if ( this.temp.cnttTypeName == '03'||this.temp.cnttTypeName == '31'
           ||this.temp.cnttTypeName == '见面' || this.temp.cnttTypeName == '客面') {
             if(!value){
                return callback(new Error('请记入提案价格'));
             }
          } else {
            callback();
          }
        };
    return {
      tableKey: 0,
      tipMessage: '该联系了',
      ruleForm: {
                contactdate: '',
                cnttTypeName: '',
                custpsnName: '',
                salesName: '',
                workhours: '',
                psnName: '',
                price: '',
              },
      rules: {
        contactdate: [
          { required: true, message: '请选择沟通日期', trigger: 'change' }
        ],
        cnttTypeName: [
          { required: true, message: '请选择沟通类型', trigger: 'red' },
        ],
        custpsnName: [
          { required: true, message: '请选择客户人员', trigger: 'red' },
        ],
        salesName: [
          { required: true, message: '请选择销售人员', trigger: 'red' },
        ],
        psnName: [
          { validator: checkPsnName, trigger: 'red' },
        ],
        price: [
          { validator: checkPrice, trigger: 'red' },
        ],

        workhours: [
          { required: true, message: '请填写耗时分钟'},
          { type: 'number', message: '请输入数字类型'}
        ],
      },
      list: [

        {
          id: 1,
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
          { key: '', value: '' }
        ],
        resumelvlOptions:  [
          { key: '', value: '' }
        ],
        resultOptions:  [
          { key: '', value: '' }
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
      downloadLoading: false
    }
  },
  created() {
    /* let self = this
    self.getParams() */
    if(this.$route.query){
      this.searchQuery.company = this.$route.query.company
      this.searchQuery.custpsn = this.$route.query.custpsn
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
    getCompanyList().then(response => {
      this.companyOptions = response.data
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

      //获取cnttTypeOptions
      getMaster('cntt_type').then(response => {
        this.cnttTypeOptions = response.data
      })

      //获取resumelvlOptions
      getMaster('resumelvl').then(response => {
        var temp = response.data
        for(var i=0;i<temp.length;i++){
          temp[i].key = parseInt(temp[i].key)
        }
        console.log('打印resumelvlOptions')
        console.log(temp)
        this.resumelvlOptions = temp
      })

      //获取resultOptions
      getMaster('OKNG').then(response => {
        this.resultOptions = response.data
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
      contactSearch(this.searchQuery).then(response => {
        this.list = response.data
        this.total = response.total
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
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.tempPrj = this.temp.prjName
      this.temp.tempCustpsn = this.temp.custpsnName
      this.temp.tempSales = this.temp.salesName
      this.temp.tempPerson = this.temp.psnName
      this.temp.tempCnttType = this.temp.cnttTypeName
      this.temp.tempResult = this.temp.resultName
      this.temp.tempResumelvl = this.temp.resumelvlName
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
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
            //返回cnttType
              if(tempData.tempCnttType !== tempData.cnttTypeName){
                tempData.cnttType = tempData.cnttTypeName
              }
          //返回result
            if(tempData.tempResult !== tempData.resultName){
              tempData.result = tempData.resultName
            }
          //返回resumelvl
            if(tempData.tempResumelvl !== tempData.resumelvlName){
              tempData.resumelvl = tempData.resumelvlName
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
