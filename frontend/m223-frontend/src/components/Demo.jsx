const Person =({person}) =>{
    const hobbies =person.hobbies.map(hob => //das selbe ist function(hob) alos wie hob=>
        <li>{hob}</li>
        )
    return <>
    <p>Name: {person.name}</p>
    <ol>
        {hobbies}
    </ol>
    </>
}

function Demo({p1,person, fun}){

    return<>
        <h1>hello schnappie</h1>
        <p>parameter empfangen{p1}</p>
        <Person person={person}/>
        <button onClick={fun}> klick my</button>
    </>
}

export default Demo;