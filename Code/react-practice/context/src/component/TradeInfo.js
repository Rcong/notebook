import React from 'react';
import styles from 'SRC/styles.scss';
import Context from 'SRC/context';

// context demo
// export default props => {
//     return <div className={props.theme}>TradeInfo...</div>
// }

// normal context demo
// export default props => (
//     <Context.Consumer>
//         {theme => <div {...props} className={theme}>TradeInfo...</div>}
//     </Context.Consumer>
// )

// context fn demo
export default props => (
    <Context.Consumer>
        {({theme, toggleTheme}) => {
            debugger
            return <button onClick={toggleTheme} className={theme}>Toggle Theme</button>
        }} 
    </Context.Consumer>
)