import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Registration from './views/Registration'
import Signin from './views/Signin'
import Profile from './views/Profile'
import NewResume from './views/NewResume'
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/registration' component={Registration}/>
        <Route exact path='/signin' component={Signin}/>
        <Route exact path='/profile/:id' component={Profile}/>
        <Route exact path='/new_resume' component={NewResume}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
