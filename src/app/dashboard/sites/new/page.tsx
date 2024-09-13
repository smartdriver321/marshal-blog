'use client'

import { useActionState } from 'react'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'

import { createSite } from '@/app/actions'
import { siteSchema } from '@/lib/zod-schemas'
import { SubmitButton } from '@/components/dashboard/SubmitButtons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export default function NewSitePage() {
	const [lastResult, action] = useActionState(createSite, undefined)
	const [form, fields] = useForm({
		lastResult,

		onValidate({ formData }) {
			return parseWithZod(formData, {
				schema: siteSchema,
			})
		},

		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	})

	return (
		<div className='flex flex-col flex-1 items-center justify-center'>
			<Card className='max-w-[450px]'>
				<CardHeader>
					<CardTitle>Create Site</CardTitle>
					<CardDescription>
						Create your Site here. Click the button below once your done...
					</CardDescription>
				</CardHeader>

				<form id={form.id} onSubmit={form.onSubmit} action={action}>
					<CardContent>
						<div className='flex flex-col gap-y-6'>
							<div className='grid gap-2'>
								<Label>Site Name</Label>
								<Input
									placeholder='Site Name'
									key={fields.name.key}
									name={fields.name.name}
									defaultValue={fields.name.initialValue}
								/>
								<p className='text-red-500 text-sm'>{fields.name.errors}</p>
							</div>

							<div className='grid gap-2'>
								<Label>Subdirectory</Label>
								<Input
									placeholder='Subdirectory'
									key={fields.subdirectory.key}
									name={fields.subdirectory.name}
									defaultValue={fields.subdirectory.initialValue}
								/>
								<p className='text-red-500 text-sm'>
									{fields.subdirectory.errors}
								</p>
							</div>

							<div className='grid gap-2'>
								<Label>Description</Label>
								<Textarea
									placeholder='Small Description for Your Site'
									key={fields.description.key}
									name={fields.description.name}
									defaultValue={fields.description.initialValue}
								/>
								<p className='text-red-500 text-sm'>
									{fields.description.errors}
								</p>
							</div>
						</div>
					</CardContent>

					<CardFooter>
						<SubmitButton text='Create Site' />
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}
