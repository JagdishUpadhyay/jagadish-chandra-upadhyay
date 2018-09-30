import React from "react";
import { shallow } from "enzyme";
import renderer from 'react-test-renderer';
import { ErrorComponent } from "../ErrorComponent/ErrorComponent";

describe("ErrorComponent", () => {
    let component;

    beforeEach(() => {
        component = shallow(<ErrorComponent />);
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(component)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('error class should be there', () => {
        expect(component.find('.error')).toHaveLength(1);
    });

    it('should render default message if errorMsg is not passed', () =>{
        expect(component.find('.error').text()).toEqual("Something went wrong. Please try again later.");
    });
});
