<template>

    <div class="component container-fluid">
        <div class=" row pt-3" v-if="(editMode == false)">
            <div class="col-6 text-end">
                <img :src="activeCar?.imgUrl" class="img-fluid detail-img" />
            </div>
            <div class="col-5">
                <h3>{{ activeCar?.make }} | {{ activeCar?.model }} | {{ activeCar?.year }}</h3>
                <h1>${{ activeCar?.price }}</h1>

                <p>{{ activeCar?.description }}</p>


            </div>
            <div class="col-1 align-self-end">
                <button v-if="(activeCar.creatorId == account.id)" class="btn btn-info"
                    @click="toggleForm">Edit</button>
            </div>
        </div>
        <div v-else>
            <CarForm :carData="activeCar" @close="toggleForm" />
        </div>
    </div>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { carsService } from '../services/CarsService.js';
import CarForm from '../components/CarForm.vue';
export default {

    setup() {
        const route = useRoute();
        const editMode = ref(false);
        async function getCarById() {
            try {
                await carsService.getCarById(route.params.id);
            }
            catch (error) {
                logger.log(error);
                Pop.error(error);
            }
        }
        onMounted(() => {
            getCarById();
        });
        return {
            editMode,
            activeCar: computed(() => AppState.activeCar),
            account: computed(() => AppState.account),
            toggleForm() {
                editMode.value = !editMode.value;
            }
        };
    },
    components: { CarForm }
};
</script>


<style lang="scss" scoped>
.detail-img {
    height: 70vh;
}
</style>