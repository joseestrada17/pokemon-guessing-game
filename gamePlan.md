- rename your games migration to be a pokemons table
- also rename your game router and Game model etc to be Pokemon
  Features
- create a Game migration, model. Seed quizzes (which should just have a userId, id and title)
- add new game form that redirects to game show page after creation
- game show page (shows the title of the game...thats it e.g. "Starter Pokemon Quiz")
- on the game show page, you see a form to add prompts (checkin with Nick when you get here)
- a prompt is a pokemon that you can guess right
- make prompts table, model and gamePromptsRouter
- a prompt has: correctPokemonName, correctPokemonAPIid,
- submitting the form should add a prompt/question to the game
- have a games index page (so that other users can find your game)
- as a user looking at the game show page, I can see a button that says "Play Game"
  ....then guessing functionality

To help

- just replace "Game" with "Movie" in your group project
- replace "prompt" with "review"
- guesses are sort of like votes
