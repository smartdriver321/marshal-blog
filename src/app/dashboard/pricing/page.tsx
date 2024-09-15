import { redirect } from 'next/navigation'

import prisma from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { requireUser } from '@/lib/require-user'
import { SubmitButton } from '@/components/dashboard/SubmitButtons'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { PricingTable } from '@/components/shared/PricingTable'

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

		const session = await stripe.billingPortal.sessions.create({
			customer: data?.User?.customerId as string,
			return_url: 'http://localhost:3000/dashboard',
		})

		return redirect(session.url)
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
