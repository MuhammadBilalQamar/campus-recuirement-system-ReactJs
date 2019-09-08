import React, { Component } from 'react';
import * as firebase from "firebase";
import swal from 'sweetalert';


class CompanyLogin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // user= localStorage.setItem('currentUserUid', success.user.uid) ,
            name: "",
            type: "Private",
            email: "",
            pass: "",
            repeatpass: ""
        }
    }



    ///////////////////////LOGIN / SIGNUP///////////////////////

    renderLogin() {

        return (

            <div className="modal" >
                <div className="container">
                    <h1 className="basic-font-for-mobile">Company Login</h1>
                    <p>if you dont have an account Please scroll down and sign up</p>
                    <hr />
                    <label><b>Email</b></label>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={e => this.change(e)}
                        placeholder="Enter Email.." required />

                    <label><b>Password</b></label>
                    <input
                        type="password"
                        name="pass"
                        placeholder="Enter Password.."
                        onChange={e => this.change(e)}
                        value={this.state.pass} required />

                    <button id='loginhome' onClick={() => this.login()}>Login</button>
                </div>
            </div>
        )

    }

    renderSignup() {

        return (
            <div className="container">
                <h1 className="basic-font-for-mobile">Company Registration</h1>
                <p>Please fill in this form to create an account.</p>
                <hr />

                <label>
                    <b>Company Name</b>
                </label>
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={e => this.change(e)}
                    placeholder="Enter Name.." required />

                <label>
                    <b>Email</b>
                </label>
                <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.change(e)}
                    placeholder="Enter Email.." required />
                <label>
                    <b>Company Type : </b>
                </label>
                <select
                    name="type"
                    value={this.state.type}
                    onChange={e => this.change(e)}
                >
                    <option value="Private">Private</option>
                    <option value="National">National</option>
                    <option value="Multinational">Multinational</option>
                    <option value="Local">Local</option>

                </select>

                <br /><br />
                <label>
                    <b>Password</b>
                </label>
                <input
                    type="password"
                    name="pass"
                    placeholder="Enter Password.."
                    onChange={e => this.change(e)}
                    value={this.state.pass} required />

                <label>
                    <b>Repeat Password</b>
                </label>
                <input
                    type="password"
                    name="repeatpass"
                    placeholder="Repeat Password.."
                    onChange={e => this.change(e)}
                    value={this.state.repeatpass} required />
                <div className="clearfix">

                    <button onClick={() => this.signUp()} className="signupbtn">Sign Up</button>

                </div>
            </div>
        );
    }

    signUp() {

        const { name, type, email, pass, repeatpass } = this.state;

        if (name != "" && email != "" && name != " " && email != " " && pass === repeatpass) {
            firebase.auth().createUserWithEmailAndPassword(email, pass)
                .then(function (success) {
                    // console.log('success');
                    var userId = firebase.auth().currentUser.uid
                    firebase.database().ref('users/company/' + userId + '/').set({
                        name: name,
                        type: type,
                        email: email,
                    }).then(
                        swal({
                            title: "Good Job!",
                            text: "Your account has been successfully created do login and continue",
                            icon: "success",
                            button: "ok"
                        })

                    )
                        .catch(function (error) {
                            swal("Aww!", "Something Went Wrong", "error");
                        });
                });

            this.setState({
                name: "",
                type: "Private",
                email: "",
                pass: "",
                repeatpass: ""
            });
        }
        else {
            swal({
                title: "Sorry",
                text: "You entererd incorrect details",
                icon: "error",
                button: "ok"
            });

        }
    }



    login() {

        const { pass, email } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((success) => {
                localStorage.setItem('currentUserUid', success.user.uid)
                window.location.href = "./companydashboard";


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

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    checkState() {
        console.log(this.state);
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
export default CompanyLogin;
