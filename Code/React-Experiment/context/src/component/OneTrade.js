import React from 'react';
import TradeInfo from 'COMPONENT/TradeInfo';

const styles = {
    oneTrade: {
        width: '300px',
        height: '96px'
    }
}

export default props => {

    let { theme } = props;

    return (
        <div className={theme} style={styles.oneTrade}>
            <TradeInfo {...props}/>
            <TradeInfo {...props}/>
            <TradeInfo {...props}/>
        </div>
    )

};
