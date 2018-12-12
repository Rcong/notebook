import React from 'react';
import { List, Avatar, Icon } from 'antd';
import './RoleList.less';
import { Link } from 'react-router-dom';
import Api from '@Api'

class RoleList extends React.Component {

    state = {
        isLoading: true,
        roleList: []
    }

    async componentDidMount() {
        let roleList = await Api.fetchRoleList();
        this.setState({ roleList: roleList, isLoading: false });
    }

    async fetchRoleList() {
        let roleList = await Api.fetchRoleList();
        this.setState(roleList);
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

    renderItem({ roleId, roleName, avatar, roleDesc }){
        return (
            <List.Item
                key={roleId}
                // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                extra={<img width={120} alt={roleDesc} src={avatar} />}
            >
                <List.Item.Meta
                    avatar={<Avatar src={avatar} />}
                    title={<span>{roleName}</span>}
                    // description={roleDesc}
                />
                {roleDesc}
            </List.Item>
        )
    }

    render() {
        let { roleList, isLoading } = this.state;
        return (
            <div className="roleListContainer">
                <List
                    loading={isLoading}
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={roleList}
                    renderItem={this.renderItem.bind(this)}
                />
            </div>
        );
    }

}

export default RoleList;