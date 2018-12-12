import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './LayoutContainer.less';
import averter from "@Images/averter.png";
const { Content, Sider } = Layout

let layoutContainer = InnerComponent => class OuterComponent extends Component {

    constructor(props) {
        super(props);
        this.menuClick = this.menuClick.bind(this);
    }

    componentDidMount() {

    }

    menuClick (e) {
        this.props.history.replace(`/${e.key}`);
    }

    render() {

        let props = this.props;

        return (
            <Layout className="layoutContainer">
                <Layout>
                    <Sider className="sider">
                        <div className="logo">
                            <img src={averter} alt=""/>
                        </div>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['roleList']}
                            onClick={this.menuClick}
                        >
                            <Menu.Item key="roleList">角色列表</Menu.Item>
                            <Menu.Item key="strategyList">攻略列表</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="layout">
                        <Content className="content">
                            <InnerComponent {...props}/>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
        
    }
}

export { layoutContainer }