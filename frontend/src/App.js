import logo from './images/LG_logo.png';
import arc from './images/arc_tab.png';
import './App.css';

function App() {
  return (
    <body className="background">

      <div className="title">Things 2 Do
      <img className="logo" src={logo} alt="Logo"></img>
      </div>

      <div className="tab">
      <img className="arc" src={arc} alt="Arc"></img>
      <p className="tab_title">Login</p>
      </div>

      <div className="main_pane">

      <div className="field1">&emsp;Username</div>

      <div className="field2">&emsp;Password</div>

      <div className="button1">Login</div>

      <div className="button2">Login with Google</div>

      <p className="link1">Forgot Password</p>

      <p className="link2">Create Account</p>

      </div>

    </body>
    
  );
}

export default App;
