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

// 1. Créer la fonction mainMenu
  //2. On demande le prénom du joueur (variable + ask)

  //3. Boucle pour afficher le menu sans arrêt
    // 3a. Afficher la question principale
      // Si le joueur a créé un personnage, on affiche aussi sa vie et sa force
      //`\n🎮 Que veux-tu faire, ${player.name} ${player.emoji} (❤️${player.life} | 💪${player.strength}) ?`
      // Sinon On lui demande quoi faire.
      //`\n🎮 Que veux-tu faire, ${userName} ?`
    

    // 4a. Afficher les messages suivants :
      // 🚫 Action impossible | ✅ Action possible
      // ✅ 0. Quitter le jeu
      //4b. Si personnage créé
      // 🚫 1. Creer un personnage (déjà créé)
      // ✅ 2. Combattre un monstre
      // ✅ 3. Combattre un boss
      //4c. Sinon
      // ✅ 1. Creer un personnage (déjà créé)
      // 🚫 2. Combattre un monstre
      // 🚫 3. Combattre un boss

    // 5. Demander le choix du joueur (création variable + ask)
      // >

    // 6. Vérifier que le joueur a bien un personnage
    /*if (!player && choice !== '1' && choice !== '5') {
      console.log('🚫 Tu dois d\'abord creer ton personnage !');
      continue; // Recommence au début de la boucle
    }*/

    // 7. Réagir selon le choix (utiliser un switch ou un if)
        //7a. Choix 1 
          // test de player 
          // si vrai
            //afficher '🚫 Tu as deja cree ton personnage.'
          //si faux Appeler la fonction createCharacter
            //7. Appeler la fonction createCharacter
        //7b. Choix 2 Appeler fight(false) pour un monstre
        //7c. Choix 3 Appeler fight(true) pour un boss

        //7d. Choix 0 afficher'👋 A bientot aventurier !');
        // Utiliser les lignes suivantes 
        /* rl.close(); // Fermer le jeu proprement
        return;    // Sortir de la fonction pour arrêter
        */

        //par defaut afficher "❓ Choix invalide"
  
  


// Start the game
mainMenu();
