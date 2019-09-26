import React from 'react';
import axios from 'axios';
import Customer from '../components/Customer';
import styled from 'styled-components';
import {Badge, Button, Icon, Alert } from "antd";
import {Link} from "react-router-dom";

const RenderTable = styled.div`
    padding: 24px;
    .notify {
       margin-bottom: 20px;
    }
    i {
        margin-right: 12px;
    }
`;

class CustomerList extends React.Component {
    state = {
        customer: [],
        nameFilter: [],
        emailFilter: [],
        genderFilter: [],
    }

    onClose = (e) => {
        return true
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api')
            .then(res => {
                const initialFilter = { text: '', value: ''}
                const eFilter = [], nFilter = [], gFilter = [];
                res.data && res.data.forEach((entry) => {
                    eFilter.push({...initialFilter, text: entry.mailid, value: entry.mailid});
                    nFilter.push({...initialFilter, text: entry.name, value: entry.name});
                    gFilter.push({...initialFilter, text: entry.gender, value: entry.gender});
                });

                this.setState({
                    customer: res.data,
                    nameFilter: nFilter,
                    emailFilter: eFilter,
                    genderFilter: gFilter,
                })
            })
    }

    render() {
        return (
            <RenderTable>
                {this.state.customer.length === 0 && <div>
                    <Alert message="Sorry there are no clients to be listed!" type="info" closable onClose={this.onClose} />
                    <Button type="primary" style={{ margin: '20px 0 20px 0' }}><Link to={'/addClients'}>Add a client</Link></Button>
                </div>}
                {this.state.customer.length> 0 && <div className={'notify'}>
                    <Badge dot>
                        <Icon type="notification"/>
                        <a>Click the table row to see the client details.</a>
                    </Badge>
                </div>}
                <Customer listData={this.state.customer} emailFilter={this.state.emailFilter}
                          nameFilter={this.state.nameFilter} genderFilter={this.state.genderFilter}/>
            </RenderTable>
        )
    }
}

export default CustomerList;