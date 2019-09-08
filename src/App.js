
/////////////MATERIAL_UI_LINK https://tleunen.github.io/react-mdl/

import React, { Component } from 'react';
import './App.css';
import { Layout, Header, Content, Drawer, Navigation, HeaderRow, Textfield, Button } from 'react-mdl';
import * as firebase from "firebase";
import swal from 'sweetalert';
import Main from './components/main';
import { Link } from 'react-router-dom';
import AdminDashboard from './components/admindashboard';
import CompanyDashboard from './components/companydashboard';
// firebase.initializeApp(FirebaseConfig);
// const databaseRef = firebase.database().ref();
let config = {
  apiKey: "AIzaSyD8GjpkQiy2g4gNyF6g-VkvHlr_h3YnLIY",
  authDomain: "cm-system-c3a39.firebaseapp.com",
  databaseURL: "https://cm-system-c3a39.firebaseio.com",
  projectId: "cm-system-c3a39",
  storageBucket: "",
  messagingSenderId: "716981845548"
};
firebase.initializeApp(config);


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: localStorage.getItem('currentUserUid')
    }
  }

  // checkState() {
  //   //  console.log(this.isQuizEnd());
  //   console.log(this.state);
  // }
  logout() {
    localStorage.removeItem('currentUserUid');
    window.location.href = "./adminlogin"
  }


  render() {

    const { user } = this.state;

    return (


      <div className="demo-big-content">
        <Layout>
          <Header className='header-color' waterfall hideTop>
            <HeaderRow title="Campus Management System">
              <Textfield
                value=""
                onChange={() => { }}
                label="Search3"
                expandable
                expandableIcon="search"
              />
            </HeaderRow>
            <HeaderRow>
              <Navigation>
                {!user && <Link to="/adminlogin">Admin Login</Link>}
                {!user && <Link to="/studentlogin">Student Login</Link>}
                {!user && <Link to="/companylogin">Company Login</Link>}
              </Navigation>
            </HeaderRow>
          </Header>
          <Drawer title="CMS">
            <Navigation>
              {!user && <Link to="/adminlogin">Admin Login</Link>}
              {!user && <Link to="/studentlogin">Student Login</Link>}
              {!user && <Link to="/companylogin">Company Login</Link>}
              {user != null && < Button onClick={() => this.logout()} primary colored>Logout</Button>}
            </Navigation>
          </Drawer>
          <Content>
            <Main />
            {/* <AdminDashboard /> */}
            {/* {<CompanyDashboard/>} */}
          </Content>
        </Layout>
      </div >










    );
  }
}

export default App;



    ///////////////////////LOGIN / SIGNUP///////////////////////

// renderLogin() {

//   return (

//     <div className="modal" >
//       <div className="container">
//         <h1>Login</h1>
//         <p>if you dont have an account Please scroll down and sign up</p>
//         <hr />
//         <label><b>Email</b></label>
//         <input type="text" placeholder="Enter Email" id='email' required />
//         <label><b>Password</b></label>
//         <input type="password" placeholder="Enter Password" id='pass' required />
//         <button id='loginhome' onClick={() => this.login()}>Login</button>
//       </div>
//     </div>
//   )

// }

// renderSignup() {

//   return (
//     <div className="container">
//       <h1>Sign Up</h1>
//       <p>Please fill in this form to create an account.</p>
//       <hr />

//       <label>
//         <b>Username</b>
//       </label>
//       <input type="text" placeholder="Enter Username" id='user' required />
//       <label>
//         <b>Cell Number</b>
//       </label>
//       <input type="text" placeholder="Enter Phone Number" id='cellnum' required />
//       <label>
//         <b>Email</b>
//       </label>
//       <input type="text" placeholder="Enter Email" id='signemail' required />
//       <label>
//         <b>Password</b>
//       </label>
//       <input type="password" placeholder="Enter Password" id='signpass' required />
//       <label>
//         <b>Repeat Password</b>
//       </label>
//       <input type="password" placeholder="Repeat Password" id='repeatpass' required />
//       <div className="clearfix">

