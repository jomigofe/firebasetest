import React, { useState, useEffect} from "react";
import useKey from '@accessible/use-key'
import Link from 'next/link'
import { useUser } from '../utils/auth/useUser'
import initFirebase from '../utils/auth/initFirebase'
import { throttle } from 'throttle-debounce';



import {
  Character
} from '../components'

const stc = require('string-to-color');



const setData = async (content) => {
  try {
    await initFirebase.database().ref(`realtimeData`).set(content);
  } catch (error) {
    console.error("error push ", error);
  }
}

const Index = () => {
  const { user, logout } = useUser()
  const [positions, setPositions] = useState({})

  const setPosition = async (direction) => {

    // throttle(1000, false, (num) => {
      let _positions = positions

      if(!positions[user.id]) {
        return 
      }

      let { x, y } = positions[user.id]

      
      if(direction == 'ArrowUp') {
        _positions[user.id].y = y-10
      } else if(direction == 'ArrowDown') {
        _positions[user.id].y = y+10
      } else if(direction == 'ArrowLeft') {
        _positions[user.id].x = x-10
      } else if(direction == 'ArrowRight') {
        _positions[user.id].x = x+10
      }

      console.log('setPosition',_positions)
      setData(_positions)
    // });
  }

  if (typeof window === 'undefined') {
    return false
  }

  useKey(window, {
    // Logs event when the Escape key is pressed
    ArrowUp: (e) => setPosition(e.code),
    ArrowDown: (e) => setPosition(e.code),
    ArrowLeft: (e) => setPosition(e.code),
    ArrowRight: (e) => setPosition(e.code),
    Escape: console.log,
    // Logs "Key was pressed: Enter" to the console when Enter is pressed
    Enter: (event) => console.log('Key was pressed:', event.key),
  })

  
  useEffect(() => {
    
    let socket

    if(user) {
      try {
        socket = initFirebase.database()
          .ref(`realtimeData`)
          .on("value", (snapshot) => {
            let data = snapshot.val()

            if(typeof data != 'object' || !data) {
              data = {}
            }

            console.log(data)

            //check if theres not a last position
            if(!data[user.id]) {
              data[user.id] = {
                x:50,
                y:50,
                n:user.displayName,
                // o:true,
                c:stc(user.id)
              }
            }

            setPositions(data)
            setData(data)
          });
      } catch (error) {
        console.error("error push ", error);
      }
    }

    return () => {
    	if(user) {
	      //set user offline
	      // let _positions = { ...positions[user.id], o:false }
	      // _positions = {[user.id]:_positions}
	      // setData({ ...positions, ..._positions})
	    }
      // setData()
      // unsusbcribe to socket connection when user closes the page
      initFirebase.database().ref(`realtimeData`).off("value", socket);
    }
    
  },[user])


  if (!user) {
    return (
      <>
        <p>Hi there!</p>
        <p>
          You are not signed in.{' '}
          <Link href={'/auth'}>
            <a>Sign in</a>
          </Link>
        </p>
      </>
    )
  }


  // debugger;
  //   console.log("userData",userData);

    

  return (
    <div
      className="world"
      onKeyDown={(e) => {
        console.log('onKeyDown',e)
      }}
    >
      {
        Object.keys(positions).map(key => {
          const char = positions[key]

          return (
            <Character key={key} char={char} />
          )
        })
      }
    </div>
  )
}

export default Index
