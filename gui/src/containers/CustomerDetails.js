import React, {useEffect, useState} from "react";
import { Skeleton, Tooltip, Card, Icon, Avatar, Tag, Table, Divider, Alert, Button, Result } from 'antd';
import { Link } from "react-router-dom";
import { capitalize } from "../utility/utility";
import { history } from "../App";

import { formatMoney } from "../utility/utility";

import axios from "axios";

Icon.setTwoToneColor('red');
const {Meta} = Card;

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a color="magenta">{String(text).toUpperCase()}</a>,
    },
    {
        title: 'Investment',
        dataIndex: 'investment',
        key: 'investment',
        render: text => <Tag color="magenta">{formatMoney(Number(text))}</Tag>,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        render: text => <Tag color={text === 'Male' ? "green": 'pink'}>{text}</Tag>,
    },
    {
        title: 'Contact',
        key: 'contact',
        dataIndex: 'contact',
        render: (text, record) => (
            <span>
                    <Tag color={'gold'}>{text}</Tag>
                    <Divider type="vertical" />
                    <Tag color="volcano">{record.investment === 0 ? `Payment is pending` : 'No due'}</Tag>
                    </span>
        ),
    },
];

export const CustomerDetails = (props) => {
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(true);
    const clientId = props.match.params.customerId;
    const [ deleted, setDeleted ] = useState(false);

    const handleDeleteClient = (e) => {
        e.preventDefault()
        axios.delete(`http://127.0.0.1:8000/api/${clientId}/`)
            .then(res => {
                console.log(res)
                setDeleted(true);
            })
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/${clientId}`)
            .then(res => {
                setClient(res.data);
                setLoading(false);
            }).catch((err) => {
                setClient(undefined);
                console.log(err)
            })
    }, [])

    if (client === undefined) {
        return <Result
            status="404"
            title="404"
            subTitle="Sorry, the client you are looking for does not exits"
            extra={<Button type="primary" onClick={() => {
                history.push('/viewClients')
            }}>Back Home</Button>}
        />
    }

    return (!deleted ?
        <div>
            <Card
                style={{ margin: '0 auto' }}
                actions={[
                    <Tooltip title="update the client">
                            <Link to={`/updateClient/${props.match.params.customerId}`}><Icon style={{ fontSize: 20, color: 'blue' }} theme={'filled'} type="edit" /></Link>
                    </Tooltip>,
                    <Tooltip title="Delete the client">
                        <Icon type="delete" theme={"twoTone"} style={{ fontSize: 20, color: 'red' }} onClick={handleDeleteClient}/>
                    </Tooltip>,
                    <Tooltip title="Go back to view clients">
                    <Link to={'/viewClients'}><Icon style={{ fontSize: 20, color: 'green' }} theme={'filled'} type="left-circle" /></Link>
                    </Tooltip>

                ]}
            >
                <Skeleton loading={loading} avatar active>
                    <Meta
                        avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={capitalize(String(client.name))}
                        description={client.mailid}
                    />
                </Skeleton>
                <div style={{ marginTop: 24 }}>
                    <Table columns={columns} dataSource={[client]} />
                </div>
            </Card>
        </div>:
            <>
            <Alert
            message={`Successfully deleted ${client.name}`}
            description={`Go back to viewClients`}
            type="success"
            showIcon
        />
        <Button type="primary" style={{ marginTop: 20 }} onClick={() => {
            history.push('/viewClients')
        }}>Go Back</Button>
        </>
    );
}