
import {Routes,Route, Navigate} from 'react-router-dom';
import Layout from './layouts/layout';
import HomePage from './pages/HomePage';
import AuthCallBackPage from './pages/AuthCallBackPage';
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout><HomePage/></Layout>} />
            <Route path='auth-callback' element={<AuthCallBackPage/>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="*" element={<Navigate to={'/'}/>} />
        </Routes>
    )
}

export default AppRoutes;