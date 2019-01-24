import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    };


    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                console.log(createdUser);
            }).catch(err => {
                console.error(err);
            })
    }

    render() {
        const { username, email, password, passwordConfirmation } = this.state;
        return (
            <Grid textAlign="center" verticalAlign="middle" className='app'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register For DevChat
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid value={username} name="username" icon="user" iconPosition="left" placeholder="Username" onChange={this.handleChange} type="text" />
                            <Form.Input fluid value={email} name="email" icon="mail" iconPosition="left" placeholder="Email Address" onChange={this.handleChange} type="email" />
                            <Form.Input fluid value={password} name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" />
                            <Form.Input fluid value={passwordConfirmation} name="passwordConfirmation" icon="repeat" iconPosition="left" placeholder="Password Confirmation" onChange={this.handleChange} type="password" />
                            <Button color="orange" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    <Message>Already got an account? <Link to='/login'>Login Here</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;