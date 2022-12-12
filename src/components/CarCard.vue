<template>
    <div>
        <div class=" pos-rel text-center border border-1 border-dark rounded bg-white m-3" @click="seeCarDetails">
            <img :src="car.imgUrl" class="car-img" />
            <h5>{{ car.make }} | {{ car.model }} | {{ car.year }}</h5>
            <h6>${{ car.price.toLocaleString("en-US") }}</h6>
            <p>{{ car.description }}
                <button v-if="(car.creatorId == account.id)" class="trash-button btn" @click="removeCar">
                    <i class="me-3 fs-1 text-danger mdi mdi-delete-circle-outline"></i>
                </button>
            </p>

        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { carsService } from '../services/CarsService.js';
import { useRouter } from 'vue-router';
export default {
    props: { car: { type: Object, required: true } },
    setup(props) {
        const router = useRouter()
        return {
            account: computed(() => AppState.account),
            async removeCar() {
                try {
                    await carsService.removeCar(props.car.id)
                } catch (error) {
                    logger.log(error)
                    Pop.error(error)
                }
            },
            seeCarDetails() {
                router.push({ name: 'CarDetails', params: { id: props.car.id } })
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.car-img {
    object-fit: cover;
    margin: 0;
    width: 100%;
    height: 30vh;
}

.trash-button {
    position: absolute;
    top: 1px;
    right: 1px;
}

.pos-rel {
    position: relative;
}
</style>