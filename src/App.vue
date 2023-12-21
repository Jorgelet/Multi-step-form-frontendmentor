<template>
  <div class="global">
    <div class="container">
      <div class="header__container">
        <header class="header">
          <div class="header__numbers">
            <div class="numbers__containers">
              <div class="number" :class="{ 'number__active': currentStep === 1 }">1</div>
              <div class="number-toggle" v-if="isLargeScreen">
                <p class="paragraph-toggle">STEP 1</p>
                <h3 class="title-toggle">YOUR INFO</h3>
              </div>
            </div>
            <div class="numbers__containers">
              <div class="number" :class="{ 'number__active': currentStep === 2 }">2</div>
              <div class="number-toggle" v-if="isLargeScreen">
                <p class="paragraph-toggle">STEP 2</p>
                <h3 class="title-toggle">SELECT PLAN</h3>

              </div>

            </div>
            <div class="numbers__containers">
              <div class="number" :class="{ 'number__active': currentStep === 3 }">3</div>
              <div class="number-toggle" v-if="isLargeScreen">
                <p class="paragraph-toggle">STEP 3</p>
                <h3 class="title-toggle">ADD-ONS</h3>

              </div>

            </div>
            <div class="numbers__containers">
              <div class="number" :class="{ 'number__active': currentStep === 4 || currentStep === 5}">4</div>
              <div class="number-toggle" v-if="isLargeScreen">
                <p class="paragraph-toggle">STEP 4</p>
                <h3 class="title-toggle">SUMMARY</h3>

              </div>


            </div>
          </div>
        </header>
      </div>

      <div class="main__container">
        <component :is="steps[currentStep - 1]" @mounted="infoview = true" @beforeUnmount="infoview = false"
          @BackPlan="backChangePlan" />


        <div class="btn-container" v-if="currentStep > 1"
          :style="{ 'justify-content': infoview ? 'flex-end' : 'space-between' }">
          <BackButton v-show="currentStep > 1 && currentStep !== 5" @click="back" />
          <NextStepButton @click="next" v-if="currentStep > 1 && currentStep !== 4 && currentStep !== 5" />
          <ConfirmBilling v-if="currentStep === 4" @click="next" />
        </div>

      </div>

    </div>
  </div>
</template>

  

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
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

let isLargeScreen = ref(window.innerWidth >= 900);

onMounted(() => {
  window.addEventListener('resize', updateScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize);
});

function updateScreenSize() {
  isLargeScreen.value = window.innerWidth >= 900;
}
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
.container {
  height: 100vh;
  overflow: hidden;
  background-color: hsla(228, 100%, 84%, .3);
}

.header__container {
  background-color: hsla(228, 100%, 84%, .3);
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
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: auto;
  padding: 13px 20px;
  background-color: #fff;
}

@media (min-width: 900px) {

  .global {
    background-color: hsla(228, 100%, 84%, .3);
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    height: 80vh;
    width: 65vw;
    display: flex;
    flex-direction: row;
    margin: auto;
    gap: 40px;
    overflow: hidden;
    padding: 15px;
    border-radius: 20px;
    background-color: #fff;
  }

  .header__container {
    width: 30%;
  }

  .header {
    background-image: url('./assets/images/bg-sidebar-desktop.svg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    border-radius: 12px;
  }

  .header__container{
    background-color: unset;
  }

  .header__numbers {
    flex-direction: column;
    gap: 1.7rem;
    padding: 30px;
    align-items: normal;
    justify-content: normal;
  }

  .numbers__containers {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .number {
    width: 27px;
    height: 27px;
    font-size: .8rem;
    position: static;
  }


  .number-toggle {
    display: flex;
    flex-direction: column;
  }


  .main__container {
    width: 60%;
    position: relative;
  }

  .btn-container {
    display: flex;
    align-items: center;
    margin: auto;
    padding: 13px 20px;
    background-color: #fff;
  }

  .paragraph-toggle {
    font-size: .7rem;
    color: var(--Cool-gray);
    margin-bottom: .2rem;
  }

  .title-toggle {
    font-size: .8rem;
    font-weight: 700;
    color: var(--White);
  }
}
</style>
