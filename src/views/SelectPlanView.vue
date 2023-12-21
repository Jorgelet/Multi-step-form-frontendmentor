<template>
    <main class="main">
        <h1 class="main__title">Select your plan</h1>
        <p class="main__paragraph">You have the option of monthly or yearly billing</p>

        <div class="main__options">
            <div class="option" :class="{ checked: namePlanstore.namePlan === 'Arcade' }" @click="saveTitle('Arcade', 9, 90)">
                <img src="../assets/images/icon-arcade.svg" alt="icon-arcade">
                <div class="option__words">
                    <h2 class="option__title">Arcade</h2>
                    <p class="option__paragraph">{{ !store.yearlyPlan ? '$9/mo' : '$90/yr' }}</p>
                    <p class="option__yearly-paragraph" v-show="store.yearlyPlan">2 months free</p>
                </div>
            </div>

            <div class="option" :class="{ checked: namePlanstore.namePlan === 'Advanced' }" @click="saveTitle('Advanced', 12, 120)">
                <img src="../assets/images/icon-advanced.svg" alt="icon-advanced">
                <div class="option__words">
                    <h2 class="option__title">Advanced</h2>
                    <p class="option__paragraph">{{ !store.yearlyPlan ? '$12/mo' : '$120/yr' }}</p>
                    <p class="option__yearly-paragraph" v-show="store.yearlyPlan">2 months free</p>
                </div>
            </div>

            <div class="option" :class="{ checked: namePlanstore.namePlan === 'Pro' }" @click="saveTitle('Pro', 15, 150)">
                <img src="../assets/images/icon-pro.svg" alt="icon-pro">
                <div class="option__words">
                    <h2 class="option__title">Pro</h2>
                    <p class="option__paragraph">{{ !store.yearlyPlan ? '$15/mo' : '$150/yr' }}</p>
                    <p class="option__yearly-paragraph" v-show="store.yearlyPlan">2 months free</p>    
                </div>
            </div>
        </div>

        <div class="changeplan">
            <p class="monthlyplan" :style="{ 'color': !store.yearlyPlan ? '#032a59' : '#969aab'}">Monthly</p>

            <button class="toggle-button" @click="toggle">
                <div :class="{ 'circle-left': !store.yearlyPlan, 'circle-right': store.yearlyPlan }"></div>
            </button>
            <p class="yearlyplan" :style="{ 'color': store.yearlyPlan ? '#032a59' : '#969aab'}">Yearly</p>
        </div>
    </main>
</template>

<script setup>
import { watch } from 'vue'
import { planStore } from '../stores/optionPlan';
import { namePlanStore } from '../stores/optionPlan';

let currentTitle = '';
let currentPriceMonth = 0;
let currentPriceYear = 0;

const saveTitle = (title, pricemonth, priceyr) => {
    currentTitle = title;
    currentPriceMonth = pricemonth;
    currentPriceYear = priceyr;

    namePlanstore.changeNamePlan(title);

    if (!store.yearlyPlan) {
        namePlanstore.changePricePlan(pricemonth);
    } else {
        namePlanstore.changePricePlan(priceyr);
    }
};

const namePlanstore = namePlanStore();
const store = planStore();

watch(() => store.yearlyPlan, () => {
    saveTitle(currentTitle, currentPriceMonth, currentPriceYear);
});

const toggle = () => {
    store.changepPlan();
};
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.1rem 1.6rem;
    width: 92vw;
    margin: auto;
    background-color: #fff;
    position: relative;
    border-radius: 10px;
    bottom: 73px;
}

.main__title {
    font-size: 1.4rem;
    margin-bottom: .7rem;
    color: var(--Marine-blue);
}

.main__paragraph {
    font-size: 1.09rem;
    color: var(--Cool-gray);
    margin-bottom: 1.4rem;
    line-height: 1.4rem;
}

.main__options {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.option {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 1rem;
    padding: .7rem .8rem;
    outline: var(--Light-gray) solid .3px;
    border: none;
}

.option__words {
    display: flex;
    flex-direction: column;
    gap: .3rem;
}

.option.checked {
    outline: var(--Purplish-blue) solid 1.8px;
}

.option__title {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--Marine-blue);
}

.option__paragraph {
    font-size: 1rem;
    color: var(--Cool-gray);
}

.option__yearly-paragraph {
    font-size: .8rem;
    color: var(--Marine-blue);
}

.changeplan {
    display: flex;
    justify-content: space-evenly;
    margin-top: .5rem;
    padding: .7rem;
    border-radius: 7px;
    background-color: hsla(228, 100%, 84%, .1);
    color: var(--Cool-gray);
    font-weight: 700;
}

.toggle-button {
    background-color: var(--Marine-blue);
    width: 50px;
    height: 22px;
    position: relative;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    overflow: hidden;
}

.toggle-button .circle-left,
.toggle-button .circle-right {
    background-color: white;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    transition: all 10s ease-in-out;
}

.toggle-button .circle-left {
    left: 6px;
}

.toggle-button .circle-right {
    right: 6px;
}
</style>
