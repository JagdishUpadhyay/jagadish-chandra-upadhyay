import React, { Component } from "react";
import NetworkProvider from "../../utils/NetworkProvider";
import { GET_PEARSON_USERS } from "../../constants/AppConstants";
import { ERROR_MSG, CONFIRMATION_MSG } from "../../constants/LanguageConstant";
import { PearsonUserComponent } from "../PearsonUserComponent/PearsonUserComponent";
import { filterDuplicates, setDocumentTitle } from "../../utils/Utilities";
import { Loader } from "../Loader/Loader";
import { ErrorComponent } from "../ErrorComponent/ErrorComponent";
import "../../assets/styles/pearsonusers.scss";

/**
 * Container component to display Pearson User list.
 */
export class PearsonUsers extends Component {
  /**
   * Initializing state. documentTitle is used to display page title.
   * @param {object} props 
   */
  constructor(props) {
    super(props);
    this.documentTitle = "Pearson User Management";
    this.state = {
      users: [
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
        }
      ],
      isDataLoaded: false,
      isErrorOccurred: false
    };
  }

  /**
   * Lifecycle method.
   * Setting document title and making API call to fetch Pearson user data.
   */
  componentDidMount() {
    setDocumentTitle(this.documentTitle);
    this.getPearsonUsers();
  }

  /**
   * Lifecycle method - componentDidCatch
   * It will display error in case component broke.
   */
  componentDidCatch() {
    this.setState({ isErrorOccurred: true });
  }

  /**
   * API call to fetch Pearson user list.
   */
  getPearsonUsers() {
    const url = `${GET_PEARSON_USERS}?page=1&per_page=10`;
    
    NetworkProvider.get(url).then((response) => {
      const allUsers = [...response.data, ...this.state.users];
      const uniqueUsers = filterDuplicates(allUsers, 'id');
      this.setState({ users: uniqueUsers, isDataLoaded: true });
    }).catch(() => {
      this.setState({ isErrorOccurred: true });
    })
  }

  /**
   * display confirmation dialog to user before delete operation.
   * @param {string} id 
   */
  showDeleteConfirmation(id) {
    const confirmationStatus = window.confirm(CONFIRMATION_MSG);
    if (confirmationStatus) {
      this.deleteUser(id);
    }
  }

  /**
   * Delete user from state based on user id.
   * @param {string} id 
   */
  deleteUser(id) {
    const allUsers = this.state.users;
    const selectedUserIndex = allUsers.findIndex(user => user.id === id);
    if (selectedUserIndex !== -1) {
      allUsers.splice(selectedUserIndex, 1);
      this.setState({ users: allUsers });
    }
  }

  /**
   * Return either one of the below component based on state.
   * Loader
   * PearsonUserComponent
   * ErrorComponent
   */
  renderComponent() {
    let component = <Loader />;
    if (this.state.isDataLoaded) {
      component = this.displayUsers();
    } else if (this.state.isErrorOccurred) {
      component = <ErrorComponent errorMsg={ERROR_MSG} />
    }
    return component;
  }

  /**
   * render PearsonUserComponent based on state.users array
   */
  displayUsers() {
    return (
      <section className="pearsonusers-container">
        {this.state.users.map((pearsonUser) => {
          return <PearsonUserComponent {...pearsonUser} key={pearsonUser.id}
            onDeleteUser={() => this.showDeleteConfirmation(pearsonUser.id)} />
        })
        }
      </section>
    )
  }

  /**
   * Lifecycle method. Will render the PearsonUsers component.
   */
  render() {
    return (
      <div className="pearon-users">
        <header><p className="page-title">{this.documentTitle}</p></header>
        {this.renderComponent()}
      </div>
    );
  }
}
