import React from 'react';
import { List, Select } from 'antd';
import { Link } from 'react-router-dom';

const {Option} = Select;


class StrategyList extends React.Component {

    state = {
        postList: []
    }

    componentDidMount() {
        this.fetchStrategyList();
    }

    fetchStrategyList() {
        // Api.postList().then(res => {
        //     console.log(res);
        //     this.setState({
        //         postList: res
        //     });
        // });
    }

    delPost(postId) {
        // Api.deletePost({postId}).then(() => {
        //     this.fetchStrategyList();
        // });
    }

    changeType(value, item) {
        // Api.changePost({
        //     type: value,
        //     id: item.id
        // }).then(() => {
        //     this.fetchStrategyList();
        // });
    }

    // renderTypeSelect(item) {
    //     let children = [
    //         (<Option key="0">草稿</Option>),
    //         (<Option key="1">发布</Option>)
    //     ];
    //     return (
    //         <div className={style.typeSelect}>
    //             <Select
    //                 style={{ width: '100%' }}
    //                 value={'' + item.type}
    //                 onChange={e => this.changeType(e, item)}
    //                 size='small'
    //             >
    //                 {children}
    //             </Select>
    //         </div>
    //     );
    // }

    // renderItem(item) {
    //     return (
    //         <List.Item>
    //             <div className={style.postListItem}>
    //                 {item.title}
    //                 <div>
    //                     {this.renderTypeSelect(item)}
    //                     <Link to={'/main/post/' + item.id}>编辑</Link>
    //                     <a onClick={() => this.delPost(item.id)}>删除</a>
    //                 </div>
    //             </div>
    //         </List.Item>
    //     );
    // }

    render() {
        return (
            <div> StrategyList </div>
        );
    }

}

export default StrategyList;