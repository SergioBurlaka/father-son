import type { FC } from "react";
import { useState } from "react";

const initState: FatherType[] = [
  {
    name: "Father -1",
    id: " vadsga5225",
    sons: [
      {
        name: "son - a",
        id: "dasdfadg",
      },
      {
        name: "son - b",
        id: "sdgasdgas",
      },
      {
        name: "son - c",
        id: "asdgasgadfh",
      },
    ],
  },
  {
    name: "Father -3",
    id: "324523tg6hfgfg",
    sons: [
      {
        name: "son - z",
        id: "avdsas",
      },
      {
        name: "son - f",
        id: "adfgadfgdfg",
      },
    ],
  },
];

type SonType = {
  name: string;
  id: string;
  isSelected?: boolean;
};

type FatherType = {
  name: string;
  id: string;
  isSelected?: boolean;
  sons: SonType[];
};

export const FathersList: FC = () => {
  const [list, setList] = useState(initState);

  const changeStateOfSon = (sons: SonType[], sonId: string) =>
    sons.map((son) => {
      return son.id === sonId
        ? { ...son, isSelected: !son.isSelected }
        : { ...son };
    });

  const isAllSonsSelected = (sons: SonType[]) => {
    const res = sons.every((son) => son.isSelected === true);

    return !res;
  };

  const onChangeHandler = (fatherId: string, sonId: string) => {
    const changeStateofSons: FatherType[] = list.map((father) =>
      father.id === fatherId
        ? { ...father, sons: changeStateOfSon(father.sons, sonId) }
        : { ...father }
    );

    const newFathersState = changeStateofSons.map((father) => {
      return isAllSonsSelected(father.sons)
        ? { ...father, isSelected: false }
        : { ...father, isSelected: true };
    });

    console.log("newFathersState", newFathersState);

    setList(newFathersState);
  };

  return (
    <div>
      {list.map((father) => {
        return (
          <div key={father.id}>
            <div>father name: {father.name}</div>
            <div>
              <input
                type="checkbox"
                id="topping"
                name="topping"
                checked={father.isSelected}
              />
            </div>
            <div>
              <div>Sons:</div>
              {father.sons.map((son) => {
                return (
                  <div key={son.id}>
                    <div>Son name: {son.name}</div>
                    <input
                      type="checkbox"
                      id="topping"
                      name="topping"
                      checked={son.isSelected}
                      onChange={() => onChangeHandler(father.id, son.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
