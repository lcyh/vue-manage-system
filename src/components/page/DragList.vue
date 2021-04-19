<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-rank"></i> 拖拽组件</el-breadcrumb-item>
                <el-breadcrumb-item>拖拽排序</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                Vue.Draggable：基于 Sortable.js 的 Vue 拖拽组件。 访问地址：<a
                    href="https://github.com/SortableJS/Vue.Draggable"
                    target="_blank"
                    >Vue.Draggable</a
                >
            </div>
            <div class="drag-box">
                <div class="drag-box-item">
                    <el-input
                        class="search"
                        clearable
                        placeholder="请输入内容"
                        v-model="searchVal"
                        @input="handleSearch"
                        @keyup.enter.native="handleSearch"
                    >
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
                    </el-input>
                    <el-collapse v-model="activeNames" @change="handleCollapseChange">
                        <el-collapse-item :name="item.type" v-for="item in labelList" :key="item.type">
                            <template slot="title"> <i class="header-icon el-icon-info"></i> {{ item.name }} </template>
                            <draggable
                                :sort="false"
                                :list="item.list"
                                :clone="handleClone"
                                @change="handleDragChange"
                                :group="groupOptions"
                            >
                                <transition-group tag="span">
                                    <span v-for="labelItem in item.list" class="drag-list" :key="labelItem.id">
                                        {{ labelItem.title }}
                                    </span>
                                </transition-group>
                            </draggable>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div class="drag-box-item drag-middle-wrapper">
                    <div class="item-title">doing</div>
                    <div>
                        <h3>交集</h3>
                        <draggable @change="handleInitChange($event, 'intersection')" :sort="false" :list="intersection" group="people">
                            <transition-group tag="div" id="doing" class="item-ul">
                                <div v-for="(item, index) in intersection" class="drag-list" :key="item.id">
                                    <div v-if="item.label === 'loginGame' || item.label === 'paymentUser'">
                                        <Label1
                                            :ref="'intersection-labelFrom-' + index"
                                            typeVal="intersection"
                                            :item="item"
                                            :index="index"
                                            @deleteLabel="handleDeleteLabelChange"
                                            @change="handleSelectLabelChange"
                                        />
                                    </div>
                                    <div v-if="item.label === 'firstLoginDate'">
                                        <Label2
                                            :ref="'intersection-labelFrom-' + index"
                                            typeVal="intersection"
                                            :item="item"
                                            :index="index"
                                            @deleteLabel="handleDeleteLabelChange"
                                            @change="handleSelectLabelChange"
                                        />
                                    </div>
                                    <div v-if="showLabel3List.includes(item.label)">
                                        <Label3
                                            :ref="'intersection-labelFrom-' + index"
                                            typeVal="intersection"
                                            :item="item"
                                            :index="index"
                                            @deleteLabel="handleDeleteLabelChange"
                                            @change="handleSelectLabelChange"
                                        />
                                    </div>
                                </div>
                            </transition-group>
                        </draggable>
                    </div>
                    <div>
                        <h3>并集</h3>
                        <draggable @change="handleInitChange($event, 'union')" :sort="false" :list="union" group="people">
                            <transition-group tag="div" id="doing" class="item-ul">
                                <div v-for="(item, index) in union" class="drag-list" :key="item.id">
                                    <div v-if="item.label === 'loginGame' || item.label === 'paymentUser'">
                                        <Label1
                                            :ref="'union-labelFrom-' + index"
                                            typeVal="union"
                                            :item="item"
                                            :index="index"
                                            @deleteLabel="handleDeleteLabelChange"
                                            @change="handleSelectLabelChange"
                                        />
                                    </div>
                                    <div v-if="item.label === 'firstLoginDate'">
                                        <Label2
                                            :ref="'union-labelFrom-' + index"
                                            typeVal="union"
                                            :item="item"
                                            :index="index"
                                            @deleteLabel="handleDeleteLabelChange"
                                            @change="handleSelectLabelChange"
                                        />
                                    </div>
                                    <div v-if="showLabel3List.includes(item.label)">
                                        <Label3
                                            :ref="'union-labelFrom-' + index"
                                            typeVal="union"
                                            :item="item"
                                            :index="index"
                                            @deleteLabel="handleDeleteLabelChange"
                                            @change="handleSelectLabelChange"
                                        />
                                    </div>
                                </div>
                            </transition-group>
                        </draggable>
                    </div>
                    <div>
                        <h3>差集</h3>
                        <draggable @change="handleInitChange($event, 'difference')" :sort="false" :list="differenceList" group="people">
                            <transition-group tag="div" id="doing" class="item-ul">
                                <div v-for="(item, index) in differenceList" class="drag-list" :key="item.id">
                                    <div v-if="item.label === 'loginGame' || item.label === 'paymentUser'">
                                        <Label1
                                            :ref="'difference-labelFrom-' + index"
                                            typeVal="difference"
                                            :item="item"
                                            :index="index"
                                            @deleteLabel="handleDeleteLabelChange"
                                            @change="handleSelectLabelChange"
                                        />
                                    </div>
                                    <div v-if="item.label === 'firstLoginDate'">
                                        <Label2
                                            :ref="'difference-labelFrom-' + index"
                                            typeVal="difference"
                                            :item="item"
                                            :index="index"
                                            @deleteLabel="handleDeleteLabelChange"
                                            @change="handleSelectLabelChange"
                                        />
                                    </div>
                                    <div v-if="showLabel3List.includes(item.label)">
                                        <Label3
                                            :ref="'difference-labelFrom-' + index"
                                            typeVal="difference"
                                            :item="item"
                                            :index="index"
                                            @deleteLabel="handleDeleteLabelChange"
                                            @change="handleSelectLabelChange"
                                        />
                                    </div>
                                </div>
                            </transition-group>
                        </draggable>
                    </div>
                </div>
                <div class="drag-box-item operation-wrapper">
                    <div class="item-title">done</div>
                    <div class="base-info">
                        <div>基本信息</div>
                        <p>人群名称</p>
                        <el-input v-model="personName" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="people">
                        <div>人数预估</div>
                        <el-button type="primary" size="small" round>点击预估</el-button>
                    </div>
                    <div class="save">
                        <el-button @click="handleSave" type="primary" size="small" round>保存并创建分群</el-button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import draggable from 'vuedraggable';
