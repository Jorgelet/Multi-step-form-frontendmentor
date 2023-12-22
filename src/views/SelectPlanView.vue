<template>
    <main class="main">
        <h1 class="main__title">Select your plan</h1>
        <p class="main__paragraph">You have the option of monthly or yearly billing</p>

        <div class="main__options">
            <div v-for="plan in plans" :key="plan.name" class="option"
                :class="{ checked: namePlanstore.namePlan === plan.name }" @click="savePlan(plan)">
                <img :src="`/images/icon-${plan.name.toLowerCase()}.svg`" :alt="`icon-${plan.name.toLowerCase()}`">
                <div class="option__words">
                    <h2 class="option__title">{{ plan.name }}</h2>
                    <p class="option__paragraph">{{ !store.yearlyPlan ? `$${plan.priceMonth}/mo` : `$${plan.priceYear}/yr`
                    }}</p>
                    <p class="option__yearly-paragraph" v-show="store.yearlyPlan">2 months free</p>
                </div>
            </div>
        </div>

        <div class="changeplan">
            <p class="paragraphplan monthlyplan" :style="{ 'color': !store.yearlyPlan ? '#032a59' : '#969aab' }">Monthly</p>

            <button class="toggle-button" @click="toggle">
                <div :class="{ 'circle-left': !store.yearlyPlan, 'circle-right': store.yearlyPlan }"></div>
            </button>
            <p class="paragraphplan yearlyplan" :style="{ 'color': store.yearlyPlan ? '#032a59' : '#969aab' }">Yearly</p>
        </div>
    </main>
</template>

<script setup>
import { watch } from 'vue'
import { planStore } from '../stores/optionPlan';
import { namePlanStore } from '../stores/optionPlan';


const plans = [
    { name: 'Arcade', priceMonth: 9, priceYear: 90 },
    { name: 'Advanced', priceMonth: 12, priceYear: 120 },
    { name: 'Pro', priceMonth: 15, priceYear: 150 },
];

let currentTitle = '';
let currentPriceMonth = 0;
let currentPriceYear = 0;

const namePlanstore = namePlanStore();
const store = planStore();

const savePlan = (plan) => {
    if (!plan) return; 

    currentTitle = plan.name;
    currentPriceMonth = plan.priceMonth;
    currentPriceYear = plan.priceYear;

    namePlanstore.changeNamePlan(plan.name);

    if (!store.yearlyPlan) {
        namePlanstore.changePricePlan(plan.priceMonth);
    } else {
        namePlanstore.changePricePlan(plan.priceYear);
    }
};

const toggle = () => {
    store.changepPlan();
};


watch(() => store.yearlyPlan, () => {
    const plan = plans.find(plan => plan.name === currentTitle);
    if (plan) { // Add this line to prevent errors when plan is undefined
        savePlan(plan);
    }
});
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

@media (min-width: 900px) {
    .main {
        justify-content: flex-start;
        width: auto;
        padding: 1.6rem 1.2rem;
        position: static;
        height: 85%;
    }

    .main__title {
        font-size: 1.7rem;
    }

    .main__paragraph {
        font-size: 1rem;
        margin-bottom: 2rem;
        line-height: normal;
    }

    .main__options {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 45%;
    }

    .option {
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-evenly;
        width: 30%;
        border-radius: 10px;
        margin-bottom: 1rem;
        padding: 0 0.8rem;
    }

    img {
        width: 35px;
        height: 35px;
    }

    .option__title,
    .paragraphplan {
        font-size: .9rem;
    }

    .option__paragraph {
        font-size: .8rem;
    }
}
</style>

