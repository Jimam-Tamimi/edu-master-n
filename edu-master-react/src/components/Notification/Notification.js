import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '@mantine/core';
import { removeAlert } from '../../redux/notification/actions';
import {AiFillCheckCircle, AiFillExclamationCircle, AiOutlineCheckCircle, AiOutlineExclamationCircle} from 'react-icons/ai'

export default function AlertComponent() {
    const alert = useSelector(state => state.alert)
    const dispatch = useDispatch()
    useEffect(() => {
      
    
      console.log({alert})
    }, [alert])
    
    return (
        <>
            <div>
                {
                    alert?.map(({message, alertType='success', id}) => {
                        return (
                            <Modal 
                            opened={true}
                            withCloseButton={false}
                            centered 
                            size="lg"
                            onClose={() => dispatch(removeAlert(id))}

                             key={id} >
                              <div  style={{textAlign: 'center',padding:" 35px 10px", flexDirection: "column", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                {
                                  alertType == "success"?
                                  <AiOutlineCheckCircle size="50px" color={"#00be47"} style={{marginRight: '10px'}} />
                                  : alertType== 'error'?
                              <AiOutlineExclamationCircle size="50px" color={"#ff0000"} style={{marginRight: '10px'}} />
                              :''
                                }
                              

                              <p >
                                
                                {message}
                              </p>
                              </div>
                              </Modal>
                        )
                    })
                }
                
                
                
            </div>
 
        </>
    )
}



function Demo() {
  return (
    <Modal withCloseButton={false}>
      Modal without header, press escape or click on overlay to close
    </Modal>
  );
}