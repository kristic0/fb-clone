import React, { Component } from 'react'
import './Login.css';
import axios from 'axios';





 class PostZaLog extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
            email: '', 
            password: ''
              
         }
     }



     changeHandler = (e) => {
         this.setState({[e.target.name]: e.target.value})
     }
     submitHandler = e => {
         e.preventDefault()
         console.log(this.state)
         axios.post('/user/login', this.state)
         .then(response => {
            // console.log(response.data._id)
            // localStorage.setItem('korisnicki_id',response.data._id);
             console.log(response)
             localStorage.setItem("trenutniKorisnik", JSON.stringify(response.data))
             let storidz = JSON.parse(localStorage.getItem("trenutniKorisnik"))
             
             const { history } = this.props;
            if(response.status == 200) history.push('/Novosti');
         })
         .catch(error => {
                console.log(error)
         })
     }
     
    render() {
        const{email, sifra} = this.state
        return (
<div className = "login">
            <img src = "https://cdn.cdnlogo.com/logos/f/23/facebook.svg" alt = "Slika za fejsbuk logo" className = "login__logo"></img>
            <div className = "login__sadrzaj">
                <h3>Ulogujte se na Fejsbuk</h3>
                <form onSubmit = {this.submitHandler}>
                    <center>
                        <input name = "email"
                         placeholder = "E-Adresa"
                            value = {email} onChange = {this.changeHandler}/>
                    </center>
                    <center>
                        <input name = "password"
                        type = 'password'
                         placeholder = "Lozinka"
                          value = {sifra}
                          onChange={this.changeHandler}/>
                    </center>
                    <center>
                        <button type = "submit" className = "login__login">
                            Prijavite se
                            </button>
                    </center>
                    <center>
                        <div className = "stranainfo">
                            <h5>Zaboravili ste lozinku?</h5>
                            <h5 className = "dot">·</h5>
                            {/* <Link to = "/Registracija" style  = {{textDecoration: 'none'}}>
                                <h5 className = "rtd">Napravite novi nalog</h5>
                            </Link> */}
                            <h5 className = "rtd">Napravite novi nalog</h5>
                        </div>        
                    </center>
                </form>
            </div>
        </div>
        )
    }
}

export default PostZaLog
