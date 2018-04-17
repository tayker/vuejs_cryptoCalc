var vm = new Vue({
    el: '#app',
    data: {
        json: null,
        calculateStatus: false,
        calculatedValue: null
    },
    created: function () {
        fetch('https://api.coinmarketcap.com/v1/ticker/')
            .then(r => r.json())
            .then(json => {
                this.json = json;
            });
    },
    methods: {
        calculateBtc: function(){
            var selects = document.querySelectorAll('.select--calculate');
            
            this.calculatedValue = selects[0].value - selects[1].value
        }
    }
});

Vue.component('calculate-modal', {
    data: function(){
        return{
            selected: ''
        }
    },
    props: ['json'],
    template: '<div class="select-wrap"><select v-model="selected" class="select select--calculate"><option v-for="(item, index) in json" v-bind:value="item.price_usd" v-bind:selected="index == 0">{{item.name}}  {{item.symbol}}</option></select><div id="criptoInfo">{{selected}} $</div></div>',
    created: function(){
        this.selected = this.json[0].price_usd;
    }
});

Vue.component('btc-modal', {
    data: function(){
        return{
            selected: ''
        }
    },
    props: ['json'],
    template: '<div class="select-wrap"><select v-model="selected" class="select"><option v-for="(item, index) in json" v-bind:value="item.price_usd" v-bind:selected="index == 0">{{item.name}}  {{item.symbol}}</option></select><div id="criptoInfo">{{selected}} $</div></div>',
    created: function(){
        this.selected = this.json[0].price_usd;
    }
});