import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GameCards from "./GameCards";
import GameCard from "./GameCard/GameCard";
import classes from "./GameCards.module.css";

configure({ adapter: new Adapter() });

describe("<GameCards />", () => {
  it("Should render two <GameCard /> elements for an array of 2 games", () => {
    const wrapper = shallow(<GameCards cards={[]} />);
    expect(wrapper.find(GameCard)).toHaveLength(0);
  });

  it("Should render two <GameCard /> elements for an array of 2 games", () => {
    const wrapper = shallow(
      <GameCards cards={[{ _id: "hello" }, { _id: "hello2" }]} />
    );
    expect(
      wrapper.contains(
        <div className={classes.CardsContainer}>
          <GameCard key="hello" game={{ _id: "hello" }} />
          <GameCard key="hello2" game={{ _id: "hello2" }} />
        </div>
      )
    ).toEqual(true);
  });
});
