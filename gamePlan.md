May 19

- make the prompt model -done
- add the prompt relationMapps and Game relationmappings -done
- update the gamesRouter show endpoint to also return any existing prompts for that game -done
- when adding a new prompt, make sure that prompt is added to the prompsts state -done

- rename your games migration to be a pokemons table -done
- also rename your game router and Game model etc to be Pokemon -done
  Features
- create a Game migration, model. Seed quizzes (which should just have a userId, id and title) -done
- add new game form that redirects to game show page after creation -done
- game show page (shows the title of the game...thats it e.g. "Starter Pokemon Quiz") -done
- on the game show page, you see a form to add prompts (checkin with Nick when you get here) -done
- a prompt is a pokemon that you can guess right
- make prompts table, model and gamePromptsRouter -done
- a prompt has: correctPokemonName, correctPokemonAPIid,-done
- submitting the form should add a prompt/question to the game -dne
- have a games index page (so that other users can find your game) -done
- as a user looking at the game show page, I can see a button that says "Play Game"
  ....then guessing functionality

To help

- just replace "Game" with "Movie" in your group project
- replace "prompt" with "review"
- guesses are sort of like votes
