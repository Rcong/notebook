import React from 'react';
import { List, Avatar, Icon } from 'antd';
import './RoleDetail.less';
import Api from '@Api'
class RoleDetail extends React.Component {

    state = {
        isLoading: true,
        roleDetail: {}
    }

    async componentDidMount() {
        let { roleId } = this.props.match.params;
        let roleDetail = await Api.fetchRoleDetail({ roleId });
        this.setState({ roleDetail: roleDetail, isLoading: false });
    }

    render() {
        let { roleDetail, isLoading } = this.state;
        return (
            <div className="roleDetailContainer">
                
            </div>
        );
    }

}

export default RoleDetail;