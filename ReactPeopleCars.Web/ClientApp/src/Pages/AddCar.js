import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { useParams, useHistory } from 'react-router-dom';

const AddCar = () => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [person, setPerson] = useState({});

    const history = useHistory();
    const { personId } = useParams();

    const { firstName, lastName } = person;

    useEffect(() => {
        const getPerson = async () => {
            const { data } = await axios.get(`/api/peoplecars/getperson`, { params: { id: personId } });
            setPerson(data);
        }

        getPerson();
    }, [personId]);

    const onSubmitClick = async () => {
        await axios.post('/api/peoplecars/addcar', { make, model, year, personId });
        history.push('/');
    }

    const onRedirectToRandomClick = async () => {
        const { data } = await axios.get('/api/peoplecars/GetRandomPersonId');
        const { personId } = data;
        history.push(`/addcar/${personId}`);
    }

    return (
        <div style={{ minHeight: 1000, paddingTop: 300 }}>
            <div className="row">
                <div className='col-md-6 offset-md-3 card card-body bg-light'>
                    {firstName && <h2>Add a car for {firstName} {lastName}</h2>}
                    <input type="text" className='form-control' name='make' value={make} onChange={e => setMake(e.target.value)} placeholder="Make" />
                    <br />
                    <input type="text" className='form-control' name='model' value={model} onChange={e => setModel(e.target.value)} placeholder="Model" />
                    <br />
                    <input type="text" className='form-control' name='year' value={year} onChange={e => setYear(e.target.value)} placeholder="Year" />
                    <br />
                    <button className='btn btn-primary btn-lg btn-block' onClick={onSubmitClick}>Submit</button>
                    <button className='btn btn-danger btn-lg btn-block' onClick={onRedirectToRandomClick}>Redirect to Random</button>
                </div>
            </div>
        </div>
    )
}

export default AddCar;