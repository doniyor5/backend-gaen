import React from 'react'
import NavLogo from "../../assets/img/GAEN.png"

export default function Footer() {
	return (
		<div className='border-t border-t-white w-full absolute right-0'>
			<div className=' main-container flex justify-between items-center  py-7'>
			<div className='md:py-5 md:px-32'>
        <img src={NavLogo} alt="Logo" />
      </div>
			<div className=' md:px-32'>
				<p className='text-[10px] md:text-[18px] text-white font-[300]'>
					copyright © 2024 all rights reserved
				</p>
			</div>
			</div>
		</div>
	)
}
