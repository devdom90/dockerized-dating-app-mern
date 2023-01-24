import Home from './pages/Home/Home'
import Main from './pages/Main/Main.jsx'
import Form from './pages/Form/Form'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {useCookies} from 'react-cookie'

const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const Token = cookies.Token

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                {Token && <Route path="/main" element={<Main/>}/>}
                {Token && <Route path="/form" element={<Form/>}/>}

            </Routes>
        </BrowserRouter>
    )
}

export default App
