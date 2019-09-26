import React from "react";
import {Layout, Menu, Icon} from 'antd';
import { Link } from "react-router-dom";
import MyClock from "../components/Clock";
import styled from 'styled-components';

const {Header, Sider, Content} = Layout;
const StyledClock = styled.div`
    display: flex;
    justify-content: space-evenly;
    time {
    font-size: 18px;
    font-family: monospace;
    font-weight: 800;
    color: #fff;
    background: #214f7b;
    height: 58px;
    padding: 0px 20px 0px;
    margin: 3px;
    width: 121px;
   }
   .logo {
     font-size: 24px;
    font-family: inherit;
    font-weight: bolder;
    color: #fff;
   }
}
`;


const CustomLayout = (props) => {
    return (
        <Layout>
            <Sider>
                <div className="logo">P & G SERVICES</div>
                <Menu theme="light" mode="inline">
                    <Menu.Item key="1">
                        <Icon type="dashboard" />
                        <span><Link to={'/'}>Dashboard</Link></span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="form" />
                        <span><Link to={'/addClients'}>AddClients</Link></span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="smile" />
                        <span><Link to={'/viewClients'}>ViewClients</Link></span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{background: '#1890ff'}}>
                    <StyledClock>
                        <MyClock />
                        <Link to={'/'}><div className={'logo'}>P & G SERVICES</div></Link>
                    </StyledClock>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: '100vh',
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default CustomLayout;