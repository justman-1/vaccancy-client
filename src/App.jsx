import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.js'
import Registration from './views/Registration'
import Signin from './views/Signin'
import Profile from './views/Profile'
import NewResume from './views/NewResume'
import ChangeResume from './views/ChangeResume'
import ChangeProfile from './views/ChangeProfile'
import NewVacancy from './views/NewVacancy'
import Vacancy from './views/Vacancy'
import ChangeVacancy from './views/ChangeVacancy'
import Main from './views/Main'
import './styles/App.css'

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/registration' component={Registration}/>
        <Route exact path='/signin' component={Signin}/>
        <Route exact path='/profile/:id' component={Profile}/>
        <Route exact path='/new_resume' component={NewResume}/>
        <Route exact path='/new_vacancy' component={NewVacancy}/>
        <Route exact path='/change_resume' component={ChangeResume}/>
        <Route exact path='/change_profile' component={ChangeProfile}/>
        <Route exact path='/vacancy/:id' component={Vacancy}/>
        <Route exact path='/changeVacancy/:id' component={ChangeVacancy}/>
        <Route exact path='/' component={Main}/>
      </Switch>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
