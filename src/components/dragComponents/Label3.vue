<template>
    <div class="label-wrapper label3">
        <div class="head">
            <div class="left">
                <i class="el-icon-star-on"></i>
                <span class="title">{{ title }}</span>
            </div>
            <div class="right" @click="handleDeleteLabel">
                <i class="el-icon-delete"></i>
                <span>删除标签</span>
            </div>
        </div>
        <div class="card-content">
            <el-form ref="form" :model="formModel" :rules="rules" label-width="80px">
                <el-form-item label="选择游戏" prop="game">
                    <el-select @change="selectLabelChange" v-model="formModel.game" placeholder="请选择">
                        <el-option label="元神" value="yuanshen"></el-option>
                        <el-option label="英雄联盟" value="lol"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="label-unit-inline" label="标签规则" prop="labelRule.unit">
                    <span class="label-name">{{ title }}</span>
                    <el-select
                        style="width: 60px; marginright: 10px"
                        @change="selectLabelChange"
                        v-model="formModel.labelRule.unit"
                        placeholder="请选择"
                    >
                        <el-option label=">=" value=">="></el-option>
                        <el-option label="<" value="<"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="label-value-inline" label="" prop="labelRule.value">
                    <el-input style="width: 150px" @change="selectLabelChange" v-model="formModel.labelRule.value"></el-input>
                </el-form-item>
            </el-form>
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
                    unit: '>=',
                    value: ''
                }
            },
            rules: {
                game: [{ required: true, message: '请输入游戏标签', trigger: 'change' }],
                'labelRule.unit': [{ required: true, message: '请选择', trigger: 'change' }],
                'labelRule.value': [{ required: true, message: '请选择', trigger: 'blur' }]
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
                labelRule: {
                    value: this.formModel.labelRule.value,
                    unit: this.formModel.labelRule.unit
                }
            };
            this.$emit('deleteLabel', value);
        },
        selectLabelChange() {
            let value = {
                item: this.item,
                index: this.index,
                game: this.formModel.game,
                typeVal: this.typeVal,
                labelRule: {
                    value: this.formModel.labelRule.value,
                    unit: this.formModel.labelRule.unit
                }
            };
            console.log('label3', { value });
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
.label-unit-inline {
    display: inline-block;
}
.label-value-inline {
    display: inline-block;
}
.label-value-inline ::v-deep .el-form-item__content {
    margin-left: 0px !important;
}
</style>