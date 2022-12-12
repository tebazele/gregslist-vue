<template>
    <div class="container-fluid">
        <section class="row">
            <div class="col-12">
                <CarForm />
            </div>
        </section>
        <section class="row justify-content-center">
            <div v-for="c in cars" class="col-4">
                <CarCard :car="c" />
                <!-- <div class="col-3" v-for="c in 9">
                    <div class="text-center border border-1 border-dark rounded bg-white m-3">
                        <img src="https://images.unsplash.com/photo-1541443131876-44b03de101c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            class="car-img" />
                        <h5>Make | Model | Year</h5>
                        <h6>$Price</h6>
                        <p>Description</p>
                    </div>
                </div> -->

            </div>
        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { carsService } from '../services/CarsService.js'
export default {
    setup() {
        async function getCars() {
            try {
                await carsService.getCars()
            } catch (error) {
                logger.error(error)
                Pop.error(error)
            }
        }
        onMounted(() => {
            getCars()
        })
        return {
            cars: computed(() => AppState.cars)
        }
    }
};
</script>


<style lang="scss" scoped>

</style>