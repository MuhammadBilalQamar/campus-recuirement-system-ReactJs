import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, Button, DataTable, TableHeader, CardMenu, IconButton } from 'react-mdl';
import * as firebase from "firebase";
import swal from "sweetalert";




class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isStudentClick: false,
            isCompanyClick: false,
            studentData: [],
            companyData: [],
            notice: ""
        }
    }

    componentDidMount() {

        var data = [];
        var companyData = [];
        firebase.database().ref('users/company/').on('value', snapshot => {
            snapshot.forEach(function (childSnapshot) {
                companyData.push(childSnapshot.val());
            });
        });
        firebase.database().ref('users/students/').on('value', snapshot => {
            snapshot.forEach(function (childSnapshot) {
                // console.log(childSnapshot.val());
                data.push(childSnapshot.val());
            });

            this.setState({
                studentData: data,
                companyData: companyData
            });

        });


    }


    renderDashBoard() {

        return (
            <div className="dashboard-items" >
                <h1 className="basic-font-for-mobile">Admin Dashboard</h1>

                <Card className="one" >
                    <CardTitle expand style={{ color: '#fff', background: 'url(http://youthict.com/new/public/uploads/branch/thumbnail/1497976574A.jpg) bottom right 15% no-repeat #46B6AC' }}>Students</CardTitle>
                    <CardText>
                        Find details of all Students
                    </CardText>
                    <CardActions border>
                        <Button onClick={() => this.studentClicked()} colored>View Details</Button>
                    </CardActions>
                </Card>


                <Card className="two" >
                    <CardTitle expand style={{ color: '#fff', background: 'url(https://momogicars.com/wp-content/uploads/2018/03/background-for-business-presentation-company-free-presentation-with-regard-to-business-presentation-background-hd.jpg) bottom right 15% no-repeat #46B6AC' }}>Company</CardTitle>
                    <CardText>
                        Find details of all Companies
                    </CardText>
                    <CardActions border>
                        <Button onClick={() => this.companyClicked()} colored>View Details</Button>
                    </CardActions>
                </Card>

                <Card shadow={0} style={{ maxWidth: '512px', height: '300px', margin: 'auto' }}>
                    <CardText>
                        <textarea rows={10}
                            name="notice"
                            value={this.state.notice}
                            onChange={e => this.onChange(e)}
                            placeholder="Enter Notice..." />
                    </CardText>
                    <CardActions border>
                        <Button colored onClick={() => this.submitNotification()}>Send</Button>
                    </CardActions>
                    <CardMenu style={{ color: '#fff' }}>
                        <IconButton name="share" />
                    </CardMenu>
                </Card>
                <button onClick={() => this.logout()}>Logout</button>

            </div>

        );
    }

    submitNotification() {

        if (this.state.notice === "" || this.state.notice === " " || this.state.notice === "   ") {
            swal("Aww!", "please write something and try again", "error");
        }
        else {
            firebase.database().ref("Notice/").push({
                notice: this.state.notice
            });
            swal({
                title: "Good job!",
                text: "Notification has been successfully displayed",
                icon: "success",
                button: "ok"
            });
        }

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
                        <th>Delete Students</th>
                    </tr>
                    {studentData.map((item, index) => {
                        return (
                            <tr>
                                <td>{item.userName}</td>
                                <td>{item.email}</td>
                                <td>{item.qualification}</td>
                                <td>{item.grade}</td>
                                <td><a href="#">download</a></td>
                                <td><Button onClick={() => this.deleteStudent(index)} accent>Delete</Button></td>
                            </tr>

                        )
                    })}
                </table>
                <Button raised colored onClick={() => this.onBack()}>Back</Button>
            </div>
        );
    }

    renderCompanyInformations() {

        const { companyData } = this.state;
        return (
            <div className="student-info-table">
                <h1 className="basic-font-for-mobile">Companies Information</h1>
                <table border={1}>
                    <tr>
                        <th>Company names</th>
                        <th>Type</th>
                        <th>email</th>
                        <th>Delete Company</th>
                    </tr>
                    {companyData.map((item, index) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.email}</td>
                                <td><Button onClick={() => this.companyData(index)} accent>Delete</Button></td>
                            </tr>
                        )
                    })}
                </table>
                <Button raised colored onClick={() => this.onBack()}>Back</Button>
            </div>
        );
    }





    deleteStudent(index) {
        const { studentData } = this.state;
        // console.log(index);
        var Students = studentData;
        Students.splice(index, 1);

        this.setState({ studentData: Students });
        // var db = firebase.database();
        // var ref = db.ref();
        // var survey = db.ref(path + '/' + path);    //Eg path is company/employee                
        // survey.child(key).remove();

        // firebase.database().ref("tempUserData/").orderByKey('students/').remove();

        // firebase.database().ref("tempUserData/").set({
        //     Students
        // });
        // console.log(tempdata);
    }

    companyData(index) {
        const { companyData } = this.state;
        // console.log(index);
        var tempdata = companyData;
        tempdata.splice(index, 1);
        // console.log(tempdata);

        this.setState({ companyData: tempdata });

    }


    onBack() {
        this.setState({

            isCompanyClick: false,
            isStudentClick: false
        });
    }
    studentClicked() {

        this.setState({ isStudentClick: true });
    }

    companyClicked() {
        this.setState({ isCompanyClick: true });
    }

    logout() {

        localStorage.removeItem('currentUserUid');
        window.location.href = "./adminlogin"
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    checkState() {

        console.log(this.state);
    }


    render() {

        const { isCompanyClick, isStudentClick } = this.state;
        return (
            <div>
                {isCompanyClick == false && isStudentClick == false && this.renderDashBoard()}
                {isStudentClick == true && this.renderStudentsInformations()}
                {isCompanyClick == true && this.renderCompanyInformations()}

                {/* {this.renderStudentsInformations()} */}

                {/* <button onClick={() => this.checkState()}>Check State</button> */}

            </div>
        );
    }
}
export default AdminDashboard;
