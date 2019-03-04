import React from 'react';
import TradeInfo from 'COMPONENT/TradeInfo';
import Context from 'SRC/context';
import styles from 'SRC/styles.scss';

// props demo
// export default props => {

//     let { theme } = props;

//     return (
//         <div className={theme} style={styles.oneTrade}>
//             <TradeInfo {...props}/>
//             <TradeInfo {...props}/>
//             <TradeInfo {...props}/>
//         </div>
//     )

// };

// normal context demo
// export default props => {
//     return (
//         <Context.Consumer>
//             {theme => (
//                 <div className={`${theme} ${styles.oneTrade}`}>
//                     <TradeInfo/>
//                     <TradeInfo/>
//                     <TradeInfo/>
//                 </div>
//             )}
//         </Context.Consumer>
//     )
// };

// context fn demo
export default props => {
    return (
        <Context.Consumer>
            {({theme}) => (
                <div className={`${theme} ${styles.oneTrade}`}>
                    <TradeInfo/>
                    <TradeInfo/>
                    <TradeInfo/>
                </div>
            )}
        </Context.Consumer>
    )
};