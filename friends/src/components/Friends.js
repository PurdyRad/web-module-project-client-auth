import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {axiosWithAuth} from '../aWA/axiosWithAuth';


//how to get syntax so friend array doesn't duplicate
// how to get post call to send
//syntax for getting the friendFormData to stay as an array
const initialFriend = [{
    id: 0,
    name: 'Joe',
    age: 24,
    email: 'joe@lambdaschool.com',
}]
const initialFriendFormValues = [{
    id: Date.now(),
    name: '',
    age: '',
    email: '',
}]

// ewrwerwe

const initialIsLoading = true;

const Friends = () => {
    //creates state for all friends
    const [friend, setFriend]= useState(initialFriend)
    //creates state for new friends
    const [friendFormValues, setFriendFormValues]= useState(initialFriendFormValues)
    //shows updated friends
    const [isLoading, setIsLoading]= useState(initialIsLoading)

     
    //grabs friends from axios url
    const friendMakerExtraordinar = () => {
        axios.get('http://localhost:5000/api/friends', 
        {headers: {
            authorization: localStorage.getItem('token')
        //attached a header with an authorization to allow us into the Route
        }})
        //it it wokrs
        .then(res => {
            //set our new friend state with an array of spread friend data and axios data
            setFriend(res.data);
        })
        //if it doesn't work tell us something
        .catch(err => {console.log('err:', err.response)})
    }
    //a side effect that will trigger x amount of times
    useEffect(() =>{
        //the side effect calls the axios call for friends data
        friendMakerExtraordinar();
        //it will trigger once due to the []
    }, [])

    //takes in user input 
    const changa = (e) => {
        //applies user input to set new friend form state
        setFriendFormValues(
            //the state is attached the value of an array with an object inside, spreading the friend form data and the user input data
            {...friendFormValues,
            [e.target.name]: e.target.value}
        )
    }
 

    //clicker
    let clicka = (e) => {
        console.log('clicka "e":', e)
        //prevents page from reloading
        e.preventDefault()
        //axio calls the endpoint to post data back to the api
        axiosWithAuth().post('/api/friends', 
        //applied header with authorization to allow us access to data
        friendFormValues)
        //if the data was posted then change the loading value
        .then(res => {
            console.log('post res', res)
            setIsLoading(false)
        })
        //if the data was not posted tell us something
        .catch(err => {console.log('post err', err)})
    }
    console.log('friend', friend)
    console.log('friendformValues', friendFormValues)
    return (
        <div>
            <h1>So happy you made it! c:</h1>
            <form className='friendForm' onSubmit={clicka} >
                <input 
                type='text' 
                name='name'
                value={friendFormValues.name} 
                onChange={changa} 
                placeholder='friend name' required/>

                <input 
                type='text' 
                value={friendFormValues.age} 
                name='age'
                onChange={changa} 
                placeholder='friend age' required/>

                <input 
                type='email' 
                value={friendFormValues.email} 
                name='email'
                onChange={changa} 
                placeholder='friend email' required/>
            <button >Click me for great support</button>
            </form>
            <ul>
                {friend.map(friends => {
                    return( 
                    <div key={friends.id}>
                        <h3>{friends.name}</h3>
                        <p>Age: {friends.age}</p>
                        <p>E-mail: {friends.email}</p>
                    </div>
                    )
                })}
            </ul>
            <ul>
            {isLoading == false ? 
            friendFormValues.friendFormValues.map(newFriend => {
                    return( 
                    <div key={newFriend.id}>
                        <h3>{newFriend.name}</h3>
                        <p>Age: {newFriend.age}</p>
                        <p>E-mail: {newFriend.email}</p>
                    </div>
                    );
                })
             : 
             <p>One moment please..</p>}
             </ul>
        </div>
    )
}

export default Friends
