import React from 'react';
import '../Styles/header.css';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: 'solid 1px brown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            userName: undefined,
            isLoggedIn: false,
            credentialmodel : false,
            email : undefined,
            password : undefined,
            fname:undefined,
            lname:undefined,
            createaccountmodel:false
        }
    }

    handleNavigate = () => {
        this.props.history.push('/');
    }

    handleLogin = () => {
        this.setState({ loginModalIsOpen: true });
    }
    handleaccount = () =>{
        this.setState({createaccountmodel: true});
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, userName: response.profileObj.name, loginModalIsOpen: false });
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, userName: undefined });
    }
    handlecredential = () =>{
        this.setState({loginModalIsOpen:false, credentialmodel:true});
    }
    addlogindetail = (event) =>{
        const {email, password, fname, lname} = this.state;
        const filterObj = {
            user:email,
            pwd:password,
            fn:fname,
            ln:lname
        }
        axios({
            method: 'POST',
            url: 'http://localhost:8989/usersignup',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(
              this.setState({createaccountmodel:false})
            )
            .catch(err => console.log(err));        
        event.preventDefault();
    }
    submitlogindetail = (event) =>{
        const {email, password} = this.state;
        const filterObj = {
            user:email,
            pwd:password
        }
        axios({
            method: 'POST',
            url: 'http://localhost:8989/userlogin',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
              this.setState({isLoggedIn:response.data.isAuthenticated, 
                userName:response.data.user[0].firstName,
                credentialmodel:false})
            })
            .catch(err => console.log(err));        
        event.preventDefault();
    }
    setemail = (event) => {
        this.setState({email:event.target.value});
    }
    setpassword = (event) => {
        this.setState({password:event.target.value});
    }
    closemodel = () =>{
        this.setState({credentialmodel:false});
    }
    closelogindetail = () =>{
        this.setState({createaccountmodel:false});
    }

    render() {
        const { loginModalIsOpen, isLoggedIn, userName, credentialmodel, email, password, fname, lname, createaccountmodel } = this.state;
        return (
            <div className="header">
                <div className="header-logo" onClick={this.handleNavigate}>
                    <p>e!</p>
                </div>
                {
                    !isLoggedIn ? <div className="user-account">
                        <div className='login' onClick={this.handleLogin}>Login</div>
                        <div className='signup' onClick={this.handleaccount}>Create an account</div>
                    </div> :
                        <div className="user-account">
                            <div className='login'>{userName}</div>
                            <div className='signup' onClick={this.handleLogout}>Logout</div>
                        </div>
                }

                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <button className='btn btn-primary' 
                        onClick={this.handlecredential}
                        >Continue with Credentials</button>
                        <br />
                        <GoogleLogin
                            clientId="918447038793-odg88otkjqofuhd8juakjoea89shva4k.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Modal>

                <Modal
                    isOpen={credentialmodel}
                    style={customStyles}
                >
                    <div>
                       <form>
                        <label>email</label>
                        <br/>
                        <input type={email} value={email} onChange={this.setemail} placeholder ="enter email"></input>
                        <br/>
                        <label>password</label>
                        <br/>
                        <input type={password} value={password} onChange={this.setpassword}></input>
                        <br/>
                        <br/>
                        <button onClick={this.submitlogindetail}>sign in</button>
                        <br/>
                        <br/>
                        <button onClick={this.closemodel}>close model</button>
                       </form>
                    </div>
                </Modal>

                <Modal
                    isOpen={createaccountmodel}
                    style={customStyles}
                >
                    <div>
                       <form>
                        <label>email</label>
                        <br/>
                        <input placeholder ="enter email" type="email" value={email} onChange={this.setemail}></input>
                        <br/>
                        <label>password</label>
                        <br/>
                        <input placeholder ="enter password" type="password" value={password} onChange={this.setpassword}></input>
                        <br/>
                        <label>first name</label>
                        <br/>
                        <input placeholder ="enter first name" value={fname} type="text" onChange={this.setfname = (event) =>{
                            this.setState({fname:event.target.value})
                        }}></input>
                        <br/>
                        <label>last name</label>
                        <br/>
                        <input placeholder ="enter last name" value={lname} type="text" onChange={this.setlname = (event) =>{
                            this.setState({lname:event.target.value})
                        }}></input>
                        <br/>
                        <br/>
                        <button onClick={this.addlogindetail}>sign up</button>
                        <br/>
                        <br/>
                        <button onClick={this.closelogindetail}>close model</button>
                       </form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Header);