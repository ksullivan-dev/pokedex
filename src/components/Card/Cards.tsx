import React from "react";
import { useAppSelector } from "../../store/hooks";
import Card from "./Card";

const Cards: React.FC = () => {
  const data = useAppSelector((state) => state.pokemons);

  if (!data.length) {
    return (
      <section className="base-margin-vertical">
        To get started, search for your favorite Pokemon!
      </section>
    );
  }

  return (
    <section className="grid grid-layout gap base-margin-vertical">
      {data.map((pokemon) => {
        return <Card key={pokemon.id} pokemon={pokemon} />;
      })}
    </section>
  );
};

export default Cards;
