// PostDetail.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Link} from "react-router";

import Wpisy from './wpis'
import {from} from "rxjs";
export default function wpisDetails() {

    const {id} = useParams<{id: string}>();
   // console.log('to id obecne:', id);
    return (
        <div className="posts-grid">
            <Wpisy >

        </Wpisy>
        </div>
    );
}