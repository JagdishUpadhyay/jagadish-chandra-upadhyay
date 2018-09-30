import React from "react";
import { shallow } from "enzyme";
import { PearsonUserComponent } from "../PearsonUserComponent/PearsonUserComponent";

describe("PearsonUserComponent", () => {
    let component;
    const pearsonUser = {
        id: 4,
        first_name: "Eve",
        last_name: "Holt",
        avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
    }

    beforeEach(() => {
        component = shallow(<PearsonUserComponent {...pearsonUser}/>);
    });

    it("should render full name of pearson user", () => {
        const name = `${pearsonUser.first_name} ${pearsonUser.last_name}`
        expect(component.find('span').text()).toEqual(name);
    });

    it("should trigger delete method once clicked on delete button", () => {
        const mockDeleteFunc = jest.fn();
        component.setProps({ onDeleteUser: mockDeleteFunc });
        component.find('button').simulate('click');
        expect(mockDeleteFunc).toHaveBeenCalledTimes(1);
    });

});
