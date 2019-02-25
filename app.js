const initialPlayer = {
  name: 'Tininha',
  life: 100,
  currentLife: 100,
  attack: 10
}

const initialEnemy = {
  name: 'Giozinho',
  life: 100,
  currentLife: 100,
  attack: 12
}

new Vue({
  el: '#app',
  data: {
    player: initialPlayer,
    enemy: initialEnemy,
    gameState: 'idle',
    logs: []
  },
  watch: {
    player: {
      handler(val){
        if(val.currentLife <= 0){
          this.player.currentLife = 0;
          this.gameState = 'lose'
          this.logs = []
        }else if(val.currentLife > 100){
          this.player.currentLife = 100;
        }
      },
      deep: true
    },
    enemy: {
      handler(val){
        if(val.currentLife <= 0){
          this.enemy.currentLife = 0;
          this.gameState = 'winner'
          this.logs = []
        }
      },
      deep: true
    }
  },
  methods: {
    startGame(){
      this.player = initialPlayer;
      this.enemy = initialEnemy;
      this.logs = []
      this.gameState = 'playing'
    },
    attack(attacker, defender, damage, message, color) {
      let randomAdditional = Math.floor((Math.random() * 4) + 1);
      let totalDamage = damage + randomAdditional;

      defender.currentLife -= totalDamage;
      this.logs.push({ type: 'attack', attacker: attacker.name, defender: defender.name,
                       totalDamage, message, color, id: this.logs.length + 1})
    },
    playerAttack(){
      this.attack(this.player, this.enemy, this.player.attack, '', '#a8ffb2')
      this.enemyAttack();
    },
    playerSpecial(){
      let randomSuccess = Math.floor((Math.random() * 6) + 1);

      if(randomSuccess == 1){
        this.attack(this.player, this.enemy, 0, 'Pegou de raspão!', '#ff99f1')
      } else {
        this.attack(this.player, this.enemy, this.player.attack + 5, 'Acertou em cheio!', '#ff9a3d')
      }

      this.enemyAttack();
    },
    heal(){
      let healAmount = Math.floor((Math.random() * 18) + 5)
      this.player.currentLife += healAmount;
      this.logs.push({ type: 'heal', healAmount, id: this.logs.length + 1, color: '#a0c4ff'})
      this.enemyAttack()
    },
    enemyAttack(){
      if(this.enemy.currentLife > 0){
        this.attack(this.enemy, this.player, this.enemy.attack, '', '#ff9b9b')
      }
    },
    exitGame(){
      this.gameState = 'idle'
      this.player.currentLife = 100;
      this.enemy.currentLife = 100;
      this.logs = []
    },
    resetGame(){
      this.gameState = 'playing'
      this.player.currentLife = 100;
      this.enemy.currentLife = 100;
    }
  },
  computed: {
    playerBarCss(){
      return {
        width: this.player.currentLife + '%',
        backgroundColor: this.player.currentLife > 30 ? 'green' : 'red'
      }
    },
    enemyBarCss(){
      return {
        width: this.enemy.currentLife + '%',
        backgroundColor: this.enemy.currentLife > 30 ? 'green' : 'red'
      }
    }
  }
})