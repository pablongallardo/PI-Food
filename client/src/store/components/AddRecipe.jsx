import React from "react"
import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import './addRecipe.css';

import {Link, useHistory} from "react-router-dom";
import {getDietTypes, addRecipe} from '../actions/index';

function validate(input) {
 const errors = {};
 if(!input.name) errors.name = 'Please complete with the Recipe name';
 if(!input.summary) errors.summary = 'Please add some comments about your recipe'
 if (input.score < 1 || input.score > 100) errors.score = 'The score must be a number between 1 and 100';
 if(input.healtScore < 1 || input.healtScore > 100) errors.healtScore = 'The score be a number between 1 and 100';
 if(!input.steps.length) errors.steps ='Please detail the steps of your recipe';
 if(!input.dietTypes.length) errors.dietTypes ='You must select at least one diet type';
 return errors;

}

export default function AddRecipe(){
    const dispatch = useDispatch();
    const dietTypes = useSelector(state => state.dietTypes);
    const history = useHistory();
    const [errors, setErrors] = useState({});


    const [input, setInput] = useState({
        name: '', 
        summary: '',
        score: '',
        healtScore: '',
        steps: '',
        dietTypes: [],

    })

    useEffect(() => {
        dispatch(getDietTypes());
    },[])

    function handleChange(e) {
        e.preventDefault();
        setInput((prevInput) => {
            const newInput = {
                ...prevInput,
                [e.target.name]: e.target.value
            }
            const validations = validate(newInput);
            setErrors(validations);
            return newInput;
        })
    }

    function handleCheckBox(e) {
        let newArray = input.dietTypes;
        let find = newArray.indexOf(e.target.value);

        if( find >= 0){
            newArray.splice(find, 1);
        } else {
            newArray.push(e.target.value);
        }

        setInput({
            ...input,
            dietTypes:newArray
        })
        const validations = validate(input);
        setErrors(validations);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(Object.values(errors).length > 0) {
            alert("Please complete the information required");
        } else if(
            input.name === '' &&
            input.summary === '' &&
            input.score === '' &&
            input.healtScore === '' &&
            input.steps === '' &&
            !input.dietTypes.length
        ){
            alert("Please complete the Form");
        }
        else {
            dispatch(addRecipe(input));
            alert("Recipe added successfully");
            setInput({
                name:'',
                summary:'',
                score:'',
                healtScore:'',
                steps: [],
                dietTypes: [],
            })
            history.push('/home')
        }
    };

    return (
        <div className="addRecipe">
            <h1 className= 'msg'>Create your own Recipe!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form">
                    <div className="prettierForm">
                        <div className="nameInput">
                            <label className="msgs">Name:</label>
                            <input className='fondo'  name ='name' type="text" value={input.name} onChange={e =>handleChange(e)}/>
                            {errors.name && (
                            <span className="errors"> {errors.name}</span>
                            )}

                        </div>
                        <div className="nameInput">
                            <label className="msgs">Summary:</label>
                            <textarea className='fondo' name='summary' type= 'text' rows='4' cols='30' value={input.summary} onChange={e => handleChange(e)}/>
                            {errors.summary && (
                                <span className='errors'>{errors.summary}</span>
                            )}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Score:</label>
                            <input className='fondo' name='score' type= 'number'value={input.score} onChange={e => handleChange(e)}/>
                            {errors.score && (
                                <span className='errors'>{errors.score}</span>
                            )}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Healt Score:</label>
                            <input className='fondo' name='healtScore' type= 'number' value={input.healtScore} onChange={e => handleChange(e)}/>
                            {errors.healtScore && (
                                <span className='errors'>{errors.healtScore}</span>
                            )}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Steps:</label>
                            <textarea className='fondo' name='steps' type= 'text' rows='4' cols='30'  value={input.steps} onChange={e => handleChange(e)}/>
                            {errors.steps && (
                                <span className='errors'>{errors.steps}</span>
                            )}
                        </div>
                        <div className="checkSelect">
                            <label className="msgs">Diet Types:</label>
                            {dietTypes.map (d => {
                                return (
                                    <div key={d} className='checks'>
                                        <label className='dietTypes'>{d}</label>
                                        <input className='checks' type='checkbox' name ={d} value={d} selected={input.dietTypes.includes(d)} onChange={e => handleCheckBox(e)}/>

                                    </div>

                                )
                            })}
                            {errors.dietTypes && (
                                <span className='errors'>{errors.dietTypes}</span>
                            )}
                            </div>
                    </div>
                </div>
                <button className='submmitButton' type='submmit'>Submmit Recipe </button>
                <Link to='/home'><button className='goBackButton'>Go Back</button></Link>
            </form>
        </div>
    )
};