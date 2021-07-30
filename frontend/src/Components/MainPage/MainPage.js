import React, {useEffect, useState} from 'react'
import "./MainPage.css"
import axios from "axios"
import Cookie from "js-cookie"
import openSocket from "socket.io-client"

export default function MainPage() {
    const [user, getUser] = useState([])
    const [conversations, getConversations] = useState([])
    const [allConv, getAllConv] = useState([])
    const [messages, getAllMessages] = useState([])
    const [socketClientMessage, getSocketClientMessage] = useState([])
    const [socketUserMessage, socketGetUserMessage]= useState([])

    useEffect(()=>{
        const socket = openSocket("http://localhost:5000")
        socket.on("newMessage", data=>{
            console.log(data.data)
            getSocketClientMessage(data.data.message)
        })
    }, [])

    useEffect(()=>{
        const socket = openSocket("http://localhost:5000")
        socket.on("userMessage", data=>{
            console.log(data.data)
            socketGetUserMessage(data.data.message)
        })
    }, [])

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/user`, {
            withCredentials:true,
            headers:{
                Authorization: `Bearer ${Cookie.get("access_token")}`
            }
        })
        .then(res=>{
            console.log(res.data.data.conversations)
            getAllConv(res.data.data.conversations)
            
            getUser(res.data.data)
            for(let i of res.data.data.conversations){
                getConversations(i.clients)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])

    

    return (
        <div className='main'>
            <div className='main__container'>
                <div className='main__leftSide'>
                    <div className='main__leftSideContainer'>
                    <div className='main__imageSide'>
                        <img className='main__imgSide' src={user.image}></img>
                    </div>
                    <div className='main__imageTextSide'>
                        <p>{user.firstname} {user.lastname}</p>
                    </div>
                    </div>
                    <div className='main__search'>
                        <input className='main__searchInput' type='text' name='search' placeholder='Search...'></input>
                    </div>
                    <div className='main__clients'>
                        {conversations.map((items)=>{
                            return(<div onClick={(e)=>{
                                e.preventDefault()
                                for(let o of allConv){
                                    
                                      axios.get(`http://localhost:5000/api/conversation/${o._id}`, {
                                          withCredentials:true,
                                          headers:{
                                            Authorization: `Bearer ${Cookie.get("access_token")}`
                                          }
                                      })
                                      .then(res=>{
                                          console.log(res.data.data.messages)
                                          getAllMessages(res.data.data.messages)
                                      })
                                      .catch(err=>{
                                          console.log(err)
                                      })
                                }
                              

                            }} className='main__clientsContainer'>
                                <div className='main__clientImage'>
                                    <img className='main__clientImg' src={items.image}></img>
                                </div>
                                <div className='main__clientFirstLastName'>
                                    <span className='main__clientSpan'>{items.firstname} {items.lastname}</span>
                                </div>
                            </div>)
                        })}
                    </div>
                </div>
                <div className='main__rightSide'>
                    <div className='main__messagesContainer'>
                        {messages.map((items)=>{
                            return(<div>
                        <div className='main__messagesLeftSide'>
                            <p>{items.message}</p>
                            
                        </div>
                        <div className='main__messagesRightSide'>
                        <p></p>
                        </div>
                            </div>)
                        })}

                    </div>
                    <div className='main__writeMessageContainer'>

                    </div>
                </div>
            </div>
        </div>
    )
}
