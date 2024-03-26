
import {Routes,Route, Navigate} from 'react-router-dom';
import Layout from './layouts/layout';
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout>Home Page</Layout>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="*" element={<Navigate to={'/'}/>} />
        </Routes>
    )
}

export default AppRoutes;