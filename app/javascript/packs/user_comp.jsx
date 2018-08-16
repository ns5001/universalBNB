import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class  Table extends React.Component{
    render() {
        const headings = this.props.headings; // Array
        const data = this.props.data; // Object
        const fields = this.props.fields;
        return(
            <table className="table table-light table-bordered padding-top-5">
                <thead>
                <tr>
                { headings.map( heading => {
                    return <th> {heading} </th>
                })}
                </tr>
                </thead>
                <tbody>
                    { data.map( i => {
                        return(
                        <tr>
                            { fields.map( field => {
                                return <td>{ i[field] }</td>
                            }) }
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        );
    }
}

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

// Figure out Edits
class NotYetPurchasedTable extends React.Component {
    render() {
        const items = this.props.data;
        const error = this.props.error;
        const loaded = this.props.isLoaded;
        const headings = ["Service", "Detail", "Price", "Edit"];
        const fields = ["name", "detail", "price"];
        return(
            <div id="notYetPurchased">
                <h3>Not Yet Purchased</h3>
                <Table headings={headings} data={items} fields={fields} />
            </div>
        );
    }
}

class InProgressBuyingTable extends React.Component {
    render() {
        let items = flatten(this.props.data, "seller", "service");
        const error = this.props.error;
        const loaded = this.props.isLoaded;
        const headings = ["Service", "Seller First Name", "Seller Last Name", "Price"];
        const fields = ["service_name", "seller_firstName", "seller_lastName", "service_price"];
        return(
            <div id="inProgressBuying">
                <h3>Pending Bought Services</h3>
                <Table headings={headings} data={items} fields={fields} />
            </div>
        );
    }
}

class InProgressSellingTable extends React.Component {
    render() {
        let items = flatten(this.props.data, "buyer", "service");
        const error = this.props.error;
        const loaded = this.props.isLoaded;
        const headings = ["Service", "Buyer First Name", "Buyer Last Name", "Price", "Approve", "Reject"];
        const fields = ["service_name", "buyer_firstName", "buyer_lastName", "service_price"];
        return(
            <div id="inProgressSelling">
                <h3>Pending Sold Services</h3>
                <Table headings={headings} data={items} fields={fields} />
            </div>
        );
    }
}
// Need to add Rate Link
class BoughtTable extends React.Component {
    render() {
        let items = flatten(this.props.data, "seller", "service");
        const error = this.props.error;
        const loaded = this.props.isLoaded;
        const headings = ["Service", "Seller First Name", "Seller Last Name", "Price", "Rate"];
        const fields = ["service_name", "seller_firstName", "seller_lastName", "service_price"];
        return(
            <div id="bought">
                <h3>Services You Have Bought</h3>
                <Table headings={headings} data={items} fields={fields} />
            </div>
        );
    }
}

class SoldTable extends React.Component {
    render() {
        let items = flatten(this.props.data, "buyer", "service");
        const error = this.props.error;
        const loaded = this.props.isLoaded;
        const headings = ["Service", "Buyer First Name", "Buyer Last Name", "Price"];
        const fields = ["service_name", "buyer_firstName", "buyer_lastName", "service_price"];
        return(
            <div id="sold">
                <h3>Services You Have Bought</h3>
                <Table headings={headings} data={items} fields={fields} />
            </div>
        );
    }
}

class UserTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            "notYetPurchased": {error: null, isLoaded: false, items: []},
            "inProgressBuying": {error: null, isLoaded: false, items: []},
            "inProgressSelling": {error: null, isLoaded: false, items: []},
            "bought": {error: null, isLoaded: false, items: []},
            "sold": {error: null, isLoaded: false, items: []}
        }
    }

    get (route, cb){
        fetch(route)
            .then( resp => resp.json())
            .then(
                resp => {
                    console.log(resp);
                    cb({items: resp, error: null, isLoaded: true});
                }
            ,   error => {
                    cb({items: [], error: error, isLoaded: true});
            })
    }

    componentDidMount(){
        this.get('/notYetPurchased', resp => {
            this.setState({"notYetPurchased": {error: resp.error, isLoaded: resp.isLoaded, items: resp.items} })
        });
        this.get('/inProgressBuying', resp => {
            this.setState({"inProgressBuying": {error: resp.error, isLoaded: resp.isLoaded, items: resp.items} })
        });
        this.get('/inProgressSelling', resp => {
            this.setState({"inProgressSelling": {error: resp.error, isLoaded: resp.isLoaded, items: resp.items} })
        });
        this.get('/bought', resp => {
            this.setState({"bought": {error: resp.error, isLoaded: resp.isLoaded, items: resp.items} })
        });
        this.get('/sold', resp => {
            this.setState({"sold": {error: resp.error, isLoaded: resp.isLoaded, items: resp.items} })
        });
    }

    render() {
        // const {error, isLoaded, items} = this.state.notYetPurchased;
        // if (error) {
        //     return <div>Error: {error}</div>;
        // } else if (!isLoaded) {
        //     return <div>Loading...</div>;
        // } else{
        //     return (
        //         <div>
        //             <ul>
        //             {items.map(item => {
        //                 return <li > {item.id} {item.name} {item.price} </li>
        //             } )}
        //             </ul>
        //         </div>
        //     )
        // }
        return(
            <div>
                <NotYetPurchasedTable
                    data={this.state.notYetPurchased.items}
                    loaded={this.state.notYetPurchased.isLoaded}
                    error={this.state.notYetPurchased.error}
                />
                <InProgressBuyingTable
                    data={this.state.inProgressBuying.items}
                    loaded={this.state.inProgressBuying.isLoaded}
                    error={this.state.inProgressBuying.error}
                />
                <InProgressSellingTable
                    data={this.state.inProgressSelling.items}
                    loaded={this.state.inProgressSelling.isLoaded}
                    error={this.state.inProgressSelling.error}
                />
                <BoughtTable
                    data={this.state.bought.items}
                    loaded={this.state.bought.isLoaded}
                    error={this.state.bought.error}
                />
                <SoldTable
                    data={this.state.sold.items}
                    loaded={this.state.sold.isLoaded}
                    error={this.state.sold.error}
                />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <UserTable  />,
        document.getElementById("tables")
    )
})