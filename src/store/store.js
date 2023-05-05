import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: [
            { id: '1', name: 'vijay', age: 19, city: 'Rajkot' },
            { id: '2', name: 'Bharat', age: 20, city: 'Rajkot' },
            { id: '3', name: 'jay', age: 18, city: 'Rajkot' },
            { id: '4', name: 'kishan', age: 21, city: 'Porbandar' },
            { id: '5', name: 'vijay', age: 19, city: 'Porbandar' }
        ]
    },
    getters: {
        filterUser: state => {
            return state.users.filter(users => users.city == "Rajkot")
        }
    },
    mutations: {
        increaseAge(state) {
            state.users.forEach(users => {
                users.age++;
            })
        },
        decreaseAge(state) {
            state.users.forEach(users => {
                users.age--;
            })
        }
    }
})