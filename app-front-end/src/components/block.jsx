import React, { Component } from 'react';

// block component used to import data from the blockchain and couchdb
class Block extends Component {
    state = { 
        data: [] 
    };

    componentDidMount() {
        const url = "http://localhost:7102/admin1_admin/_all_docs";
        const creds = {
            'name' : 'admin',
            'password' : 'adminpw'
        };
        var headers = new Headers();

        fetch(url,{
            method: 'GET',
            mode: 'no-cors',
            headers: headers,
            data: creds

        })
            .then((result) => result.json())
            .then(result => console.log(result))
            .then((result) => {
                this.setState({
                    data: result,
                })
            })
    }

    render() {

        const { data } = this.state.data

        const result = JSON.stringify(data)

        return (
            <ul>{result}</ul>
        );
    }
}

export default Block;