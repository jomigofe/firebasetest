import React, { useState, useEffect } from "react";

import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '../utils/auth/initFirebase'
import { useUser } from '../utils/auth/useUser'

const RealtimeData = () => {
  const { user, logout } = useUser()

  const [positions, setPositions] = useState({
    users: []
  });

  const auth = useAuth();
  let socket = undefined;

  useEffect(() => {
    if (user?.uid) {
      getUser(auth?.user?.uid) // getting more user data from  firestore so that we have more info like full name and avatar  etc
        .then((response) => {
          setUserData(response.data());
          const userData = response.data();
          // using a var here cos its just easier then makaing it possible to wait for the set to finish
          try {
            socket = db
              .ref(`chats/${room}`)
              .limitToLast(50)
              .on("value", (snapshot) => {
                let chats = [];
                snapshot.forEach((snap) => {
                  let messageIsYours;
                  if (snap.val().uid == userData.uid) {
                    messageIsYours = true;
                  }
                  const message = {
                    message: snap.val().message,
                    time: snap.val().time,
                    user: snap.val().user,
                    messageIsYours,
                  };
                  chats.push(message);
                });
                setChats(chats);
              });
          } catch (error) {
            console.error("error push ", error);
          }
        })
        .catch((error) => {
          console.error("Error fetching - Personal Data: ", error);
        });
    }

    return () => {
      // unsusbcribe to socket connection when user closes the page
      db.ref(`chats/${room}`).off("value", socket);
    };
  }, [auth]);

  const sendMessage = async (content) => {
    let userDisplayNameOrEmail;
    if (userData.nome && userData.apelido) {
      userDisplayNameOrEmail = userData.nome + " " + userData.apelido;
    } else {
      userDisplayNameOrEmail =
        userData.nome || userData.apelido || userData.email;
    }

    const userUid = userData.uid;
    // in case that is no logged user
    if (!userDisplayNameOrEmail) return;

    try {
      await db.ref(`chats/${room}`).push({
        message: content,
        time: Date.now(),
        user: userDisplayNameOrEmail,
        uid: userUid,
      });
    } catch (error) {
      console.error("error push ", error);
    }
  };

  return (
    <Chat messages={chats} sendMessage={sendMessage} userData={userData} {...rest} />
  );
};
export default ChatContainer;
