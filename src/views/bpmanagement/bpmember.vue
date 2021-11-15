<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="searchQuery.company" placeholder="协力公司" clearable style="width: 200px" class="filter-item">
        <el-option v-for="comp in companyOptions" :key="comp.code" :label="comp.name" :value="comp.name" />
      </el-select>
      <el-input placeholder="姓名" v-model="mbname" clearable style="width: 200px" class="filter-item"/>
      <el-select v-model="searchQuery.sales" placeholder="营业负责" clearable class="filter-item" style="width: 200px">
        <el-option v-for="item in salesOptions" :key="item.key" :label="item.value" :value="item.value" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="margin-left: 20px" @click="search">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出
      </el-button>
      <svg-icon class="link-type" style="margin-left: 10px;" icon-class="peoples" @click="goContactList(0)" />
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
      <el-table-column label="chk" width="50px">
      <template slot-scope="{row}">
        <el-checkbox></el-checkbox>
      </template>
      </el-table-column>
      <el-table-column label="chk" width="50px">
        <template slot-scope="{row}">
          <span>{{ row.chk }}</span>
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
      <el-table-column label="姓名" width="100px">
        <template slot-scope="{row}">
          <span>{{ row.bpShort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="BP" width="200px">
        <template slot-scope="{row}">
          <span>{{ row.bpShort }} | {{ row.bpName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次沟通日期" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contactdate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="沟通记录" align="center" width="95">
        <template slot-scope="{row}">
          <svg-icon class="link-type" icon-class="peoples" @click="goContactList(0)" />
        </template>
      </el-table-column>
      <el-table-column label="公司职务" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.empcnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名片" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.empcnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.empcnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.empcnt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="国籍" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.country }}</span>
        </template>
      </el-table-column>
      <el-table-column label="BP负责" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sales }}</span>
        </template>
      </el-table-column>
      <el-table-column label="营业负责" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sales }}</span>
        </template>
      </el-table-column>
      <el-table-column label="笔记" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.bpMemo }}</span>
        </template>
      </el-table-column>
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
      <el-table-column label="最近车站" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出生年月日" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contactdate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
          <!-- <span v-switch="row.wnglvl">
            <h1 v-case="1">不急</h1>
            <h2 v-case="2">可缓</h2>
            <h2 v-case="3">一般</h2>
            <h2 v-case="4">优先</h2>
            <h2 v-case="5">紧急</h2>
            <h2 v-case="6">特急</h2>
          </span> -->
          <span>{{ row.wnglvl }}</span>
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
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
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
        <el-form-item label="营业负责" prop="sales">
          <el-select v-model="temp.sales" class="filter-item" placeholder="请选择营业负责人">
            <el-option v-for="item in salesOptions" :key="item.key" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="公司人数" prop="empcnt">
          <el-input v-model="temp.empcnt" />
        </el-form-item>
        <el-form-item label="所属国" prop="country">
          <el-input v-model="temp.country" />
        </el-form-item>
        <el-form-item label="重要度" prop="bpimpt">
          <el-input v-model="temp.bpimpt" />
        </el-form-item>
        <el-form-item label="受注案件" prop="anken">
          <el-input v-model="temp.anken" />
        </el-form-item>
        <el-form-item label="受注人次" prop="peonum">
          <el-input v-model="temp.peonum" />
        </el-form-item>
        <el-form-item label="协力人次" prop="ptnnum">
          <el-input v-model="temp.ptnnum" />
        </el-form-item>
        <el-form-item label="客面人次" prop="audtnum">
          <el-input v-model="temp.audtnum" />
        </el-form-item>
        <el-form-item label="提案人次" prop="apltnum">
          <el-input v-model="temp.apltnum" />
        </el-form-item>
        <el-form-item label="技术人数" prop="pronum">
          <el-input v-model="temp.pronum" />
        </el-form-item>
        <el-form-item label="客户人数" prop="bpcustm">
          <el-input v-model="temp.bpcustm" />
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
            <el-option v-for="item in SuperiorityOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="提醒事项" prop="wngtext">
          <el-input v-model="temp.wngtext" />
        </el-form-item>
        <el-form-item label="在谈项目" prop="prjflg">
          <el-input v-model="temp.prjflg" />
        </el-form-item>
        <el-form-item label="笔记" prop="bpMemo">
          <el-input v-model="temp.bpMemo" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
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
import { fetchList, searchItemSales, fetchPv, createArticle, updateArticle } from '@/api/article'
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
          contactflg: null,
          bpShort: 'cpn',
          bpCode: 'BP0001',
          bpName: '会社001',
          hpurl: 'https://panjiachen.github.io/vue-element-admin/#/icon/index',
          contactdate: 20211102,
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
        },
        {
          id: 2,
          contactflg: '需要联系了',
          bpShort: 'ygp',
          bpCode: 'BP0002',
          bpName: '会社002',
          hpurl: 'https://panjiachen.github.io/vue-element-admin/#/icon/index',
          contactdate: 20211105,
          sales: 'YangXF',
          empcnt: '19',
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
          wnglvl: null,
          wngtext: null,
          prjflg: 1,
          prjflgMemo: '有在谈项目！',
          createtime: 20211102,
          createuser: '操作员Y'
        },
        {
          id: 3,
          contactflg: '该联系了',
          bpShort: 'cpn',
          bpCode: 'BP0001',
          bpName: '会社001',
          hpurl: 'https://panjiachen.github.io/vue-element-admin/#/icon/index',
          contactdate: 20211102,
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
          wnglvl: '紧急',
          wngtext: '次期项目下个月要开始了',
          prjflg: 1,
          prjflgMemo: '有在谈项目！',
          createtime: 20211101210912,
          createuser: '操作员Y'
        },
        {
          id: 4,
          contactflg: null,
          bpShort: 'ygp',
          bpCode: 'BP0002',
          bpName: '会社002',
          hpurl: 'https://www.yahoo.co.jp',
          contactdate: 20211105,
          sales: 'YangXF',
          empcnt: '19',
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
          wnglvl: null,
          wngtext: null,
          prjflg: null,
          prjflgMemo: '有在谈项目！',
          createtime: 20211101210912,
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
      companyOptions:  [
        { code: '', name: '' }
      ],
      salesOptions: [
        { key: '', value: '' }
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
        console.log('已经返回请求数据、、、、、、、、、、')
        console.log(response.data)
        this.list = response.data
        this.total = response.total
        this.listLoading = false
        //获取当前BP名
        /* this.companyOptions.shift() */
        console.log(response.data.length)
        this.companyOptions.shift()
        for(var i=0;i<response.data.length;i++){
          var obj = {
            code: response.data[i].bpCode,
            name: response.data[i].bpShort + ' | ' +response.data[i].bpName}
          this.companyOptions.push(obj)
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getMasterList(){
    //获取营业负责人List(检索用)
      searchItemSales().then(response => {
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
      fetchList(this.searchQuery).then(response => {
        this.list = response.data
        this.total = response.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      this.getList()
    },
    goContactList(member){
      if(member==0){
        this.$router.push({path:'/bpmanagement/contactlist'})
      }
     /* this.$router.push({path:'/contactlist'},query:{Id:member}) */
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
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
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
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
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
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
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
<style>
  .suspenspan{
    width: 100px;
    height: 100px;
    display: none;
    position: absolute;
    border: 1px solid #CCCCCC;
  }
</style>
