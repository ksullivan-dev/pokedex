import type { EvolutionChain } from "pokenode-ts";
import { useAppDispatch } from "../../store/hooks";
import { fetchPokemon } from "../../store/pokemon";
import { capitalize } from "../../utilities/capitalize";
import { getEvolutionTree } from "../../utilities/getEvolutionTree";

interface Props {
  evolution: EvolutionChain;
  current: string;
}

const Evolution = ({ evolution, current }: Props) => {
  const dispatch = useAppDispatch();

  const tree = getEvolutionTree(evolution.chain);

  const handleClick = (value: string) => {
    dispatch(fetchPokemon(value));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div data-testid="evolution">
      <strong>Evolution:</strong>{" "}
      {tree.map((chain, idx, arr) => {
        const isLast = idx === arr.length - 1;
        return (
          <span key={chain.name}>
            {chain.name === current ? (
              capitalize(chain.name)
            ) : (
              <button
                className="unbutton"
                type="button"
                onClick={() => handleClick(chain.name)}
              >
                {capitalize(chain.name)}
              </button>
            )}
            {!isLast && ` > `}
          </span>
        );
      })}
    </div>
  );
};

export default Evolution;
