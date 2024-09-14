import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import prisma from '@/lib/db'
import { EditArticleForm } from '@/components/forms/EditArticleForm'
import { Button } from '@/components/ui/button'

const getData = async (postId: string) => {
	const data = await prisma.post.findUnique({
		where: {
			id: postId,
		},
		select: {
			image: true,
			title: true,
			smallDescription: true,
			slug: true,
			articleContent: true,
			id: true,
		},
	})

	if (!data) {
		return notFound()
	}

	return data
}

export default async function EditArticlePage({
	params,
}: {
	params: { articleId: string; siteId: string }
}) {
	const data = await getData(params.articleId)

	return (
		<div>
			<div className='flex items-center'>
				<Button size='icon' variant='outline' asChild className='mr-3'>
					<Link href={`/dashboard/sites/${params.siteId}`}>
						<ArrowLeft className='size-4' />
					</Link>
				</Button>
				<h1 className='text-2xl font-semibold'>Edit Article</h1>
			</div>

			<EditArticleForm data={data} siteId={params.siteId} />
		</div>
	)
}
