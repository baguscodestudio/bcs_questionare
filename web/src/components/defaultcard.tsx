import { cn } from '../lib/utils';

const DefaultCard = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<div
				className={cn(
					'w-[40vw] min-h-[75vh] rounded-md',
					'flex flex-col justify-center items-center',
					className
				)}
			>
				{children}
			</div>
		</div>
	);
};

export default DefaultCard;
