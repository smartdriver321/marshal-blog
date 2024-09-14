import prisma from '@/lib/db'

import { requireUser } from '@/lib/require-user'
import { SubmitButton } from '@/components/dashboard/SubmitButtons'
import { PricingTable } from '@/components/dashboard/Pricing'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const getData = async (userId: string) => {
	const data = await prisma.subscription.findUnique({
		where: {
			userId: userId,
		},
		select: {
			status: true,
			User: {
				select: {
					customerId: true,
				},
			},
		},
	})

	return data
}

export default async function PricingPage() {
	const user = await requireUser()
	const data = await getData(user.id)

	async function createCustomerPortal() {
		'use server'
	}

	if (data?.status === 'active') {
		return (
			<Card className='w-full '>
				<CardHeader>
					<CardTitle>Edit Subscription</CardTitle>
					<CardDescription>
						Click on the button below, this will give you the opportunity to
						change your payment details and view your statement at the same
						time.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={createCustomerPortal}>
						<SubmitButton text='View Subscription Details' />
					</form>
				</CardContent>
			</Card>
		)
	}

	return (
		<div>
			<PricingTable />
		</div>
	)
}
