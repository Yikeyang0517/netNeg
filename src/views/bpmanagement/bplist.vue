<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="searchQuery.company" placeholder="协力公司" clearable style="width: 200px" class="filter-item">
        <el-option v-for="comp in companyOptions" :key="comp.code" :label="comp.name" :value="comp.code" />
      </el-select>
      <el-select v-model="searchQuery.sales" placeholder="营业负责" clearable class="filter-item" style="width: 200px">
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
    </div>

    <el-table
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
          <el-tag v-if="row.contactflg" :title="row.contactflg=1?'该联系了':null" style="background-color: #99CC33">
            <svg-icon icon-class="email" />
          </el-tag>
          <el-tag v-if="row.prjflg" :title="row.prjflg=1?'有在谈项目':null" style="background-color: #FFCC33">
            <svg-icon icon-class="form" />
          </el-tag>
          <el-tag v-if="row.wngtext" :title="row.wngtext" style="background-color: #FF6633">
            <svg-icon icon-class="star" />
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="简称" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.bpShort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户编号" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.bpCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司名称" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.bpName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司网址" width="150px" align="center">
        <template slot-scope="{row}">
          <span class="link-type" @click="jumpUrl(row.hpurl)">{{ row.hpurl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次沟通日期" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contactdate | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="沟通记录" align="center" width="95">
        <template slot-scope="{row}">
          <svg-icon class="link-type" icon-class="peoples" @click="goContactList(row.bpid)" />
        </template>
      </el-table-column>
      <el-table-column label="营业负责" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.salesName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司人数" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.empcnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属国" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.country }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重要度" width="100px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.bpimpt == '11'">重要BP</span>
          <span v-if="row.bpimpt == '90'">潜在BP</span>
          <span v-if="row.bpimpt == '12'">一般BP</span>
          <span v-if="row.bpimpt == '03'">○</span>
        </template>
      </el-table-column>
      <el-table-column label="受注案件" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.anken }}</span>
        </template>
      </el-table-column>
      <el-table-column label="受注人次" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.peonum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="协力人次" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ptnnum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客面人次" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.audtnum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提案人次" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.apltnum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="技术人数" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.pronum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户人数" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.bpcustm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="沟通频率" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.maxcnttdays }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮编" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.zipcode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="传真" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.fax }}</span>
        </template>
      </el-table-column>
      <el-table-column label="笔记" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.bpMemo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="沟通次数" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contactcnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优先提醒度" width="100px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.wnglvl == '1'">不急</span>
          <span v-if="row.wnglvl == '2'">可缓</span>
          <span v-if="row.wnglvl == '3'">一般</span>
          <span v-if="row.wnglvl == '4'">优先</span>
          <span v-if="row.wnglvl == '5'">紧急</span>
          <span v-if="row.wnglvl == '6'">特急</span>
        </template>
      </el-table-column>
      <el-table-column label="提醒事项" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.wngtext }}</span>
        </template>
      </el-table-column>
      <el-table-column label="在谈项目" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.prjflg?'Yes':null }}</span>
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
      <el-table-column label="更新/删除" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row.bpid)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="公司名称" prop="bpName">
          <el-input v-model="temp.bpName" />
        </el-form-item>
        <el-form-item label="简称" prop="bpShort">
          <el-input v-model="temp.bpShort" />
        </el-form-item>
        <el-form-item label="客户编号" prop="bpCode">
          <el-input v-model="temp.bpCode" />
        </el-form-item>
        <el-form-item label="公司网址" prop="hpurl">
          <el-input v-model="temp.hpurl" />
        </el-form-item>
        <el-form-item label="营业负责" prop="salesName">
          <el-select v-model="temp.salesName" class="filter-item" placeholder="请选择营业负责人">
            <el-option v-for="item in salesOptions" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="公司人数" prop="empcnt">
          <el-input v-model="temp.empcnt" />
        </el-form-item>
        <el-form-item label="所属国" prop="country">
          <el-input v-model="temp.country" />
        </el-form-item>
        <el-form-item label="重要度" prop="bpimpt">
          <el-select v-model="temp.bpimpt" class="filter-item" placeholder="请选择重要度">
            <el-option v-for="item in BPimptOptions" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="沟通频率" prop="maxcnttdays">
          <el-input v-model="temp.maxcnttdays" />
        </el-form-item>
        <el-form-item label="邮编" prop="zipcode">
          <el-input v-model="temp.zipcode" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="temp.tel" />
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input v-model="temp.fax" />
        </el-form-item>
        <el-form-item label="优先提醒度" prop="wnglvl">
          <el-select v-model="temp.wnglvl" class="filter-item" placeholder="请选择优先度">
            <el-option v-for="item in SuperiorityOptions" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="提醒事项" prop="wngtext">
          <el-input v-model="temp.wngtext" />
        </el-form-item>
        <el-form-item label="笔记" prop="bpMemo">
          <el-input v-model="temp.bpMemo" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
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
import { fetchList, getSalesList, DeleteBP, createArticle, searchBP, updateArticle } from '@/api/article'
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
  components: { Pagination},
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
      list: [
        {
          id: 1,
          contactflg: null,
          bpShort: 'cpn',
          bpCode: 'BP0001',
          bpName: '会社001',
          hpurl: 'https://panjiachen.github.io/vue-element-admin/#/icon/index',
          contactdate: '20211102',
          sales: 'YangXF',
          empcnt: '122',
          country: '日本',
          bpimpt: 2,
          anken: '○○证券次期基盘系统开发',
          peonum: 20,
          ptnnum: 5,
          audtnum: 35,
          apltnum: 50,
          pronum: 15,
          bpcustm: 3,
          maxcnttdays: 30,
          zipcode: '3320001',
          address: '川口市青木区2-1-1',
          tel: '08079064567',
          fax: '03023456',
          bpMemo: 'memommmmmmmm',
          contactcnt: 3,
          wnglvl: '不急',
          wngtext: '次期项目下个月要开始了',
          prjflg: 1,
          prjflgMemo: '有在谈项目！',
          createtime: 20211102,
          createuser: '操作员Y'
        }
      ],
      total: 0,
      listLoading: false,
      listQuery: { userId: 'yxf' },
      searchQuery:{
        company: '',
        sales: '',
        },
        deleteQuery:{
          company: '',
          },
      companyOptions:  [
        { code: '', name: '' }
      ],
      salesOptions: [
        { key: '', value: '' }
      ],
      SuperiorityOptions: [
        { key: '1' , label: '不急'},
        { key: '2' , label: '可缓'},
        { key: '3' , label: '一般'},
        { key: '4' , label: '优先'},
        { key: '5' , label: '紧急'},
        { key: '6' , label: '特急'}
      ],
      BPimptOptions: [
        { key: '03' , label: '○'},
        { key: 11 , label: '重要BP'},
        { key: 12 , label: '一般BP'},
        { key: 90 , label: '潜在BP'}
      ],
      calendarTypeOptions,
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
    this.getList()
    this.getMasterList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        for(var i=0;i<response.data.length;i++){
          var obj = {
            code: response.data[i].bpid,
            name: response.data[i].bpShort + ' | ' +response.data[i].bpName}
          this.companyOptions.push(obj)
        }
        this.list = response.data
        this.total = response.total
        this.listLoading = false
        //获取当前BP名
        /* this.companyOptions.shift() */
        console.log(response.data.length)
        this.companyOptions.shift()
        console.log(this.companyOptions)
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
    },
    jumpUrl(e){
     /* this.$router.push({path:e}) */
     //跳转到客户公司HP
     window.open(e,'_blank')
    },
    search() {
      console.log('检索时传参内容')
      console.log(this.searchQuery)
      searchBP(this.searchQuery).then(response => {

        this.list = response.data
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    goContactList(bpid){
      if(bpid!=0){
        this.$router.push({
          path:'/bpmanagement/contactlist',
          query:{
            company:bpid,
            }
          })
      }
      /* this.$router.push({path:'/bpmanagement/contactlist',query:{Id:bpid}}) */
    },
    resetTemp() {
      this.temp = {
        timestamp: new Date()
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
          /*
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin' */
          const tempData = Object.assign({}, this.temp)
          tempData.createtime = this.dateFormat(new Date())
          tempData.createuser = 'tempAccount'
          tempData.sales = tempData.salesName
          createArticle(tempData).then(() => {
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
          tempData.updatetime = this.dateFormat(new Date()) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          //返回salesId
            if(tempData.tempSales !== tempData.salesName){
              tempData.sales = tempData.salesName
            }
          updateArticle(tempData).then(() => {
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
    handleDelete(bpid) {
      this.deleteQuery.company = bpid
      DeleteBP(this.deleteQuery).then(response => {
        this.getList()
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
        var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
        var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
        var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
        var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
        // 拼接
        return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
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
<style>
  .suspenspan{
    width: 100px;
    height: 100px;
    display: none;
    position: absolute;
    border: 1px solid #CCCCCC;
  }
</style>
