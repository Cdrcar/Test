import React from 'react';
import { BiLike, BiComment } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_COURSES } from '../utils/queries';

const ForumBar = (props) => {
    return (
        <div className={`bg-slate-100 ${props.className} rounded-lg h-16 mb-8 shadow-md shadow-slate-400 hover:shadow-none hover:border-2 hover:border-white`}>
            <div className='h-full flex rounded-lg border-4 border-slate-400'>
                <div className='h-full shrink overflow-hidden flex items-center text-lg pl-2'>
                    <p className='font-bold truncate'>Java Script efwi uby fwe yig fvds riu nosd fvuihfsuieh fseuhifgierdawdawdwadwadwadwadwadwawbhuygibfhruywfuibhaweriufbhyb</p>
                </div>
                <div className='flex-none inline pr-1 sm:pr-2 items-center'>
                    <div className='flex flex-wrap items-center'>
                        <BiLike className='fill-green-600' />
                        <p className='text-green-600'>200</p>
                    </div>
                    <div className='flex flex-wrap items-center '>
                        <BiComment className='fill-yellow-500' />
                        <p className='text-yellow-500'>5</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForumBar;