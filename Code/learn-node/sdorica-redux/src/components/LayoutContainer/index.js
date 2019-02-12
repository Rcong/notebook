import React, { Component } from 'react';
import { Layout, Menu, Icon, LocaleProvider } from 'antd';
import { Link } from 'react-router-dom';
import styles from './LayoutContainer.scss';
import averter from "@Images/averter.png";
import zhCN from 'antd/lib/locale-provider/zh_CN';
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
            <LocaleProvider locale={zhCN}>
                <Layout className={styles.layoutContainer}>
                    <Layout>
                        <Sider className={styles.sider}>
                            <div className={styles.logo}>
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
                        <Layout className={styles.layout}>
                            <Content>
                                <div className={styles.container}>
                                    <InnerComponent {...props}/>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </LocaleProvider>
        )
        
    }
}

export { layoutContainer }