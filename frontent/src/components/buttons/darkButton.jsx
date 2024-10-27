import React from 'react'

export default function DarkButton({buttonText}) {
	return (
		<div>
			<button className='bg-[#0A1F44] w-full py-3 px-5 text-white font-[600] text-[12px] rounded-lg'>{buttonText}</button>
		</div>
	)
}
