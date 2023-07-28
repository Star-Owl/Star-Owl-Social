import { HiMagnifyingGlass } from 'react-icons/hi2'

const Search = () => (
	<div className="sticky top-0 pb-6">
		<form className="flex flex-col flex-1 gap-y-4 bg-color-primary-lighter rounded-[1rem]">
			<div className="flex flex-1 flex-row gap-4">
				<HiMagnifyingGlass
					className="
					w-6
					h-6
					left-4
					flex
					items-center
					text-color-text-disabled"
				/>
				<input
					type="search"
					placeholder="Search"
					className="
						p-6
						w-full
						flex
						items-center
						text-lg
						placeholder:ext-lg
						bg-transparent
						border-slate-100
						placeholder:text-color-text-disabled"
				/>
				{/* <button className="sr-only bg-slate-900 font-bold text-white px-4 py-2 text-sm rounded-full">
					Hoot
				</button> */}
			</div>
		</form>
	</div>
)

export default Search
