import { useState } from 'react'
import ListBox from './ListBox'
import WatchedBox from './WatchedBox'

function Main(props) {
    return (
        <main className='main'>
            <ListBox />
            <WatchedBox />
        </main>
    )
}

export default Main
