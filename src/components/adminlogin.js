import React, { Component } from 'react';
import * as firebase from "firebase";
import swal from 'sweetalert';


class AdminLogin extends React.Component {
    constructor() {

        super();
        this.state = {
            user:null
        }
    }




    ///////////////////////LOGIN / SIGNUP///////////////////////

    renderLogin() {

        return (

            <div className="modal" >
                <div className="container">
                    <h1 className="basic-font-for-mobile">Admin Login</h1>
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

    login() {
        var email = document.getElementById("email").value;
        var pass = document.getElementById("pass").value;

        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((success) => {
                console.log('signin successfully', success.user);
                if (success.user.uid === "iHAuuM7WCOUCnKEiu1QkOv4jm1B3") {
                    localStorage.setItem('currentUserUid', success.user.uid)
                    this.setState({
                        user: localStorage.getItem('currentUserUid')
                    });
                    window.location.href="./admindashboard"
                }
                else {
                    swal({
                        title: "Sorry!",
                        text: "Please Enter valid email & pass",
                        icon: "error",
                        button: "ok"
                    });
                }
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







    render() {
        return (
            <div>
                {this.renderLogin()}
            </div>
        );
    }
}

export default AdminLogin;
