import React from "react";
import { shallow } from "enzyme";
import renderer from 'react-test-renderer';
import { Loader } from "../Loader/Loader";

describe("Loader", () => {
    let component;

    beforeEach(() => {
        component = shallow(<Loader />);
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(component)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('loader-container class should be there', () => {
        expect(component.find('.loader-container')).toHaveLength(1);
    })
});
