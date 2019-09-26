import React from "react";
import {Table, Button, Tag} from 'antd';
import {history} from "../App";
import Skeleton from "antd/lib/skeleton";
import {formatMoney} from "../utility/utility";

class CustomerTable extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clearFilters = () => {
        this.setState({filteredInfo: null});
    };

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'investment',
            },
        });
    };

    handleRow = ({id}) => {
        history.push(`/clientDeatils/${id}`);
    }

    render() {
        let {sortedInfo, filteredInfo} = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const {emailFilter, nameFilter, genderFilter} = this.props;
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                filters: nameFilter,
                filteredValue: filteredInfo.name || null,
                onFilter: (value, record) => record.name.includes(value),
                sorter: (a, b) => a.name.localeCompare(b.name),
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            },
            {
                title: 'Investment',
                dataIndex: 'investment',
                key: 'investment',
                sorter: (a, b) =>  a.investment - b.investment,
                sortOrder: sortedInfo.columnKey === 'investment' && sortedInfo.order,
                render: text => <Tag color="magenta">{formatMoney(Number(text))}</Tag>,
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                key: 'gender',
                filters: genderFilter,
                filteredValue: filteredInfo.gender || null,
                onFilter: (value, record) => record.gender.includes(value),
            },
            {
                title: 'Emails',
                dataIndex: 'mailid',
                key: 'mailid',
                filters: emailFilter,
                filteredValue: filteredInfo.mailid || null,
                onFilter: (value, record) => record.mailid.includes(value),
            },
            {
                title: 'Last service',
                dataIndex: 'lastservice',
                key: 'lastservice',
                sorter: (a, b) => new Date(a.lastservice).getTime() - new Date(b.lastservice).getTime(),
                sortOrder: sortedInfo.columnKey === 'lastservice' && sortedInfo.order,
            },
        ];

        return (
            <div>
                <div className="table-operations">
                    <Button onClick={this.setAgeSort}>Sort Investment</Button>
                    <Button onClick={this.clearFilters}>Clear filters</Button>
                    <Button onClick={this.clearAll}>Clear filters and sorters</Button>
                </div>
                <Table columns={columns} dataSource={this.props.data} onChange={this.handleChange}
                       onRowClick={this.handleRow} scroll={{ y: 320 }} />
            </div>
        );
    }
}

const Customer = (props) => {
    return props.listData.length ?
        <CustomerTable data={props.listData} emailFilter={props.emailFilter} nameFilter={props.nameFilter} genderFilter={props.genderFilter}/> :
        <Skeleton active/>
}

export default Customer;
