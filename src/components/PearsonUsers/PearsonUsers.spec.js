import React from "react";
import { shallow } from "enzyme";
import { PearsonUsers } from "./PearsonUsers";
import { PearsonUserComponent } from "../PearsonUserComponent/PearsonUserComponent";
import { Loader } from "../Loader/Loader";
import { ErrorComponent } from "../ErrorComponent/ErrorComponent";
import { filterDuplicates } from "../../utils/Utilities";

const mockUsers = [
  {
    id: 4,
    first_name: "Eve",
    last_name: "Holt",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
  },
  {
    id: 5,
    first_name: "Charles",
    last_name: "Morris",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
  },
  {
    id: 6,
    first_name: "Tracey",
    last_name: "Ramos",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
  },
  {
    id: 5,
    first_name: "Charles",
    last_name: "Morris",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
  }
]

describe("PearsonUsers", () => {
  let component;

  beforeEach(() => {
    component = shallow(<PearsonUsers />);
  });

  it("renders a header", () => {
    const header = component.find("header");
    expect(header.text()).toEqual("Pearson User Management");
  });

  it("should display loader component when data is not loaded", () => {
    expect(component.find(Loader).exists()).toBeTruthy();
  });

  it("should render PearsonUserComponent component if data is loaded", () => {
    component.setState({ isDataLoaded: true });
    const userCount = component.state().users.length;
    expect(component.find(PearsonUserComponent)).toHaveLength(userCount);
  });

  it("should display error component when error is occurred", () => {
    component.setState({ isErrorOccurred: true });
    expect(component.find(ErrorComponent).exists()).toBeTruthy();
  });
  
  it("should remove duplicate user", () =>{
    const mockUserIds = mockUsers.map((user) => user.id);
    const isDuplicateExistsInMockData = mockUserIds.some((id, index) => mockUserIds.indexOf(id) != index);
    expect(isDuplicateExistsInMockData).toBeTruthy();
    const uniqueUsers = filterDuplicates(component.state().users, 'id');
    const isDuplicateExistsInUniqueUsers = uniqueUsers.some((id, index) => uniqueUsers.indexOf(id) != index);
    expect(isDuplicateExistsInUniqueUsers).toBeFalsy();
  });

  it("should delete the pearson user based on id", () => {
    const userIdToDelete = 4;
    let isUserExist = component.state().users.findIndex((user) => user.id === userIdToDelete) !== -1;
    expect(isUserExist).toBeTruthy();
    component.instance().deleteUser(userIdToDelete);
    isUserExist = component.state().users.findIndex((user) => user.id === userIdToDelete) !== -1;
    expect(isUserExist).toBeFalsy();
  });

  it("users array in state should be same if id is not exist in deleteuser action", () => {
    const userIdToDelete = 15;
    const usersCount = component.state().users.length;
    component.instance().deleteUser(userIdToDelete);
    const usersCountAfterDelete = component.state().users.length;
    expect(usersCount).toEqual(usersCountAfterDelete);
  });
});
