import React from 'react';
import { List, message, Spin } from 'antd';
import request from 'request';

import InfiniteScroll from 'react-infinite-scroller';

//const listData = 'http://127.0.0.1:8000/api';
const Customer = (props) => {
        return(
                            

                class InfiniteListExample extends React.Component {
                state = {
                    data: [],
                    loading: false,
                    hasMore: true,
                };

                componentDidMount() {
                    this.fetchData(res => {
                    this.setState({
                        data: res.results,
                    });
                    });
                }

                fetchData = callback => {
                    request({
                    url: ('http://127.0.0.1:8000/api'),
                    type: 'json',
                    method: 'get',
                    contentType: 'application/json',
                    success: res => {
                        callback(res);
                    },
                    });
                };

                handleInfiniteOnLoad = () => {
                    let { data } = this.state;
                    this.setState({
                    loading: true,
                    });
                    if (data.length > 14) {
                    message.warning('Infinite List loaded all');
                    this.setState({
                        hasMore: false,
                        loading: false,
                    });
                    return;
                    }
                    this.fetchData(res => {
                    data = data.concat(res.results);
                    this.setState({
                        data,
                        loading: false,
                    });
                    });
                };

                render() {
                    return (
                    <div className="demo-infinite-container">
                        <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                        >
                        <List
                            dataSource={props.data}
                            renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                                            
                                name={item.name}
                                address={item.address}
                                contact={item.concat}
                                mailid={item.maildid}
                                lastservice={item.lastservice}
                                />
                                <div>Content</div>
                            </List.Item>
                            )}
                        >
                            {this.state.loading && this.state.hasMore && (
                            <div className="demo-loading-container">
                                <Spin />
                            </div>
                            )}
                        </List>
                        </InfiniteScroll>
                    </div>
                    );
                }
                }


        )

}
export default Customer; 