import Label1 from '@/components/dragComponents/Label1.vue';
import Label2 from '@/components/dragComponents/Label2.vue';
import Label3 from '@/components/dragComponents/Label3.vue';

// 问题1:游戏标签和平台标签列表的 标签名是一样的，拖动展示有疑问？
// 例如：游戏标签里 拖一个 付费金额，平台标签里 拖一个 付费金额，此时两个标签名是一样的，但是id是不一样的，是否要去重
let list = [
    {
        type: 'game',
        name: '游戏标签',
        list: [
            {
                id: 10,
                label: 'loginGame',
                title: '是否登录游戏'
            },
            {
                id: 11,
                label: 'paymentUser',
                title: '是否付费用户'
            },
            {
                id: 12,
                label: 'firstLoginDate',
                title: '是否首次登录日期'
            },
            {
                id: 13,
                label: 'gameLoginDays',
                title: '游戏登录天数'
            },
            {
                id: 14,
                label: '30LoginDays',
                title: '近30天登录天数'
            },
            {
                id: 15,
                label: 'lastLoginDays',
                title: '最后登录天数间隔'
            },
            {
                id: 16,
                label: 'paymentAmount',
                title: '付费金额'
            },
            {
                id: 17,
                label: 'paymentFrequency',
                title: '付费频次'
            },
            {
                id: 18,
                label: '30PaymentMoney',
                title: '近30天付费金额'
            },
            {
                id: 19,
                label: '30PaymentFrequency',
                title: '近30天付费频次'
            }
        ]
    },
    {
        type: 'platform',
        name: '平台标签',
        list: [
            {
                id: 20,
                label: 'loginGame',
                title: '是否登录游戏'
            },
            {
                id: 21,
                label: 'paymentUser',
                title: '是否付费用户'
            },
            {
                id: 22,
                label: 'firstLoginDate',
                title: '是否首次登录日期'
            },
            {
                id: 23,
                label: 'gameLoginDays',
                title: '游戏登录天数'
            },
            {
                id: 24,
                label: '30LoginDays',
                title: '近30天登录天数'
            },
            {
                id: 25,
                label: 'lastLoginDays',
                title: '最后登录天数间隔'
            },
            {
                id: 26,
                label: 'paymentAmount',
                title: '付费金额'
            },
            {
                id: 27,
                label: 'paymentFrequency',
                title: '付费频次'
            },
            {
                id: 28,
                label: '30PaymentMoney',
                title: '近30天付费金额'
            },
            {
                id: 29,
                label: '30PaymentFrequency',
                title: '近30天付费频次'
            }
        ]
    }
];
let listMap = list.map((item) => {
    let list = item.list.map((i) => {
        let obj = { type: item.type, ...i };
        return obj;
    });
    return { ...item, list };
});
let showLabel3List = [
    'gameLoginDays',
    '30LoginDays',
    'lastLoginDays',
    'paymentAmount',
    'paymentFrequency',
    '30PaymentMoney',
    '30PaymentFrequency'
];
export default {
    name: 'draglist',
    components: {
        draggable,
        Label1,
        Label2,
        Label3
    },
    computed: {},
    data() {
        return {
            // false 创建页面 true 编辑页面
            isEdit: false,
            showLabel3List: showLabel3List,
            groupOptions: {
                name: 'people',
                pull: 'clone',
                put: false
            },
            labelList: listMap,
            intersection: [
                {
                    id: 11,
                    type: 'game', // 游戏标签平台
                    label: 'paymentUser',
                    title: '是否付费用户',
                    game: '元神',
                    labelRule: {
                        unit: '',
                        value: '0'
                    }
                },
                {
                    id: 13,
                    type: 'game',
                    label: 'gameLoginDays',
                    title: '游戏登录天数',
                    labelRule: {
                        unit: '<',
                        value: 10
                    }
                }
            ],
            union: [
                {
                    id: 200,
                    type: 'game',
                    label: 'paymentAmount',
                    title: '付费金额'
                },
            ],
            differenceList: [
                {
                    id: 300,
                    type: 'platform',
                    label: 'paymentUser',
                    title: '是否付费用户'
                },
                {
                    id: 301,
                    type: 'platform',
                    label: 'firstLoginDate',
                    title: '是否首次登录日期'
                }
            ],
            hasIntersectionList: [],
            hasUnionList: [],
            hasDifferenceList: [],
            activeNames: [list[0].type],
            searchVal: '',
            personName: ''
        };
    },
    methods: {
        handleSearch() {
            console.log('handleSearch', this.searchVal);
            if (!this.searchVal.trim()) {
                this.labelList = list; // cache list
                this.activeNames = list.map((i) => i.type)[0];
                return;
            }
            let searchResult = [];
            this.labelList.forEach((item) => {
                let arr = [];
                let obj = {};
                item.list.forEach((label) => {
                    if (label.title.includes(this.searchVal)) {
                        arr = arr.concat(label);
                        obj = { name: item.name, type: item.type, list: arr };
                    }
                });
                if (obj.name) {
                    searchResult.push(obj);
                }
            });
            this.labelList = searchResult;
            this.activeNames = searchResult.map((i) => i.type);
        },
        handleClone(item) {
            console.log('handleClone', item);
            return {
                ...item,
                title: item.title
            };
        },
        handleDragChange(event) {
            console.log('handleDragChange', event);
            console.log('this.todo', this.todo);
            console.log('this.intersection', this.intersection);
        },
        handleInitChange(event, type) {
            console.log('handleInitChange', { event, type });
            console.log('handleInitChange-之前', { intersection: this.intersection, union: this.union, difference: this.differenceList });
            let addItem = event.added.element;
            let newIndex = event.added.newIndex;
            let hasIntersectionList = [];
            let hasUnionList = [];
            let hasDifferenceList = [];
            if (type === 'intersection') {
                this.intersection.forEach((i) => {
                    if (i.id === addItem.id) {
                        hasIntersectionList.push(addItem);
                    }
                });
            } else if (type === 'union') {
                this.union.forEach((i) => {
                    if (i.id === addItem.id) {
                        hasUnionList.push(addItem);
                    }
                });
            } else if (type === 'difference') {
                this.differenceList.forEach((i) => {
                    if (i.id === addItem.id) {
                        hasDifferenceList.push(addItem);
                    }
                });
            }
            console.log('addItem.newIndex', newIndex);
            if (hasIntersectionList.length > 1) {
                this.intersection.splice(newIndex, 1);
                this.$message.error(`${addItem.title}已经有了，不能在移动`);
            } else if (hasUnionList.length > 1) {
                this.union.splice(newIndex, 1);
                this.$message.error(`${addItem.title}已经有了，不能在移动`);
            } else if (hasDifferenceList.length > 1) {
                this.differenceList.splice(newIndex, 1);
                this.$message.error(`${addItem.title}已经有了，不能在移动`);
            }
            console.log('handleInitChange-之后', { intersection: this.intersection, union: this.union, difference: this.differenceList });
        },
        handleCollapseChange(val) {
            console.log(val);
        },
        handleDeleteLabelChange(currentLabel) {
            console.log('handleDeleteLabelChange-删除', currentLabel);
            let { typeVal, index } = currentLabel;
            let list = [];
            switch (typeVal) {
                case 'intersection':
                    list = this.intersection;
                    break;
                case 'union':
                    list = this.union;
                    break;
                case 'difference':
                    list = this.differenceList;
                    break;
                default:
                    list;
                    break;
            }
            list.splice(index, 1);
        },
        handleSelectLabelChange(label) {
            let { item, index, game, typeVal, labelRule } = label;
            let newLabel = {
                ...item,
                game,
                labelRule
            };
            switch (typeVal) {
                case 'intersection':
                    this.intersection.splice(index, 1, newLabel);
                    break;
                case 'union':
                    this.union.splice(index, 1, newLabel);
                    break;
                case 'difference':
                    this.differenceList.splice(index, 1, newLabel);
                    break;
            }

            console.log('handleSelectLabelChange-父组件', {
                label,
                intersection: this.intersection,
                union: this.union,
                differenceList: this.differenceList
            });
        },
        handleSave() {
            let params = {
                intersection: this.intersection,
                union: this.union,
                differenceList: this.differenceList
            };
            let allValidList = [];
            for (let key in this.$refs) {
                this.$refs[key].length &&
                    this.$refs[key][0].$refs.form.validate((valid) => {
                        allValidList.push(valid);
                    });
            }
            let isValid = allValidList.every((item) => item);
            console.log('isValid', isValid);
            if (!isValid) {
                return;
            }
            console.log('params', params);
        }
    }
};
</script>

