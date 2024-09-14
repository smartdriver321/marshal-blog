import Link from 'next/link'
import { XIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PaymentCancelledPage() {
	return (
		<div className='w-full flex flex-1 justify-center items-center'>
			<Card className='w-[350px]'>
				<div className='p-6'>
					<div className='w-full flex justify-center'>
						<XIcon className='size-12 p-2 rounded-full bg-red-500/30 text-red-500' />
					</div>

					<div className='mt-3 text-center sm:mt-5 w-full'>
						<h2 className='text-xl font-semibold'>Payment Cancelled</h2>
						<p className='text-sm mt-2 text-muted-foreground tracking-tight'>
							No worries, you wont be charged. Please try again.
						</p>

						<Button asChild className='w-full mt-5'>
							<Link href='/dashboard'>Go back to Dashboard</Link>
						</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}
