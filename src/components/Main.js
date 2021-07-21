import React, { Component } from 'react';

class Main extends Component {
    render() {
        return(
            <div>
                <form onSubmit = {(event) => {
                    event.preventDefault()
                    const message = this.message.value
                    this.props.set(message)
                }}>
                
                <input 
                id="message"
                type="text"
                placeholder="Type anything..."
                ref={(input) => {this.message = input} }
                />
                
                <button type='submit' className="btn btn-primary mx-2">Submit</button>

                </form>

                <p>Your message: {this.props.message} </p>

            </div>
        );
    }
}

export default Main;
