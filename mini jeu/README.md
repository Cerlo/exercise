# 📚 Mini-cours : Construire la fonction `mainMenu()` pour un jeu de combat

---

## 🎯 Objectif

Apprendre à :
- Créer une fonction
- Utiliser des boucles (`while`)
- Utiliser des conditions (`if`, `else`, `else if`, `switch`)
- Afficher du texte (`console.log`)
- Appeler une fonction
- Comprendre le mot `await`

---

## 1. ✨ Créer une fonction

En JavaScript, une fonction est comme une recette : on écrit toutes les étapes à faire.

```javascript
async function mainMenu() {
  // Instructions ici
}
```

Le mot `async` veut dire qu'on peut **attendre** une réponse (comme quand on pose une question).

---

## 2. 🌐 Appeler une fonction

Pour utiliser une fonction, on écrit simplement son nom avec des parenthèses `()` :

```javascript
mainMenu();
```

Ceci lance la fonction ! 🚀

---

## 3. 📁 Les variables importantes

Dans `mainMenu()`, on utilise :

- `userName` pour stocker le **nom du joueur**.
- `choice` pour stocker **le choix du joueur**.

```javascript
userName = await ask('Quel est ton prénom ?');
const choice = await ask('> ');
```

**`await` veut dire :** ⬇️ Attendre la réponse de l'utilisateur avant de continuer.

---

## 4. 🔄 Les boucles

| Nom de la boucle | Quand l'utiliser | Exemple |
|:---|:---|:---|
| `for` | Répéter un nombre connu de fois | Compter de 1 à 10 |
| `while` | Répéter tant que ce n'est pas fini | Afficher un menu sans arrêt |
| `do...while` | Répéter au moins une fois | Question posée une fois minimum |

**Dans notre jeu** on utilise :

```javascript
while (true) {
  // Montrer le menu à chaque tour
}
```

---

## 5. ⚖️ Les conditions (if / else / else if / switch)

**if** permet de vérifier une condition :

```javascript
if (player) {
  console.log('Bienvenue héros !');
}
```

**else** permet de faire autre chose :

```javascript
else {
  console.log('Créons ton personnage !');
}
```

**else if** permet de tester une autre condition :

```javascript
if (choice === '1') {
  await createCharacter();
} else if (choice === '2') {
  await fight(false);
} else {
  console.log('Choix invalide.');
}
```

**switch** est utile quand il y a beaucoup de choix :

```javascript
switch (choice) {
  case '1':
    await createCharacter();
    break;
  case '2':
    await fight(false);
    break;
  default:
    console.log('Choix invalide.');
}
```

---

## 6. 📣 Utiliser `console.log`

`console.log` sert à **afficher des messages** à l'écran pour aider le joueur.

```javascript
console.log('Bienvenue dans le jeu !');
console.log('Tu as 100 points de vie.');
```

---

## 7. 🎮 Construire la fonction `mainMenu()`

Voici ton squelette à remplir :

```javascript
// 1. Créer la fonction mainMenu
async function mainMenu() {

  // 2. Demander le prénom du joueur
  userName = await ask('👋 Bienvenue, quel est ton nom ? ');

  // 3. Créer une boucle pour afficher le menu sans arrêt
  while (true) {

    // 3a. Afficher la question principale
    if (player) {
      console.log(`\n🎮 Que veux-tu faire, ${player.name} ${player.emoji} (❤️${player.life} | 💪${player.strength}) ?`);
    } else {
      console.log(`\n🎮 Que veux-tu faire, ${userName} ?`);
    }

    // 4. Afficher les choix
    if (player) {
      console.log('🚫 1. Créer un personnage (déjà créé)');
      console.log('✅ 2. Combattre un monstre');
      console.log('✅ 3. Combattre un boss');
    } else {
      console.log('✅ 1. Créer un personnage');
      console.log('🚫 2. Combattre un monstre (pas encore de personnage)');
      console.log('🚫 3. Combattre un boss (pas encore de personnage)');
    }
    console.log('✅ 5. Quitter le jeu');

    // 5. Demander le choix du joueur
    const choice = await ask('> ');

    // 6. Vérifier que le joueur a créé un personnage pour combattre
    if (!player && choice !== '1' && choice !== '5') {
      console.log('🚫 Tu dois d\'abord créer ton personnage !');
      continue;
    }

    // 7. Agir selon le choix avec switch
    switch (choice) {
      case '1':
        if (player) {
          console.log('🚫 Tu as déjà créé ton personnage.');
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
        console.log('👋 A bientôt aventurier !');
        rl.close();
        return;
      default:
        console.log('❓ Choix invalide, essaie encore.');
    }
  }
}

// 8. Appeler ta fonction en bas du fichier :
mainMenu();
```

---

# 🌟 Bravo !

Avec ce plan, tu peux construire tout seul ton menu d'aventure !  
N'oublie pas :
- 🔢 Tester souvent
- 📖 Lire bien les messages d'erreur
- 🚀 T'amuser et apprendre

---

2. Colle ce texte dans un fichier texte vide.
3. Sauvegarde-le sous `README.md`.

✅ Et tu pourras l'utiliser comme un vrai fichier README prêt pour GitHub ou ton projet perso !

---

Veux-tu que je prépare en plus une vraie archive `.zip` avec le README prêt si tu préfères tout recevoir en un clic ? 📦🎯  
(Dis-moi !)
