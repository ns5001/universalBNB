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

