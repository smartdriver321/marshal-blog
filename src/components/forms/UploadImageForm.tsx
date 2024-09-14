'use client'

import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import { updateImage } from '@/app/actions'
import { UploadDropzone } from '@/lib/uploadthing'
import { SubmitButton } from '../dashboard/SubmitButtons'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

interface iAppProps {
	siteId: string
}

export function UploadImageForm({ siteId }: iAppProps) {
	const [imageUrl, setImageUrl] = useState<undefined | string>(undefined)
	return (
		<Card>
			<CardHeader>
				<CardTitle>Image</CardTitle>
				<CardDescription>
					This is the image of your site. You can change it here
				</CardDescription>
			</CardHeader>
			<CardContent>
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt='Uploaded Image'
						width={200}
						height={200}
						className='size-[200px] object-cover rounded-lg'
					/>
				) : (
					<UploadDropzone
						endpoint='imageUploader'
						onClientUploadComplete={(res) => {
							setImageUrl(res[0].url)
							toast.success('Image has been uploaded')
						}}
						onUploadError={() => {
							toast.error('Something went wrong.')
						}}
					/>
				)}
			</CardContent>
			<CardFooter>
				<form action={updateImage}>
					<input type='hidden' name='siteId' value={siteId} />
					<input type='hidden' name='imageUrl' value={imageUrl} />
					<SubmitButton text='Change Image' />
				</form>
			</CardFooter>
		</Card>
	)
}
