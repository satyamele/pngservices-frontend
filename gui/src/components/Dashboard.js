import React, { useEffect, useState} from "react";
import {Statistic, Card, Row, Col, Icon, Result, Button, Typography, Skeleton} from 'antd';
import axios from "axios";
import {Link} from "react-router-dom";
import { calcPercentage } from "../utility/utility";
import {DailyInvestmentPieChart, MonthlyInvestmentBarChart} from "./Graphs";

const {Text} = Typography;

export const Dashboard = () => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/')
            .then(res => {
                setUserData(res.data);
            }).catch((error) => {
            if (error.response) {
                setError(error.response.statusText);
                return;
            }
        })
    }, []);

    if (error) {
        return <Result
            status={"error"}
            title={error}
            extra={
                <Button type="primary" key="console">
                    <Link to={'/'}>Refresh</Link>
                </Button>
            }
        />
    }
    return userData.length > 0 ?
        <>
            <PerdayInvestments data={userData}/>
            <DailyInvestmentPieChart data={userData} />
            <MonthlyInvestmentBarChart data={userData} />
        </> : <Skeleton active/>
}

export const PerdayInvestments = ({ data }) => {
    const [paymentStat, setPaymentStat] = useState({})

    useEffect(() => {
        let paymentComplete = 0, paymentDue = 0;
        data && data.forEach((client) => {
            if(client.investment === 0) {
                paymentDue += 1;
            } else {
                paymentComplete += 1;
            }
        })
        setPaymentStat({ paymentComplete, paymentDue })

    }, [data.length])

    return <>
        <Text type="warning">Percentage of investment stats</Text>
        <div style={{background: '#ECECEC', padding: '20px', marginTop: 20}}>
            <Row gutter={16}>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Payment completed"
                            value={calcPercentage(paymentStat.paymentComplete, data.length)}
                            precision={2}
                            valueStyle={{color: '#3f8600'}}
                            prefix={<Icon type="arrow-up"/>}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Payment due"
                            value={calcPercentage(paymentStat.paymentDue, data.length)}
                            precision={2}
                            valueStyle={{color: '#cf1322'}}
                            prefix={<Icon type="arrow-down"/>}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    </>
}