<style scoped>
.drag-box {
    display: flex;
    user-select: none;
}
.drag-box-item {
    padding: 10px;
    width: 330px;
    background-color: #eff1f5;
    margin-right: 16px;
    border-radius: 6px;
    border: 1px solid #e1e4e8;
}
.drag-middle-wrapper {
    flex: 1;
}
.search {
    margin-bottom: 5px;
}
::v-deep .el-collapse-item__header {
    padding-left: 5px;
}
::v-deep .el-collapse-item__wrap {
    padding: 0 5px;
}
::v-deep .el-collapse-item__content {
    padding-bottom: 0;
}
::v-deep .el-collapse-item__content span {
    display: inline-block;
    padding: 3px;
    margin-right: 5px;
    border-radius: 5px;
}
.item-title {
    padding: 8px 8px 8px 12px;
    font-size: 14px;
    line-height: 1.5;
    color: #24292e;
    font-weight: 600;
}
.item-ul {
    padding: 0 8px 8px;
    height: 300px;
    border: 1px solid #e0e0e0;
    overflow-y: scroll;
}
.todo-wrapper {
    height: 100%;
}
#todo {
    height: 100%;
}
.item-ul::-webkit-scrollbar {
    width: 0;
}
.drag-list {
    margin: 5px 0 10px;
    list-style: none;
    background-color: #fff;
    border-radius: 6px;
    cursor: pointer;
    -webkit-transition: border 0.3s ease-in;
    transition: border 0.3s ease-in;
}
.drag-title {
    font-weight: 400;
    line-height: 25px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
.ghost-style {
    display: block;
    color: transparent;
    border-style: dashed;
}
.operation-wrapper {
    background: #fff;
}
.base-info {
    padding: 5px;
    margin-bottom: 10px;
}
.people {
    padding: 5px;
    margin-bottom: 20px;
}
</style>
