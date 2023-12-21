<template>
    <main class="main">
        <h1 class="main__title">Finishing up</h1>
        <p class="main__paragraph">Double-check everything looks OK before confirming</p>

        <div class="main__flex" >
            <div class="flex__container">
                <div class="main__words">
                    <h2 class="words__title">{{ namePlanstore.namePlan }}({{ !store.yearlyPlan ? 'Monthly' : 'Yearly' }})
                    </h2>
                    <button @click="back" class="words__info words__info-link">Change</button>
                </div>
                <p class="price price-principal">{{ namePlanstore.pricePlan }}<span>{{ !store.yearlyPlan ? '/mo' : '/yr' }}</span></p>
            </div>

            <template v-for="service in servicesPlanstore.servicesPlan" :key="service.titleServices">
                <div class="flex__container">
                    <div class="main__words">
                        <h2 class="words__info">{{ service.titleServices }}</h2>
                    </div>
                    <p class="price"><span>+$</span>{{ service.priceServices }}<span>{{ !store.yearlyPlan ? '/mo' : '/yr' }}</span></p>
                </div>
            </template>
            
            <div class="flex__container-total">
                <div class="main__words">
                    <h2 class="words__info">Total ({{ !store.yearlyPlan ? 'per month' : 'per year' }})</h2>
                </div>
                <p class="price-total"><span>+$</span>{{ total + namePlanstore.pricePlan }}<span>{{ !store.yearlyPlan ? '/mo' : '/yr' }}</span></p>
            </div>
        </div>
    </main>
</template>

<script setup>
import { namePlanStore, planStore, servicesPlanStore} from '../stores/optionPlan';
import { computed } from 'vue';

const namePlanstore = namePlanStore();
const servicesPlanstore = servicesPlanStore();
const store = planStore();

let total = computed(() => servicesPlanstore.totalPriceServices());

const emit = defineEmits(['BackPlan']);
const back = () => {
    emit('BackPlan');
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
    font-size: 1.1rem;
    color: var(--Cool-gray);
    margin-bottom: 1.4rem;
    line-height: 1.4rem;
}

.main__flex {
    display: flex;
    flex-direction: column;
}

.flex__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .8rem;
    border: none;
    background-color: var(--Magnolia);
}

.flex__container-total{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    padding: .8rem;
    position: relative;
    top: 1rem;
    border: none;
    background-color: var(--Alabaster);

}

.words__title{
    font-size: 1rem;
    color: var(--Marine-blue);
}

.words__info{
    font-size: 1rem;
    color: var(--Cool-gray);
    font-weight: 500;
}

.words__info-link{
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    text-decoration: underline;

}

.price{
    font-size: 1rem;
    color: var(--Marine-blue);
    font-weight: 500;
}

.price-principal{
    font-size: 1rem;
    color: var(--Marine-blue);
    font-weight: 700;
}

.price-total{
    font-size: 1.1rem;
    color: var(--Purplish-blue);
    font-weight: 700;
}

@media (min-width: 900px) {
    .main{
        position: static;
        width: auto;
    }

    .main__paragraph{
        font-size: 1rem;
        margin-bottom: 2rem;
    }

    .words__info, .words__title, .price{
        font-size: .9rem;
    }

    .price-total{
        font-size: 1rem;
    }
}
</style>