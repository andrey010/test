import axios from "axios";
import { useState, createContext, useEffect, ComponentType, FC } from "react";

const LoggedContext = createContext({isLogged: false, setLogged: () => {}})
type PropsTypes = {
    children: JSX.Element
}
const LoggedProvider: FC<PropsTypes> = ({
    children
}) => {
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8001/auth/isLogin')
            .then(res => {
                if(res.data.data) {
                    setIsLogged(true)
                } 
            })
            .catch(e => console.log(e))
    },[])

    const setLogged = () => setIsLogged(false)

    return (
        <LoggedContext.Provider value={{isLogged, setLogged}}>
            {children}
        </LoggedContext.Provider>
    )
}

export { LoggedContext, LoggedProvider}