import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PlusCircle } from 'lucide-react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import { Button } from '@/components/ui/button'

export default async function SitesPage() {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	if (!user) {
		return redirect('/api/auth/login')
	}

	return (
		<>
			<div className='flex w-full justify-end'>
				<Button asChild>
					<Link href={'/dashboard/sites/new'}>
						<PlusCircle className='mr-2 size-4' /> Create Site
					</Link>
				</Button>
			</div>
		</>
	)
}
