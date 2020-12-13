import React, {useState} from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

const BookList = (): JSX.Element => {
    const [state, setState] = useState(null);


    return (
        <div>
            <ul id="book-list">

                <li>Book name</li>
            </ul>
        </div>
    )
}

export default BookList;
