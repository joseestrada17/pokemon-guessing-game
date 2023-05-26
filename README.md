# Pokemon Guessing Game

An app where users can make guessing games based on generation I pokemon.

## Author

Jose Estrada

## Installation:

### For development:

Clone the project files from github using

```
git clone https://github.com/joseestrada17/pokemon-guessing-game
```

Once user designates file location in terminal:

```
cd server
```

Create a new database called “pokemon-guessing_game_development”

```
createdb pokemon-guessing-game_development
```

next:

```
yarn install
```

In /server, make sure to migrate the table to the database

```
yarn run migrate:latest
```

Seed the database

```
yarn db:seed
```

To start up server:

```
yarn run dev
```

## [Pokemon Guessing Game](https://pokemon-guessing-game.herokuapp.com/)

## Features:

- Welcome page, displaying random pokemon from PokeApi

- A Nav-bar

- User Authentication

- You can create a game, or play other user's games

- When you click Play a game, you can choose from a list of games you can play.

- Clicking on Play Game, under each game lets you play said game, where you have to type the pokemon's you think fit in the title's description.

- Each pokemon that is correct is displayed as a picture to help the user.

- If you want to create a game for yourself, you click Make a new Game, where you have to enter the game's name, and you also have to select the pokemon that are correct in that particular game.
