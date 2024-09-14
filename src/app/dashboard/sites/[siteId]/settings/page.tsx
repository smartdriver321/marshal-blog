import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import { UploadImageForm } from '@/components/forms/UploadImageForm'
import { SubmitButton } from '@/components/dashboard/SubmitButtons'
import { deleteSite } from '@/app/actions'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export default function SettingsPage({
	params,
}: {
	params: { siteId: string }
}) {
	return (
		<>
			<div className='flex items-center gap-x-2'>
				<Button variant='outline' size='icon'>
					<Link href={`/dashboard/sites/${params.siteId}`}>
						<ChevronLeft className='size-4' />
					</Link>
				</Button>
				<h3 className='text-xl font-semibold'>Go back</h3>
			</div>

			<UploadImageForm siteId={params.siteId} />

			<Card className='border-red-500 bg-red-500/10'>
				<CardHeader>
					<CardTitle className='text-red-500'>Danger</CardTitle>
					<CardDescription>
						This will delete your site and all articles associated with it.
						Click the button below to delete everything
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<form action={deleteSite}>
						<input type='hidden' name='siteId' value={params.siteId} />
						<SubmitButton text='Delete Everything' variant='destructive' />
					</form>
				</CardFooter>
			</Card>
		</>
	)
}
