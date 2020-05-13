import React from 'react';
import MenuContainer from './Components/MenuContainer'
import Board from './Screens/Board'
import MyBoard from './Screens/MyBoard'
import Login from './Screens/Login'
import Register from './Screens/Register' 
import Logout from './Screens/Logout'
import About from './Components/About'
import {Switch, Route} from 'react-router-dom'
import userData from './Services/Auth';
import logOut from './Services/Auth';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: null
    };
  }

  componentDidMount = async () => {
    this.setUser();
  }

  setUser = async () => {

    const user = await userData().user;

    if (user) {
      this.setState({
        userId: user.id,
        userEmail: user.email,
        userFirstName: user.first_name,
        userLastName: user.last_name
      })
    }
  }

  clearUser = () => {
    this.setState({ userId: null })
  }


  render () {
    const myBoard = this.state.userId ? (<MyBoard userId={this.state.userId} />) : (<Login setUser={this.setUser} />)

    return (
      <div className="App">
        <Switch>
            <Route path="/about">
              <About/>
            </Route>
            <Route path="/register">
              <Register setUser={this.setUser} />
            </Route>
            <Route path="/login">
              <Login setUser={this.setUser} />
            </Route>
            <Route path="/logout">
              <Logout clearUser={this.clearUser} />
            </Route>
            <Route path="/myboard">
              {myBoard}
            </Route>
            <Route path="/">
              <Board userId={this.state.userId} />
            </Route>
          </Switch>
      </div>
    );
  }
}

export default App;
