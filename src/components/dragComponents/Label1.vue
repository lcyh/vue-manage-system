<template>
    <div class="label-wrapper label1">
        <div class="head">
            <div>
                <i class="el-icon-star-on"></i>
                <span class="title">{{ title }}</span>
            </div>
            <div @click="handleDeleteLabel">
                <i class="el-icon-delete"></i>
                <span>删除标签</span>
            </div>
        </div>
        <div class="card-content">
            <el-form ref="form" :rules="rules" :model="formModel" label-width="80px">
                <el-form-item label="选择游戏" prop="game">
                    <el-select @change="selectLabelChange" v-model="formModel.game" placeholder="请选择">
                        <el-option label="元神" value="yuanshen"></el-option>
                        <el-option label="英雄联盟" value="lol"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签规则" prop="labelRule.value">
                    <span class="label-name">{{ title }}</span>
                    <el-select style="width: 100px" @change="selectLabelChange" v-model="formModel.labelRule.value" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-button @click="submitForm" type="primary" size="small" round>点击预估</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: {}
        },
        typeVal: {
            type: String,
            default: ''
        },
        index: {
            type: Number
        },
        triggerChange: {
            type: Function
        }
    },
    computed: {
        title() {
            return this.item.title || '';
        },
        formModel() {
            let value = this.item.game || this.item.labelRule;
            let newValue = value ? this.item : this.form;
            console.log('formModel', newValue);
            return newValue;
        }
    },
    data() {
        return {
            form: {
                game: '',
                labelRule: {
                    unit: '',
                    value: ''
                }
            },
            rules: {
                game: [{ required: true, message: '请输入游戏标签', trigger: 'change' }],
                'labelRule.value': [{ required: true, message: '请选择标签规则', trigger: 'change' }]
            }
        };
    },
    created() {
        console.log('label组件', { item: this.item, typeVal: this.typeVal });
    },
    methods: {
        handleDeleteLabel() {
            let value = {
                item: this.item,
                index: this.index,
                game: this.formModel.game,
                typeVal: this.typeVal,
                labelRule: { value: this.formModel.labelRule.value, unit: undefined }
            };
            console.log('删除-label1', this.form);
            this.$emit('deleteLabel', value);
        },
        selectLabelChange() {
            let value = {
                item: this.item,
                index: this.index,
                game: this.formModel.game,
                typeVal: this.typeVal,
                labelRule: { value: this.formModel.labelRule.value, unit: undefined }
            };
            console.log('label1', { value });
            this.$emit('change', value);
        },
        submitForm() {
            let flag = false;
            this.$refs.form.validate((valid) => {
                if (valid) {
                    flag = true;
                    return true;
                } else {
                    flag = false;
                    return false;
                }
            });
            console.log('flag', flag);
            return flag;
        }
    }
};
</script>

<style scoped>
.label-wrapper {
    border: 1px solid #e1e4e8;
    padding: 10px 10px 0;
}
.label-wrapper:hover {
    border: 1px solid #20a0ff;
}
.head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 14px;
}
.label-name {
    margin-right: 5px;
    color: #606266;
}
.el-form-item {
    margin-bottom: 10px;
}
</style>