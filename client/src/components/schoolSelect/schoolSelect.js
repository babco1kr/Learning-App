import React from "react";

import ReactMaterialSelect from 'react-material-select'
import 'react-material-select/lib/css/reactMaterialSelect.css'

function SchoolSelect(props) {
    return (
        <ReactMaterialSelect name="schoolNumber" label="Please Choose A School" onChange={props.handleInputChange.bind(this)}>
            <option dataValue="1">Reedy Creek Elementary</option>
            <option dataValue="2">Koa Elementary</option>
        </ReactMaterialSelect>

    )
}

export default SchoolSelect;