import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const forwardStore1 = defineStore('forward', () => {

    let name = ref('');
    let email = ref('');
    let phone = ref('');
    let ajustBtn = ref(false);

    const errors = ref({});
    const validateForm = () => {


        if (!name.value) {
            errors.value.name = 'Name is required'
            ajustBtn.value = true;
        }

        if (!email.value) {
            errors.value.email = 'Email is required'
            ajustBtn.value = true;
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
            errors.value.email = 'Email is not valid'
            ajustBtn.value = true;
        }

        if (!phone.value) {
            errors.value.phone = 'Phone number is required'
            ajustBtn.value = true;
        }

        if (Object.keys(errors.value).length === 0) {
            emit('proceedToNextStep');
        }

    }

    return {
        errors,
        validateForm
    }
}, {
    persist: true
})