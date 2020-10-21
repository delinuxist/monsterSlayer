new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  computed: {},
  methods: {
    startGame: function () {
      this.gameIsRunning = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.turns = [];
    },
    attack: function () {
      var damage = this.calculateDamage(10, 3);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster for " + damage,
      });

      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    specialAttack: function () {
      var damage = this.calculateDamage(20, 10);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Player hits monster hard for " + damage,
      });
      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    heal: function () {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
        this.monsterAttack();
      } else {
        this.playerHealth = 100;
      }
      if (this.playerHealth < 90) {
        this.turns.unshift({
          isPlayer: true,
          text: "Player heals for 10",
        });
      }
    },
    giveUp: function () {
      this.turns = [];
      this.startGame();
      this.gameIsRunning = false;
    },
    monsterAttack: function () {
      var damage = this.calculateDamage(12, 5);
      this.playerHealth -= damage;

      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: "Monster hits player for " + damage,
      });
    },
    calculateDamage: function (max, min) {
      var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
      return damage;
    },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You Won!! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You Lost!! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
  },
});
