import type { EvolutionChain, Pokemon } from "pokenode-ts";
import { capitalize } from "../../utilities/capitalize";
import { prettify } from "../../utilities/prettify";
import { truncate } from "../../utilities/truncate";
import { getSprites } from "../../utilities/getSprites";
import Logo from "../../assets/images/pokenode-fallback.svg";
import Evolution from "./Evolution";

import styles from "./card.module.css";

interface Props {
  pokemon: Pokemon & { evolution: EvolutionChain };
}

const Card = ({ pokemon }: Props) => {
  const mainImage = pokemon.sprites.other?.home?.front_default || Logo;
  const abilities = pokemon.abilities
    .map((ability) => capitalize(prettify(ability.ability.name), true))
    .join(", ");

  const truncatedMoves = truncate(pokemon.moves);

  const moves =
    truncatedMoves.values
      .map((move) => capitalize(prettify(move.move.name), true))
      .join(", ") + ` + ${truncatedMoves.rest} more!`;

  const sprites = truncate(
    Object.entries(getSprites(pokemon.sprites)),
    4
  ).values.map(([name, url]) => {
    return (
      <div key={name}>
        <img
          src={url}
          alt={`${capitalize(prettify(name))} of ${capitalize(pokemon.name)}`}
          className={`border border-radius ${styles.sprites}`}
        />
      </div>
    );
  });

  const types = pokemon.types
    .map((type) => capitalize(prettify(type.type.name), true))
    .join(", ");

  return (
    <>
      <div className={styles.card} data-testid="card">
        <h2>{capitalize(pokemon.name)}</h2>
        <img
          className={styles["main-image"]}
          src={mainImage}
          alt={`Default Front of ${pokemon.name}`}
        />
        <p>
          <strong>Abilities:</strong> {abilities}
        </p>
        <p>
          <strong>Moves:</strong> {moves}
        </p>
        <p>
          <strong>Species:</strong> {capitalize(prettify(pokemon.species.name))}
        </p>
        <div>
          <strong>Sprites:</strong>
          {sprites.length ? (
            <div className="flex flex-wrap gap">{sprites}</div>
          ) : (
            " No sprites found!"
          )}
        </div>
        <p>
          <strong>Types:</strong> {types}
        </p>
        <Evolution evolution={pokemon.evolution} current={pokemon.name} />
      </div>
    </>
  );
};

export default Card;
