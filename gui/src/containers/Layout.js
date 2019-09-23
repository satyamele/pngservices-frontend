import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import CustomNotifications from '../components/Notification';
import 'antd/dist/antd.css';
import '../containers/Layout.css';
import CustomerList from './CustomerListView';

const { Header, Sider, Content,Footer } = Layout;


const CustomLayout = (props) => {
    return (
                <Layout>
            <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}
            >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item key="1">
                <Icon type="home" />
                <span className="nav-text"><Link to='/'>Dashboard</Link></span>
                </Menu.Item>
                <Menu.Item key="2">
                <Icon type="star" />
                <span className="nav-text"><Link to='/Form/'>Add Client</Link></span>
                </Menu.Item>
                <Menu.Item key="3">
                <Icon type="mail" />
                <span className="nav-text"><Link to='/CustomerList'>View Clients</Link></span>
                </Menu.Item>
                <Menu.Item key="4">
                <Icon type="bar-chart" />
                <span className="nav-text"><Link to='/'>Send Mail</Link></span>
                </Menu.Item>
                
            </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: '#fff', padding: 10, textAlign:'right' }}>
                <h1 className='companytitle'>P&G Services</h1> <CustomNotifications/>
            
            
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                   
                    <CustomerList/>
                    
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Designed by Satyam</Footer>
            </Layout>
        </Layout>
    );
}

export default CustomLayout;
