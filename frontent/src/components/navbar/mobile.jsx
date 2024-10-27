import React, { useState } from 'react'
import { BiHome, BiMenu } from 'react-icons/bi'
import { MdFeaturedPlayList } from 'react-icons/md'
import { TiArrowBackOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import NavLogo from "../../assets/img/GAEN.png"
import NavbarButton from '../buttons/navbarButton'

export default function Mobile() {

	const [open, setOpen] = useState(false)

	const handleOpen = () => {
		setOpen(!open)
	}

   const handleClose = () => {
    setOpen(false)
  }


	return (
		<div className='block md:hidden z-50'>
      <div onClick={handleClose} className={`${open ? ' fixed transition-transform duration-300 right-0 bg-black/80 w-[100%] h-[100vh] top-0' : ''}`}></div>
			<div>
				<BiMenu className='text-white text-3xl cursor-pointer' onClick={handleOpen} />
			</div>
			<div>
				<div className={`fixed transition-transform duration-300 pt-10 pl-5 top-0 left-0 bg-slate-950 w-[80%] h-[100vh] transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
					<Link to={'/'}>
						<img src={NavLogo} alt="Logo" />
					</Link>
					<ul className='flex flex-col gap-5 text-white font-[300] text-[16px] pt-10 pl-3'>
						<li className='bg-slate-900 w-[150px] py-2 px-3 rounded-md'>
							<Link className=' flex gap-2 items-center' to={'/main'}>
								<BiHome className='text-white text-xl' />
								Main
							</Link>
						</li>
						<li className='bg-slate-900 w-[150px] py-2 px-3 rounded-md'>
							<Link className=' flex gap-2 items-center' to={'/about'}>
								<TiArrowBackOutline className='text-white text-xl' />
								About
							</Link>
						</li>
						<li className='bg-slate-900 w-[150px] py-2 px-3 rounded-md'>
							<Link className=' flex gap-2 items-center' to={'/features'}>
								<MdFeaturedPlayList className='text-white text-xl' />
								Features
							</Link>
						</li>
						<div className='w-full'>
							<Link to={'/login'}>
							<NavbarButton buttonText={'Log in'} />
							</Link>
						</div>
					</ul>
				</div>
			</div>
		</div>
	)
}
