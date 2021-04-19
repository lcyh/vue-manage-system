<template>
    <div class="calendar-wrapper">
        <div class="calendar-content">
            <div class="month-group">
                <span class="demonstration">年月</span>
                <el-date-picker @change="handleChangeDate" v-model="currentMonth" type="month" placeholder="选择月"> </el-date-picker>
            </div>
            <el-calendar v-model="currentMonth" id="calendar">
                <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
                <template slot="dateCell" slot-scope="{ date, data }">
                    <!--自定义内容-->
                    <div :class="['calendar-cell']" @click="handleClick($event, date, data)">
                        <div class="calendar-day">
                            <p>{{ data.day.split('-').slice(2).join('-') }}{{ data.isSelected ? '✔️' : '' }}</p>
                        </div>
                        <div v-for="item in calendarData" :key="item.things">
                            <div v-if="item.time.includes(data.day)">
                                <el-tooltip class="tooltip-item" effect="dark" :content="item.things" placement="right">
                                    <div class="is-selected">
                                        <p class='description'>{{ item.things }}</p>
                                        <img v-if="item.icon1" class="game-img" :src="item.icon1" alt="" />
                                        <img v-if="item.icon2" class="game-img" :src="item.icon2" alt="" />
                                    </div>
                                </el-tooltip>
                            </div>
                            <!-- <div v-if="item.months.indexOf(data.day.split('-').slice(1)[0]) != -1">
                                <div v-if="item.days.indexOf(data.day.split('-').slice(2).join('-')) != -1">
                                    <el-tooltip class="tooltip-item" effect="dark" :content="item.things" placement="right">
                                        <div class="is-selected">
                                            <p>{{ item.things }}</p>
                                            <img v-if="item.icon1" class="game-img" :src="item.icon1" alt="" />
                                            <img v-if="item.icon1" class="game-img" :src="item.icon2" alt="" />
                                        </div>
                                    </el-tooltip>
                                </div>
                                <div v-else></div>
                            </div>
                            <div v-else></div> -->
                        </div>
                    </div>
                </template>
            </el-calendar>
        </div>
        <div class="calendar-detail">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div>
                <div v-for="item in list" :key="item.id" class="text">
                    <p>{{ item.title }}</p>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import GameIcon1 from '@/assets/img/game-icon.png';
import GameIcon2 from '@/assets/img/game01.png';
export default {
    name: 'calendar',
    components: {},
    data() {
        return {
            imgIcon1: GameIcon1,
            imgIcon2: GameIcon2,
            calendarData: [
                {
                    time: ['2021-04-15', '2021-04-16'],
                    months: ['03', '04'],
                    days: ['15'],
                    things: '看电影-洒大分身乏术大发送到阿斯顿发送到发',
                    icon1: GameIcon1,
                    icon2: GameIcon2
                },
                { time: ['2020-04-15', '2020-04-16'], months: ['05', '06'], days: ['02'], things: '去公园野炊', icon1: GameIcon1,icon2:'' },
                { time: ['2021-01-05', '2021-02-06'], months: ['05'], days: ['02'], things: '看星星', icon1: '',icon2:GameIcon2 },
                { time: ['2021-05-05'], months: ['08'], days: ['02'], things: '看月亮', icon1: '',icon2:GameIcon2 }
            ],
            currentMonth: moment(new Date()).format('YYYY-MM-DD'),
            list: [
                { id: 1, title: '撒洒大' },
                { id: 2, title: 'hello' },
                { id: 3, title: 'nihao' },
                { id: 4, title: '第三方的身份' }
            ]
        };
    },
    computed: {},
    filters: {},
    methods: {
        handleClick(e, date, data) {
            console.log('this.currentMonth', this.currentMonth);
            console.log('点击', { e, date, data });
        },
        selectDate(type) {
            console.log('this.currentMonth', this.currentMonth);
            console.log('type', type);
        },
        handleChangeDate(event) {
            console.log('handleChangeDate', { event, currentMonth: this.currentMonth });
        }
    },
    beforeUpdate() {
        console.log('updated-this.currentMonth', moment(this.currentMonth).format('YYYY-MM-DD'));
    }
};
</script>


<style scoped>
.calendar-wrapper {
    width: 100%;
    display: flex;
}
.calendar-content {
    position: relative;
    flex: 1;
    margin-right: 10px;
}
::v-deep .el-calendar__button-group {
    display: none;
}
.year-group {
    position: absolute;
    top: 13px;
    right: 500px;
}
.month-group {
    position: absolute;
    top: 13px;
    right: 100px;
}
.calendar-cell {
    width: 100%;
    height: 100%;
}
.calendar-day {
    text-align: center;
    /* color: #202535; */
    line-height: 30px;
    font-size: 12px;
}
.game-img {
    display: inline-block;
    width: 20px;
    height: 20px;
}
.tooltip-item {
    text-align: center;
}
.is-selected {
    color: #f8a535;
    font-size: 10px;
    margin-top: 5px;
}
.description{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
#calendar .el-button-group > .el-button:not(:first-child):not(:last-child):after {
    content: '当月';
}
.calendar-detail {
    width: 300px;
}
.box-card {
    height: 100%;
}
</style>
