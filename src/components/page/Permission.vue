
<template>
    <div class="main">
        <div class="choose_year">
            <div class="icon" @click="chooseYears(-1)"><i class="fa fa-angle-double-left"></i></div>
            <div class="icon" @click="chooseMonth(-1)"><i class="fa fa-angle-left"></i></div>
            <div class="date">{{ year }}.{{ month.toString().padStart(2, '0') }}</div>
            <div class="icon" @click="chooseMonth(1)"><i class="fa fa-angle-right"></i></div>
            <div class="icon" @click="chooseYears(1)"><i class="fa fa-angle-double-right"></i></div>
        </div>
        <div class="days_area">
            <div class="day week" v-for="week in weeks" :key="week">{{ week }}</div>
            <div
                class="day"
                @click="chooseThisDay(day.gregorian)"
                v-for="(day, index) in days"
                :key="index"
                :class="day.gregorian === today ? 'choose_day' : ''"
            >
                <p>{{ day.gregorian }}</p>
                <span>{{ day.lunar }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {};
    }
};
</script>

<style scoped>
.main {
}
.choose_year {
    display: flex;
}
.icon {
    width: 10%;
    height: 8vh;
    line-height: 8vh;
    text-align: center;
}
.date {
    width: 60%;
    text-align: center;
    height: 8vh;
    line-height: 8vh;
    font-size: 1.2rem;
}
.days_area {
    display: flex;
    flex-wrap: wrap;
}
.day {
    width: 14.28%;
    text-align: center;
    padding: 1vh 0;
    margin-top: 1vh;
}
p {
    margin: 0;
    font-size: 6vw;
}
span {
    font-size: 3vw;
}
.week {
    background-color: dodgerblue;
    color: #fff;
    font-weight: bold;
    height: 6vh;
    line-height: 4vh;
    margin: 0;
}
.choose_day {
    background-color: dodgerblue;
    color: #fff;
    font-weight: bold;
}
</style>