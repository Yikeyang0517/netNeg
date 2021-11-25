<template>
    <div class="table-box">
            <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%; cursor: pointer;"
                @selection-change="handleSelectionChange"
                @row-click="rowClick"
                @select-all="selectAll"
                :row-class-name="tableRowClassName"
                @select="singleCheck">
                <el-table-column type="selection" label="全选"></el-table-column>
                <el-table-column prop="columnDesc" label="备注"></el-table-column>
                <el-table-column label="字段名" prop="column"></el-table-column>
                <el-table-column prop="name" label="操作">
                    <template slot-scope="scope">
                        <div style="color: #3280d8;">clickMe</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

</template>
<script>


export default {
        data() {
            return {
                tableData: [
                  {
                    columnDesc:'1111111',
                    column:'jhgfd'
                  },
                  {
                    columnDesc:'1111111',
                    column:'jhgfd'
                  },
                  {
                    columnDesc:'1111111',
                    column:'jhgfd'
                  },
                ],
                multipleSelection: [],
                // 用于存放被选中行的index
                numbers: []
            }
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach((row) => {
                        // 再次调用toggleRowSelection则取消选中
                        this.$refs.multipleTable.toggleRowSelection(row);
                        if (this.numbers.indexOf(row.index) == -1) {
                            console.log("选中" + row.index)
                            this.numbers.push(row.index);
                        } else {
                            console.log("取消选中" + row.index)
                            this.numbers.splice(this.numbers.indexOf(row.index), 1);
                        }
                    })
                } else {
                    this.$refs.multipleTable.clearSelection()
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            // 单行checkbox选中触发
            singleCheck(val, row) {
                let index = row.index;
                if (this.numbers.indexOf(index) == -1) {
                    console.log("选中" + index)
                    this.numbers.push(index);
                } else {
                    console.log("取消选中" + index)
                    this.numbers.splice(this.numbers.indexOf(index), 1);
                }
            },
            // 全选checkbox点击时触发
            selectAll(val, row) {
                // 判断是否全选
                console.log(this.tableData.length + "-" + this.multipleSelection.length)
                if (this.multipleSelection.length >= this.tableData.length) {
                    // 表单绑定的数据
                    console.log("全选")
                    // 所有index放入数组中
                    this.tableData.forEach((item, i) => {
                        this.numbers.push(item.index);
                    });
                    this.$refs.multipleTable.toggleRowSelection(row);
                } else {
                    console.log("取消全选")
                    // 清空背景数组
                    this.numbers.splice(0)
                }
            },
            // 重置所有选中行
            resetSelect() {
                // 选中的需要取消选中
                if (this.numbers.length > 0) {
                    this.numbers.forEach(index => {
                        this.$refs.multipleTable.toggleRowSelection(this.tableData[index]);
                    })
                }
                // 清空数组
                this.numbers.splice(0)
            },
            // 行点击事件
            rowClick(row) {
                let index = row.index;
                if (this.numbers.indexOf(index) == -1) {
                    console.log("选中" + index)
                    this.numbers.push(index);
                } else {
                    console.log("取消选中" + index)
                    this.numbers.splice(this.numbers.indexOf(index), 1);
                }
                // 再次点击时，调用toggleRowSelection则取消选中
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            /* 设置选中背景色 */
            tableRowClassName({row,rowIndex}) {
                // 为每行添加属性index
                row.index = rowIndex;
                let color = "";
                this.numbers.forEach((r, i) => {
                    if (rowIndex === r) {
                        // 自定义class名称，需要写到全局element-ui 的scss文件中或者用scoped做穿透
                        // 本人穿透未成功，所以就没用scoped
                        color = "myRowClass";
                    }
                });
                return color;
            }
        }
    }


/* 鼠标上移 hover效果 */

</script>
<style>
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #9198e5 !important;
  }
</style>
