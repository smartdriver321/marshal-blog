/* eslint-disable no-unused-vars */
'use server'

import { redirect } from 'next/navigation'
import { parseWithZod } from '@conform-to/zod'

import prisma from '@/lib/db'
import { requireUser } from '@/lib/require-user'
import { siteCreationSchema } from '@/lib/zod-schemas'

export async function createSite(prevState: any, formData: FormData) {
	const user = await requireUser()
	const [subStatus, sites] = await Promise.all([
		prisma.subscription.findUnique({
			where: {
				userId: user.id,
			},
			select: {
				status: true,
			},
		}),
		prisma.site.findMany({
			where: {
				userId: user.id,
			},
		}),
	])

	if (!subStatus || subStatus.status !== 'active') {
		if (sites.length < 1) {
			// Allow creating a site
			const submission = await parseWithZod(formData, {
				schema: siteCreationSchema({
					async isSubdirectoryUnique() {
						const exisitngSubDirectory = await prisma.site.findUnique({
							where: {
								subdirectory: formData.get('subdirectory') as string,
							},
						})
						return !exisitngSubDirectory
					},
				}),
				async: true,
			})

			if (submission.status !== 'success') {
				return submission.reply()
			}

			const response = await prisma.site.create({
				data: {
					description: submission.value.description,
					name: submission.value.name,
					subdirectory: submission.value.subdirectory,
					userId: user.id,
				},
			})

			return redirect('/dashboard/sites')
		} else {
			// user alredy has one site dont allow
			return redirect('/dashboard/pricing')
		}
	} else if (subStatus.status === 'active') {
		// User has a active plan he can create sites...
		const submission = await parseWithZod(formData, {
			schema: siteCreationSchema({
				async isSubdirectoryUnique() {
					const exisitingSubDirectory = await prisma.site.findUnique({
						where: {
							subdirectory: formData.get('subdirectory') as string,
						},
					})
					return !exisitingSubDirectory
				},
			}),
			async: true,
		})

		if (submission.status !== 'success') {
			return submission.reply()
		}

		const response = await prisma.site.create({
			data: {
				description: submission.value.description,
				name: submission.value.name,
				subdirectory: submission.value.subdirectory,
				userId: user.id,
			},
		})

		return redirect('/dashboard/sites')
	}
}
