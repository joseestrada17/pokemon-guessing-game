class GamesSerializer {
  static serialize(game) {
    const { id, title, userId } = game;
    return { id, title, userId };
  }

  static serializeWithPrompts(game, prompts) {
    const serializedGame = this.serialize(game);
    const serializedPrompts = prompts.map((prompt) => ({
      id: prompt.id,
      content: prompt.content,
    }));

    return { game: serializedGame, prompts: serializedPrompts };
  }
}

export default GamesSerializer;
