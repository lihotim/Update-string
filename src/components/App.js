import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';

import HelloWorld from '../abis/HelloWorld.json'

import MyNavbar from './MyNavbar.js'
import Main from './Main.js'

class App extends Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = HelloWorld.networks[networkId]
    if(networkData) {
        const helloWorld = new web3.eth.Contract(HelloWorld.abi, networkData.address)
        this.setState({ helloWorld })
          
        const message = await this.state.helloWorld.methods.get().call()
        this.setState({message})

        this.setState({ loading: false })
    } else {
        window.alert('HelloWorld contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      message: '',
      loading: true
    }
   this.set = this.set.bind(this)
  }
  
  set(message) {
    this.setState({ loading: true })

    this.state.helloWorld.methods.set(message).send({ from: this.state.account} )
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div className="App">
  
      <MyNavbar account={this.state.account}/>
  
        <div id="main">
            { this.state.loading 
            ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
            : <div>
                
                <div>
                <h2>Using App.js:</h2>
                    <form onSubmit = {(event) => {
                      event.preventDefault()
                      const message = this.message.value
                      this.set(message)
                    }}>
                    
                    <input 
                    id="message"
                    type="text"
                    placeholder="Type anything..."
                    ref={(input) => {this.message = input} }
                    />

                    <button type='submit' className="btn btn-primary mx-2">Submit</button>

                    </form>

                    <p>Your message: {this.state.message} </p>

                </div>
                    
                    <hr/>

                    <div>
                    <h2>Using Main.js:</h2>
                      <Main 
                        message={this.state.message}
                        set={this.set}
                      />
                    </div>

                    <hr/>

            </div>

            
            }
        </div>

        
      </div>
      
    );
  }
}

export default App;
