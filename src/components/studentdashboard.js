import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import * as firebase from "firebase";
import '../App.css'



class StudentDashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isCompanyClicked: false,
            companyData: [],
            vacancies: [],
            isVacancyclicked: false,
            notice: ""
        }
    }

    componentDidMount() {
        // const{notice}=this.state;
        var companyData = [];
        var vacancies = [];

        firebase.database().ref("Notice/").on('value', snapshot => {
            snapshot.forEach((childSnapshot) => {
                this.setState({
                    notice: childSnapshot.val().notice
                });
            })
        })
        firebase.database().ref("jobs").on('value', snapshot => {
            snapshot.forEach(function (childSnapshot) {
                vacancies.push(childSnapshot.val());
            })
        })

        firebase.database().ref('users/company/').on('value', snapshot => {
            snapshot.forEach(function (childSnapshot) {
                companyData.push(childSnapshot.val());
            });
        });

        this.setState({
            vacancies: vacancies,
            companyData: companyData,
        });
    }


    renderDashboard() {
        const { notice } = this.state;
        return (
            <div className="dashboard-items" >
                {notice != "" && <p id="notification" ><font color="red" size={8}>Notice</font> :  {notice}</p>}

                <h1 className="basic-font-for-mobile">Student Dashboard</h1>
                <Card className="one" >
                    <CardTitle expand style={{ color: '#fff', background: 'url(http://youthict.com/new/public/uploads/branch/thumbnail/1497976574A.jpg) bottom right 15% no-repeat #46B6AC' }}>Company</CardTitle>
                    <CardText>
                        Find details of all Companies
                    </CardText>
                    <CardActions border>
                        <Button onClick={() => this.companyClicked()} colored>View Details</Button>
                    </CardActions>
                </Card>

                <Card className="two" >
                    <CardTitle expand style={{ color: '#fff', background: 'url(https://momogicars.com/wp-content/uploads/2018/03/background-for-business-presentation-company-free-presentation-with-regard-to-business-presentation-background-hd.jpg) bottom right 15% no-repeat #46B6AC' }}>Job Vacancies</CardTitle>
                    <CardText>
                        find jobs related to your fields
                    </CardText>
                    <CardActions border>
                        <Button onClick={() => this.vacancyClicked()} colored>View jobs</Button>
                    </CardActions>
                </Card>
                <button onClick={() => this.logout()}>Logout</button>

            </div>
        )

    }

    renderCompanyInformations() {

        const { companyData } = this.state;
        const style = {
            labelStyle: {
                color: 'red'
            }
        }
        return (
            <div className="student-info-table">
                <h1 className="basic-font-for-mobile">Companies Information</h1>
                <table border={1}>
                    <tr>
                        <th>Company names</th>
                        <th>Type</th>
                        <th>email</th>
                    </tr>
                    {companyData.map((item, index) => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.email}</td>
                            </tr>
                        )
                    })}
                </table>
                <Button raisedlabel="back" onClick={() => this.onBack()}>Back</Button>
            </div>
        );
    }


    renderJobVacancy() {
        const { vacancies } = this.state;
        return (
            <div className="vancancy-parrent">

                <h1 >Recent Job Vacancies</h1>
                <div >
                    {vacancies.map((item) => {
                        console.log(vacancies)
                        return (
                            <div className="card">
                                <h2>{item.title} : </h2>
                                <h5>Date : {item.date}</h5>
                                {/* <div className="fakeimg" >Image</div> */}
                                <p>Experience : {item.experience}</p>
                                <p>Eligibility : {item.eligibility}</p>
                                <p>{item.description}</p>
                            </div>
                        )
                    })}
                    <Button className="back-btn" onClick={() => this.onBack()} raised colored >Back</Button>
                </div>
            </div>
        )
    }

    vacancyClicked() {
        this.setState({
            isVacancyclicked: true
        });

    }
    companyClicked() {

        this.setState({
            isCompanyClicked: true
        });
    }
    onBack() {
        this.setState({
            isCompanyClicked: false,
            isVacancyclicked: false
        });
    }


    logout() {
        localStorage.removeItem('currentUserUid');

        window.location.href = "./adminlogin";

    }
    checkState() {

        console.log(this.state);
    }



    render() {
        const { isCompanyClicked, isVacancyclicked } = this.state;
        return (
            <div>
                {isCompanyClicked == false && isVacancyclicked == false && this.renderDashboard()}
                {isCompanyClicked === true && this.renderCompanyInformations()}
                {isVacancyclicked == true && this.renderJobVacancy()}
                {/* <button onClick={() => this.checkState()}>checkState</button> */}

            </div>
        );
    }
}
export default StudentDashboard;
