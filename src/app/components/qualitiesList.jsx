import React from 'react';
import { ReactPropTypes } from 'react';
import Quality from './quality';

const QualitiesList = ({qualities}) => {
    return <>
        {qualities.map((qual) => (
                    <Quality {...qual} key={qual._id} />
                ))}
        </>
}

// QualitiesList.ReactPropTypes={
//     qualities : ReactPropTypes.array.isRequired 
// }
 
export default QualitiesList;