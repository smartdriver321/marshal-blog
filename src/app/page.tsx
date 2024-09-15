import { redirect } from 'next/navigation'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import { Hero } from '@/components/blog/Hero'
import { Logos } from '@/components/blog/Logos'
import { Features } from '@/components/blog/Features'
import { PricingTable } from '@/components/shared/PricingTable'

export default async function HomePage() {
	const { getUser } = getKindeServerSession()
	const session = await getUser()

	if (session?.id) {
		return redirect('/dashboard')
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24'>
			<Hero />
			<Logos />
			<Features />
			<PricingTable />
		</div>
	)
}
