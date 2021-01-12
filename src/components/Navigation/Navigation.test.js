import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import Logout from "../Logout/Logout";
import classes from "./Navigation.module.css";

configure({ adapter: new Adapter() });

describe("<Navigation />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Navigation />);
  });

  it("Should render one <NavLink /> element if not authenticated", () => {
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });

  it("Should render two <NavLink /> elements if authenticated", () => {
    wrapper.setProps({ isLoggedIn: true });
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });

  it("Should render the <Logout /> element if authenticated", () => {
    wrapper.setProps({ isLoggedIn: true });
    expect(wrapper.find(Logout)).toHaveLength(1);
  });

  it("Should render a <div /> element if user data is not empty", () => {
    wrapper.setProps({
      user: {
        name: "Hello",
        imageUrl: "SomeURL",
      },
    });
    expect(
      wrapper.contains(
        <div className={[classes.Link, classes.profileInfo].join(" ")}>
          <div>Hello</div>
          <img className={classes.Image} src="SomeURL" alt="profile" />
        </div>
      )
    ).toEqual(true);
  });
});
