import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Registration from './views/Registration'
import Signin from './views/Signin'
import Profile from './views/Profile'
import NewResume from './views/NewResume'
import ChangeResume from './views/ChangeResume'
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/registration' component={Registration}/>
        <Route exact path='/signin' component={Signin}/>
        <Route exact path='/profile/:id' component={Profile}/>
        <Route exact path='/new_resume' component={NewResume}/>
        <Route exact path='/change_resume' component={ChangeResume}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
