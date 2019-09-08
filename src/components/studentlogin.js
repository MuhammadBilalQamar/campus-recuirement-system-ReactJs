import React, { Component } from 'react';
import * as firebase from "firebase";
import swal from 'sweetalert';

class StudentLogin extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: "",
            cell: "",
            email: "",
            qualification: "Bachlors",
            grade: "A+"
        };

    }


    ///////////////////////LOGIN / SIGNUP///////////////////////

    renderLogin() {

        return (

            <div className="modal" >
                <div className="container">
                    <h1 className="basic-font-for-mobile">Student Login</h1>
                    <p>if you dont have an account Please scroll down and sign up</p>
                    <hr />
                    <label><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" id='email' required />
                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" id='pass' required />
                    <button id='loginhome' onClick={() => this.login()}>Login</button>
                </div>
            </div>
        )

    }

    renderSignup() {

        return (
            <div className="container">
                <h1 className="basic-font-for-mobile">Student Registration</h1>
                <p>Please fill in this form to create an account.</p>
                <hr />

                <label>
                    <b>Username</b>
                </label>
                <input
                    type="text"
                    placeholder="Enter Username"
                    name="name"
                    value={this.state.name}
                    onChange={e => this.change(e)}
                    required />
                <label>
                    <b>Cell Number</b>
                </label>
                <input type="text"
                    placeholder="Enter Phone Number"
                    name="cell"
                    value={this.state.cell}
                    onChange={e => this.change(e)}
                    required />
                <label>
                    <b>Email</b>
                </label>

                <input type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.change(e)}
                    required />
                <label>
                    <b>Current Qualification : </b>
                </label>

                <select
                    name="qualification"
                    value={this.state.qualification}
                    onChange={e => this.change(e)}
                >
                    <option value="SSC">SSC</option>
                    <option value="HSC">HSC</option>
                    <option value="Bachlors">Bachlors</option>
                </select>
                <br />
                <br />

                <label>
                    <b>Grade : </b>
                </label>

                <select
                    name="grade"
                    value={this.state.grade}
                    onChange={e => this.change(e)}
                >
                    <option value="A+">A+ / A-1</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>

                {/* <label>
                    <b>Resume</b>
                </label>
                <br/>
                <input type="file" id="resume" />
                <br/>
                <br/> */}
                <br />
                <br />

                <label>
                    <b>Password</b>
                </label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    id='signpass'
                    required />
                <label>
                    <b>Repeat Password</b>
                </label>
                <input
                    type="password"
                    placeholder="Repeat Password"
                    id='repeatpass'
                    required />

                <div className="clearfix">
                    <button onClick={() => this.signUp()} className="signupbtn">Sign Up</button>
                </div>

                <button onClick={() => this.checkState()} >checkState</button>

            </div>
        );
    }


    signUp() {

        const { email, name, cell, qualification, grade } = this.state;
        var passRef = document.getElementById('signpass');
        var repeatPassRef = document.getElementById('repeatpass');

        var user = {
            userName: name,
            cellNum: cell,
            email: email,
            qualification: qualification,
            grade: grade,
            pass: passRef.value,
            passrepeat: repeatPassRef.value
        }

        var valid = this.validation(user);
        if (valid) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.pass)
                .then(function (success) {
                    // console.log('success');
                    var userId = firebase.auth().currentUser.uid
                    firebase.database().ref('users/students/' + userId + '/').set({
                        userName: name,
                        cellNum: cell,
                        email: email,
                        qualification: qualification,
                        grade: grade,
                    });

                    swal({
                        title: "Good job!",
                        text: "Your Account Has Been Successfully Created Do Login and Continue",
                        icon: "success",
                        button: "ok"
                    });

                })
                .catch(function (error) {
                    // console.error('error', error);
                    swal("Aww!", "Something Went Wrong", "error");
                });
        }
        else {

            swal("Aww!", "Something Went Wrong", "error");

        }

        passRef.value = "";
        repeatPassRef.value = "";
        this.setState({
            name: "",
            cell: "",
            email: "",
            qualification: "Bachlors",
            grade: "A+"
        });

    }


    login() {
        var email = document.getElementById("email").value;
        var pass = document.getElementById("pass").value;

        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((success) => {
                console.log('signin successfully', success.user);
                localStorage.setItem('currentUserUid', success.user.uid)
                this.setState({
                    user: localStorage.getItem('currentUserUid')
                });
                window.location.href = "./studentdashboard"
            }
            )
            .catch((error) => {
                // swal("Aww!", "Something Went Wrong", "Danger");
                swal({
                    title: "Aww!",
                    text: "Something Went Wrong",
                    icon: "error",
                    button: "ok"
                });
            })

    }





    validation(_user) {

        var valid = true;
        for (var key in _user) {

            if (_user[key] === '' || _user[key] == undefined) {
                valid = false;
            }
        }
        if (_user.pass === _user.repeatPassRef) {
            valid = true;
        }
        return valid;
    }

    checkState() {

        console.log(this.state);
    }
    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                {this.renderLogin()}
                {this.renderSignup()}
            </div>
        );
    }
}

export default StudentLogin;




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
