import React from 'react';
import { motion } from 'framer-motion';

const UsersCrud = ({usersList, selectUser, deleteUser}) => {
    return (
        <div className='User-card-container'>
            {
                usersList.map(user=>(
                    <motion.div className='User-card' key={user.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                    default: {
                    duration: 0.3,
                    ease: [0, 0.71, 0.2, 1.01]
                    },
                    scale: {
                    type: "spring",
                    damping: 10,
                    stiffness: 300,
                    restDelta: 0.001
                    }
                    }}
                    >
                        <div className='User-card-data'>
                            <h4 className="">{user.first_name} {user.last_name}</h4>
                            <p className="">{user.email}</p>
                            <p className="">{user.birthday}</p>  
                        </div>
                        <div className='User-card-btns'>
                            <button onClick={()=>selectUser(user)} className="Edit-btn"><i className="fa-solid fa-pen"></i></button>
                            <button onClick={()=>deleteUser(user.id)} className="Delete-btn"><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </motion.div>
                ))
            }
        </div>
    );
};

export default UsersCrud;