import React, { Component } from 'react';
import OneTrade from 'COMPONENT/OneTrade';
import styles from 'SRC/styles.scss';
import Context from 'SRC/context';


// class App extends Component {

//     state = {
//         theme: 'orange'
//     }

//     toggleTheme = () => {
//         this.setState(({theme}) => ({
//             theme: theme === 'light' ? 'orange' : 'light',
//         }))
//     }

//     render() {
//         return (
//             <div className="App">
//                 <h1>React Demo</h1>
//                 <Context.Provider value={this.state.theme}>
//                     <OneTrade theme={styles[this.state.theme]}/>
//                 </Context.Provider>
//                 <button onClick={this.toggleTheme}>toggle theme</button>
//             </div>
//         );
//     }
// }

class App extends Component {

    state = {
        theme: 'orange',
        toggleTheme: () => {
            this.setState(({theme}) => ({
                theme: theme === 'light' ? 'orange' : 'light',
            }))
        }
    }

    render() {
        return (
            <div className="App">
                <h1>React Demo</h1>
                <Context.Provider value={this.state}>
                    <OneTrade theme={styles[this.state.theme]}/>
                </Context.Provider>
                <button onClick={this.state.toggleTheme}>toggle theme</button>
            </div>
        );
    }
}

export default App;
