import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddPerson = () => {
    const [person, setPerson] = useState({
        firstName: '',
        lastName: '',
        age: ''
    });
    const history = useHistory();

    const onTextChange = (e) => {
        const newPerson = produce(person, draft => {
            draft[e.target.name] = e.target.value;
        });

        setPerson(newPerson);
    }

    const onSubmitClick = async () => {
        await axios.post('/api/peoplecars/addperson', person);
        history.push('/');
    }

    const { firstName, lastName, age } = person;
    return (
        <div style={{ minHeight: 1000, paddingTop: 300 }}>
            <div className="row">
                <div className='col-md-6 offset-md-3 card card-body bg-light'>
                    <h2>Add a New Person</h2>
                    <input type="text" className='form-control' name='firstName' value={firstName} onChange={onTextChange} placeholder="First Name" />
                    <br />
                    <input type="text" className='form-control' name='lastName' value={lastName} onChange={onTextChange} placeholder="Last Name" />
                    <br />
                    <input type="text" className='form-control' name='age' value={age} onChange={onTextChange} placeholder="Age" />
                    <br />
                    <button className='btn btn-primary btn-lg btn-block' onClick={onSubmitClick}>Submit</button>
                </div>
            </div>
        </div>
    )
}

class AddPerson2 extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        age: ''
    }

    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft[e.target.name] = e.target.value;
        });

        this.setState(nextState);
    }

    onSubmitClick = async () => {
        await axios.post('/api/peoplecars/addperson', this.state);
        this.props.history.push('/');
    }

    render() {
        const { firstName, lastName, age } = this.state;
        return (
            <div style={{ minHeight: 1000, paddingTop: 300 }}>
                <div className="row">
                    <div className='col-md-6 offset-md-3 card card-body bg-light'>
                        <h2>Add a New Person</h2>
                        <input type="text" className='form-control' name='firstName' value={firstName} onChange={this.onTextChange} placeholder="First Name" />
                        <br />
                        <input type="text" className='form-control' name='lastName' value={lastName} onChange={this.onTextChange} placeholder="Last Name" />
                        <br />
                        <input type="text" className='form-control' name='age' value={age} onChange={this.onTextChange} placeholder="Age" />
                        <br />
                        <button className='btn btn-primary btn-lg btn-block' onClick={this.onSubmitClick}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPerson;