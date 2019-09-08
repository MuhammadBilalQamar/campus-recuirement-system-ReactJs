import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import * as firebase from "firebase";
import swal from "sweetalert";
class CompanyDashboard extends React.Component {

    constructor(props) {
        super(props);


        this.state = {

            isStudentClick: false,
            studentData: [],
            isPostJobClick: false,
            description: "",
            eligibility: "SSC",
            title: "",
            experience: "Fresh"
        }
    }

    componentDidMount() {

        var data = [];
        var companyData = [];
        firebase.database().ref('users/students/').on('value', snapshot => {
            snapshot.forEach(function (childSnapshot) {
                data.push(childSnapshot.val());
            });
            this.setState({ studentData: data });
        });
    }


    renderDashBoard() {

        return (
            <div className="dashboard-items" >
                {/* <span id="notification" >Notice :</span> */}

                <h1 className="basic-font-for-mobile">Company Dashboard</h1>
                <Card className="one" >
                    <CardTitle expand style={{ color: '#fff', background: 'url(http://youthict.com/new/public/uploads/branch/thumbnail/1497976574A.jpg) bottom right 15% no-repeat #46B6AC' }}>View Students Details</CardTitle>
                    <CardText>
                        Find details of all Students
                    </CardText>
                    <CardActions border>
                        <Button onClick={() => this.studentClicked()} colored>View Details</Button>
                    </CardActions>
                </Card>

                <Card className="two" >
                    <CardTitle expand style={{ color: '#fff', background: 'url(https://momogicars.com/wp-content/uploads/2018/03/background-for-business-presentation-company-free-presentation-with-regard-to-business-presentation-background-hd.jpg) bottom right 15% no-repeat #46B6AC' }}>Post Jobs</CardTitle>
                    <CardText>
                        here you can add your complete job description
                    </CardText>
                    <CardActions border>
                        <Button onClick={() => this.postJob()} colored>Post</Button>
                    </CardActions>
                </Card>
                <button onClick={() => this.logout()}>Logout</button>

            </div>


        );
    }

    renderStudentsInformations() {

        const { studentData } = this.state;
        return (
            <div className="student-info-table">
                <h1 className="basic-font-for-mobile">Students Information</h1>
                <table border={1}>
                    <tr>
                        <th>Student names</th>
                        <th>Emails</th>
                        <th>Qualifications</th>
                        <th>Grades</th>
                        <th>Resumes</th>
                    </tr>
                    {studentData.map((item, index) => {
                        return (
                            <tr>
                                <td>{item.userName}</td>
                                <td>{item.email}</td>
                                <td>{item.qualification}</td>
                                <td>{item.grade}</td>
                                <td><a href="#">download</a></td>
                            </tr>

                        )
                    })}
                </table>
                <Button raised colored onClick={() => this.onBack()}>Back</Button>

            </div>
        );
    }

    renderPostJob() {

        return (
            <div className="container">
                <h1 className="basic-font-for-mobile">Post Vacancy</h1>
                <hr />

                <label>
                    <b>Job Title</b>
                </label>
                <input
                    type="text"
                    placeholder="title..."
                    name="title"
                    value={this.state.title}
                    onChange={e => this.change(e)}
                    required />
                <label>
                    <b>Job Description</b>
                </label>
                <textarea rows="4" cols="50"
                    type="text"
                    placeholder="Enter Description"
                    name="description"
                    value={this.state.description}
                    onChange={e => this.change(e)}
                    required />
                <label>
                    <b>Eligibility : </b>
                </label>

                <select
                    name="eligibility"
                    value={this.state.eligibility}
                    onChange={e => this.change(e)}
                >
                    <option value="SSC">SSC</option>
                    <option value="HSC">HSC</option>
                    <option value="Bachlors">Bachlors</option>
                    <option value="Masters">Masters</option>

                </select>
                <br />
                <br />

                <label>
                    <b>Experience : </b>
                </label>

                <select
                    name="experience"
                    value={this.state.experience}
                    onChange={e => this.change(e)}
                >
                    <option value="fresh">Fresh</option>
                    <option value="1-Year">1-Year</option>
                    <option value="2-years">2-years</option>
                    <option value="3-Years">3-Years</option>


                </select>


                <div className="clearfix">
                    <button onClick={() => this.submitJob()} className="signupbtn">Submit</button>
                </div>
                {/* <Button raised colored onClick={() => this.checkState()}>Check State</Button> */}
                <Button raised colored onClick={() => this.onBack()}>Back</Button>
            </div>
        )
    }



    submitJob() {

        const { title, eligibility, experience, description } = this.state;
        if (title == '' || eligibility === '' || experience === '' || description === '') {
            swal({
                title: "Sorry",
                text: "please fill out all information then continue",
                icon: "error",
                button: "ok"
            });
        }
        else {
            firebase.database().ref("jobs/").push({
                description: description,
                eligibility: eligibility,
                experience: experience,
                title: title,
                date: new Date().toString()
            });
            swal({
                title: "Good job!",
                text: "Your Job Has Been Successfully Posted",
                icon: "success",
                button: "ok"
            });

            window.location = "./companydashboard"
        }


    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    checkState() {

        console.log(this.state);
    }

    change(e) {
        // this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    postJob() {
        this.setState({
            isPostJobClick: true,
        });

    }

    onBack() {
        this.setState({
            isStudentClick: false,
            isPostJobClick: false
        });
    }

    studentClicked() {
        this.setState({ isStudentClick: true });
    }

    logout() {
        localStorage.removeItem('currentUserUid');

        window.location.href = "./adminlogin";

    }

    render() {
        const { isStudentClick, isPostJobClick } = this.state;
        return (
            <div>
                {isStudentClick === false && isPostJobClick === false && this.renderDashBoard()}
                {isStudentClick === true && this.renderStudentsInformations()}
                {isPostJobClick == true && this.renderPostJob()}

            </div>
        );
    }
}
export default CompanyDashboard;
