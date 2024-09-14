import Link from 'next/link'

import { deleteArticle } from '@/app/actions'
import { SubmitButton } from '@/components/dashboard/SubmitButtons'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export default function DeleteArticlePage({
	params,
}: {
	params: { siteId: string; articleId: string }
}) {
	return (
		<div className='flex flex-1 items-center justify-center'>
			<Card className='max-w-xl'>
				<CardHeader>
					<CardTitle>Are you sure?</CardTitle>
					<CardDescription>
						This action cannot be undone. This will delete this article and
						remove all data from our server
					</CardDescription>
				</CardHeader>
				<CardFooter className='w-full flex justify-between'>
					<Button variant='secondary' asChild>
						<Link href={`/dashboard/sites/${params.siteId}`}>Cancel</Link>
					</Button>
					<form action={deleteArticle}>
						<input type='hidden' name='articleId' value={params.articleId} />
						<input type='hidden' name='siteId' value={params.siteId} />
						<SubmitButton variant='destructive' text='Delete Article' />
					</form>
				</CardFooter>
			</Card>
		</div>
	)
}
