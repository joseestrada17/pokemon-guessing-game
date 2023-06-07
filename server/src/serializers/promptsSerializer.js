class PromptsSerializer {
  static serialize(prompt) {
    const { id, correctPokemonApiId, correctPokemonName, correctPokemonImageUrl, gameId } = prompt;

    return {
      id,
      correctPokemonApiId,
      correctPokemonName,
      correctPokemonImageUrl,
      gameId,
    };
  }
}

export default PromptsSerializer;
