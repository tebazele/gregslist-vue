<template>
    <div class="component">
        <h3>Add/Edit a car</h3>
        <form class="border border-secondary border-1 p-2" @submit.prevent="createCar">
            <div class="d-flex">
                <div class="mb-3 mx-2">
                    <label for="carMake" class="form-label">Car Make</label>
                    <input v-model="state.carFormData.make" type="text" class="form-control" id="carMake"
                        aria-describedby="car make" required>
                    <div id="helpMake" class="form-text">Put in the car make</div>
                </div>
                <div class="mb-3 mx-2">
                    <label for="carModel" class="form-label">Car Model</label>
                    <input v-model="state.carFormData.model" type="text" class="form-control" id="carModel"
                        aria-describedby="car model">
                    <div id="helpModel" class="form-text">Put in the car model</div>
                </div>
                <div class="mb-3 mx-2">
                    <label for="carYear" class="form-label">Year</label>
                    <input v-model="state.carFormData.year" type="number" class="form-control" id="carYear"
                        aria-describedby="car year">
                    <div id="helpYear" class="form-text">Car Year</div>
                </div>
                <div class="mb-3 mx-2">
                    <label for="carImg" class="form-label">Image</label>
                    <input v-model="state.carFormData.imgUrl" type="text" class="form-control" id="carImg"
                        aria-describedby="car img">
                    <div id="helpImg" class="form-text">Put in a URL</div>
                    <img :src="state.carFormData.imageUrl" class="img-fluid img-small" />
                </div>
                <div class="mb-3 mx-2">
                    <label for="carPrice" class="form-label">Price</label>
                    <input v-model="state.carFormData.price" type="number" class="form-control" id="carPrice"
                        aria-describedby="car price">
                    <div id="helpPrice" class="form-text">Car Price</div>
                </div>
                <div class="mb-3 mx-2">
                    <label for="carColor" class="form-label">Color</label>
                    <input v-model="state.carFormData.color" type="text" class="form-control" id="carColor"
                        aria-describedby="car color">
                    <div id="helpColor" class="form-text">Car Color</div>
                </div>
            </div>
            <div class="mb-3 mx-2">
                <label for="carDesc" class="form-label">Description</label>
                <textarea v-model="state.carFormData.description" type="text" class="form-control" id="carDesc"
                    aria-describedby="car color"></textarea>
                <div id="helpDesc" class="form-text">Write a description</div>
            </div>
            <div class="text-end">
                <button type="button" class="btn btn-warning mx-3" @click="cancelForm">Cancel</button>
                <button class="btn btn-info">
                    Save
                </button>
            </div>
        </form>
    </div>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { carsService } from '../services/CarsService.js';
export default {
    props: { carData: { type: Object, default: {} } },
    setup(props, { emit }) {

        onMounted(() => {
            state.carFormData = props.carData
        })

        const state = reactive({
            carFormData: {
                make: '',
                model: '',
                year: 0,
                description: '',
                imgUrl: '',
                color: '',
                price: 0,
                creatorId: computed(() => AppState.account.id)
            }
        })

        return {
            state,
            async createCar() {
                try {
                    await carsService.createCar(state.carFormData)
                    // editable.value = {}
                    state.carFormData = {}
                } catch (error) {
                    logger.log(error)
                    Pop.error(error)
                }
            },

            cancelForm() {
                emit('close')
            },

            async editCar() {

            }

        }
    }
};
</script>


<style lang="scss" scoped>
.img-small {
    height: 20vh;
}
</style>