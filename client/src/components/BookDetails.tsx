import React, {FC, useState} from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

interface BookDetailsProps {
    data: string
}

const BookDetails: FC<BookDetailsProps> = ({data}): JSX.Element => {

    const displayBookDetails = () => {
        // const {book} = data;
    }


    return (
        <></>
    )
}

export default BookDetails;
