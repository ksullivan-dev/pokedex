import React from "react";
import styles from "./form.module.css";
import { fetchPokemon } from "../../store/pokemon";
import { useAppDispatch } from "../../store/hooks";

const Form = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      elements: HTMLFormControlsCollection & {
        "pokemon-value": { value: string };
      };
      reset: () => void;
    };

    const value = target.elements["pokemon-value"].value;
    const response = await dispatch(fetchPokemon(value));

    if (response.type === "pokemon/fetchPokemon/fulfilled") {
      target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={`${styles.input} border border-radius`}
        type="text"
        placeholder="Search by name or id"
        name="pokemon-value"
      />
      <button
        type="submit"
        className={`${styles.button} unbutton border border-radius`}
      >
        Search
      </button>
    </form>
  );
};

export default Form;
