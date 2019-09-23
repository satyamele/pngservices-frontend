import React from 'react';
import axios from 'axios';
import Customer from '../components/Customer';

//const listData = 'http://127.0.0.1:8000/api';

class CustomerList extends React.Component{
    state = {
        customer: []
    }

    componentDidMount(){
       axios.get('http://127.0.0.1:8000/api')
            .then(res => {
                this.setState({
                    customer: res.data
                }, () => console.table(this.state.customer))
                console.log(res.data);
            })
    }

    render(){
        return(
            <Customer data={this.state.customer}/>  

        )
    }
}

export default CustomerList;