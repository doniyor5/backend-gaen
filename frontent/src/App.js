import AOS from 'aos'
import 'aos/dist/aos.css'
import React, { useEffect } from 'react'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import MainPage from './pages/aboutPage.jsx'
import AdditionalPages from './pages/additionalPages'
import ArtworkDetails from './pages/artworkDetails'
import Login from './pages/login'
import MainPage2 from './pages/mainPage2'
import Register from './pages/register.jsx'


export default function App() {
	useEffect(() => {
		AOS.init({
			offset: 200, 
			delay: 0, 
			duration: 1000,
			easing: 'ease-in-out',
			once: true, 
		})
	}, [])

	const routes = [
		{
			path: '/',
			element: <MainPage />,
		},
		{
			path: '/about',
			element: <ArtworkDetails />
		},
		{
			path: '/features',
			element: <AdditionalPages />
		},
		{
			path: '/register',
			element: <Register />
		},
		{
			path: '/login',
			element: <Login />
		},
		{
			path: '/main',
			element: <MainPage2 />
		},
		{
			path: '/additional',
			element: <AdditionalPages />
		},
		{
			path: '/details',
			element: <ArtworkDetails />
		},
	];

	const router = createBrowserRouter(routes, {
		future: {
			v7_normalizeFormMethod: true,
		}
	})
	return (
		<RouterProvider router={router} />
	)
}
