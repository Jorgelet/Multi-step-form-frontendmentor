<template>
  <div class="container">
    <div class="header__container">
      <header class="header">
        <div class="header__numbers">
          <div class="number" :class="{ 'number__active': currentStep === 1 }">1</div>
          <div class="number" :class="{ 'number__active': currentStep === 2 }">2</div>
          <div class="number" :class="{ 'number__active': currentStep === 3 }">3</div>
          <div class="number" :class="{ 'number__active': currentStep === 4 }">4</div>
        </div>
      </header>

      <component :is="steps[currentStep - 1]" @mounted="infoview = true" @beforeUnmount="infoview = false"
        @BackPlan="backChangePlan" />

      
    </div>

    <div class="btn-container" :style="{ 'justify-content': infoview ? 'flex-end' : 'space-between' }">
        <BackButton v-show="currentStep > 1 && currentStep !== 5" @click="back" />
        <NextStepButton @click="next" v-if="currentStep > 1 && currentStep !== 4 && currentStep !== 5" />
        <ConfirmBilling v-if="currentStep === 4" @click="next" />
      </div>
  </div>
</template>

  

<script setup>
import { ref } from 'vue'
import PersonalInfoView from './views/PersonalInfoView.vue';
import NextStepButton from './components/NextStepButton.vue';
import BackButton from './components/BackButton.vue';
import SelectPlanView from './views/SelectPlanView.vue';
import PickAddView from './views/PickAddView.vue';
import ConfirmView from './views/ConfirmView.vue';
import FinalView from './views/FinalView.vue'
import ConfirmBilling from './components/ConfirmBilling.vue';

let infoview = ref(false);
let currentStep = ref(1);
const steps = [PersonalInfoView, SelectPlanView, PickAddView, ConfirmView, FinalView];


const next = () => {
  if (currentStep.value < steps.length) {
    currentStep.value += 1;
  }
};

const back = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
};

const backChangePlan = () => {
  currentStep.value = 2;
}

</script>

<style scoped>
.container{
  height: 100vh;
  overflow: hidden;
}
.header__container {
  background-color: hsla(228, 100%, 84%, .3);
  height: 90vh;
}

.header {
  background-image: url('./assets/images/bg-sidebar-mobile.svg');
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 172px;
}

.number {
  background-color: transparent;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  color: #fff;
  outline: white solid 1px;
  position: relative;
  top: 2rem;
  justify-content: center;
}

.number__active {
  background-color: var(--Light-blue);
  color: var(--Marine-blue);
  outline: transparent;
  font-weight: 700;
}

.header__numbers {
  display: flex;
  gap: 1.3rem;
  align-items: center;
  justify-content: center;
}

.btn-container {
  display: flex;
  align-items: center;
  margin: auto;
  padding: 13px 20px;
}

@media (min-width: 768px) {

  body{
    background-color: hsla(228, 100%, 84%, .3);
  }


}
</style>
