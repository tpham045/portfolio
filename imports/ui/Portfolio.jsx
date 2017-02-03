import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ShowedMenu from './ShowedMenu.jsx'
import Dashboard from './Dashboard.jsx'
import HiddenMenuList from './HiddenMenuList.jsx'

//Styles
import { ListGroup } from 'react-bootstrap';

//Collections
import { MenusCollection } from '../api/MenusCollection.js'
 
class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelectAnyMenu: false,
      selectedMenuId: ''
    }
  }
  selectThisMenu(id) {
    //Create a session for this selected menu
    Session.set('selectedMenu', id )
    const selectedId = Session.get('selectedMenu')
    //Change state to reload each menu
    this.setState({
      userSelectAnyMenu: true,
      selectedMenuId: selectedId
    })
  }
  render() {
    let showedMenu = this.props.menus
    let hiddenMenuList = null
    let newClass
    console.log(this.state.selectedMenuId)
    if (this.state.userSelectAnyMenu) {
      hiddenMenuList = showedMenu.filter((menu) => menu._id !== this.state.selectedMenuId )
      showedMenu = showedMenu.filter((menu) => menu._id === this.state.selectedMenuId )
    }
    return (
      <div className='portfolio'>
        <ListGroup>
          { showedMenu.map((menu) => (
            <ShowedMenu 
              key={menu._id} 
              menu={menu} 
              Click={this.selectThisMenu.bind(this, menu._id)} 
              userSelectAnyMenu={this.state.userSelectAnyMenu}
            />
          ))
          }
        </ListGroup>
        <Dashboard userSelectAnyMenu={this.state.userSelectAnyMenu} />
        <HiddenMenuList 
          userSelectAnyMenu={this.state.userSelectAnyMenu} 
          hiddenMenuList={hiddenMenuList}
        />
      </div>
    )
  }
}
Portfolio.propTypes = {
  menus: PropTypes.array.isRequired
};
 
export default createContainer(() => {
  return {
    menus: MenusCollection.find({}).fetch(),
  };
}, Portfolio);

    // let showedMenu = this.props.menus
    // let hiddenMenu
    // if (this.state.status === 'SHOW SELECTED'){
    //   showedMenu = this.props.menus.filter(menu => menu.selected)
    //   hiddenMenu = this.props.menus.filter(menu => !menu.selected)
    // }