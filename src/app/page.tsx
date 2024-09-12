import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
	LoginLink,
	LogoutLink,
	RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components'

import { Button } from '@/components/ui/button'

export default async function HomePage() {
	const { getUser } = getKindeServerSession()
	const session = await getUser()

	return (
		<div className='p10'>
			<Button className='text-red-500'>Kinde Auth</Button>
			{session ? (
				<LogoutLink>
					<Button>Logout</Button>{' '}
				</LogoutLink>
			) : (
				<div>
					<RegisterLink>
						{' '}
						<Button>Register</Button>
					</RegisterLink>
					<LoginLink>
						<Button>Login</Button>{' '}
					</LoginLink>
				</div>
			)}
		</div>
	)
}
