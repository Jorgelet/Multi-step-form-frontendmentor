<template>
    <main class="main">
        <h1 class="main__title">Pick add-ons</h1>
        <p class="main__paragraph">Add-ons help enhance your gaming experience</p>

        <div class="main__flex">
            <div class="flex__container" :class="{ 'checked': isChecked.checkbox1 }">
                <input type="checkbox" class="checkbox" id="checkbox1" v-model="isChecked.checkbox1" @click="saveService($event)">
                <div class="flex__words">
                    <h2 class="words__title">Online service</h2>
                    <p class="words__paragraph">Access to multiplayer games</p>
                </div>
                <p class="price">{{ !store.yearlyPlan ? '+$9/mo' : '+$90/yr' }}</p>
            </div>

            <div class="flex__container" :class="{ 'checked': isChecked.checkbox2 }">
                <input type="checkbox" class="checkbox" id="checkbox2" v-model="isChecked.checkbox2" @click="saveService($event)">
                <div class="flex__words">
                    <h2 class="words__title">Larger storage</h2>
                    <p class="words__paragraph">Extra 1TB of cloud save</p>
                </div>
                <p class="price">{{ !store.yearlyPlan ? '+$2/mo' : '+$20/yr' }}</p>
            </div>

            <div class="flex__container" :class="{ 'checked': isChecked.checkbox3 }">
                <input type="checkbox" class="checkbox" id="checkbox3" v-model="isChecked.checkbox3" @click="saveService($event)">
                <div class="flex__words">
                    <h2 class="words__title">Customizable profile</h2>
                    <p class="words__paragraph">Custom theme on your profile</p>
                </div>
                <p class="price">{{ !store.yearlyPlan ? '+$2/mo' : '+$20/yr' }}</p>
            </div>
        </div>
    </main>
</template>

<script setup>
import { reactive } from 'vue'
import { planStore } from '../stores/optionPlan';
import { servicesPlanStore } from '../stores/optionPlan';

const store = planStore();
const servicesPlanstore = servicesPlanStore();
let isChecked = reactive(servicesPlanstore.isChecked);

const saveService = (event) => {
    let titleService = event.target.parentNode.querySelector('.words__title').textContent;
    let priceServiceElement = event.target.parentNode.querySelector('.price');
    let priceService = parseFloat(priceServiceElement.textContent.replace(/[^0-9.]/g, ''));

    if (event.target.checked) {
        servicesPlanstore.changeServicesPlan(titleService, priceService);
    } else {
        servicesPlanstore.servicesPlan = servicesPlanstore.servicesPlan.filter(service => service.titleServices !== titleService);
    }

    const key = event.target.id;
    isChecked[key] = event.target.checked;
    servicesPlanstore.changeCheckboxState(key, isChecked[key]);
};

</script>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5rem 1.6rem 2.2rem 1.6rem;
    width: 92vw;
    margin: auto;
    background-color: #fff;
    position: relative;
    border-radius: 10px;
    bottom: 73px;
}

.main__title {
    font-size: 1.7rem;
    margin-bottom: .7rem;
    color: var(--Marine-blue);
}

.main__paragraph {
    font-size: 1.09rem;
    color: var(--Cool-gray);
    margin-bottom: 1.4rem;
    line-height: 1.4rem;
}

.main__flex {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.flex__container {
    display: flex;
    gap: 1.1rem;
    align-items: center;
    border-radius: 10px;
    padding: .8rem;
    outline: var(--Light-gray) solid .3px;
    border: none;
}

.flex__container.checked {
    outline: var(--Purplish-blue) solid 1.8px;
}

.checkbox {
    width: 1.1rem;
    height: 1.1rem;
}

.flex__words {
    display: flex;
    flex-direction: column;
    gap: .3rem;
}

.words__title {
    font-size: 1rem;
    font-weight: 700;
    color: var(--Marine-blue);
}

.words__paragraph {
    font-size: .9rem;
    color: var(--Cool-gray);
}

.price {
    font-size: 1rem;
    font-weight: 500;
    color: hsl(243, 67%, 40%);
}
</style>