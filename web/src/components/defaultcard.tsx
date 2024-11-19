import { cn } from '../lib/utils';

const DefaultCard = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				'w-[40vw] min-h-[75vh] rounded-md',
				'blue-gradient',
				'flex flex-col justify-center items-center',
				className
			)}
		>
			{children}
		</div>
	);
};

export default DefaultCard;
