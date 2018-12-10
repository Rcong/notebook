import React from 'react';
import { List, Select } from 'antd';
// import style from './post.sass';
import { Link } from 'react-router-dom';
import Api from '@Api'

const {Option} = Select;


class RoleList extends React.Component {

    state = {
        postList: []
    }

    async componentDidMount() {
        let data = await Api.fetchRoleList();
        debugger
    }

    fetchRoleList() {
        // Api.postList().then(res => {
        //     console.log(res);
        //     this.setState({
        //         postList: res
        //     });
        // });
    }

    delPost(postId) {
        // Api.deletePost({postId}).then(() => {
        //     this.fetchRoleList();
        // });
    }

    changeType(value, item) {
        // Api.changePost({
        //     type: value,
        //     id: item.id
        // }).then(() => {
        //     this.fetchRoleList();
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
            <div> RoleList </div>
        );
    }

}

export default RoleList;