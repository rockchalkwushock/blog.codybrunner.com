import {
	Popover,
	PopoverBackdrop,
	PopoverButton,
	PopoverPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import { Fragment } from 'react'
import { cn } from '~/utils/helpers'
import { ThemeToggle } from './theme-toggle'

export function MobileNav({ currentPath }: { currentPath: string }) {
	return (
		<Popover className='pointer-events-auto md:hidden'>
			<PopoverButton className='group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-primary-800 shadow-lg shadow-primary-800/5 ring-1 ring-primary-900/5 backdrop-blur dark:bg-primary-800/90 dark:text-primary-200 dark:ring-white/10 dark:hover:ring-white/20'>
				Menu
				<svg
					aria-hidden='true'
					className='ml-3 h-auto w-2 stroke-primary-500 group-hover:stroke-primary-700 dark:group-hover:stroke-primary-400'
					viewBox='0 0 8 6'
				>
					<path
						className='fill-none'
						d='M1.75 1.75 4 4.25l2.25-2.5'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='1.5'
					/>
				</svg>
			</PopoverButton>
			<Transition>
				<TransitionChild
					as={Fragment}
					enter='duration-150 ease-out'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='duration-150 ease-in'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<PopoverBackdrop className='fixed inset-0 z-50 bg-primary-800/40 backdrop-blur-sm dark:bg-black/80' />
				</TransitionChild>
				<TransitionChild
					as={Fragment}
					enter='duration-150 ease-out'
					enterFrom='opacity-0 scale-95'
					enterTo='opacity-100 scale-100'
					leave='duration-150 ease-in'
					leaveFrom='opacity-100 scale-100'
					leaveTo='opacity-0 scale-95'
				>
					<PopoverPanel
						className='fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-primary-900/5 dark:bg-primary-900 dark:ring-primary-800'
						focus
					>
						<div className='flex flex-row-reverse items-center justify-between'>
							<PopoverButton
								aria-label='Close Navigation Menu'
								className='-m-1 p-1'
							>
								<svg
									aria-hidden='true'
									className='h-6 w-6 text-sm font-medium text-primary-600 dark:text-primary-400'
									view-box='0 0 24 24'
								>
									<path
										className='fill-none stroke-current'
										d='m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='1.5'
									/>
								</svg>
							</PopoverButton>
							<h2 className='text-sm font-medium text-primary-600 dark:text-primary-400'>
								Navigation
							</h2>
						</div>
						<nav className='mt-6'>
							<ul className='-my-2 divide-y divide-primary-100 text-base text-primary-800 dark:divide-primary-100/5 dark:text-primary-300'>
								<li>
									<PopoverButton
										aria-label='Go to Home Page.'
										as='a'
										className={cn(
											'block py-2',
											currentPath === '/' &&
												'font-semibold text-accent-500 dark:text-accent-400'
										)}
										href='https://codybrunner.com'
									>
										Home
									</PopoverButton>
								</li>
								{/* <li>
									<PopoverButton
										aria-label="Go to About Page."
										as='a'
										className={cn(
											'block py-2',
											currentPath.startsWith('/about') &&
												'font-semibold text-accent-500 dark:text-accent-400'
										)}
										href="https://codybrunner.com/about"
									>
										About
									</PopoverButton>
								</li> */}
								<li>
									<PopoverButton
										aria-label='Go to Articles Page.'
										as='a'
										className='block py-2'
										href='/'
									>
										Articles
									</PopoverButton>
								</li>
								{/* <li>
									<PopoverButton
										aria-label="Go to Boookshelf Page.""
										as='a'
										className={cn(
											'block py-2',
											currentPath.startsWith('/bookshelf') &&
												'font-semibold text-accent-500 dark:text-accent-400'
										)}
										href="https://codybrunner.com/bookshelf"
									>
										Bookshelf
									</PopoverButton>
								</li> */}
								{/* <li>
									<PopoverButton
										aria-label="Go to my Appointlet Booking Page."
										as='a'
										className='block py-2'
										href='https://appt.link/cody-brunner-dev/video-call'
										rel='noopener noreferrer'
										target='_blank'
									>
										Meet
									</PopoverButton>
								</li> */}
								<li>
									<PopoverButton
										aria-label='Go to Projects Page.'
										as='a'
										className={cn(
											'block py-2',
											currentPath.startsWith('/projects') &&
												'font-semibold text-accent-500 dark:text-accent-400'
										)}
										href='https://codybrunner.com/projects'
									>
										Projects
									</PopoverButton>
								</li>
								{/* <li>
									<PopoverButton
										aria-label="Go to Uses Page."
										as='a'
										className={cn(
											'block py-2',
											currentPath.startsWith('/uses') &&
												'font-semibold text-accent-500 dark:text-accent-400'
										)}
										href="https://codybrunner.com/uses"
									>
										Uses
									</PopoverButton>
								</li> */}
							</ul>
						</nav>
						<div className='flex items-center justify-end'>
							<ThemeToggle />
						</div>
					</PopoverPanel>
				</TransitionChild>
			</Transition>
		</Popover>
	)
}
