import React from "react";
import Games from "./Games";
import GameCards from "../GameCards/GameCards";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("../../petitions/petitions");

it("fetches games from the server and renders then on mount", (done) => {
  const wrapper = shallow(<Games isLoggedIn />);

  setTimeout(() => {
    wrapper.update();

    expect(wrapper.find(GameCards)).toHaveLength(1);
    done();
  });
});
