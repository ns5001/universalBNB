import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// A function that takes an array of objects and flattens their child objects
// based on the fields that you give it in "...args"
// Format for key afterwards is objectName_field
function flatten(data, ...args){
    // data = [{},{},{}, ...]
    data.map( item => {
        // i is an int index
        for (let i in args){
            // item[args[i]] is an object
            let current = item[args[i]];
            // j is a key field in the 'current' object
            for (let j in current){
                let key = args[i] +"_"+ j;
                item[key] = current[j];
            }
        }
    })
    return data;
}

class Service extends React.Component{
    render() {
        let items = flatten(this.props.data, "user");
        const error = this.props.error;
        const loaded = this.props.isLoaded;
        return items.map( item => {
            if(item.purchased){
                return;
            }
            else{
                return (
                    <div className="login col-md-7" key={item.id}>
                        <h3 className="primrose_crimson">{item.id} : {item.name} </h3>
                        <h4>Price: {item.price} </h4>
                        <h5>Seller: {item.user_email}</h5>
                        <a href={"/services/" +item.id} type="button">More Info</a>
                    </div>
                )
            }
        } );
    }
}


class ServiceList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            "services": {error: null, isLoaded: false, items: []}
        }
    }

    get (route, cb){
        fetch(route)
            .then( resp => resp.json())
            .then(
                resp => {
                    // console.log(resp);
                    cb({items: resp, error: null, isLoaded: true});
                }
                ,   error => {
                    cb({items: [], error: error, isLoaded: true});
                })
    }

    componentDidMount(){
        this.get('/services.json', resp => {
            this.setState({"services": {error: resp.error, isLoaded: resp.isLoaded, items: resp.items}})
        })
    }

    render() {
        const {error, isLoaded, items} = this.state.services;
        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else{
            return (
                <div>
                    <Service data={items} isLoaded={isLoaded} error={error} />
                </div>
            )
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <ServiceList  />,
        document.getElementById("services")
    )
})