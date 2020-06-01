import React from 'react';

const Header = ({change, add, input, placeholder}) => {
  return(            
  <form className="form bg-dark"
    onSubmit={e => {
      e.preventDefault ();
      add ();
    }}
  >
    <input
      placeholder={placeholder}
      className="rounded"
      onChange={(e) => change(e)}
      value={input}
    />
    <button type="submit" id="add-btn" class="btn btn-warning btn-lg">+</button>
  </form>
  )
}

export default Header
