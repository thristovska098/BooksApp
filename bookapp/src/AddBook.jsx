import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';

const uiSchema = {
    "type": "VerticalLayout",
    "elements": [
        {
        "type": "Control",
        "scope": "#/properties/title"
        },
        {
        "type": "Control",
        "scope": "#/properties/author"
        },
        {
          "type": "Control",
          "scope": "#/properties/description"
        },
        {
          "type": "Control",
          "scope": "#/properties/numberOfPages"
        }
    ]
}

const schema = {
    "type": "object",
    "properties": {
        "title": {
        "type": "string",
        "description": "Please enter the title of the book"
        },
        "author": {
        "type": "string",
        "description": "Please enter the name of the author"
        },
        "description": {
        "type": "string",
        "minLength": 3,
        "description": "Please enter short summary of the book"
        },
        "numberOfPages": {
        "type": "number"
        }
    }
}

const AddBook = () => {

    const [data, setData] = useState();

    const handleSaving = () => {
        const requestOptions = {
            method: 'POST',
            body: data,
        };

        fetch('http://localhost:3005/book', requestOptions)
            .then(response => console.log(response))
    }

    return <div style={{width:'550px'}} >
             <JsonForms
               schema={schema}
               uischema={uiSchema}
               data={data}
               renderers={materialRenderers}
               cells={materialCells}
               onChange={({ data, errors }) => setData(data)}
             />
             <Button variant="contained" onClick={handleSaving}>Save</Button>
           </div>
}

export default AddBook;
