<template>
    <main class="main">
        <h1 class="main__title">Personal Info</h1>
        <p class="main__paragraph">Please provide your name, email address, and phone number</p>

        <form class="main__form" @submit.prevent="validateAndProceed">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="name" placeholder="e.g. Stephen King" required
                    autocomplete="cc-name" />
                <p v-if="errors.name" class="error">{{ errors.name }}</p>
            </div>

            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" id="email" v-model="email" placeholder="e.g stephenking@lorem.com" required
                    autocomplete="email" />
                <p v-if="errors.email" class="error">{{ errors.email }}</p>
            </div>

            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" v-model="phone" placeholder="e.g. +1 234 567 890" required
                    autocomplete="mobile" />
                <p v-if="errors.phone" class="error">{{ errors.phone }}</p>
            </div>

        </form>
    </main>
    <div class="btn-container">
        <button type="submit" class="nextbtn" @click="validateAndProceed">Next Step</button>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';

let name = ref('');
let email = ref('');
let phone = ref('');
let ajustBtn = ref(false);

const emit = defineEmits(['mounted', 'beforeUnmount', 'BackPlan']);



let errors = ref({});
const validateForm = () => {
    errors.value = {}

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
}

const validateAndProceed = () => {
    validateForm();
    if (Object.keys(errors.value).length === 0) {
        emit('BackPlan')
    }
}

onMounted(() => {
    emit('mounted');
});

onBeforeUnmount(() => {
    emit('beforeUnmount');
});
</script>

<style scoped>
.nextbtn {
    color: #fff;
    background-color: var(--Marine-blue);
    border-radius: 0.4rem;
    border: none;
    font-size: 17px;
    font-weight: 500;
    cursor: pointer;
    outline: none;
    width: 108px;
    height: 45px;
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.6rem 1.2rem;
    width: 92vw;
    margin: auto;
    background-color: #fff;
    position: relative;
    border-radius: 10px;
    bottom: 73px;
}

.main__title {
    font-size: 1.6rem;
    margin-bottom: .7rem;
    color: var(--Marine-blue);
}

.main__paragraph {
    font-size: 1.1rem;
    color: var(--Cool-gray);
    margin-bottom: 1.4rem;
    line-height: 1.4rem;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.3rem;
    color: var(--Marine-blue);
}

input {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #E0E0E0;
    font-size: 1rem;
    outline: none;
}

.error {
    color: rgb(150, 15, 15);
    font-size: .8rem;
    font-weight: 700;
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
    .main{
        position: static;
        width: auto;
    }

    .main__paragraph{
        font-size: 1rem;
        margin-bottom: 2rem;
    }

    label{
        font-size: .9rem;
    }
}
</style>
