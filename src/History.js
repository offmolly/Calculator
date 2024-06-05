
function History(props){
    return(
    <div className='history'>
          <ul>
            {props.listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
    );
}

export default History;