<template>
    <main class="main">
        <img src="../assets/images/icon-thank-you.svg" alt="icon-thank you" class="main__img">

        <h1 class="main__title">Thank you!</h1>
        <p class="main__paragraph">Thanks for confirming your subscription!<br />We hope you have fun using our plataform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
    </main>
</template>

<script setup>
</script>

<style scoped>
    .main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5rem 1.2rem;
        width: 92vw;
        margin: auto;
        background-color: #fff;
        position: relative;
        border-radius: 10px;
        bottom: 73px;
    }

    .main__img{
        width: 55px;
        height: 55px;
        margin-bottom: 1.4rem;   
    }

    .main__title{
        color: var(--Marine-blue);
        font-size: 1.5rem;
        margin-bottom: .7rem;
    }

    .main__paragraph{
        text-align: center;
        font-size: 1rem;
        color: var(--Cool-gray);
        margin-bottom: 1.4rem;
        line-height: 1.4rem;
    }

    @media (min-width: 900px) {
    .main{
        position: static;
        width: auto;
        height: 100%;
        padding: 0 2rem;
    }

    .main__title{
        font-size: 1.7rem;
    }

    .main__paragraph{
        font-size: .9rem;
    }
}
</style>