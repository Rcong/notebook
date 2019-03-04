import React, { Component } from 'react';
import { List, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './RoleList.less';
import { fetchRoleList, changePageSize } from './actions';
import layoutContainer from '@Components/LayoutContainer';

@layoutContainer
class RoleList extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.dispatch(fetchRoleList());
    }

    renderItem({ roleId, roleName, avatar, roleDesc }){
        return (
            <List.Item
                key={roleId}
                actions={[<Link to={`/roleDetail/${roleId}`}><Icon className={styles.mr8} type="smile"/>查看详情</Link>]}
                extra={<img width={120} alt={roleDesc} src={avatar} />}
            >
                <List.Item.Meta
                    avatar={<Avatar src={avatar} />}
                    title={<span>{roleName}</span>}
                />
                {roleDesc}
            </List.Item>
        )
    }

    render() {
        let { roleList, isLoading, pageSize, dispatch } = this.props;

        return (
            <div className={styles.roleListContainer}>
                <List
                    loading={isLoading}
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        showSizeChanger: true,
                        pageSize: pageSize,
                        pageSizeOptions: ['5', '10', '20'],
                        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 个, 共 ${total} 个`,
                        onShowSizeChange: (current, size) => dispatch(changePageSize(size))
                    }}
                    dataSource={roleList}
                    renderItem={this.renderItem.bind(this)}
                />
            </div>
        );
    }

}

const mapStateToProps = ({ roleListReducer }) => {
    let { roleList, isLoading, pageSize } = roleListReducer;
    return { roleList, isLoading, pageSize };
};

// 连接 store，作为 props
export default connect(mapStateToProps)(RoleList);