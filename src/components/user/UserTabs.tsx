import * as TabsPrimitive from '@radix-ui/react-tabs'
import cx from 'classnames'
import TweetForm from '@ui/Form'
//import Feed from '@ui/Feed'

const UserTabs = () => (
	<TabsPrimitive.Root className="TabsRoot" defaultValue="tab1">
		<TabsPrimitive.List
			className="TabsList flex w-full bg-color-primary-badge-opacity border-b border-b-slate-200"
			aria-label="Manage your account"
		>
			<TabsPrimitive.Trigger
				value="tab1"
				className={cx(
					'TabsTrigger color-text-dimmed group hover:bg-color-text-subtle',
					'radix-state-active:bg-red-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-green-500 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-900 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800',
					'px-6 font-semibold text-color-text-dimmed',
					'focus:radix-state-active:border-b-red',
					'focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
				)}
			>
				<div className="py-4 flex items-center justify-center relative h-full ">
					<div>Hoots</div>
					<span className="h-1 w-1/2 bg-transparent left-[50%] -translate-x-2/4 absolute left-0 bottom-0 rounded-full"></span>
				</div>
			</TabsPrimitive.Trigger>
			<TabsPrimitive.Trigger
				value="tab2"
				className={cx(
					'TabsTrigger group hover:bg-color-text-subtle',
					'radix-state-active:bg-red-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-green-500 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-900 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800',
					'px-6 font-semibold text-color-text-dimmed',
					'focus:radix-state-active:border-b-red',
					'focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
				)}
			>
				<div className="py-4 relative h-full ">
					<div>Following</div>
					<span className="h-1 w-1/2 bg-transparent left-[50%] -translate-x-2/4 bg-transparent absolute left-0 bottom-0 rounded-full"></span>
				</div>
			</TabsPrimitive.Trigger>
		</TabsPrimitive.List>
		<TabsPrimitive.Content value="tab1" className="TabsContent ">
			{/* <TweetForm width="default" /> */}
			{/* <Feed /> */}
		</TabsPrimitive.Content>
		<TabsPrimitive.Content value="tab2" className="TabsContent ">
			{/* <TweetForm width="default" /> */}
		</TabsPrimitive.Content>
	</TabsPrimitive.Root>
)

export default UserTabs
