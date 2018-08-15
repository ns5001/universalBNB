import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// function Table(){
//     return <>
// }
//
// function Sold(props) {
//     fetch('/sold')
//         .then( resp => resp.json())
//         .then(resp => {
//
//         }, error => {
//
//         })
// }

// function get(obj, route){
//     fetch(route)
//         .then( resp => resp.json())
//         .then(resp => {
//             this.setState(
//             {
//                 obj: {
//                     isLoaded: true,
//                     items: resp,
//                 }
//             })
//         }, error => {
//             this.setState(
//                 {
//                     obj: {
//                         isLoaded: true,
//                         error: error,
//                     }
//                 })
//         })
// }

class UserTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            "inProgressSelling": {error: null, isLoaded: false, items: []}
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
        this.get('/NotYetPurchased', resp => {
            this.setState({"inProgressSelling": {error: resp.error, isLoaded: resp.isLoaded, items: resp.items} })
        });
    }

    render() {
        const {error, isLoaded, items} = this.state.inProgressSelling;
        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else{
            return (
                <div>
                    <ul>
                    {items.map(item => {
                        <li key={ item.service.name}>
                            {item.service.id} {item.service.name} {item.service.price}  {item.buyer.firstName} {item.buyer.lastName}
                        </li>
                    } )}

                    </ul>
                </div>
            )
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <UserTable />,
        document.body.appendChild(document.createElement('div')),
    )
})