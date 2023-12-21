import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const planStore = defineStore('plan', ()=>{
    const yearlyPlan = ref(false);
    function changepPlan(){
        yearlyPlan.value = !yearlyPlan.value;
    }

    return {
        yearlyPlan,
        changepPlan
    }
},{
    persist: true
})


export const namePlanStore = defineStore('namePlan', ()=>{
    const namePlan = ref('');
    function changeNamePlan(title){
        namePlan.value = title;
    }

    const pricePlan = ref(0);
    function changePricePlan(price){
        pricePlan.value = price;
    }
    return {
        namePlan,
        pricePlan,
        changeNamePlan,
        changePricePlan
    }
},{
    persist: true
})


export const servicesPlanStore = defineStore('servicesPlan', ()=>{
    const isChecked = reactive({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false  
    })
    const servicesPlan = ref([]);

    function changeCheckboxState(key, value){
        isChecked[key] = value;
    }
    function changeServicesPlan(titleServices, priceServices){
        servicesPlan.value = [...servicesPlan.value, {titleServices, priceServices}];
    }
    function totalPriceServices(){
        let total = 0;
        servicesPlan.value.forEach((item)=>{
            total += item.priceServices;
        })
        return total;
    }

    return {
        servicesPlan,
        isChecked,
        changeServicesPlan,
        changeCheckboxState,
        totalPriceServices
    }
},{
    persist: true
})