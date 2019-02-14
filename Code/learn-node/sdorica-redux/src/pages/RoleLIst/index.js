import React, { Component } from 'react';
import { List, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class RoleList extends Component {

    state = {
        isLoading: true,
        pageSize: 5,
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

    renderItem({ roleId, roleName, avatar, roleDesc }){
        return (
            <List.Item
                key={roleId}
                actions={[<Link to={`/roleDetail/${roleId}`}><Icon className="mr8" type="smile"/>查看详情</Link>]}
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
        let { roleList, isLoading, pageSize } = this.state;
        return (
            <div className="roleListContainer">
                <List
                    loading={isLoading}
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        showSizeChanger: true,
                        pageSize: pageSize,
                        pageSizeOptions: ['5', '10', '20'],
                        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 个, 共 ${total} 个`,
                        onShowSizeChange: (current, size) => this.setState({ pageSize: size })
                    }}
                    dataSource={roleList}
                    renderItem={this.renderItem.bind(this)}
                />
            </div>
        );
    }

}

const mapStateToProps = store => ({
    roleList: store.roleList
});

// 连接 store，作为 props
export default connect(mapStateToProps)(RoleList);