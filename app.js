const getRandomBtw = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            monsterDmg: {
                min: 18,
                max: 10
            },
            playerDmg: {
                min: 18,
                max: 10
            },
            playerHealth: 100,
            playerPow: 0,
            currentRound: 0,
            fullPow: false
        }
    },
    computed: {
        monsterBarStyles() {
            return { width: this.monsterHealth + '%'}
        },
        playerBarStyles() {
            return { width: this.playerHealth + '%'}
        },
        playerPowBarStyles() {
            return { width: this.playerPow + '%'}
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            this.playerPow += 20;
            if (this.playerPow === 100) {
                this.fullPow = true;
            }
            const attackValue = getRandomBtw(this.playerDmg.min, this.playerDmg.max)
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomBtw(this.monsterDmg.min, this.monsterDmg.max)
            this.playerHealth -= attackValue;
        },
        specialAttackMonster(){
            this.currentRound++;
            if (this.fullPow) {
                const attackValue = getRandomBtw(this.playerDmg.min, this.playerDmg.max)
                this.monsterHealth -= attackValue*2;
                this.playerPow = 0;
                this.fullPow = false;
                this.attackPlayer();
            }
        },
        healPlayer() {
            this.currentRound++;
            if (this.playerHealth + 25 >= 100) {
                this.attackPlayer();
            } else {
                this.playerHealth += 25;
                this.attackPlayer();
            }
        }
    }
})

app.mount('#game');