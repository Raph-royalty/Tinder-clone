import React, {useState, useEffect} from 'react';
import TinderCard from 'react-tinder-card';
import "./TinderCards.css";
import database from './firebase';



function TinderCards() {
    const [people, setPeople] = useState([]);

    useEffect(()=>{
        //runs once when the component loads if blank
        //if not value is people it runs whenever the people variable changes
        const unsubscribe = database.collection('people').onSnapshot(snapshot=> (
           setPeople(snapshot.docs.map(doc=> doc.data()))
        ));
        return ()=>{
            //this is the cleanup function
            unsubscribe();
        }
       
    },[]);

    // push to an array in react 
    // setPeople([...people, 'sonny', 'qazi']);

    return (
        <div>
            <div className="tinderCards__cardContainer">
            {people.map(person => (
                <TinderCard
                   className="swipe"
                   key={person.name}
                   preventSwipe={['up', 'down']}
                >

                    <div
                     style={{backgroundImage: `url(${person.url})`}}
                     className="card">
                        <h3>{person.name}</h3>
                        
                    </div>
                </TinderCard>
            ))}
            
            </div>
            
        </div>
    )
}

export default TinderCards;
