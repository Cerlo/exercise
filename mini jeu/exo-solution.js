// game.js

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Player and user data
let player = null;
let userName = '';
let points = 0;

// Classes setup
const classes = {
  Guerrier: { life: 120, strength: 20, emoji: '🗡️' },
  Magicien: { life: 80, strength: 30, emoji: '🔮' },
  Voleur: { life: 90, strength: 25, emoji: '🥷' },
  Archer: { life: 100, strength: 22, emoji: '🏹' }
};

// Helper: ask a question and wait for input
function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// Create a new player
async function createCharacter() {
  console.log('Choisis une classe :');
  console.log('1. Guerrier 🗡️\n2. Magicien 🔮\n3. Voleur 🥷\n4. Archer 🏹');
  const classChoice = await ask('> ');
  let chosenClass;
  switch (classChoice) {
    case '1': chosenClass = 'Guerrier'; break;
    case '2': chosenClass = 'Magicien'; break;
    case '3': chosenClass = 'Voleur'; break;
    case '4': chosenClass = 'Archer'; break;
    default:
      console.log('Choix invalide. Guerrier par defaut.');
      chosenClass = 'Guerrier';
  }
  const { life, strength, emoji } = classes[chosenClass];
  player = { name: userName, class: chosenClass, life, maxLife: life, strength, emoji };
  console.log(`\n✅ Personnage cree : ${userName} le ${chosenClass} ${emoji} (Vie: ${life}, Force: ${strength})`);
}

// Generate a random enemy
function generateEnemy(isBoss = false) {
  const name = isBoss ? 'Boss Legendaire 👑' : 'Monstre Sauvage 👾';
  const life = isBoss ? Math.floor(Math.random() * 100) + 150 : Math.floor(Math.random() * 50) + 50;
  return { name, life, isBoss };
}

// Combat system
async function fight(isBoss = false) {
  if (!player) {
    console.log('🚫 Cree d\'abord ton personnage !');
    return;
  }

  const enemy = generateEnemy(isBoss);
  console.log(`\n⚔️ Un ${enemy.name} apparait ! (Vie: ${enemy.life})`);

  while (player.life > 0 && enemy.life > 0) {
    const guess = await ask('🎯 Choisis un chiffre entre 0 et 10 : ');
    const playerChoice = parseInt(guess);
    const randomNumber = Math.floor(Math.random() * 11);

    const diff = Math.abs(playerChoice - randomNumber);
    let hitSuccess = isBoss ? diff <= 3 : diff <= 5;

    if (hitSuccess) {
      const damage = Math.floor((10 - diff) * ((player.strength + points) / 10));
      enemy.life -= damage;
      console.log(`\n💥 Bonne attaque ! Tu infliges ${damage} degats. Vie restante de l'ennemi: ${enemy.life}`);
    } else {
      console.log(`\n😵 Ton attaque echoue !`);
    }

    if (enemy.life > 0) {
      const maxDamage = isBoss ? 20 : 10;
      const enemyDamage = Math.random() < (isBoss ? 0.9 : 0.6) ? Math.floor(Math.random() * (maxDamage + 1)) : 0;
      player.life -= enemyDamage;
      console.log(enemyDamage > 0 ? `🛡️ Le ${enemy.name} t'inflige ${enemyDamage} degats. Vie restante: ${player.life}` : `😅 Le ${enemy.name} a rate son attaque !`);
    }
  }

  if (player.life > 0) {
    const gainedPoints = isBoss ? 5 : 2;
    points += gainedPoints;
    const lifeIncrease = isBoss ? 4 : 2;
    const strengthIncrease = isBoss ? 2 : 1;
    player.maxLife += lifeIncrease;
    player.strength += strengthIncrease;
    player.life = player.maxLife;
    console.log(`\n🏆 Bravo ${player.name} ! Tu as vaincu le ${enemy.name} et gagne ${gainedPoints} points ! (+${lifeIncrease}❤️, +${strengthIncrease}💪) (Total: ${points} points)`);
    console.log(`❤️ Ta vie est maintenant restauree a ${player.life} !`);
  } else {
    console.log(`\n💀 Tu as ete vaincu par le ${enemy.name}...`);
  }
}

// Main menu
async function mainMenu() {
  userName = await ask('👋 Bienvenue, quel est ton nom ? ');

  while (true) {
    console.log(`\n🎮 Que veux-tu faire, ${player ? `${player.name} ${player.emoji} (❤️${player.life} | 💪${player.strength})` : userName} ?`);
    console.log('🚫 Action impossible | ✅ Action possible');
    console.log(player ? '🚫 1. Creer un personnage' : '✅ 1. Creer un personnage');
    console.log(player ? '✅ 2. Combattre un monstre' : '🚫 2. Combattre un monstre');
    console.log(player ? '✅ 3. Combattre un boss' : '🚫 3. Combattre un boss');
    console.log('✅ 5. Quitter le jeu');

    const choice = await ask('> ');

    if (!player && choice !== '1' && choice !== '5') {
      console.log('🚫 Tu dois d\'abord creer ton personnage !');
      continue;
    }

    switch (choice) {
      case '1':
        if (player) {
          console.log('🚫 Tu as deja cree ton personnage.');
        } else {
          await createCharacter();
        }
        break;
      case '2':
        await fight(false);
        break;
      case '3':
        await fight(true);
        break;
      case '5':
        console.log('👋 A bientot aventurier !');
        rl.close();
        return;
      default:
        console.log('❓ Choix invalide, essaie encore.');
    }
  }
}

// Start the game
mainMenu();