//         <button onClick={() => this.signUp()} className="signupbtn">Sign Up</button>
//       </div>
//     </div>
//   );
// }

// change(e) {
//   e.preventDefault();
//   var updated = {};
//   updated = e.target.value;
//   this.setState({ proctoringKey: updated });

// }


// renderProctoringKey() {

//   return (
//     <div className="pro-container">
//       <Grid className="demo-grid-3">
//         <Cell col={12} tablet={8} className="pro-Key"  >

//           <Textfield
//             label="enter key......"
//             floatingLabel
//             style={{ width: '200px' }}
//             // value={this.state.proctoringKey}
//             onChange={e => this.change(e)}
//           />
//           {/* <Button raised colored ripple onClick={() => this.enterQuiz()}>Next</Button> */}
//           <Button raised colored ripple onClick={() => this.onBack()}>Back</Button>

//         </Cell>
//       </Grid>
//     </div>


//   )


// }

// onBack() {

//   this.setState({ currentIndex: null });
// }

// change(e) {

//   var pkey = e.target.value;

//   if (pkey === "bilal12345") {

//     this.setState({
//       proctoringKey: pkey,
//       isKeyTrue: !this.state.isKeyTrue

//     })
//   }

// }
// signUp() {

//   var userRef = document.getElementById('user');
//   var cellRef = document.getElementById('cellnum');
//   var emailRef = document.getElementById('signemail');
//   var passRef = document.getElementById('signpass');
//   var repeatPassRef = document.getElementById('repeatpass');

//   var user = {
//     userName: userRef.value,
//     cellNum: cellRef.value,
//     email: emailRef.value,
//     pass: passRef.value,
//     passrepeat: repeatPassRef.value

//   }

//   var valid = this.validation(user);
//   if (valid) {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.pass)
//       .then(function (success) {
//         // console.log('success');
//         var userId = firebase.auth().currentUser.uid
//         firebase.database().ref('users/' + userId).set({
//           name: user.userName,
//           cellNum: cellRef.value,
//           email: emailRef.value
//         });

//         swal({
//           title: "Good job!",
//           text: "Your Account Has Been Successfully Created Do Login and Continue",
//           icon: "success",
//           button: "ok"
//         });
//       })
//       .catch(function (error) {
//         // console.error('error', error);
//         // swal("Aww!", "Something Went Wrong", "Danger");
//       });
//   }
//   else {

//     swal({
//       title: "Aww!",
//       text: "Something Went Wrong",
//       icon: "error",
//       button: "ok"
//     });

//     // console.log('unvalid',valid)
//   }
// }

// login() {
//   var emailRef = document.getElementById('email').value;
//   var passRef = document.getElementById('pass').value;

//   firebase.auth().signInWithEmailAndPassword(emailRef, passRef)
//     .then((success) => {
//       console.log('signin successfully', success.user);
//       localStorage.setItem('currentUserUid', success.user.uid)

//       this.setState({
//         user: localStorage.getItem('currentUserUid')
//       });

//       window.location.reload();
//       // <Spinner singleColor />

//       // setTimeout(<Spinner singleColor />, 3000);

//     }
//     )
//     .catch((error) => {
//       // swal("Aww!", "Something Went Wrong", "Danger");
//       swal({
//         title: "Aww!",
//         text: "Something Went Wrong",
//         icon: "error",
//         button: "ok"
//       });
//     })

// }

// validation(_user) {
//   var valid = true;


//   for (var key in _user) {

//     if (_user[key] === '' || _user[key] == undefined) {
//       valid = false;
//     }
//   }
//   if (_user.pass === _user.repeatPassRef) {
//     valid = true;
//   }
//   return valid;
// }

// logOut() {
//   localStorage.removeItem('currentUserUid');
//   this.setState({

//     user: null
//   });

// }
