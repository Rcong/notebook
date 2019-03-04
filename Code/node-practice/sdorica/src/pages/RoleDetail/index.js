import React from 'react';
import { Skeleton, Button, Avatar } from 'antd';
import '@Pages/Common.less'
import './RoleDetail.less';
import Api from '@Api'
class RoleDetail extends React.Component {

    constructor(){
        super();
        this.playVoice = this.playVoice.bind(this);
        this.state = {
            isLoading: true,
            roleDetail: {}
        }
    }

    async componentDidMount() {
        let { roleId } = this.props.match.params;
        let roleDetail = await Api.fetchRoleDetail({ roleId });
        this.setState({ roleDetail: roleDetail, isLoading: false });
    }

    playVoice(){
        this.refs.roleVoice && this.refs.roleVoice.play();
    }

    renderRoleWallpaper(){
        let { roleName, roleWallpaper } = this.state.roleDetail;
        return <div className="roleWallpaperItem"><img className="roleWallpaper" alt={roleName} src={roleWallpaper}/></div>;
    }

    renderRoleDetail(){

        let { roleName, roleDesc, voiceActor, roleVoice } = this.state.roleDetail;

        return (
            <div className="width1000 flexColumn mt16">
                <div className="flexRow alignBaseline">
                    <span className="roleName fwBold fs36 mr16">{roleName}</span>
                    {
                        voiceActor && roleVoice ?
                            <div className="flexRow alignCenter">
                                <span className="voiceActor fs24 mr16">CV:{voiceActor}</span>
                                <Button shape="circle" icon="caret-right" onClick={this.playVoice} />
                                <audio ref="roleVoice" src={roleVoice}></audio>
                            </div> : ''
                    }
                </div>
                <p className="roleDesc mt16 fs14">{roleDesc}</p>
            </div>
        );
    }

    renderRoleSkill(){
        let { roleSkills } = this.state.roleDetail;

        return(
            <div className="width1000 flexColumn mt16">
                {
                    roleSkills.map(({ skillIcon, skillName, skillDesc }, index) => {
                        return (
                            <div key={index} className="flexColumn">
                                <Avatar size="small" src={skillIcon} />
                                <span>{skillName}</span>
                                <span>{skillDesc}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        let { isLoading } = this.state;
        return (
            isLoading ?
                <Skeleton active /> :
                <div className="roleDetailContainer">
                    <div className="innerContainer">
                        {this.renderRoleWallpaper()}
                        {this.renderRoleDetail()}
                        {this.renderRoleSkill()}
                    </div>
                </div>
        );
    }

}

export default RoleDetail;